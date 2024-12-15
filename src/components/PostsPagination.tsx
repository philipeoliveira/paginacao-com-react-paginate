import { twMerge } from 'tailwind-merge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import ReactPaginate from 'react-paginate';
import { usePagination } from '../hooks/usePagination';
import { useFetchData } from '../hooks/useFetchData';

import { Table } from './table/Table';
import { TableHeader } from './table/TableHeader';
import { TableCell } from './table/TableCell';
import { TableRow } from './table/TableRow';

export function PostsPagination() {
   const buttonStyles =
      'flex items-center justify-center gap-1 border border-zinc-950 text-zinc-950 rounded-lg h-9 px-3';

   const {
      currentPage,
      totalPages,
      isActiveNextButton,
      isActivePrevButton,
      handlePageClick,
   } = usePagination();

   const { data, isLoading, isError, error } = useFetchData(currentPage);

   if (isLoading) return <p className='text-center'>Carregando...</p>;
   if (isError) {
      console.log(`Erro: ${error.message}`);
      return (
         <div className='text-center'>
            <p>Não foi possível se conectar com a API.</p>
            <p>Tente novamente mais tarde.</p>
         </div>
      );
   }

   return (
      <>
         <Table>
            <thead>
               <TableRow>
                  <TableHeader>Código</TableHeader>
                  <TableHeader>Título</TableHeader>
                  <TableHeader otherClasses='max-sm:hidden'>Texto</TableHeader>
               </TableRow>
            </thead>
            <tbody>
               {data?.responseData.map((item) => {
                  return (
                     <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell otherClasses='max-sm:hidden'>{item.body}</TableCell>
                     </TableRow>
                  );
               })}
            </tbody>
            <tfoot>
               <tr>
                  <TableCell colSpan={3} otherClasses='text-sm'>
                     <div className='flex justify-between gap-4 py-3'>
                        <span>
                           {data?.responseData.length} de {data?.totalCount} itens
                        </span>
                        <span>
                           Página {currentPage} de {totalPages}
                        </span>
                     </div>
                  </TableCell>
               </tr>
            </tfoot>
         </Table>

         <ReactPaginate
            pageLinkClassName={twMerge(buttonStyles, 'bg-zinc-400 hover:bg-zinc-300')}
            breakLabel={
               <span className={twMerge(buttonStyles, 'bg-zinc-400 hover:bg-zinc-300')}>
                  ...
               </span>
            }
            nextLabel={
               <span
                  className={
                     isActiveNextButton
                        ? twMerge(buttonStyles, 'bg-zinc-700 cursor-default')
                        : twMerge(buttonStyles, 'bg-zinc-400 hover:bg-zinc-300')
                  }
               >
                  <span className='max-md:hidden'>Próxima</span>
                  <ChevronRight size={14} />
               </span>
            }
            previousLabel={
               <span
                  className={
                     isActivePrevButton
                        ? twMerge(buttonStyles, 'bg-zinc-700 cursor-default')
                        : twMerge(buttonStyles, 'bg-zinc-400 hover:bg-zinc-300')
                  }
               >
                  <ChevronLeft size={14} />
                  <span className='max-md:hidden'>Anterior</span>
               </span>
            }
            onPageChange={handlePageClick}
            pageCount={totalPages}
            pageRangeDisplayed={2} // Quantas páginas mostrar ao redor da página atual
            marginPagesDisplayed={1} // Quantas páginas mostrar no início e no fim
            containerClassName='flex items-center gap-1 justify-center flex-wrap'
            activeLinkClassName='bg-zinc-700 cursor-default hover:bg-zinc-700'
         />
      </>
   );
}
