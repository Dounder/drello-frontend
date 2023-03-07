import { useQuery } from '@tanstack/vue-query';
import { apiGql } from 'src/boot';

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
  const { data } = await apiGql.post('', { data: query });
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
