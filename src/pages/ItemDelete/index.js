import React from 'react'
import { API_BASE_URL } from '../../constants/routes'
import { InputLabel, SelectionLabel } from '../../components/Label/index'
import { Button } from '@material-ui/core'

export class ItemPost extends React.Component {

  handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    var result = fetch(`${API_BASE_URL}/post-sell-item`, {
      method: 'POST',
      body: data,
    })

    result
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 0) alert('Delete Success!!')
        else alert('Delete fault!!')
      })
      .catch(function(err) {
        console.log(err)
      })
  }

//   render() {
//     return (
//     )
  }
}
