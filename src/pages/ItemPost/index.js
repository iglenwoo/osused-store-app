import React from 'react'
import { API_BASE_URL, default as routes, ITEMS } from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import {
  Button,
  makeStyles,
  Typography,
  Container,
  CssBaseline,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useUserContext } from '../../context/UserContext'

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
  const { auth } = useUserContext()
  const history = useHistory()
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleChange = event => {
    const target = event.target
    const value = target.value
    const name = target.id
    state[name] = value
  }

  const clean = () => {
    state.title = undefined
    state.category = undefined
    state.description = undefined
    state.location = undefined
    state.price = undefined
  }

  const isItemInvalid = () => {
    if (!state.title) {
      alert('Please enter item name.')
      return false
    }
    if (!state.price) {
      alert('Please enter price.')
      if (state.price < 0) {
        alert('Please enter positive number as price.')
      }
      return false
    }
    if (!state.category) {
      alert('Please choose a category.')
      return false
    }
    return true
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!isItemInvalid()) return

    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    headers.append('Authorization', 'Bearer ' + auth.token)
    const body = JSON.stringify({
      name: state.title,
      price: state.price,
      category: state.category,
      location: state.location,
      description: state.description,
      ownerId: undefined,
    })

    fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      headers,
      body,
    })
      .then(response => {
        if (response.status !== 200) {
          alert(response.statusText)
          return
        }
        {
          clean()
          history.goBack(ITEMS)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const classes = useStyles()
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
            value={state.title}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="price"
            label="Enter price"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
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
              <option>All</option>
              <option value={'books'}>Books</option>
              <option value={'music'}>Music</option>
              <option value={'moovies'}>Moovies</option>
              <option value={'games-comics'}>Games and Comicbooks</option>
              <option value={'electronics'}>Electronics</option>
              <option value={'bikes'}>Bikes and other Vehicles</option>
              <option value={'clothes'}>Clothes</option>
              <option value={'footwear'}>Footwear</option>
              <option value={'accessoiries'}>Accessoiries</option>
              <option value={'furniture'}>Furniture</option>
              <option value={'home-garden'}>Home and Garden</option>
              <option value={'sports'}>Sports</option>
              <option value={'leisure'}>Leisure</option>
              <option value={'baby'}>Baby and Child</option>
            </Select>
          </FormControl>
          <TextField
            id="location"
            label="Enter location"
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
