import { Link } from 'react-router-dom';
import products from '../data/products';
import '../styles/Products.css'
import shopIcon from '../assets/shopIcon.svg';

 function Products() {


    
    return (
        <>
        <div className="products">
            <h1>
                Välkommen till Produktsidan!</h1>
                <div className='products-container'>
                    <h3>Namn</h3> 
                    <p>199 kr</p> 
                    <button className='shop-icon'>
                        <img src={shopIcon} alt="shop-icon" className="shop-icon"/>
                    </button>
                </div>


                <div className='products-container'>
                    <h3>Namn</h3> 
                    <p>199 kr</p> 
                    <button className='shop-icon'>
                        <img src={shopIcon} alt="shop-icon" className="shop-icon"/>
                    </button>
                </div>

                <div className='products-container'>
                    <h3>Namn</h3> 
                    <p>199 kr</p> 
                    <button className='shop-icon'>
                        <img src={shopIcon} alt="shop-icon" className="shop-icon"/>
                    </button>
                </div>
                <div className='products-container'>
                    <h3>Namn</h3> 
                    <p>199 kr</p> 
                    <button className='shop-icon'>
                        <img src={shopIcon} alt="shop-icon" className="shop-icon"/>
                    </button>
                </div>
                <div className='products-container'>
                    <h3>Namn</h3> 
                    <p>199 kr</p> 
                    <button className='shop-icon'>
                        <img src={shopIcon} alt="shop-icon" className="shop-icon"/>
                    </button>
                </div>

        
        </div>
        </>
    );
 }

 export default Products;