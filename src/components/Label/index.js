import React from 'react'
import Select from 'react-select'

export class SelectionLabel extends React.Component {
  state = {
    selectedOption: null,
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  render() {
    const { selectedOption } = this.state
    return (
      <label>
        <b>{this.props.text}</b>
        <Select
          id={this.props.id}
          name={this.props.name}
          value={selectedOption}
          onChange={this.handleChange}
          options={this.props.options}
        />
      </label>
    )
  }
}

export function InputLabel(props) {
  return (
    <label>
      <b>{props.text}</b>
      <input
        type="text"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
      />
    </label>
  )
}
