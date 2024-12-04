import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <div className="align-element">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;
