import { useEffect } from 'react';

export function useLogTransactionWrite(data: string): any {
  useEffect(() => {
    // console.log(data);
  }, [data]);
}

export default useLogTransactionWrite;
