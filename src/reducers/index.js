// Combine tous les reducers pour avoir toutes les datas au même endroit (store/rootreducer)
// Permet d'exporter les données vers les containers (smart component)
// Toute le state/data dans un seul objet js

import { combineReducers } from 'redux'
import CountriesReducer from './reducer-countries'
import MortalityReducer from './reducer-mortality'

const rootReducer = combineReducers({
  countries: CountriesReducer,
  mortality: MortalityReducer
})

export default rootReducer
