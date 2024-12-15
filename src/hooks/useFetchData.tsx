import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface QueryKeyProps {
   queryKey: [string, number];
}

const LIMIT_PER_PAGE = 5;

const fetchData = async ({ queryKey }: QueryKeyProps) => {
   const [_, page] = queryKey; // Desestrutura para obter a página atual de queryKey

   try {
      const response = await axios.get(
         `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT_PER_PAGE}`
      );
      const responseData = response.data;
      const totalCount = response.headers['x-total-count'];

      return { responseData, totalCount };
   } catch (err) {
      console.error('Erro ao buscar os dados.', err);
      throw err;
   }
};

export function useFetchData(currentPage: number) {
   const query = useQuery({
      queryKey: ['posts', currentPage],
      queryFn: fetchData,
      retry: 1, // nova solicitação automática quando há falha na query
   });

   return query;
}
