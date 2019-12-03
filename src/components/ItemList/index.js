import React, { useState } from 'react'
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
import { API_BASE_URL } from '../../constants/routes'
import { useUserContext } from '../../context/UserContext'

const useStyles = makeStyles(theme => ({
  root: {
    marginWidth: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: theme.spacing(1),
  },
  card: {
    minWidth: 350,
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
  media: {
    height: 140,
  },
}))

export function ItemList({ items }) {
  const classes = useStyles()
  const { auth } = useUserContext()

  const [openCard, setOpenCard] = useState(false)
  const [openPrice, setOpenPrice] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedItem, setOpenItem] = useState(items[0])

  function handleClickCard(index) {
    setOpenItem(items[index])
    setOpenCard(prev => !prev)
  }
  function handleClickBuy(index) {
    const selectedItem = items[index]

    async function fetchItems() {
      let targetUrl = `${API_BASE_URL}/items/${selectedItem._id}`
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: { authorization: 'Bearer ' + auth.token },
      })
      const itemWithOwner = await response.json()
      console.log('itemWithOwner', itemWithOwner)
      setOpenItem(itemWithOwner)
    }
    fetchItems().catch(e => console.error(e))

    setOpenPrice(prev => !prev)
  }
  function handleClickBuyButtonUnAuthed() {
    setOpenPrice(prev => !prev)
  }

  const handleClickAway = () => setOpenCard(false)
  const handleClickAwayBuy = () => setOpenPrice(false)
  const handleClickAwayDelete = () => setOpenDelete(false)

  function handleClickDelete(item) {
    const result = fetch(`${API_BASE_URL}/items/${item._id}`, {
      method: 'DELETE',
      headers: { authorization: 'Bearer ' + auth.token },
      body: item._id,
    })
    result
      .then(response => response.json())
      .then(() => {
        window.location.reload()
      })
      .catch(function(err) {
        console.log(err)
        alert(err)
      })
  }

  function DeleteButton({ item }) {
    return (
      <CardActions>
        <Button
          size="small"
          color="default"
          aria-controls="delete-menu"
          aria-haspopup="true"
          key={item}
          onClick={handleClickDelete.bind(this, item)}
        >
          Delete
        </Button>
        <Modal
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-description"
          open={openDelete}
          onClose={handleClickAwayDelete}
        >
          <div className={classes.paper}>
            <h1>Delete</h1>
            <h2>Owner Name </h2> <p>{item._id}</p>
          </div>
        </Modal>
      </CardActions>
    )
  }

  function BuyButton({ index }) {
    return (
      <CardActions>
        <Button
          size="small"
          color="primary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          key={index}
          onClick={handleClickBuy.bind(this, index)}
        >
          Buy
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openPrice}
          onClose={handleClickAwayBuy}
        >
          <div className={classes.paper}>
            <h1>Excelent choice!</h1>
            <h2>Owner Name </h2> <p>{selectedItem.ownerName}</p>
            <h2>Owner Mail </h2>
            <p>{selectedItem.ownerMail}</p>
          </div>
        </Modal>
      </CardActions>
    )
  }
  function AuthedButtons({ auth, item, index }) {
    return (
      <>
        {auth.Uid === item.ownerId ? (
          <DeleteButton item={item} />
        ) : (
          <BuyButton index={index} />
        )}
      </>
    )
  }
  function UnAuthedButtons() {
    return (
      <CardActions>
        <Button
          size="small"
          color="primary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickBuyButtonUnAuthed.bind()}
        >
          Buy
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openPrice}
          onClose={handleClickAwayBuy}
        >
          <div className={classes.paper}>
            <h1>Please Log In First</h1>
          </div>
        </Modal>
      </CardActions>
    )
  }

  return (
    <div className={classes.root}>
      {items.map((item, index) => {
        return (
          <div key={index} className={classes.item}>
            <Card className={classes.card}>
              <CardActionArea>
                <div
                  className="cardContent"
                  onClick={handleClickCard.bind(this, index)}
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
                    <p>{selectedItem.name}</p>
                    <h2>Item Price</h2>
                    <p>{selectedItem.price}</p>
                    <h2>Item Category</h2>
                    <p>{selectedItem.category}</p>
                    <h2>Item Location</h2>
                    <p>{selectedItem.location}</p>
                    <h2>Item Description</h2>
                    <p>{selectedItem.description}</p>
                  </div>
                </Modal>
              </CardActionArea>
              {auth.isAuth ? (
                <AuthedButtons auth={auth} item={item} index={index} />
              ) : (
                <UnAuthedButtons />
              )}
            </Card>
          </div>
        )
      })}
    </div>
  )
}
