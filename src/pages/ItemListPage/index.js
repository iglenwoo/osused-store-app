import React, { useEffect, useState } from 'react'
import { ItemList } from '../../components/ItemList'
import { SearchField } from '../../components/SearchField'
import { useLocation } from 'react-router-dom'

export const ItemListPage = props => {
  const [items, setItems] = useState([])
  const query = new URLSearchParams(useLocation().search)
  const itemName = query.get('name')
  const category = query.get('category')

  useEffect(() => {
    async function fetchItems() {
      let targetUrl = `http://localhost:4000/items?name=${itemName ||
        ''}&category=${category || ''}`
      const response = await fetch(targetUrl, {
        method: 'GET',
      })
      const items = await response.json()
      setItems(items)
    }

    fetchItems().catch(e => console.error(e))
  }, [itemName, category])

  return (
    <>
      <SearchField />
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
