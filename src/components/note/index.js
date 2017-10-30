import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'
import './index.css'

const Note = ({ title, text }) => {
  return (
    <div className='Note'>
      <Header as='h1'>{title}</Header>
      {text && <p>{text}</p>}
    </div>
  )
}

Note.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
}

export default Note
