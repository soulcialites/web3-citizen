import {
  EthereumAuthProvider,
  useViewerConnection,
} from '@self.id/framework'
import type { SelfID } from '@self.id/framework'
import { useCallback, } from 'react'

import type { ModelTypes } from '../types'

export function useConnect(): () => Promise<SelfID<ModelTypes> | null> {
  const connect = useViewerConnection<ModelTypes>()[1]
  return useCallback(async () => {
    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    // @ts-ignore
    return await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
  }, [connect])
}
