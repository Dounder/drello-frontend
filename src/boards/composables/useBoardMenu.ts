import { ref } from 'vue';
const useBoardMenu = () => {
  const breakpoint = 1180;

  const showMenu = ref(window.innerWidth >= breakpoint); // Show menu if screen is bigger than breakpoint
  const drawerOpen = ref(false); // Drawer is closed by default
  const showDrawerButton = ref(window.innerWidth < breakpoint); // Show drawer button if screen is smaller than breakpoint

  return {
    //* Props
    breakpoint,
    showMenu,
    drawerOpen,
    showDrawerButton,

    //? Methods
    toggleDrawer: () => {
      drawerOpen.value = !drawerOpen.value;
    },
  };
};

export default useBoardMenu;
