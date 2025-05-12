import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";
import { Link } from 'react-router-dom';
import '../styles/Products.css'
import shopIcon from '../assets/shopIcon.svg';
import { useStore } from 'zustand';

 function Products() {
    const [Products, setProducts] = useState([]);
    // const { assToCart } = useStore();

    useEffect(() => {
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map(doc => ({ 
            id: doc.id,
            ...doc.data()
        }));
        setProducts(productsArray);
        }
        fetchData();
    }, []);


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

            
            <h1>Välkommen till Produktsidan!</h1>
            {Products.map((product) => (
                
            <div key={product.id} className='products-container'>
                <h3>{product.name}</h3>
                <p>{product.price} kr</p>
                <img src={product.imageUrl} alt={product.description} width="200" />
                <button className='shop-icon'>
                    <img src={shopIcon} alt="shop-icon" className="shop-icon"/>
                </button>
            </div>
            ))}

        
        </div>
        </>
    );
 }

 export default Products;