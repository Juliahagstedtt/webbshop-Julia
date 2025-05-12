import { Link } from 'react-router-dom';
import App from "../App"
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cartIcon.png';
import '../styles/Header.css';

// Headern
function Header() {
    return (
        <header className="header-meny">
            <nav>
                <Link to="/">
                <button className='logo'>
                     <img src={logo} alt="logo" className="logo" />
                </button>
                </Link>

            {/* <input type="serch" placeholder="sök" className='serch'></input> */}

                <Link to="/cart">
                <button className='cart'>
                    <img src={cartIcon} alt="cart-icon" className="cart-icon"/>
                </button>
                </Link>
            </nav>
        </header>
    );
}

export default Header;