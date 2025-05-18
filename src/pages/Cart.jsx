import '../styles/Cart.css'
import { Link, useNavigate } from 'react-router-dom'; 
import { useCartStore } from '../data/cartStore';

function Cart() {
    const cart = useCartStore((state) => state.items) || [];
    const addToCart = useCartStore((state) => state.addToCart);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

    const removeFromCart = useCartStore((state) => state.removeFromCart);
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    const clearCart = useCartStore((state) => state.clearCart);
    const navigate = useNavigate();

    const handleOrder = () => {
        clearCart();
        navigate('/order');

    };

    return(
        <>

        {/* Påbörjad, To Do!! */}
        <div className='cart-section'>
            {cart.length === 0 ? (
                <p className='cart-text'>Din varukorg är tom</p>
            ) : (
                cart.map((item) => (

               
        
        <div className='cart-items' key={item.id}>
            <div className="cart-name">{item.name}</div>

        <div className="In-De-wrapper">
            <button 
            className='decrease' 
            onClick={() => {
            console.log("Klickade minska för:", item.id);
                decreaseQuantity(item.id);
            }}>-</button>             
            <p>{item.quantity} st</p>
            <button 
            className='increase' 
            onClick={() => {
            console.log("Tryckte + på:", item); 
            addToCart(item);}}
            >+</button>
        </div>
           
        <div className="price-quantity"> <p>{item.price * item.quantity}kr</p> </div>
        </div>
                ))
            )}

                <div className="cart-box">
                    <h3 className='total'>Totalt: {total} kr</h3>
                </div>

                <button className="order"   onClick={() => {
                handleOrder();
                console.log("Beställning har skickats!") }}
                >Beställ</button>

        </div>
        <div className="back">
        <Link to={"/Products"}>
            <button className="back-button">Tillbaka
            </button>
        </Link> 
        </div>
        </>
    );
}
export default Cart;