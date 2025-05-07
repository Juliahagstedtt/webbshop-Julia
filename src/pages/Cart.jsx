import '../styles/Cart.css'
import { Link } from 'react-router';

function Cart() {
    return(
        <>
        <div className='cart-section'>
            <section>
        
        <div className='cart-items'>
            <p>Barbiedocka......79kr</p>
            <button className='increase'>+</button>
            <button className='decrease'>-</button>

        </div>


                <div className="cart-box">
                    <h3 className='total'>Totalt:</h3>
                </div>

                <Link to={"/"}>
                    <button className="continue">Fortsätt</button>
                </Link>

            </section>
        </div>
        </>
    )
}
export default Cart;