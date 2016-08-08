import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


const reducers = {
	form: formReducer
};


const combinedReducers = combineReducers(reducers);


export default createStore(combinedReducers);
