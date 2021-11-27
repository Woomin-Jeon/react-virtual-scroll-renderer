# react-virtual-scroll-renderer

The virtual scroll for React.  

`react-virtual-scroll-renderer` does not force the heights of the elements to be fixed. In other words, rendering elements may have various heights.  
Also, `react-virtual-scroll-renderer` maintains virtual scrolling without problems for element deletion or element height change due to element data change.

## Install

```bash
$ yarn add react-virtual-scroll-renderer
```

## Usage

```tsx
import { VirtualScrollRenderer, VirtualScrollItem } from 'react-virtual-scroll-renderer'

const ItemList: React.FC = ({ scrollElement, itemList }) => {
  return (
    <VirtualScrollRenderer
      scrollElement={scrollElement}
      virtualItemCount={8}
      itemList={itemList}
      render={(itemList) => (
        <ul>
          {itemList.map((item) => 
            <li key={item.data.id}>
              <VirtualScrollItem item={item}>
                <Item item={item} />
              </VirtualScrollItem>
            </li>
          )}
        </ul>
      )}
    />
  )
}
```

## Demo

![Nov-27-2021 22-45-30](https://user-images.githubusercontent.com/59194356/143684028-68793886-19da-4d1a-acbc-c56dad223e99.gif)
