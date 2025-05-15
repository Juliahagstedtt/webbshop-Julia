import { Link } from 'react-router-dom'; 
import '../styles/Order.css'


function Order() {

    return(
    <>
    <div className='Order'>
        <h2>Tack för din beställning!</h2>
        
    <Link to={"/"}>
        <button className="continue">Fortsätt</button>
    </Link>   
    </div>
    </>
    )
}
export default Order;