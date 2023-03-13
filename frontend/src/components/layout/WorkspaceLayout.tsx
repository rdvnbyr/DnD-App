import styled from 'styled-components';
import { SidebarMenuItems } from '../../lib/models';
import { SidebarLayout } from './aside/Sidebar';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  menuItems: SidebarMenuItems[];
}
export const WorkspaceLayout = ({ children, menuItems }: WorkspaceLayoutProps) => {
  return (
    <div className="container-fluid p-0 d-flex">
      <SidebarLayout menuItems={menuItems} />
      <StyledMain className=''>{children}</StyledMain>
    </div>
  );
};

const StyledMain = styled.main`
  /* background-color: #f5f5f5; */
  /* min-height: calc(100vh - 56px); */
  overflow-x: auto;
`;
