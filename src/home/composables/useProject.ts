import { api } from 'src/boot/api';
import { useQuery } from '@tanstack/vue-query';

const getProjects = async () => {
  const query = `{
  projects {
    id
    title
    createdAt
    client {
      name
    }
  }
}`;
  const { data } = await api.post('/graphql', { query });
  console.log(data);
  return data;
};

const useProject = () => {
  const projectsQuery = useQuery(['projects'], () => getProjects());

  return {
    projectsQuery,
  };
};

export default useProject;
