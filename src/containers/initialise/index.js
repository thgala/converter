import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import Converter from '../converter'
import History from '../../components/history'

class Initialise extends Component {

  constructor(props){
    super(props)

    this.state = {
      ratesList: [{
        currency: props.ratesBase,
        rate: '1',
      }].concat(props.ratesList),
      historyList: [],
      activeSettings: {
        from: props.ratesBase,
        to: '',
        amountIn: 0,
      },
      amountOut: null,
    }

    this.setActiveSettings = this.setActiveSettings.bind(this)
    this.updateHistory = this.updateHistory.bind(this)
  }

  setActiveSettings(settings){
    this.setState(prevState => ({
      activeSettings: Object.assign({}, prevState.activeSettings, settings),
      amountOut: null,
    }))
  }

  updateHistory(conversion, amountOut){
    this.setState(prevState => ({
      historyList: prevState.historyList.concat([conversion]),
      amountOut,
    }))
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

Initialise.defaultProps = {
  ratesList: [],
  ratesBase: '',
}

Initialise.propTypes = {
  ratesList: PropTypes.array,
  ratesBase: PropTypes.string,
}

export default Initialise
