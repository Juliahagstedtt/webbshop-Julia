import '../styles/Footer.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import inlogg from '../assets/inlogg.png';


function Footer() {
      const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');


    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);
        return() => window.removeEventListener('storage', handleStorageChange);

    }, [])

    return(
        <>
        <div className="Footer">
            <p>© 2025 Barbie Toy Shop – Alla rättigheter förbehållna.  Kontakt: barbietoys@mail.com</p>

            <Link to={isLoggedIn ? "/admin" : "/loggIn"}>
                <button className='loggin'>
                    <img src={inlogg} alt="inlogg" className="inlogg" />            
                </button>
            </Link>
        </div>
        </>
    );
}

export default Footer;