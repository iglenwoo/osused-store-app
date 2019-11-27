import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  categorySelect: {},
}))

export function CategorySelects(props) {
  const classes = useStyles()
  const [labelWidth, setLabelWidth] = useState(0)
  const inputLabel = useRef(null)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Category
      </InputLabel>
      <Select
        id="select-category"
        name="select-category"
        value={props.value}
        onChange={props.onChange}
        labelWidth={labelWidth}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem id="OptBooks" value={'books'}>
          Books
        </MenuItem>
        <MenuItem value={'music'}>Music</MenuItem>
        <MenuItem value={'moovies'}>Moovies</MenuItem>
        <MenuItem value={'games-comics'}>Games and Comicbooks</MenuItem>
        <MenuItem value={'electronics'}>Electronics</MenuItem>
        <MenuItem value={'bikes'}>Bikes and other Vehicles</MenuItem>
        <MenuItem value={'clothes'}>Clothes</MenuItem>
        <MenuItem value={'footwear'}>Footwear</MenuItem>
        <MenuItem value={'accessoiries'}>Accessoiries</MenuItem>
        <MenuItem value={'furniture'}>Furniture</MenuItem>
        <MenuItem value={'home-garden'}>Home and Garden</MenuItem>
        <MenuItem value={'sports'}>Sports</MenuItem>
        <MenuItem value={'leisure'}>Leisure</MenuItem>
        <MenuItem value={'baby'}>Baby and Child</MenuItem>
      </Select>
    </FormControl>
  )
}
