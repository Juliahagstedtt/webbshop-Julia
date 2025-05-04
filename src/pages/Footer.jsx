import '../styles/Footer.css';
import { Link } from 'react-router';

function Footer() {
    return(
        <>
        <div className="Footer">
        <p>© 2025 Barbie Toy Shop – Alla rättigheter förbehållna  Kontakt: barbietoys@mail.com</p>

        <Link to={"/loggIn"}>
            <button className='loggin'>
                Logga In
            </button>
        </Link>

        </div>
        </>
    );
}

export default Footer;