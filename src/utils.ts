interface Offset {
  id: string
  height: number
}

export const searchScrollIndex = (offsets: Offset[], scrollTop: number) => {
  let totalHeight = 0

  for (let i = 0; i < offsets.length; i += 1) {
    totalHeight += offsets[i].height

    if (totalHeight >= scrollTop) {
      return i
    }
  }

  return 0
}

export const sliceSumOffsetHeights = (arr: Offset[], startIndex: number, endIndex: number) => {
  return arr.slice(startIndex, endIndex).reduce((acc, cur) => acc + cur.height, 0)
}

export class VirtualScroller {
  virtualItemMap: Map<string, Offset> = new Map()

  public register = (id: string, height: number) => {
    this.virtualItemMap.set(id, { id, height })
  }

  public getOffsets = (ids: string[]) => {
    return ids.map((id) => this.virtualItemMap.get(id)!).filter(Boolean)
  }
}
