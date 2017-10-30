import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Converter from '../converter'
import History from '../../components/history'

class Initialise extends Component {

  constructor(props){
    super(props)

    this.state = {
      currencyList: props.currencyList,
      historyList: [],
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
      }
    }

    this.setActiveSettings = this.setActiveSettings.bind(this)
    this.updateHistory = this.updateHistory.bind(this)
  }

  setActiveSettings(settings){
    this.setState(prevState => ({
      activeSettings: Object.assign({}, prevState.activeSettings, settings)
    }))
  }

  updateHistory(settings){
    this.setState(prevState => ({
      historyList: prevState.historyList.concat([settings])
    }))
  }


  render() {
    const { currencyList, historyList, activeSettings } = this.state

    return (
      <div>
        <Converter
          currencyList={currencyList}
          activeSettings={activeSettings}
          onUpdate={this.setActiveSettings}
          onSubmit={this.updateHistory}
        />
        <History
          list={historyList}
          onItemClick={this.setActiveSettings}
        />
      </div>
    )
  }
}

Initialise.propTypes = {
  currencyList: PropTypes.array,
}

export default Initialise
