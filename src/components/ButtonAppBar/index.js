import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
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
import { ItemPost } from '../../pages/ItemPost'

import { PrivateRoute } from '../App/index'
import { Redirect } from 'react-router'

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
  const [auth, setAuth] = React.useState(true)

  const signOut = () => {
    setAuth(false)
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/ItemList"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            OSUsed Store
          </Typography>
          {auth ? <AuthedButtons signOut={signOut} /> : <UnAuthedButtons />}
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
  const classes = useStyles()
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
  }

  const state = {
    redirect: false,
  }
  const setRedirect = () => {
    this.setState({
      redirect: true,
    })
  }
  const renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />
    }
  }

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
                      <Typography className={classes.typography}>
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
  return (
    <>
      <Button color="inherit" component={Link} to="/Signup">
        SignUp
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    </>
  )
}
