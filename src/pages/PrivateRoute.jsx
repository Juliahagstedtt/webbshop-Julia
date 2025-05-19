import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ currentUser }) {
  if (currentUser === null) {
    return <div>Loading...</div>; 
  }

  return currentUser ? <Outlet /> : <Navigate to="/loggIn" />;
}

export default PrivateRoute;