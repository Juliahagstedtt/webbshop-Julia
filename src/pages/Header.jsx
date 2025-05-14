import { Link } from 'react-router-dom';
import App from "../App"
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cartIcon.png';
import '../styles/Header.css';
import { useCartStore } from '../data/cartStore';


// Headern
function Header() {
const cartItems = useCartStore((state) => state.items);
const cartCount = (cartItems || []).reduce((acc, item) => acc + item.quantity, 0);
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
                    {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
                </button>
                </Link>
            </nav>
        </header>
    );
}

export default Header;