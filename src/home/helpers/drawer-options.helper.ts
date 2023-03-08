interface DrawerOption {
  icon: string;
  name: string;
  path: string;
}

export const drawerOptions: DrawerOption[] = [
  { icon: 'o_dashboard', name: 'Projects', path: 'projects-page' },
  { icon: 'o_contacts', name: 'Clients', path: 'clients-page' },
  { icon: 'o_groups', name: 'Users', path: 'users-page' },
];
