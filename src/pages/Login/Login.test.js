import React from 'react'
import { shallow } from 'enzyme'
import { Login } from './index'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

it('renders without crashing', () => {
  shallow(<Login />)
})
