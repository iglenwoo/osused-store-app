import React, { useEffect, useState } from 'react'
import { ItemList } from '../../components/ItemList'
import './ItemListPage.css'
import { SearchField } from '../../components/SearchField'
import { CategorySelects } from '../../components/CategorySelect'

export const ItemListPage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch('http://localhost:4000/items', {
        method: 'GET',
      })
      const items = await response.json()
      setItems(items)
    }

    fetchItems().catch(e => console.error(e))
  }, [])

  return (
    <>
      <div>
        <SearchField />
      </div>
      <div className="items-labels">
        <h1>Products for you</h1>
        <h2>Recently Posted</h2>
      </div>
      <div className="item-gallery">
        <div className="item-elements">
          {items.length ? (
            <ItemList items={items} />
          ) : (
            <h2>No items currently...</h2>
          )}
        </div>
      </div>
    </>
  )
}
