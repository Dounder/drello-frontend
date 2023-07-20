export const GET_BOARDS = `query Boards($limit: Int, $offset: Int) {
  items: boards(offset: $offset, limit: $limit) {
    createdAt
    createdBy {
      username
    }
    deletedAt
    id
    title
    updateAt
  }
}`;

export const CREATE_BOARD = `mutation CreateBoard($createBoardInput: CreateBoardInput!) {
  item: createBoard(createBoardInput: $createBoardInput) {
    createdAt
    createdBy {
      username
    }
    deletedAt
    id
    title
    updateAt
  }
}`;
