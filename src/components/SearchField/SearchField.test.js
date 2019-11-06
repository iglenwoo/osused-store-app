import React from 'react'
import { shallow } from 'enzyme'
import { SearchField } from './index'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

it('renders the app bar', () => {
  shallow(<SearchField />)
})
