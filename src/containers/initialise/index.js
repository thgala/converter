import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import Converter from '../converter'
import History from '../../components/history'

class Initialise_Container extends Component {

  constructor(props){
    super(props)

    this.state = {
      ratesList: [{
        currency: props.ratesBase,
        rate: '1',
      }].concat(props.ratesList),
      historyList: this.loadHistoryFromLocalStorage(),
      activeSettings: {
        from: props.ratesBase,
        to: '',
        amountIn: 0,
      },
      amountOut: null,
    }

    this.setActiveSettings = this.setActiveSettings.bind(this)
    this.updateHistory = this.updateHistory.bind(this)
    this.saveHistoryToLocalStorage = this.saveHistoryToLocalStorage.bind(this)
    this.loadHistoryFromLocalStorage = this.loadHistoryFromLocalStorage.bind(this)
  }

  setActiveSettings(settings){
    this.setState(prevState => ({
      activeSettings: Object.assign({}, prevState.activeSettings, settings),
      amountOut: null,
    }))
  }

  updateHistory(conversion, amountOut){
    const { historyList } = this.state
    const newHistoryList = [conversion].concat(historyList)

    this.saveHistoryToLocalStorage(newHistoryList)
    this.setState({
      historyList: newHistoryList,
      amountOut,
    })
  }

  saveHistoryToLocalStorage(list){
    localStorage.setItem('history', JSON.stringify(list))
  }

  loadHistoryFromLocalStorage(){
    const storedHistory = localStorage.getItem('history')
    const parsedHistory = JSON.parse(storedHistory) || []

    return parsedHistory
  }

  render() {
    const { ratesList, historyList, activeSettings, amountOut } = this.state

    return (
      <div>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={11}>
              <Converter
                amountOut={amountOut}
                ratesList={ratesList}
                activeSettings={activeSettings}
                onUpdate={this.setActiveSettings}
                onSubmit={this.updateHistory}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={5}>
              <History
                list={historyList}
                onItemClick={this.setActiveSettings}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

Initialise_Container.defaultProps = {
  ratesList: [],
  ratesBase: '',
}

Initialise_Container.propTypes = {
  ratesList: PropTypes.array,
  ratesBase: PropTypes.string,
}

export default Initialise_Container
