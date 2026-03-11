import { useEffect, useState } from 'react';
import { useCartStore } from '../data/cartStore';
import { supabase } from "../config/superbase";
import '../styles/Products.css'

function Products() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Fel vid hämtning:", error);
        return;
      }
      setProducts(data.filter(p => !p.isDeleted));
    };

    fetchData();
  }, []);

  // Sortering & sökning
  const filteredAndSortedProducts = [...products]
    .filter(p =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return (a.name || '').localeCompare(b.name || '');
        case "name-desc":
          return (b.name || '').localeCompare(a.name || '');
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <div className="products-section">
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
        <option value="name-asc">Namn A-Ö</option>
        <option value="name-desc">Namn Ö-A</option>
        <option value="price-asc">Pris lågt till högt</option>
        <option value="price-desc">Pris högt till lågt</option>
      </select>

      <h1 className='welcome-product'>Välkommen till Produktsidan!</h1>

      <div className='products'>
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className='products-container'>
            <h3>{product.name}</h3>
            <img
              className="product-img"
              src={product.imageUrl}
              alt={product.description}
              width="155"
              height="195"
            />
            <p>{product.description}</p>
            <p>{product.price} kr</p>

            <button
              className='shop-icon'
              onClick={() => addToCart(product)}
            >
              Lägg Till
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;