import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as routes from '../../constants/routes'
import { makeStyles } from '@material-ui/core/styles'
import { CategorySelects } from '../CategorySelect'
import { Input, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {
    marginWidth: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  searchIcon: {
    marginRight: theme.spacing(2),
  },
}))

export function SearchField() {
  const [itemName, setItemName] = useState('')
  const [category, setCategory] = useState('')
  const history = useHistory()

  const handleChange = event => {
    setCategory(event.target.value)
    event.preventDefault()
    history.push(
      `${routes.ITEMS}?name=${itemName}&category=${event.target.value}`
    )
  }

  function handleSearchClick(event) {
    event.preventDefault()
    history.push(`${routes.ITEMS}?name=${itemName}&category=${category.value}`)
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CategorySelects value={category} onChange={handleChange} />
      <Input
        className={classes.input}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={itemName}
        onChange={e => setItemName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSearchClick}
      >
        <SearchIcon className={classes.searchIcon} />
        Search
      </Button>
    </div>
  )
}
