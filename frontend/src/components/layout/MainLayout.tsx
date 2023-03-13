import { Footer } from './Footer';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}
export const MainLayout = ({ children, isAuthenticated }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <Header isAuthenticated={isAuthenticated} />
      <main className="main-layout-content">{children}</main>
      <Footer />
    </div>
  );
};
