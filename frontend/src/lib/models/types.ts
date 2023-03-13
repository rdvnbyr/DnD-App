export type SidebarMenuItems = {
  icon: string;
  label: string;
  path: string;
  subMenu?: SidebarMenuItems[];
  id: string;
};

export type ColorEnum =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';
// and extend them!

export type ColorKeyEnum = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
