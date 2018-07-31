import {GET_MORTALITY} from '../actions/index.js'

export default function (state=[], action){
    switch(action.type){
        case GET_MORTALITY:
            return [
                {
                country: action.payload.country,
                male: action.payload.male,
                female: action.payload.female
                },...state
            ]
    }
    return state
}