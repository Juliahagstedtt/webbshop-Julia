import { Link } from "react-router-dom";
import '../styles/Admin.css'
import TrashCan from '../assets/TrashCan.png';
import Edit from '../assets/Edit.png';
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";


function Admin() {

const [products, setProducts] = useState([]);

useEffect(() => {
    const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setProducts(productList);
    };
    fetchProducts();
}, []);

const handleRemove = (id) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  };

    return(
        <>
        <div>
        <Link to={"/admin"}>
            <button className="admin-button"> Ändra Produkt
            </button>
        </Link>            
        
        <Link to={"/addnewproduct"}>
            <button className="admin-button"> Lägg till Produkt
            </button>
        </Link> 



        <div className="existing-p-list">
            {products.map((product) => (
                <div key={product.id} className="product-item">
                    <p className="product-name">{product.name}</p>
                    <p>{product.description} - {product.price} kr</p>        

                <button className='trashcan' onClick={() => handleRemove(product.id)}>
                    <img src={TrashCan} alt="trashcan" className="trashcan"/>
                </button>

                <button className='edit'>
                    <img src={Edit} alt="edit" className="edit"/>
                </button>
               </div> 
                 ))}
            </div>
        </div>
        <button>Återställ Produkter</button>
        <button>Förnya produkter</button>
        </>
    );
}

export default Admin;    