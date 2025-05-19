import { useProductStore } from '../data/ProductStore';  
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../styles/Admin.css'
import TrashCan from '../assets/TrashCan.png';
import Edit from '../assets/Edit.png';
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Joi from 'joi';

function Admin() {
const [isLoggedInState, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  
  console.log("Typ av products:", typeof products);
  console.log("Innehåll i products:", products)

    const [originalProducts, setOriginalProducts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editValues, setEditValues] = useState({
      name: "", description: "", price: "", imageUrl: "", category: ""
    });
  
    // Hämtar alla produkter från Firestore när sidan laddas
    useEffect(() => {
      const checkLogin = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(checkLogin);

      if (!checkLogin) {
        navigate('/loggIn');
      }

      const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((product) => !product.isDeleted);
        setProducts(productList);
        setOriginalProducts(productList);
      };

      fetchProducts().finally(() => setLoading(false)); // markera klar
    }, [navigate]);

  
    const handleRemove = async (id) => {
      try {
        const docRef = doc(db, "products", id); 
        await deleteDoc(docRef);
  
        setProducts((prev) => prev.filter((product) => product.id !== id));
        console.log("Produkten har tagits bort.");
      } catch (error) {
        console.error("Fel vid borttagningen", error);
      }
    };
  
    // När man klickar på redigera-knappen så visas input-fält och spara knapp
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

    
    // Sparar ändringar till firestore och uppdatera listan
    const handleSave = async (id) => {
        const { name, description, price, imageUrl, category } = editValues;

    const newErrors = {};
        if (!name) newErrors.name = "Namn måste fyllas i.";
        if (!description || description.length < 5) newErrors.description = "Beskrivning måste vara minst 5 tecken.";
        if (!price || Number(price) <= 0) newErrors.price = "Pris måste vara ett heltal.";
        if (!imageUrl || !imageUrl.startsWith("http")) newErrors.imageUrl = "Ogiltig länk, måste inehålla http.";
        if (!category) newErrors.category = "Kategori saknas.";
        if (Object.keys(newErrors).length > 0) {
          setError(newErrors);
          return;
        }

    setError({});

      const docRef = doc(db, "products", id); 

      const updateProduct = {
        name,
        description,
        price: Number(price),
        imageUrl,
        category,
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
  

    const handleLogin = (e) => {
      e.preventDefault();

      if (userName === 'admin' && password === 'admin') {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/admin'); 
      } else {
        setError('Fel användare eller lösenord');
      }
    };

    const handleLogout = () => {
      localStorage.setItem('isLoggedIn', 'false');
      // setIsLoggedIn(false);
      navigate('/loggIn');
    };
    if (!isLoggedInState) {
      navigate('/loggIn');
      return null;
    }
    if (loading) return null;



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
      <div>
          <Link to={"/admin"}>
            <button className="admin-button">Ändra Produkt</button>
         </Link>
  
           <Link to={"/addnewproduct"}>
            <button className="admin-button">Lägg till Produkt</button>
          </Link>

          <div className="admin-filters">
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
        </div>
        
        {/* Kommenterad logga ut knapp */}
            <div className="logg-admin-section">
            <button 
            className="loggout-button" 
            onClick={handleLogout}>Logga ut</button>
            </div>

        {/* Lista med produkter */}
        <div className="existing-p-list">
  
          {filteredAndSortedProducts.map((product) => (
            <div key={product.id} className="product-item" >
              {editId === product.id ? (
                // Vid redigering visas inputfält
                <>
        <div className="edit-inputs">
                  <input className="admin-input"
                  name="name"  
                  value={editValues.name} 
                  placeholder='Namn'
                  onChange={handleInputChange}/>
                {error.name && <p className="error">{error.name}</p>}

                    <select className="select-adminpage"
                      id="category"
                      value={editValues.category}
                      onChange={handleInputChange}
                      name="category"
                    >
                      <option value="">Välj kategori</option>
                      <option value="Dockor">Dockor</option>
                      <option value="Kläder & Accessoarer">Kläder & Accessoarer</option>
                      <option value="Barbie Livsstil">Barbie Livsstil</option>
                    </select>
                {error.category && <p className="error">{error.category}</p>}

                  <input className="admin-input"
                  name="description"  
                  value={editValues.description} 
                  placeholder='beskrivning'
                  onChange={handleInputChange}/>
              {error.description && <p className="error">{error.description}</p>}


                  <input className="admin-input"
                  name="price"  
                  type="number"
                  placeholder='pris'
                  value={editValues.price} 
                  onChange={handleInputChange} />
              {error.price && <p className="error">{error.price}</p>}

                  <input className="admin-input"
                  type="text"
                  name="imageUrl"
                  placeholder='Bild_URL'
                  value={editValues.imageUrl} 
                  onChange={handleInputChange}
                />
              {error.imageUrl && <p className="error">{error.imageUrl}</p>}


                  <button className="add-button" onClick={() => handleSave(product.id)}>Spara</button>
            </div>
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