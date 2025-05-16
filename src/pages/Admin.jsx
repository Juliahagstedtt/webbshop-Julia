import { useProductStore } from '../data/ProductStore';  
import { Link } from "react-router-dom";
import '../styles/Admin.css'
import TrashCan from '../assets/TrashCan.png';
import Edit from '../assets/Edit.png';
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
// import useProductStore from "../data/ProductStore"; 

// lOGGA UT? Local storage?
// TO DO! Validera ändra 

function Admin() {
    // Lista över produkter

  const [products, setProducts] = useState([]);

    
  console.log("Typ av products:", typeof products);
  console.log("Innehåll i products:", products)
    // Ursprunglig produktlista (används för återställning)
    const [originalProducts, setOriginalProducts] = useState([]);
    // Håller reda på vilken produkt som redigeras just nu
    const [editId, setEditId] = useState(null);
    // Innehåller de redigerade värdena för produktfält
    const [editValues, setEditValues] = useState({
      name: "", description: "", price: "", imageUrl: "", category: ""
    });
  
    // Hämtar alla produkter från Firestore när sidan laddas
    useEffect(() => {
      const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "products")); // hämtar dokument från "products"
        
        // Skapar en lista med produkter som inte är borttagna
        const productList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((product) => !product.isDeleted); // filtrerar/tar bort  "borttagna" produkter
  
        setProducts(productList);
        setOriginalProducts(productList);
      };
  
      fetchProducts(); 
    }, []);
  
    // När man klickar på papperskorg, markeras produkten som borttagen
    const handleRemove = async (id) => {
      try {
        const docRef = doc(db, "products", id); 
        await updateDoc(docRef, { isDeleted: true }); 
        // dubbelkolla så att de försvinner på firestore
  
        // Uppdaterar listan och tar bort produkten från vyn
        setProducts((prev) => prev.filter((product) => product.id !== id));
        console.log("Produkten har tagits bort.");
      } catch (error) {
        console.error("Fel vid borttagningen", error);
      }
    };
  
    // När man klickar på redigera-knappen så visas input-fält och spara kanpp
    const handleEditClick = (product) => {
      setEditId(product.id); // visar vilken produkt som redigeras
      setEditValues({ 
        name: product.name, 
        description: product.description, 
        price: product.price?.toString() || "",
        imageUrl: product.imageUrl,
        category: product.category || "" 
      });
    };
  
    // Uppdaterar inputfält när man skriver i dem
    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setEditValues(prev => ({
      ...prev,
      [name]: value 
      }));
    }
  
    // Sparar ändringar till firestore och uppdaterar listan
    const handleSave = async (id) => {
      const docRef = doc(db, "products", id); 
  
      // Uppdaterar värden i firestore
      const updateProduct = {
        name: editValues.name,
        description: editValues.description,
        price: Number(editValues.price),
        imageUrl: editValues.imageUrl || "",
        category: editValues.category
      };

      const newProduct = {
        name: nameInput,            
        price: Number(priceInput), 
        imageUrl: imageUrlInput,   
        description: descriptionInput || "",
      };

      await updateDoc(docRef, updateProduct);
  
      setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...editValues, price: Number(editValues.price) } : product
      )
    );

    setOriginalProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...editValues } : product
      )
    );
  
      setEditId(null); // avslutar redigeringsläge
    };
  
    // Återställer produkterna till original (t.ex. om man ångrat sig)
    const handleReset = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((product) => !product.isDeleted);
  
      setProducts(productList);
      setOriginalProducts(productList);
      setEditId(null); // avslutar redigering
    };
  console.log("products i Admin:", products);

    return (
      <div>
        {/* Knapp till admin-sidan */}
        <Link to={"/admin"}>
          <button className="admin-button">Ändra Produkt</button>
        </Link>
  
        {/* Knapp till lägga till en ny produkt sidan*/}
        <Link to={"/addnewproduct"}>
          <button className="admin-button">Lägg till Produkt</button>
        </Link>
  
        {/* Lista med produkter */}
        <div className="existing-p-list">
          {/* <button className="reset-button" onClick={handleReset}>Återställ Produkter</button>    */}
          <Link to={"/loggin"}>
            <button className="loggout-button">Logga ut</button>   
          </Link>
  
          {products.map((product) => (
            <div key={product.id} className="product-item" >
              {editId === product.id ? (
                // Vid redigering visas inputfält
                <>
                  <input 
                  name="name"  
                  value={editValues.name} 
                  placeholder='Namn'
                  onChange={handleInputChange}/>

                  <input 
                  name="category" 
                  value={editValues.category} 
                  placeholder='kategori'
                  onChange={handleInputChange} />


                  <input 
                  name="description"  
                  value={editValues.description} 
                  placeholder='beskrivning'
                  onChange={handleInputChange}/>

                  <input 
                  name="price"  
                  type="number"
                  placeholder='pris'
                  value={editValues.price} 
                  onChange={handleInputChange} />

                  <input 
                  type="text"
                  name="imageUrl"
                  placeholder='Bild_URL'
                  value={editValues.imageUrl} 
                  onChange={handleInputChange}
                />

                  <button className="add-button" onClick={() => handleSave(product.id)}>Spara</button>
                </>
              ) : (
                <>
                  <p>{product.name}</p>
                  <p className="category">{product.category}</p>                  
                  <p>{product.description}</p>
                  <p>{product.price} kr</p>


  
                  {/* Ta bort-produkt-knapp */}
                  <button className='trashcan' onClick={() => handleRemove(product.id)}>
                    <img src={TrashCan} alt="trashcan" className="trashcan" />
                  </button>
  
                  {/* Redigera-produkt-knapp */}
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