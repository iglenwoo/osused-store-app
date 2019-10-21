import React from 'react'
import { shallow } from 'enzyme'
import { PostList } from './postList'

it('renders postlist', () => {
  shallow(<PostList />)
})
