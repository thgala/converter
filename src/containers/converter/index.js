import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class Converter extends Component {
  constructor(props) {
    super(props)

    this.options = this.optionsList.call(this)

    this.optionsList = this.optionsList.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.switchBases = this.switchBases.bind(this)
    this.calculate = this.calculate.bind(this)
  }

  optionsList() {
    const { ratesList } = this.props

    return ratesList.map(rate => ({
      key: rate.currency,
      text: rate.currency,
      value: rate.currency,
    }))
  }

  onInputChange(event) {
    const { onUpdate } = this.props
    const value = event.target.value

    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      onUpdate({
        amountIn: value,
      })
    }
  }

  onSelectChange(event, fieldName) {
    const { onUpdate } = this.props
    const value = event.target.value

    console.log('event', event)

    onUpdate({
      [fieldName]: value,
    })
  }

  switchBases(event) {


    event.preventDefault()
  }

  calculate(event) {
    const { onSubmit, activeSettings, ratesList } = this.props


    // onSubmit(activeSettings)
  }

  render() {
    const { activeSettings } = this.props

    console.log('activeSettings', activeSettings)

    return (
      <div>
        <Form onSubmit={this.calculate}>
          <Form.Group widths='equal'>
            <Form.Input label='Amount' placeholder='Amount' value={activeSettings.amountIn} onChange={this.onInputChange} />
            <Form.Select
              value={activeSettings.from}
              label='Currency from'
              onChange={e => this.onSelectChange(e, 'from')}
              options={this.options}
              placeholder='Currency from'
            />
            <Form.Select
              value={activeSettings.to}
              label='Currency to'
              onChange={e => this.onSelectChange(e, 'to')}
              options={this.options}
              placeholder='Currency to'
            />
          </Form.Group>
          <Form.Group>
            <Form.Button>Submit</Form.Button>
            <Form.Button onClick={this.switchBases}>Switch bases</Form.Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

Converter.defaultProps = {
  ratesList: [],
  activeSettings: {
    from: '',
    to: '',
    amountIn: null,
  },
  onUpdate: () => {},
  onSubmit: () => {},
}

Converter.propTypes = {
  ratesList: PropTypes.array,
  activeSettings: PropTypes.object,
  onUpdate: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default Converter
