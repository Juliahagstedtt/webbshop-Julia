import '../styles/Cart.css'
import { Link } from 'react-router';

function Cart() {
    return(
        <>
        <div>
            <h1>Cart sidan</h1>
            <section>
                <div className="cart-box">
                    <h3>Produkt:</h3>

                <Link to={"/Products"}>
                    <button className="continue">Fortsätt</button>
                </Link>

                </div>
            </section>
        </div>
        </>
    )
}
export default Cart;