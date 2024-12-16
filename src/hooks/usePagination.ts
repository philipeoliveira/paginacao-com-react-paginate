import { useState } from 'react';
import { useFetchData } from './useFetchData';

export function usePagination() {
   const [currentPage, setCurrentPage] = useState(1);

   const { data } = useFetchData(currentPage);

   const totalPages = typeof data?.totalPages === 'number' ? data?.totalPages : 0;
   const isActiveNextButton = currentPage === totalPages;
   const isActivePrevButton = currentPage === 1;

   function handlePageClick({ selected }: { selected: number }) {
      setCurrentPage(selected + 1);
   }

   return {
      currentPage,
      totalPages,
      isActiveNextButton,
      isActivePrevButton,
      handlePageClick,
   };
}
