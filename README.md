# react-virtual-scroll-renderer

The virtual scroll for React.  

The heights of elements need not be fixed in `react-virtual-scroll-renderer`. In other words, rendering elements may have various heights.  
Also, `react-virtual-scroll-renderer` works well without any problems with deleting element or changing height due to data changes.

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
              <VirtualScrollItem item={item}> // virtual scrolling target components 
                <Item item={item} />          // (in this case <Item>)
              </VirtualScrollItem>            // should be wrapped with <VirtualScrollItem>
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
