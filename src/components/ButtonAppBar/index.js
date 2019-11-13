import React from 'react'

import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import * as routes from '../../constants/routes'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { AccountCircle } from '@material-ui/icons'
import { useUserContext } from '../../context/UserContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  typography: {
    padding: theme.spacing(2),
  },
}))

export function ButtonAppBar() {
  const { isAuth, logout } = useUserContext()
  const classes = useStyles()
  const history = useHistory()

  const handleTitle = () => {
    history.push(routes.ITEMS)
  }

  const history = useHistory()

  const signOut = () => {
    logout()
  }


  const handleHomeClick = event => {
    history.push(routes.HOME)
  }

  const LinkItems = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to={routes.ITEMS} {...props} />
  ))

  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/ItemList"
              style={{ color: 'white', textDecoration: 'none' }}
              onClick={handleTitle}
            >
              OSUsed Store
            </Link>
            <Button color="inherit" onClick={handleHomeClick}>
              Home
            </Button>
          </Typography>
          {isAuth ? <AuthedButtons signOut={signOut} /> : <UnAuthedButtons />}
        </Toolbar>
      </AppBar>
    </div>
  )
}

function AuthedButtons({ signOut }) {
  return (
    <>
      <AvartarButton signOut={signOut} />
    </>
  )
}

function AvartarButton({ signOut }) {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleAddItem = () => {
    history.push(`${routes.ITEM_POST}`)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSignOut = () => {
    signOut()
    setAnchorEl(null)
    history.push(routes.LOGIN)
  }

  const classes = useStyles()

  return (
    <div>
      <Button variant="contained" onClick={handleAddItem}>
        Add your product
      </Button>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        style={{ display: 'inline' }}
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  )
}

function UnAuthedButtons() {
  const history = useHistory()

  const handleLogin = event => {
    history.push(routes.LOGIN)
  }

  return (
    <>
      <Button color="inherit" onClick={handleLogin}>
        Login
      </Button>
    </>
  )
}
