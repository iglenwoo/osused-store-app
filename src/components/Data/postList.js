import React, { Component } from 'react'
import PostData from '../Data/products.json'
import './postList.css'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import Modal from '@material-ui/core/Modal'
import { ItemPost } from '../../pages/ItemPost'

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 28,
    right: -170,
    left: 515,
    width: 500,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}))

export function PostList() {
  const classes = useStyles()

  const [openCard, setOpenCard] = React.useState(false)
  const [openPrice, setOpenPrice] = React.useState(false)

  function handleClick(state, index) {
    if (state === 'card') setOpenCard(prev => !prev)
    if (state === 'price') setOpenPrice(prev => !prev)
  }

  const handleClickAway = state => () => {
    if (state === 'card') setOpenCard(false)
    if (state === 'price') setOpenPrice(false)
  }

  return (
    <div className="item-card-list">
      {PostData.map((postDetail, index) => {
        return (
          <div className="item-card" key={index}>
            <Card className={classes.card}>
              <CardActionArea
                key={index}
                onClick={handleClick.bind(this, 'card', index)}
              >
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Item List"
                  key={postDetail.name}
                  id={postDetail.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {postDetail.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h3"
                  >
                    {postDetail.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {postDetail.description}
                  </Typography>
                </CardContent>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openCard}
                  onClose={handleClickAway('card')}
                >
                  <div className={classes.paper}>
                    <h1>Item Info</h1>
                    <h2>Item name</h2>
                    <p>{postDetail.name}</p>
                    <h2>Item Price</h2>
                    <p>{postDetail.price}</p>
                    <h2>Item Category</h2>
                    <p>{postDetail.category}</p>
                    <h2>Item Location</h2>
                    <p>{postDetail.location}</p>
                    <h2>Item Description</h2>
                    <p>{postDetail.description}</p>
                  </div>
                </Modal>
              </CardActionArea>
              <CardActions className="descriptor">
                <Button
                  size="small"
                  color="primary"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  key={index}
                  onClick={handleClick.bind(this, 'price', index)}
                >
                  Buy
                </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openPrice}
                  onClose={handleClickAway('price')}
                >
                  <div className={classes.paper}>
                    <h1>Excelent choice!</h1>
                    <h2>Owner Name </h2> <p>{postDetail.ownerName}</p>
                    <h2>Owner Mail </h2>
                    <p>{postDetail.ownerMail}</p>
                  </div>
                </Modal>
              </CardActions>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
