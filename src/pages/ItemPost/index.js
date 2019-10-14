import React from 'react'
import './ItemPost.css'
import { InputLabel, SelectionLabel } from '../../components/Label/index'

export class ItemPost extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ]
  }

  handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    var result = fetch('http://localhost:4000/post-sell-item', {
      method: 'POST',
      body: data,
    })

    result
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 0) alert('Update Success!!')
        else alert('Update fault!!')
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Selling Register</h3>
        <InputLabel
          id="name"
          name="name"
          text="Item Name"
          placeholder="Enter Item Name"
        />
        <SelectionLabel
          id="category"
          name="category"
          text="Category"
          options={this.options}
        />
        <InputLabel
          id="location"
          name="location"
          text="Location"
          placeholder="Enter Location"
        />
        <InputLabel
          id="price"
          name="price"
          text="Price"
          placeholder="Enter Price"
        />
        <InputLabel
          id="description"
          name="description"
          text="Description"
          placeholder="Enter Description"
        />
        <button>Register</button>
      </form>
    )
  }
}
