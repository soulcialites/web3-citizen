import { useEffect } from 'react';

export function useLogError(error: string): any {
  useEffect(() => {
    // console.log(error);
  }, [error]);
}

export default useLogError;
