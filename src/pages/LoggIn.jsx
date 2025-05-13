import '../styles/LoggIn.css';
import { useNavigate, Link } from 'react-router-dom';
import Joi from 'joi';
import { useState } from 'react';

function LoggIn() {

  // State för att hålla reda på användarnamn och lösenord
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // State för att hantera felmeddelanden
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(null);

  // Rätt inloggnings uppgifter för inlogg (Inte klar än!)
  const correctUsername = 'David'
  const correctPassword = 'Barbie';
  const navigate = useNavigate();

  // Validering för lösenord och användarnamn
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(4).required(),
  });

  // Funktion för när användaren klickar på Logga in
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validerar lösenordet enligt Joi-schema
    const { error: joiError } = schema.validate({ password });
    

    // Om valideringen misslyckas är de för att lösenordet är för kort
    if (joiError) {
      setError('Minst 4 tecken');  // felmeddelande
      setIsValid(false);  // Anger att inloggningen är ogiltig
      return;
    }

    // Om lösenordet är fel
    if (password !== correctPassword) {
      setError('Fel lösenord');    // Sätt felmeddelande för fel lösenord
      setIsValid(false);  // Ange att inloggningen är ogiltig
      return;
    }

    // Om lösenordet är korrekt – logga in användaren
    setError('');  // Ta bort eventuella felmeddelanden
    setIsValid(true);  // Sätt statusen till giltig inloggning
    navigate('/pages/admin');  // Skicka användaren till admin-sidan
  };

  return (
    <section className="loggIn dark-theme">
      <section className='logg-section'>
        <div className='sign-section'>
          <section className='form'>
            <p className='admin'>Användarnamn</p>
            <input
              className={`input-box ${isValid === true ? 'input-success' : isValid === false ? 'input-error' : ''}`} 
              type="text"  // Användarnamn är textfält
              placeholder="Användarnamn"
              value={name}  // Håller reda på användarens inmatade namn
              onChange={(e) => setName(e.target.value)}
            />
               {error && <p className="error-inlogg">{error}</p>}  


            <p className='admin'>Lösenord</p>
            <input
              className={`input-box ${isValid === true ? 'input-success' : isValid === false ? 'input-error' : ''}`} 
              type="password"  // Lösenord är dold
              placeholder="Lösenord"
              value={password}  
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error-inlogg">{error}</p>}  
            {/* // Om ett fel finns, visas felmeddelandet */}

            <form onSubmit={handleSubmit}>
              <button className="continue">Logga In</button>  
            </form>

            {/* Tillfällig logga in-knapp tills jag fixat klar Inlogg, To Do! Inte klar än */}
            <Link to={"/admin"}>
              <button className="admin-loggin">Logga in</button>
            </Link>
          
          </section>
        </div>
      </section>
    </section>
  );
}

export default LoggIn;