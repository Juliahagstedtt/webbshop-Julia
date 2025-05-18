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
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({ username: false, password: false });

  // Rätt inloggnings uppgifter för inlogg (Inte klar än!)
  const correctUsername = 'admin'
  const correctPassword = '1234';

  // Validering för lösenord och användarnamn
  const schema = Joi.object({
  username: Joi.string().min(5).required().messages({
    'string.empty': 'Användarnamn krävs',
    'string.min': 'Minst 5 tecken',
  }),
  password: Joi.string().min(4).required().messages({
    'string.empty': 'Lösenord Krävs',
    'string.min': 'Minst 4 tecken',
    }),
  });

  // Funktion för när användaren klickar på Logga in
const handleSubmit = (e) => {
  e.preventDefault();

  // Nollställ fel
  setUsernameError('');
  setPasswordError('');
  setUsernameValid(null);
  setPasswordValid(null);

  // Validering enligt Joi
  const { error } = schema.validate({ username, password }, { abortEarly: false });

  if (error) {
    error.details.forEach((detail) => {
      if (detail.path.includes('username')) {
        setUsernameError(detail.message);
        setUsernameValid(false);
      }
      if (detail.path.includes('password')) {
        setPasswordError(detail.message);
        setPasswordValid(false);
      }
    });
    return;
  }

  // Kontrollera korrekta inloggningsuppgifter
  if (username !== correctUsername) {
    setUsernameError('Fel användarnamn');
    setUsernameValid(false);
    return;
  } else {
    setUsernameValid(true);
  }

  if (password !== correctPassword) {
    setPasswordError('Fel lösenord');
    setPasswordValid(false);
    return;
  } else {
    setPasswordValid(true);
  }

  // Allt är korrekt – logga in
  localStorage.setItem('isLoggedIn', 'true');
  navigate('/admin');
};
// Sista grej att fixa med validering för användarnamn

  return (
    <section className="loggIn dark-theme">
      <section className="logg-section">
        <div className="sign-section">
          <form className="form" onSubmit={handleSubmit}>
            <p className="admin">Användarnamn</p>
            <input
              className={`input-box ${
                fieldErrors.username ? 'input-error' : usernameValid === true ? 'input-success' : ''
              }`}
              type="text"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            {usernameError && <p className="error-inlogg">{usernameError}</p>}

            <p className="admin">Lösenord</p>
            <input
              className={`input-box ${
                passwordValid === true
                  ? 'input-success'
                  : passwordValid === false
                  ? 'input-error'
                  : ''
              }`}
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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