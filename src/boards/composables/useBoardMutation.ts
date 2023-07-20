import { api } from 'src/boot/axios';

import { ApiItem } from 'src/shared/interfaces/api-response.interface';
import { CREATE_BOARD } from '../data';
import { Board } from '../interfaces/board.interface';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

const createBoard = async (title: string): Promise<Board> => {
  const { data } = await api.post<ApiItem<Board>>('/graphql', {
    query: CREATE_BOARD,
    variables: { createBoardInput: { title } },
  });
  return data.data.item;
};

const useBoardMutation = () => {
  const queryClient = useQueryClient();

  const boardMutation = useMutation(createBoard, {
    onSuccess: (board) => {
      queryClient.invalidateQueries({ queryKey: ['boards'], exact: false });
      queryClient.refetchQueries({ queryKey: ['boards'], exact: false });
      queryClient.setQueryData(['board', board.id], board);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    //* Props
    boardMutation,
    //! Getters
    //? Methods
  };
};

export default useBoardMutation;
