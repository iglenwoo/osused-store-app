import React from 'react'
import { shallow } from 'enzyme'
import { ItemPost } from './index'

it('renders without crashing', () => {
  shallow(<ItemPost />)
})
