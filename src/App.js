import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Loader } from 'semantic-ui-react'

import { getCurrenciesRatesWithDelay } from './api'
import { generalTitle, generalText, generalErrorTitle, generalErrorText } from './mock/text'

import Header from './components/header'
import Note from './components/note'
import Initialise from './containers/initialise'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      currencyList: [],
      fetchError: false,
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    getCurrenciesRatesWithDelay()
      .then(result => this.setState({ loading: false, currencyList: result.data, }))
      .catch(error => this.setState({ loading: false, fetchError: true, }))
  }

  render() {
    const
      { currencyList, loading, fetchError } = this.state

    const content = fetchError
      ? <Note title={generalErrorTitle} text={generalErrorText} />
      : <Container>
          <Note title={generalTitle} text={generalText} />
          <Initialise
            currencyList={currencyList}
          />
        </Container>

    return (
      <div>
        <Header />
        {loading
          ? <Loader active inline='centered' />
          : content
        }
      </div>
    )
  }
}

export default App
