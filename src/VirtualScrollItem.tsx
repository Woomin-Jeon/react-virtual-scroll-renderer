import React, { useEffect, useRef } from 'react'

import { useGetVirtualScroller } from './context'

interface Props {
  /**
   * The item from VirtualScrollRenderer's render function
   */
  item: { id: string }
}

const VirtualScrollItem: React.FC<Props> = ({ children, item }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const virtualScroller = useGetVirtualScroller()

  useEffect(() => {
    const element = itemRef.current

    if (!element) {
      return
    }

    const timerId = setTimeout(() => {
      const { height } = element.getBoundingClientRect()
      const hasChildElement = element.childElementCount

      if (hasChildElement && height === 0) {
        console.error(`<VirtualScrollItem> got a height 0. ${item.id}`)
        return
      }

      virtualScroller.register(item.id, height)
    })

    return () => clearTimeout(timerId)
  }, [item])

  return <div ref={itemRef}>{children}</div>
}

export default VirtualScrollItem
