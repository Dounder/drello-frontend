import { useQuery } from '@tanstack/vue-query';
import { api } from 'src/boot/axios';
import { ApiCollection } from 'src/shared/interfaces/api-response.interface';
import { GET_BOARDS } from '../data';
import { Board } from '../interfaces/board.interface';

const getBoards = async (limit = 30, offset = 0): Promise<Board[]> => {
  try {
    const { data } = await api.post<ApiCollection<Board>>('/graphql', {
      query: GET_BOARDS,
      variables: { limit, offset },
    });

    return data.data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const useBoards = () => {
  const boardsQuery = useQuery(['boards'], () => getBoards());

  return {
    //* Props
    boardsQuery,
    //! Getters
    //? Methods
  };
};

export default useBoards;
