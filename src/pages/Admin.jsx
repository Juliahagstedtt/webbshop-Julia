import { Link } from "react-router-dom";
import '../styles/Admin.css'
import TrashCan from '../assets/TrashCan.png';
import Edit from '../assets/Edit.png';
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";
import { doc, updateDoc } from 'firebase/firestore';



function Admin() {
const [products, setProducts] = useState([]);
const [editId, setEditId] = useState(null);
const [editValues, setEditValues] = useState({ name: "", description: "", price: ""});

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

const handleEditClick = (product) => {
    setEditId(product.id);
    setEditValues({ name: product.name, description: product.description, price: product.price });
};

const handleInputChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
}

const handleSave = async (id) => {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
        name: editValues.name,
        description: editValues.description,
        price: editValues.price,
    });

    setProducts((prev) => 
    prev.map((product) => 
    product.id === id ? { ...product, ...editValues } : product
    )
    );
    setEditId(null);
};

return (
    <div>
      <Link to={"/admin"}>
        <button className="admin-button">Ändra Produkt</button>
      </Link>

      <Link to={"/addnewproduct"}>
        <button className="admin-button">Lägg till Produkt</button>
      </Link>

      <div className="existing-p-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            {editId === product.id ? (
              <>
                <input name="name" value={editValues.name} onChange={handleInputChange} />
                <input name="description" value={editValues.description} onChange={handleInputChange} />
                <input name="price" value={editValues.price} onChange={handleInputChange} />
                <button className="add-button" onClick={() => handleSave(product.id)}>Spara</button>
              </>
            ) : (
              <>
                <p>{product.name}</p>
                <p>{product.description} - {product.price} kr</p>

                <button className='trashcan' onClick={() => handleRemove(product.id)}>
                  <img src={TrashCan} alt="trashcan" className="trashcan" />
                </button>

                <button className='edit' onClick={() => handleEditClick(product)}>
                  <img src={Edit} alt="edit" className="edit" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;    