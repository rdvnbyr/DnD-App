import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuth } from '../lib/hooks';

export function AuthRoutes() {
  const isAuthenticated = useAuth();
  const location = useLocation();
  return isAuthenticated ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <MainLayout isAuthenticated={isAuthenticated}>
      <Outlet />
    </MainLayout>
  );
}
