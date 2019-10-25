import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Link as LinkReactRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export function Login(props) {
  const classes = useStyles()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  // let history = useHistory()

  function validateForm() {
    return email.length > 0 && password.length > 0
  }

  function handleResultData(result) {
    if (result === null) return

    result
      .then(responseData => {
        let key = 'osused' + responseData.user.email
        if (window.sessionStorage.getItem(key) !== null)
          window.sessionStorage.removeItem(key)
        window.sessionStorage.setItem(key, responseData.token)
        // document.getElementById('user').value = responseData.user
        console.log(responseData.user)
        document.getElementById('home').click()
      })
      .catch(function(err) {
        console.log(err)
        alert('err!!')
      })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)

    let jsonObject = {}
    for (const [key, value] of data.entries()) {
      jsonObject[key] = value
    }
    let result = fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObject),
    })
      .then(response => {
        if (response.status !== 200) {
          alert(response.statusText)
          return null
        } else {
          alert('Login Success!!')
          return response.json()
        }
      })
      .catch(function(err) {
        console.log(err)
        alert('err!!')
      })
    handleResultData(result)
  }

  return (
    <Container component="main" maxWidth="xs">
      <LinkReactRouter id="home" to="/SignUp" hidden>
        Hidden
      </LinkReactRouter>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!validateForm()}
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <LinkReactRouter to="/Signup">
                {"Don't have an account? Sign Up"}
              </LinkReactRouter>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  )
}
