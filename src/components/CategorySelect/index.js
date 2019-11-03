import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
        <MenuItem value={'food'}>food</MenuItem>
        <MenuItem value={'20'}>Twenty</MenuItem>
        <MenuItem value={'30'}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}
