import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ItemList } from '../../components/ItemList'
import { SearchField } from '../../components/SearchField'
import { API_BASE_URL } from '../../constants/routes'
import { makeStyles, Grid, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 300,
  },
}))

export const Items = () => {
  const [items, setItems] = useState([])
  const query = new URLSearchParams(useLocation().search)
  const itemName = query.get('name')
  const category = query.get('category')
  const classes = useStyles()

  useEffect(() => {
    async function fetchItems() {
      let targetUrl = `${API_BASE_URL}/items?name=${itemName ||
        ''}&category=${category || ''}`
      const response = await fetch(targetUrl, {
        method: 'GET',
      })
      const items = await response.json()
      setItems(items.reverse())
    }

    fetchItems().catch(e => console.error(e))
  }, [itemName, category])

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <SearchField />
          {items.length ? (
            <ItemList items={items} />
          ) : (
            <h2>No items currently...</h2>
          )}
        </Paper>
      </Grid>
    </div>
  )
}
