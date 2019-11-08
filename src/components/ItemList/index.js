import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import CloseIcon from '@material-ui/icons/Close'

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

export function ItemList({ items }) {
  const classes = useStyles()

  const [openCard, setOpenCard] = React.useState(false)
  const [openPrice, setOpenPrice] = React.useState(false)

  const id = 0
  let [itemIndex, setOpenItem] = React.useState(items[id])

  function handleClick(index) {
    itemIndex = items[index]
    setOpenItem(items[index])
    setOpenCard(prev => !prev)
  }

  function handleClickPrice(index) {
    itemIndex = items[index]
    setOpenItem(items[index])
    setOpenPrice(prev => !prev)
  }

  const handleClickAway = () => setOpenCard(false)
  const handleClickAwayPrice = () => setOpenPrice(false)

  return (
    <>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <Card className={classes.card}>
              <CardActionArea>
                <div
                  className="cardContent"
                  onClick={handleClick.bind(this, index)}
                >
                  <CardMedia
                    className={classes.media}
                    component="img"
                    image={require('./BEAVER.png')}
                    alt="OSUsed Store Beaver"
                    height="140"
                    title="Item List"
                    key={`${item.name}-${index}`}
                    id={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="h3"
                    >
                      {item.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </div>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openCard}
                  onClose={handleClickAway}
                >
                  <div className={classes.paper}>
                    <Button
                      onClick={handleClickAway}
                      style={{ left: 425, padding: 0 }}
                    >
                      <CloseIcon />
                    </Button>
                    <h1>Item Info</h1>
                    <h2>Item name</h2>
                    <p>{itemIndex.name}</p>
                    <h2>Item Price</h2>
                    <p>{itemIndex.price}</p>
                    <h2>Item Category</h2>
                    <p>{itemIndex.category}</p>
                    <h2>Item Location</h2>
                    <p>{itemIndex.location}</p>
                    <h2>Item Description</h2>
                    <p>{itemIndex.description}</p>
                  </div>
                </Modal>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  key={index}
                  onClick={handleClickPrice.bind(this, index)}
                >
                  Buy
                </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openPrice}
                  onClose={handleClickAwayPrice}
                >
                  <div className={classes.paper}>
                    <Button
                      onClick={handleClickAwayPrice.bind(this, index)}
                      style={{ left: 425, padding: 0 }}
                    >
                      <CloseIcon />
                    </Button>
                    <h1>Excellent choice!</h1>
                    <h2>Owner Name </h2> <p>{itemIndex.ownerName}</p>
                    <h2>Owner Mail </h2>
                    <p>{itemIndex.ownerMail}</p>
                  </div>
                </Modal>
              </CardActions>
            </Card>
          </div>
        )
      })}
    </>
  )
}
