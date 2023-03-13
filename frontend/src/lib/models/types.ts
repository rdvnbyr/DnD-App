export type SidebarMenuItems = {
  icon: string;
  label: string;
  path: string;
  subMenu?: SidebarMenuItems[];
  id: string;
};
