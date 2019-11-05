import React, { useState } from 'react'
import * as routes from '../../constants/routes'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import { CategorySelects } from '../CategorySelect'
import SearchIcon from '@material-ui/icons/Search'
import FormControl from '@material-ui/core/FormControl'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
  },
}))

export function SearchField() {
  const classes = useStyles()
  const [itemName, setItemName] = useState('')
  const [category, setCategory] = useState('')
  const history = useHistory()

  const handleChange = event => {
    setCategory(event.target.value)
  }

  function handleSearchSubmit(event) {
    event.preventDefault()
    history.push(`${routes.Items}?name=${itemName}&category=${category}`)
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <FormControl variant="outlined" className={classes.formControl}>
          <SearchIcon />
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <CategorySelects value={category} onChange={handleChange} />
        </FormControl>
        <button>Search</button>
      </form>
    </div>
  )
}
