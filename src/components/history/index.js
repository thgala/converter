import React from 'react'
import PropTypes from 'prop-types'
import { List, Header } from 'semantic-ui-react'
import { repeatConvertationText, noConvertations } from '../../mock/text'
import './index.css'


const History = ({ list, onItemClick }) => {
  return (
    <div className='History'>
      <Header size='large'>Convertation history list</Header>
      <div className='History-wrap'>
        {list.length !== 0 ? (
          <List divided relaxed>
            {list.map((item, i) =>
              <List.Item key={i}>
                <List.Content>
                  <List.Description>{item.datetime}</List.Description>
                  <List.Description>{item.amountIn} {item.from} -> {item.amountOut} {item.to}</List.Description>
                  <List.Header as='a' onClick={e => {
                    e.preventDefault()
                    onItemClick(item)
                  }}>{repeatConvertationText}</List.Header>
                </List.Content>
              </List.Item>
            )}
          </List>
        ) : (
          <p>{noConvertations}</p>
        )}
      </div>
    </div>
  )
}

History.defaultProps = {
  list: [],
  onItemClick() {},
}

History.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    datetime: PropTypes.date,
    amountIn: PropTypes.string,
    from: PropTypes.string,
    amountOut: PropTypes.string,
    to: PropTypes.string,
  })),
  onItemClick: PropTypes.func,
}

export default History
