import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import inlogg from '../assets/inlogg.png';


function Footer() {
    return(
        <>
        <div className="Footer">
            <p>© 2025 Barbie Toy Shop – Alla rättigheter förbehållna  Kontakt: barbietoys@mail.com</p>

            <Link to={"/loggIn"}>
                <button className='loggin'>
                    <img src={inlogg} alt="inlogg" className="inlogg" />            
                </button>
            </Link>
        </div>
        </>
    );
}

export default Footer;