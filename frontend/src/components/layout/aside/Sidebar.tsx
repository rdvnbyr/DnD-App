import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { SidebarMenuItems } from '../../../lib/models';
import { _uuidByLength } from '../../../lib/utils';

const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.873 3h14.254a1 1 0 0 1 .809.412l3.823 5.256a.5.5 0 0 1-.037.633L12.367 21.602a.5.5 0 0 1-.734 0L.278 9.302a.5.5 0 0 1-.037-.634l3.823-5.256A1 1 0 0 1 4.873 3z"></path>
  </svg>
);
interface SidebarLayoutProps {
  menuItems: SidebarMenuItems[];
}
function SidebarLayout({ menuItems }: SidebarLayoutProps) {
  const params = useParams();
  const navigate = useNavigate();
  // const { collapseSidebar } = useProSidebar();
  const navigateMenuHandler = (path: string) => navigate(path);

  return (
    <Sidebar
      rootStyles={{
        color: 'black',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      {/*       <header className="p-2 text-start">
        <button className="btn btn-sm btn-dark" onClick={() => collapseSidebar()}>
          toggle
        </button>
      </header> */}
      <Menu>
        <MenuItem onClick={() => navigateMenuHandler(`/ws/${params.wsId}`)}>Dashboard</MenuItem>
      </Menu>
      <Menu>
        <MenuItem>Your Workspace</MenuItem>
        {menuItems.map((item) => (
          <MenuItem
            icon={<Icon />}
            key={_uuidByLength('sidebar-item-', 8)}
            onClick={() => navigateMenuHandler(item.path)}
            style={{
              backgroundColor: params.boardId === item.id ? 'lightgray' : 'white',
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
}

export { SidebarLayout };
