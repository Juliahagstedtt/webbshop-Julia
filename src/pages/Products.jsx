import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase"; 
import { Link } from 'react-router-dom';
import '../styles/Products.css'
import shopIcon from '../assets/shopIcon.svg';
import { useStore } from 'zustand';
import { useCartStore } from '../data/cartStore';


function Products() {
    const [products, setProducts] = useState([]);
    const [counter, setCounter] = useState({});
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const totalItems = useCartStore((state) =>
            state.items.reduce((sum, item) => sum + item.quantity, 0)
        );
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        //Asynkron funktion, väntar på att hämta data från internet.
        async function fetchData() {
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

    
    const handleAddToCart = (product) => {
    setCounter(prev => ({
        ...prev,
        [product.id]: (prev[product.id] || 0) + 1
    }));
    addToCart(product);
    console.log(`${product.name || "Okänd produkt"} har lagts till i varukorgen.`);
};   

    const filteredAndSortedProducts = [...products]
        .filter(product => 
        (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.category?.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            switch (sortOption) {
                case "name-asc":
                    return (a?.name || '').localeCompare(b?.name || '');
                case "name-desc":
                    return (b?.name || '').localeCompare(a?.name || '');                
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        
    return (
        <>
        <div className="products-section">
            {/* Sökfält för produkter*/}
            <input 
                type="search" 
                placeholder="Sök efter produkt..." 
                className="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Dropdown för att sortera produkter*/}
            <select
                className="dropdown"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="">Sortera</option>
                <option value="name-asc">Namn A-Ö </option>
                <option value="name-desc">Namn Ö-A</option>
                <option value="price-asc">Pris lågt till högt</option>
                <option value="price-desc">Pris högt till lågt</option>
            </select>

            <h1 className='welcome-product'>Välkommen till Produktsidan!</h1>
        <div className='products'>
            {/* Renderar varje produkt */}
            {filteredAndSortedProducts.map((product) => (
                <div key={product.id} className='products-container'>
                    <h3>{product.name}</h3>
                    <img className="product-img" src={product.imageUrl} alt={product.description} width="140" height="155" />
                    <p>{product.description}</p>
                    <p>{product.price} kr</p>
                    
                    {/* Knapp för att lägga till i varukorg */}
                    <button 
                    className='shop-icon' 
                    onClick={() => handleAddToCart(product)}
                    >
                    Lägg Till
                    </button>
                    </div>
               
            ))}
             </div>
        </div>
        </>
    );
}

export default Products;