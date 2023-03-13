import styled from 'styled-components';
import { Header } from './Header';
import { ToastContainer, toast } from 'react-toastify';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}
export const DashboardLayout = ({ children, isAuthenticated }: DashboardLayoutProps) => {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <StyledMain>{children}</StyledMain>
      <ToastContainer />
    </>
  );
};

const StyledMain = styled.main`
  /* background-color: #f5f5f5; */
  min-height: calc(100vh - 56px);
  overflow-x: hidden;
`;
