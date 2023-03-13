import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { MainLayout } from '../components/layout/MainLayout';

export function PublicRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <MainLayout isAuthenticated={isAuthenticated}>
      <Outlet />
    </MainLayout>
  );
}
