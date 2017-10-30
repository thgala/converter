import axios from 'axios'

const delay = new Promise(resolve => setTimeout(resolve, 2000))

export const getCurrenciesRates = () => axios.get('https://txf-ecb.glitch.me/rates')
export const getCurrenciesRatesWithDelay = () => Promise.all([getCurrenciesRates(), delay])
  .then(values => {
    return values[0]
  })