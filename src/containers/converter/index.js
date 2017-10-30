import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Converter extends Component {

  constructor(props) {
    super(props)

    this.calculate = this.calculate.bind(this)
  }

  calculate() {
    const { onSubmit, activeSettings } = this.props

    onSubmit(activeSettings)
  }

  render() {
    return (
      <div>
        Converter
      </div>
    )
  }
}

Converter.defaultProps = {
  currencyList: [],
  activeSettings: {
    fr: {
      currency: '',
      rate: '',
    },
    to: {
      currency: '',
      rate: '',
    },
    amountIn: null,
    amountOut: null,
  },
  onUpdate: () => {},
  onSubmit: () => {},
}

Converter.propTypes = {
  currencyList: PropTypes.array,
  activeSettings: PropTypes.object,
  onUpdate: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default Converter
