import { ReactNode } from 'react';

export function TableRow({ children }: { children: ReactNode }) {
   return <tr className='border-b border-zinc-300'>{children}</tr>;
}
