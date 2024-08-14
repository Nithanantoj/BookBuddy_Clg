import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ roles, restrictedPath }) => {
  const token = useSelector((state) => state.user.token);
  const userRole = useSelector((state) => state.user.role);
  console.log(token)

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (restrictedPath && userRole === 'Incharge') {
    return <Navigate to="/" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
