import React, { useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import * as routes from '../../constants/routes'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { API_BASE_URL } from '../../constants/routes'
import { validateEmail } from '../../utils/common'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export function SignUp(props) {
  const history = useHistory()
  const [email, setemail] = useState('')
  const [fname, setfname] = useState('')
  const [Lname, setLname] = useState('')
  const [password, setpassword] = useState('')
  const [checkpassword, setcheckpassword] = useState('')

  function validatePassword() {
    return checkpassword === password && checkpassword.length > 0
  }

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      fname.length > 0 &&
      Lname.length > 0 &&
      validatePassword() &&
      validateEmail(email)
    )
  }

  function displaychange() {
    if (!validateForm()) {
      return (
        <Typography component="h1" variant="caption" color="error">
          The passwords do not match, or email format is wrong!
        </Typography>
      )
    } else {
      return (
        <Typography component="h1" variant="caption" color="primary">
          All done!
        </Typography>
      )
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    let jsonObject = {}
    for (const [key, value] of data.entries()) {
      jsonObject[key] = value
    }
    console.log(jsonObject)
    let result = fetch(`${API_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObject),
    })

    result
      .then(response => {
        if (response.status === 200) {
          alert('Sign up Success!!')
          history.push(routes.LOGIN)
        } else {
          alert(response.statusText)
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={fname}
                onChange={e => setfname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={Lname}
                onChange={e => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setemail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setpassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="checkpassword"
                label="Checkpassword"
                type="password"
                id="Checkpassword"
                autoComplete="renter-password"
                value={checkpassword}
                onChange={e => setcheckpassword(e.target.value)}
              />
            </Grid>
            <Grid>{displaychange()}</Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" component={LinkLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
const LinkLogin = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/login" {...props} />
))
