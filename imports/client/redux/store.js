import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'


const reducers = {
	form: formReducer,
}


const combinedReducers = combineReducers(reducers)


const shouldLoadDevtools = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__


export default createStore(combinedReducers, shouldLoadDevtools && window.__REDUX_DEVTOOLS_EXTENSION__())
