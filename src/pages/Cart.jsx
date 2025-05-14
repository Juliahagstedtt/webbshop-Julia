import '../styles/Cart.css'
import { Link } from 'react-router-dom'; 
import { useCartStore } from '../data/cartStore';

function Cart() {
    const cart = useCartStore((state) => state.cart) || [];
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return(
        <>
        {/* Påbörjad, To Do!! */}
        <div className='cart-section'>
            {cart.length === 0 ? (
                <p>Din varukorg är tom</p>
            ) : (
                cart.map((item) => (

               
        
        <div className='cart-items' key={item.id}>
            <p>{item.name}...........................{item.price} Kr</p>
            <button className='increase' onClick={() => addToCart(item)}>+</button>
            <button className='decrease' onClick={() => removeFromCart(item)}>-</button>
        </div>
                ))
            )}

                <div className="cart-box">
                    <h3 className='total'>Totalt: {total} kr</h3>
                </div>

                <Link to={"/order"}>
                    <button className="continue">Fortsätt</button>
                </Link>

        </div>
        </>
    );
}
export default Cart;