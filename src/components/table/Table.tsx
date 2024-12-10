import { ReactNode } from 'react';

export function Table({ children }: { children: ReactNode }) {
   return (
      <div className='border border-zinc-300 rounded-lg'>
         <table className='w-full'>{children}</table>
      </div>
   );
}
