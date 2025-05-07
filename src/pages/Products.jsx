import { Link } from 'react-router-dom';
import products from '../data/products';
import '../styles/Products.css'
import shopIcon from '../assets/shopIcon.svg';

 function Products() {


    
    return (
        <>
        <div className="products">
        <input type="serch" placeholder="sök" className='serch'></input>


        <select className="dropdown">
            <option value="">Sortera</option>
            <option value="dockor">Dockor</option>
            <option value="kläder">Kläder</option>
            <option value="tillbehör">Tillbehör</option>
        </select>


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