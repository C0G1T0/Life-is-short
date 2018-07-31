// A chaque changement, à chaque action
// 90% des cas user event (clik sur un bouton, submit form...)
// fonction qui est un actioncreator
// contient un type (id)
// payload (optional extra data ncsr pour faire l'action)
// Lance tous les reducers qui vont mettre à jour le state

import axios from 'axios'

export const GET_COUNTRIES = "GET_COUNTRIES"
export const ERROR_GET_COUNTRIES = "ERROR_GET_COUNTRIES"
export const GET_MORTALITY = "GET_MORTALITY"

const API_END_POINT = "http://api.population.io:80/1.0/"
const DEFAULT_PARAM = "25/today" // Mortality stats for a 25y person today

export function getCountries(){
  return function(dispatch){
    axios(`${API_END_POINT}countries`)
      .then(function(response){
        dispatch({
          type: GET_COUNTRIES,
          payload: response.data.countries
        })
      }).catch(function(error){
        dispatch({ 
          type: ERROR_GET_COUNTRIES,
          error: error.response.data.detail
        })
      })
  }
}

export function getMortality(country){ // country = state searchBar
  return function (dispatch){
    return axios(`${API_END_POINT}mortality-distribution/${country}/male/${DEFAULT_PARAM}`)
      .then((responseMale) => {
        axios(`${API_END_POINT}mortality-distribution/${country}/female/${DEFAULT_PARAM}`)
          .then((responseFemale) => {
            dispatch(
              {
                type: GET_MORTALITY,
                payload: {
                  country: country,
                  male: responseMale.data.mortality_distribution,
                  female: responseFemale.data.mortality_distribution,
                }
              }
            )
          })
      })
  }
} 




