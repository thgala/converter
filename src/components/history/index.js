import React from 'react'
import PropTypes from 'prop-types'
import './index.css'


const History = ({ list, onItemClick }) => {
  return (
    <div className='History'>

    </div>
  )
}

History.defaultProps = {
  list: [],
  onItemClick() {},
}

History.propTypes = {
  list: PropTypes.array,
  onItemClick: PropTypes.func,
}

export default History
