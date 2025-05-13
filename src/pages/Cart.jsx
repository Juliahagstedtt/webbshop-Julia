import '../styles/Cart.css'
import { Link } from 'react-router';

function Cart() {
    return(
        <>
        {/* Påbörjad, To Do!! */}
        <div className='cart-section'>
        
        <div className='cart-items'>
            <p>Titel...................................... kr</p>
            <button className='increase'>+</button>
            <button className='decrease'>-</button>

        </div>


                <div className="cart-box">
                    <h3 className='total'>Totalt:</h3>
                </div>

                <Link to={"/"}>
                    <button className="continue">Fortsätt</button>
                </Link>

        </div>
        </>
    )
}
export default Cart;