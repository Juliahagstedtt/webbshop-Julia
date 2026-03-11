import { useProductStore } from '../data/ProductStore';
import { useNavigate, Link } from "react-router-dom";
import '../styles/Admin.css';
import TrashCan from '../assets/TrashCan.png';
import Edit from '../assets/Edit.png';
import { useState, useEffect } from "react";
import { supabase } from "../config/superbase";
import { fetchProducts, deleteProduct, updateProduct } from "../data/products.js";

function Admin() {
  const [isLoggedInState, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "", description: "", price: "", imageUrl: "", category: ""
  });

  useEffect(() => {
    const checkLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(checkLogin);
    if (!checkLogin) {
      navigate('/loggIn');
      return;
    }

    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Fel vid hämtning av produkter:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [navigate]);

  const handleRemove = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      console.error("Fel vid borttagning:", err);
    }
  };

  const handleEditClick = (product) => {
    setEditId(product.id);
    setEditValues({
      name: product.name,
      description: product.description,
      price: product.price?.toString() || "",
      imageUrl: product.imageUrl,
      category: product.category || ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    const { name, description, price, imageUrl, category } = editValues;
    const newErrors = {};

    if (!name) newErrors.name = "Namn måste fyllas i.";
    if (!description) newErrors.description = "Beskrivning saknas.";
    if (!price) newErrors.price = "Pris saknas.";
    if (!imageUrl) newErrors.imageUrl = "Bild-URL saknas.";
    if (!category) newErrors.category = "Kategori saknas.";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setError({});

    try {
      // Spara i Supabase
      await updateProduct(id, {
        name,
        description,
        price: Number(price),
        imageUrl,
        category
      });

      // Uppdatera lokalt
      setProducts(prev =>
        prev.map(product =>
          product.id === id ? { ...product, ...editValues, price: Number(price) } : product
        )
      );

      setEditId(null);
    } catch (err) {
      console.error("Fel vid uppdatering:", err);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/loggIn');
  };

  if (!isLoggedInState) {
    navigate('/loggIn');
    return null;
  }

  if (loading) return <p>Laddar produkter...</p>;

  // Filtrera & sortera produkter
  const filteredAndSortedProducts = [...products]
    .filter(product =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc": return (a?.name || '').localeCompare(b?.name || '');
        case "name-desc": return (b?.name || '').localeCompare(a?.name || '');
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        default: return 0;
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
        <input
          type="search"
          placeholder="Sök efter produkt..."
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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

      <div className="logg-admin-section">
        <button className="loggout-button" onClick={handleLogout}>Logga ut</button>
      </div>

      <div className="existing-p-list">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="product-item">
            {editId === product.id ? (
              <div className="edit-inputs">
                <input
                  className="admin-input"
                  name="name"
                  value={editValues.name}
                  placeholder='Namn'
                  onChange={handleInputChange} />
                {error.name && <p className="error">{error.name}</p>}

                <select
                  className="select-adminpage"
                  name="category"
                  value={editValues.category}
                  onChange={handleInputChange}
                >
                  <option value="">Välj kategori</option>
                  <option value="Dockor">Dockor</option>
                  <option value="Kläder & Accessoarer">Kläder & Accessoarer</option>
                  <option value="Barbie Livsstil">Barbie Livsstil</option>
                </select>
                {error.category && <p className="error">{error.category}</p>}

                <input
                  className="admin-input"
                  name="description"
                  value={editValues.description}
                  placeholder='Beskrivning'
                  onChange={handleInputChange} />
                {error.description && <p className="error">{error.description}</p>}

                <input
                  className="admin-input"
                  name="price"
                  type="number"
                  value={editValues.price}
                  placeholder='Pris'
                  onChange={handleInputChange} />
                {error.price && <p className="error">{error.price}</p>}

                <input
                  className="admin-input"
                  name="imageUrl"
                  type="text"
                  value={editValues.imageUrl}
                  placeholder='Bild-URL'
                  onChange={handleInputChange} />
                {error.imageUrl && <p className="error">{error.imageUrl}</p>}

                <button className="add-button" onClick={() => handleSave(product.id)}>Spara</button>
              </div>
            ) : (
              <>
                <p>{product.name}</p>
                <p className="category">{product.category}</p>
                <p>{product.description}</p>
                <p>{product.price} kr</p>

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