import React from 'react'
import { Provider } from 'react-redux'

import store from '../redux/store'


export default ({ children }) => <Provider store={ store }>
	{ children }
</Provider>
