import React from 'react'
import { shallow } from 'enzyme'
import { Signup } from './index'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

it('renders without crashing', () => {
  shallow(<Signup />)
})
