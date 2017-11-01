import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import DisplayNumber from '../../components/displayNumber'

class Converter_Container extends Component {
  constructor(props) {
    super(props)

    this.state = { submited: false }
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
      this.setState({ submited: false })
      onUpdate({
        amountIn: value,
      })
    }
  }

  onSelectChange(event, data, fieldName) {
    const { onUpdate } = this.props

    this.setState({ submited: false })
    onUpdate({
      [fieldName]: data.value,
    })
  }

  switchBases(event) {
    const { onUpdate, activeSettings } = this.props

    this.setState({ submited: false })
    onUpdate({
      from: activeSettings.to,
      to: activeSettings.from,
    })

    event.preventDefault()
  }

  calculate(event) {
    const { onSubmit, activeSettings, ratesList } = this.props
    const { amountIn, from, to } = activeSettings

    const fromRateObj = ratesList.find(rate => rate.currency === from)
    const toRateObj = ratesList.find(rate => rate.currency === to)

    this.setState({ submited: true })

    if( parseFloat(amountIn) !== 0 && from && to && fromRateObj && toRateObj){
      const amountOut = (parseFloat(amountIn) / parseFloat(fromRateObj.rate) * parseFloat(toRateObj.rate)).toFixed(4)

      onSubmit({
        datetime: new Date().toISOString(),
        from,
        to,
        amountIn,
        amountOut,
      }, amountOut)
    }
  }

  render() {
    const { activeSettings, amountOut } = this.props
    const { submited } = this.state
    const wrapStyles = { marginBottom: '30px' }

    return (
      <div style={wrapStyles}>
        <Form onSubmit={this.calculate}>
          <Form.Group widths='equal'>
            <Form.Input
              label='Amount'
              placeholder='Amount'
              value={activeSettings.amountIn}
              onChange={this.onInputChange}
              error={submited && !activeSettings.amountIn}
            />
            <Form.Select
              value={activeSettings.from}
              label='Currency from'
              onChange={(e, data) => this.onSelectChange(e, data, 'from')}
              options={this.options}
              placeholder='Currency from'
              error={submited && !activeSettings.from}
            />
            <Form.Select
              value={activeSettings.to}
              label='Currency to'
              onChange={(e, data) => this.onSelectChange(e, data, 'to')}
              options={this.options}
              placeholder='Currency to'
              error={submited && !activeSettings.to}
            />
          </Form.Group>
          <Form.Group>
            <Form.Button>Calculate</Form.Button>
            <Form.Button onClick={this.switchBases}>Switch bases</Form.Button>
          </Form.Group>
        </Form>
        {amountOut !== null &&
          <DisplayNumber
            amount={amountOut}
            currency={activeSettings.to}
          />
        }
      </div>
    )
  }
}

Converter_Container.defaultProps = {
  ratesList: [],
  activeSettings: {
    from: '',
    to: '',
    amountIn: null,
  },
  onUpdate: () => {},
  onSubmit: () => {},
}

Converter_Container.propTypes = {
  ratesList: PropTypes.array,
  activeSettings: PropTypes.object,
  onUpdate: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default Converter_Container
