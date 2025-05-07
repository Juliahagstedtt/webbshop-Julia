import '../styles/LoggIn.css';
import { useNavigate, Link } from 'react-router-dom';
import Joi from 'joi';

import { useState } from 'react';

function LoggIn() {

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(null);

  const correctPassword = 'Barbie';
  const navigate = useNavigate();


  const schema = Joi.object({
    password: Joi.string().min(4).required(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error: joiError } = schema.validate({ password });

    if (joiError) {
      setError('Minst 6 tecken');
      setIsValid(false);
      return;
    }

    if (password !== correctPassword) {
      setError('Fel lösenord');
      setIsValid(false);
      return;
    }

    // Login success
    setError('');
    setIsValid(true);
    login();

    navigate('/pages/admin'); 
  };

  return (
<section className="loggIn dark-theme">
    <section className='logg-section'>
      <div className='sign-section'>
        <section className='form'>
          <p className='admin'>Användarnamn</p>
          <input
            className={`input-box ${isValid === true ? 'input-success' : isValid === false ? 'input-error' : ''}`}
            type="Name"
            placeholder="Användarnamn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
          {error && <p className="error-inlogg">{error}</p>}

          <p className='admin'>Lösenord</p>
          <input
            className={`input-box ${isValid === true ? 'input-success' : isValid === false ? 'input-error' : ''}`}
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
          {error && <p className="error-inlogg">{error}</p>}

          <form onSubmit={handleSubmit}>
             <button className="continue">Logga In</button>
          </form>

          <Link to={"/admin"}>
            <button className="admin-loggin">Logga in
            </button>
          </Link> 
        
        </section>
      </div>
    </section>
</section>
  );
}


export default LoggIn;