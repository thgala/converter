import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'semantic-ui-react'
import './index.css'

const DisplayNumber = ({ amount, currency }) => {
  return (
    <div className='DisplayNumber'>
      <Statistic>
        <Statistic.Value>{amount}</Statistic.Value>
        <Statistic.Label>{currency}</Statistic.Label>
      </Statistic>
    </div>
  )
}

DisplayNumber.propTypes = {
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  currency: PropTypes.string,
}

export default DisplayNumber
