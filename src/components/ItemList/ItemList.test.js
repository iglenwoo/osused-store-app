import React from 'react'
import { shallow } from 'enzyme'
import { ItemList } from './index'
import { UserProvider } from '../../context/UserContext'
import mockItems from './ItemList.mock'

it('renders empty items', () => {
  const emptyItems = []
  shallow(
    <UserProvider>
      <ItemList items={emptyItems} />
    </UserProvider>
  )
})

it('renders mock items', () => {
  shallow(
    <UserProvider>
      <ItemList items={mockItems} />
    </UserProvider>
  )
})
