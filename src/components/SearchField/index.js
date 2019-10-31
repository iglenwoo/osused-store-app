import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import { CategorySelects } from '../CategorySelect'
import SearchIcon from '@material-ui/icons/Search'
import FormControl from '@material-ui/core/FormControl'

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
  return (
    <div position="relative">
      <FormControl variant="outlined" className={classes.formControl}>
        <SearchIcon />
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
        {/*<CategorySelects/>*/}
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <CategorySelects />
      </FormControl>
    </div>
  )
}
