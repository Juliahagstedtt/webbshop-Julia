import PrivateRoute from "./pages/PrivateRoute";
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './pages/Header'
import Products from './pages/Products'
import Cart from './pages/Cart';
import Home from './pages/Home';
import Footer from './pages/Footer';
import LoggIn from './pages/LoggIn';
import Admin from './pages/Admin';
import AddNewProduct from './pages/AddNewProduct';
import { fetchProducts } from './config/firebase';
import ProductList from "./pages/ProductList";
import Order from './pages/Order';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    setCurrentUser({ username: 'admin' }); 
  } else {
    setCurrentUser(null);
  }
}, []);

  return (
    <>
      <div className="page-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Products' element={<Products />} />
            <Route path="/loggIn" element={<LoggIn />} />


        <Route element={<PrivateRoute currentUser={currentUser} />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/addnewproduct' element={<AddNewProduct />} />
        </Route> 


            <Route path='/order' element={<Order />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
