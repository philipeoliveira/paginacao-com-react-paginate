import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface QueryKeyProps {
   queryKey: [string, number];
}

interface Post {
   userId: number;
   id: number;
   title: string;
   body: string;
   [key: string]: string | number;
}

const LIMIT_PER_PAGE = 5;

const fetchData = async ({ queryKey }: QueryKeyProps) => {
   const [_, page] = queryKey; // Desestrutura para obter a página atual de queryKey

   try {
      const response = await axios.get(
         `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT_PER_PAGE}`
      );
      const responseData: Post[] = response.data;
      const totalCount: number = response.headers['x-total-count'];
      const totalPages: number = Math.ceil(totalCount / LIMIT_PER_PAGE);

      return { responseData, totalCount, totalPages };
   } catch (err) {
      console.error('Erro ao buscar os dados.', err);
      throw err;
   }
};

export function useFetchData(currentPage: number) {
   const query = useQuery({
      queryKey: ['posts', currentPage],
      queryFn: fetchData,
      retry: 1, // Nova solicitação automática quando há falha na query
      // Mantenha dados anteriores enquanto busca novos dados
      placeholderData: (prevData) =>
         prevData ?? { responseData: [], totalCount: 0, totalPages: 0 },
   });

   return query;
}
