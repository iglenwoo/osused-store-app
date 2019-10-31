import React from 'react'
import { shallow } from 'enzyme'
import { ItemList } from './index'
import mockItems from './ItemList.mock'

it('renders empty items', () => {
  const emptyItems = []
  shallow(<ItemList items={emptyItems} />)
})

it('renders mock items', () => {
  shallow(<ItemList items={mockItems} />)
})
