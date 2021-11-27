import React, { useState, useEffect, useMemo, useRef, UIEvent, ReactElement } from 'react'

import { VirtualScrollRendererContext } from './context'
import { searchScrollIndex, sliceSumOffsetHeights, VirtualScroller } from './utils'

interface Props<T> {
  /**
   * The item list to be rendered by virtual scroll
   */
  itemList: T[]
  /**
   * Scroll element
   */
  scrollElement: HTMLElement | null
  /**
   * How many items in item list to be rendered (default 10)
   */
  virtualItemCount?: number
  /**
   * Render function to render virtual item list
   */
  render: (virtualitemList: T[]) => ReactElement
}

const VirtualScrollRenderer = <T extends { id: string }>({
  itemList,
  scrollElement,
  virtualItemCount = 10,
  render,
}: Props<T>) => {
  const [index, setIndex] = useState(0)
  const virtualScroller = useMemo(() => new VirtualScroller(), [])
  const itemListIds = useMemo(() => itemList.map((item) => item.id), [itemList])
  const prevIndexRef = useRef(0)

  useEffect(() => {
    if (!scrollElement) {
      return
    }

    const handleScroll = (e: UIEvent) => {
      const scrollTop = e.currentTarget.scrollTop

      const offsets = virtualScroller.getOffsets(itemListIds)
      const index = searchScrollIndex(offsets, scrollTop)

      if (prevIndexRef.current !== index) {
        setIndex(index)
        prevIndexRef.current = index
      }
    }

    scrollElement.addEventListener('scroll', handleScroll as any)
    return () => scrollElement.removeEventListener('scroll', handleScroll as any)
  }, [itemListIds, scrollElement, virtualScroller])

  const virtualScrollRendererRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      const offsets = virtualScroller.getOffsets(itemListIds)

      const virtualItemTotalHeight = offsets.reduce((acc, cur) => acc + cur.height, 0)
      const virtualScrollRendererHeight = virtualScrollRendererRef.current?.getBoundingClientRect().height
      if (virtualScrollRendererHeight !== virtualItemTotalHeight) {
        console.error(
          `All elements in the <VirtualScrollRenderer> should be wrapped in <VirtualScrollItem>.\nIf is is Wrapped well in <VirtualScrollItem>, Check the element "margin"(margin is not calculated by height).\nVirtualScrollRenderer height: ${virtualScrollRendererHeight}, VirtualScrollItems total height: ${virtualItemTotalHeight}`
        )
      }
    })
  }, [itemListIds])

  const startIndex = useMemo(() => {
    return Math.max(index - Math.ceil(virtualItemCount / 2), 0)
  }, [index, virtualItemCount])

  const endIndex = useMemo(() => {
    return Math.min(index + Math.ceil(virtualItemCount / 2), itemList.length)
  }, [index, itemList.length, virtualItemCount])

  const prependHeight = useMemo(() => {
    const offsets = virtualScroller.getOffsets(itemListIds)
    return sliceSumOffsetHeights(offsets, 0, startIndex)
  }, [itemListIds, startIndex, virtualScroller])

  const appendHeight = useMemo(() => {
    const offsets = virtualScroller.getOffsets(itemListIds)
    return sliceSumOffsetHeights(offsets, endIndex, itemListIds.length)
  }, [endIndex, itemListIds, virtualScroller])

  const virtualItemList = useMemo(() => itemList.slice(startIndex, endIndex), [startIndex, endIndex, itemList])

  const value = useMemo(() => ({ virtualScroller }), [virtualScroller])

  return (
    <div ref={virtualScrollRendererRef}>
      <VirtualScrollRendererContext.Provider value={value}>
        <div style={{ height: prependHeight }} />
        {render(virtualItemList)}
        <div style={{ height: appendHeight }} />
      </VirtualScrollRendererContext.Provider>
    </div>
  )
}

export default VirtualScrollRenderer
