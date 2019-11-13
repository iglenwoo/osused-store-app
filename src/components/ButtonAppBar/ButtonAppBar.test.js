import React from 'react'
import { shallow } from 'enzyme'
import { ButtonAppBar } from './index'
import { UserProvider } from '../../context/UserContext'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

it('renders the app bar', () => {
  shallow(
    <UserProvider>
      <ButtonAppBar />
    </UserProvider>
  )
})
