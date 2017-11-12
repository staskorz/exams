import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import reduxDevtoolsSupport from './redux-devtools-support'


const reducers = {
	form: formReducer,
}


const combinedReducers = combineReducers(reducers)


export default createStore(combinedReducers, reduxDevtoolsSupport)
