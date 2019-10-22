import React from 'react'
import { shallow } from 'enzyme'
import { ItemList } from './index'

it('renders postlist', () => {
  const mockItems = []
  shallow(<ItemList items={mockItems} />)
})
