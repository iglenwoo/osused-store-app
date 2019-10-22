import React, { useState } from 'react'
import { ItemList } from '../../components/ItemList'
import './ItemListPage.css'

import mockItems from './ItemList.mock'

export const ItemListPage = () => {
  const [items, setItems] = useState(mockItems)

  return (
    <>
      <div className="items-labels">
        <h1>Products for you</h1>
        <h2>Recently Posted</h2>
      </div>
      <div class="item-gallery">
        <div class="item-elements">
          <ItemList items={items} />
        </div>
      </div>
    </>
  )
}
