import React from 'react'

import { API_BASE_URL } from '../../constants/routes'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  container: {
    flexWrap: 'wrap',
    width: 500,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
        <h3>Selling Register</h3>
        <ComposedTextField />
      </span>
    )
  }
}

function ComposedTextField() {
  const classes = useStyles()
  const handleChange = event => {
    const target = event.target
    const value = target.value
    const name = target.id
    state[name] = value
  }

  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.target)
    var result = fetch(`${API_BASE_URL}/post-sell-item`, {
      method: 'POST',
      body: data,
    })
    result
      .then(response => {
        if (response.status !== 200) alert(response.statusText)
        else alert(response)
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
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
        <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
        <Select
          native
          value={state.category}
          onChange={handleChange}
          inputProps={{
            name: 'category',
            id: 'category',
          }}
        >
          <option value={state.category}>Choose category</option>
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
        style={{ dispay: 'inline' }}
      >
        Add item
      </Button>
    </form>
  )
}
