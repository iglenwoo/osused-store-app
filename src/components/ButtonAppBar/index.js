import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import * as routes from '../../constants/routes'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { AccountCircle } from '@material-ui/icons'
import Popper from '@material-ui/core/Popper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import { ItemPost } from '../../pages/ItemPost'
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

const divStyle = {
  display: 'inline',
}

export function ButtonAppBar() {
  const { userInfo, logout } = useUserContext()

  const signOut = () => {
    logout()
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
              style={{ color: 'white', textDecoration: 'none' }}
              component={LinkItems}
            >
              OSUsed Store
            </Link>
          </Typography>
          {userInfo ? <AuthedButtons signOut={signOut} /> : <UnAuthedButtons />}
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

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleProfile = () => {
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
      <PopupState variant="popper" popupId="demo-popup-popper">
        {popupState => (
          <div style={divStyle}>
            <Button variant="contained" {...bindToggle(popupState)}>
              Add your product
            </Button>
            <Popper {...bindPopper(popupState)} transition>
              {({ TransitionProps }) => (
                <ClickAwayListener onClickAway={popupState.close}>
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography
                        className={classes.typography}
                        component={'span'}
                      >
                        <ItemPost />
                      </Typography>
                    </Paper>
                  </Fade>
                </ClickAwayListener>
              )}
            </Popper>
          </div>
        )}
      </PopupState>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        stule={divStyle}
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
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  )
}

function UnAuthedButtons() {
  const history = useHistory()

  const handleSignUp = event => {
    history.push(routes.SIGN_UP)
  }
  const handleLogin = event => {
    history.push(routes.LOGIN)
  }

  return (
    <>
      <Button color="inherit" onClick={handleSignUp}>
        SignUp
      </Button>
      <Button color="inherit" onClick={handleLogin}>
        Login
      </Button>
    </>
  )
}
