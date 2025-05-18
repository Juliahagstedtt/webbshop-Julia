import { Navigate, Outlet } from 'react-router-dom';
import { useCartStore } from "../data/cartStore";

function PrivateRoute({ currentUser }) {
  return currentUser ? <Outlet /> : <Navigate to="/loggIn" />;
}

export default PrivateRoute;