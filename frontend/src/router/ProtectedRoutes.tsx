import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../lib/hooks';

export function ProtectedRoutes() {
  const isAuthenticated = useAuth();
  const location = useLocation();
  return isAuthenticated ? (
    <DashboardLayout isAuthenticated={isAuthenticated}>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
