import '../styles/LoggIn.css';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { useState } from 'react';


function LoggIn() {
  // State för att hålla reda på användarnamn och lösenord
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // State för att hantera felmeddelanden
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [usernameValid, setUsernameValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({ username: null, password: null });

  const navigate = useNavigate();

  // Rätt inloggnings uppgifter för inlogg
  const correctUsername = 'admin'
  const correctPassword = '1234';

  // Validering för lösenord och användarnamn
  const schema = Joi.object({
    username: Joi.string().min(5).required().messages({
      'string.empty': 'Användarnamn krävs',
      'string.min': 'Minst 5 tecken',
    }),
    password: Joi.string().min(4).required().messages({
      'string.empty': 'Lösenord krävs',
      'string.min': 'Minst 4 tecken',
    }),
  });

  const validateField = (field, value) => {
  if (field === 'username') {
    if (value.length < 5) {
      setUsernameError('Minst 5 tecken');
      setFieldErrors(prev => ({ ...prev, username: 'error' }));
    } else if (value !== correctUsername) {
      setUsernameError('Fel användarnamn');
      setFieldErrors(prev => ({ ...prev, username: 'error' }));
    } else {
      setUsernameError('');
      setFieldErrors(prev => ({ ...prev, username: 'success' }));
    }
  }

  if (field === 'password') {
    if (value.length < 4) {
      setPasswordError('Minst 4 tecken');
      setFieldErrors(prev => ({ ...prev, password: 'error' }));
    } else if (value !== correctPassword) {
      setPasswordError('Fel lösenord');
      setFieldErrors(prev => ({ ...prev, password: 'error' }));
    } else {
      setPasswordError('');
      setFieldErrors(prev => ({ ...prev, password: 'success' }));
    }
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsernameError('');
    setPasswordError('');
    setFieldErrors({ username: null, password: null });

    const { error } = schema.validate({ username, password }, { abortEarly: false });

    if (error) {
      error.details.forEach((detail) => {
        if (detail.path.includes('username')) {
          setUsernameError(detail.message);
          setFieldErrors(prev => ({ ...prev, username: 'error' }));
        }
        if (detail.path.includes('password')) {
          setPasswordError(detail.message);
          setFieldErrors(prev => ({ ...prev, password: 'error' }));
        }
      });
      return;
    }

    if (username !== correctUsername) {
      setUsernameError('Fel användarnamn');
      setFieldErrors(prev => ({ ...prev, username: 'error' }));
      return;
    }

    if (password !== correctPassword) {
      setPasswordError('Fel lösenord');
      setFieldErrors(prev => ({ ...prev, password: 'error' }));
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    navigate('/admin');
  };

  return (
    <section className="loggIn dark-theme">
      <section className="logg-section">
        <div className="sign-section">
          <form className="form" onSubmit={handleSubmit}>
            <p className="admin">Användarnamn</p>
            <input
              className={`input-box ${fieldErrors.username === 'error' ? 'input-error' : ''}`}
              type="text"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
                validateField('username', e.target.value);
              }}
            />
            {usernameError && <p className="error-inlogg">{usernameError}</p>}

            <p className="admin">Lösenord</p>
            <input
              className={`input-box ${fieldErrors.password === 'error' ? 'input-error' : ''}`}
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField('password', e.target.value);
              }}
            />
            {passwordError && <p className="error-inlogg">{passwordError}</p>}

            <button className="continue">Logga In</button>
          </form>
        </div>
      </section>
    </section>
  );
}

export default LoggIn;