import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableCellProps {
   children: ReactNode;
   otherClasses?: string;
   colSpan?: number;
}

export function TableCell({ children, otherClasses, colSpan }: TableCellProps) {
   return (
      <td className={twMerge('py-2 px-4 text-zinc-400', otherClasses)} colSpan={colSpan}>
         {children}
      </td>
   );
}
