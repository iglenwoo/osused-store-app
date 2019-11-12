import React from 'react'
import { API_BASE_URL } from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import * as routes from '../../constants/routes'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles(theme => ({
  container: {
    flexWrap: 'wrap',
    width: 500,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: 500,
    minWidth: 500,
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
    justifyContent: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const state = {
  title: undefined,
  price: undefined,
  location: undefined,
  description: undefined,
  category: undefined,
}

export class ItemPost extends React.Component {
  render() {
    return (
      <span>
        <Typography component="h1" variant="h5" align="center">
          Selling Register
        </Typography>
        <ComposedTextField />
      </span>
    )
  }
}

function ComposedTextField() {
  const history = useHistory()
  const classes = useStyles()
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const clean = () => {
    state.title = undefined
    state.price = undefined
    state.location = undefined
    state.description = undefined
    state.category = undefined
  }
  const handleChange = event => {
    const target = event.target
    const value = target.value
    const name = target.id
    state[name] = value
  }
  const handleSubmit = event => {
    event.preventDefault()
    //const data = new FormData(event.target)
    var result = fetch(`${API_BASE_URL}/items-post`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: state.title,
        price: state.price,
        category: state.category,
        location: state.location,
        description: state.description,
        createdAt: undefined,
      }),
    })
    result
      .then(response => {
        if (response.status !== 200) alert(response.statusText)
        else {
          alert(response)
          history.push(`${routes.ITEMS}`)
        }
      })
      .catch(function(err) {
        console.log(err)
      })
    clean()
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSubmit} style={{ width: 500 }}>
          <Button type="button" onClick={history.goBack}>
            <ArrowBackIosIcon />
            Go back{' '}
          </Button>
          <TextField
            id="title"
            label="Enter item name"
            multiline
            rowsMax="4"
            value={state.title}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="price"
            label="Enter price"
            multiline
            rowsMax="4"
            value={state.price}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
              Category
            </InputLabel>
            <Select
              native
              value={state.category}
              onChange={handleChange}
              labelWidth={labelWidth}
              inputProps={{
                name: 'category',
                id: 'category',
              }}
            >
              <option></option>
              <option value={state.category}>Books</option>
              <option value={state.category}>Electronics</option>
              <option value={state.category}>Furniture</option>
            </Select>
          </FormControl>
          <TextField
            id="location"
            label="Enter location"
            multiline
            rowsMax="4"
            value={state.location}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="description"
            label="Enter description"
            multiline
            rowsMax="4"
            value={state.description}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.button}
            fullWidth
            margin="normal"
            style={{ dispay: 'inline' }}
          >
            Add item
          </Button>
        </form>
      </div>
    </Container>
  )
}
