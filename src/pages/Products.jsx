import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase"; 
import { Link } from 'react-router-dom';
import '../styles/Products.css'
import shopIcon from '../assets/shopIcon.svg';
// import useProductStore from "../data/ProductStore"; 
import { useStore } from 'zustand';

function Products() {
    // state variabel. Börjar som en tom lista, men kommer snart innehålla alla produkter från databasen.
    // "setProducts" används för att uppdatera innehållet i Products
    const [Products, setProducts] = useState([]);

    // useEffect körs automatiskt EN gång när sidan laddas
    // Här används den för att hämta produktdata från Firestore
    useEffect(() => {
        // En asynkron funktion, väntar på att hämta data från internet.
        async function fetchData() {
            // Firebase hämtar ALLA dokument från samlingen som heter "products". Alla produkter som har sparats i firestore
            const querySnapshot = await getDocs(collection(db, "products"));

            const productsArray = querySnapshot.docs.map(doc => ({ 
                id: doc.id,         // Sparar ID:t för produkten
                ...doc.data()       // Sprider ut all annan information som finns i produkten (t.ex. namn, pris, bild)
            }));

            // Nu sparas listan med produkter i state-variabel, så att de kan visas på sidan
            setProducts(productsArray);
        }

        // Här körs funktionen, så att datan verkligen hämtas när sidan laddas.
        fetchData();
    }, []); // Tom array 


    return (
        <>
        <div className="products">
            {/* Sökfält för produkter, (To Do! Inte gjord än)*/}
            <input type="serch" placeholder="sök" className='serch'></input>

            {/* Dropdown för att sortera produkter (To do! Inte gjord än) */}
            <select className="dropdown">
                <option value="">Sortera</option>
                <option value="dockor">Dockor</option>
                <option value="kläder">Kläder & Accessoarer</option>
                <option value="tillbehör">Barbie Livsstil</option>
            </select>

            <h1>Välkommen till Produktsidan!</h1>

            {/* Renderar varje produkt */}
            {Products.map((product) => (
                <div key={product.id} className='products-container'>
                    <h3>{product.name}</h3>
                    <p>{product.price} kr</p>
                    <img src={product.imageUrl} alt={product.description} width="200" />
                    
                    {/* Knapp för att lägga till i varukorg */}
                    <button className='shop-icon'>
                        <img 
                            src={shopIcon} 
                            alt="shop-icon" 
                            className="shop-icon" 
                            onClick={() => addToCart(product)} // To Do: addToCart inte gjord än
                        />
                    </button>
                </div>
            ))}
        </div>
        </>
    );
}

export default Products;