import { useEffect, useState } from "react";
import { fetchProducts } from "../config/firebase";
// Hämtar all data (produkterna) från firebase
function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, [])
    return (
       <div>
        <h2>Proudukter</h2>
        {products.map(product => (
            <div key={product.id}>
                <h3>{product.name}</h3>  
                <p>{product.price} kr</p>
                <img src={product.imageUrl} alt={product.name} width="200" />
            </div>
            ))}
        </div>
    )
}

export default ProductList;
