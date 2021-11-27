import { createContext, useContext } from 'react'

import type { VirtualScroller } from './utils'

interface VirtualScrollRendererContextProps {
  virtualScroller: VirtualScroller
}

export const VirtualScrollRendererContext = createContext<VirtualScrollRendererContextProps>({} as any)

export const useGetVirtualScroller = () => useContext(VirtualScrollRendererContext).virtualScroller
