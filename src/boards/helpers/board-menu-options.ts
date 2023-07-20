interface BoardMenuOption {
  label: string;
  icon: string;
  routeName: string;
}

export const boardMenuOptions: BoardMenuOption[] = [
  { label: 'Boards', icon: 'developer_board', routeName: 'boards-page' },
];
