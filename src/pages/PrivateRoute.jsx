import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ currentUser }) {
  if (currentUser === null) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      return <Outlet />;
    } else {
      return <Navigate to="/loggIn" />;
    }
  }

  return currentUser ? <Outlet /> : <Navigate to="/loggIn" />;
}

export default PrivateRoute;