import React from 'react'

import 'react-virtualized/styles.css'
import './main.css'

import './init/browser-history-counter'

// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader'

import renderReactRoot from './init/render-react-root'
import ReactRoot from './init/ReactRoot'


const render = Component => renderReactRoot(<AppContainer><Component /></AppContainer>)


render(ReactRoot)


if(module.hot) {
	module.hot.accept('./init/ReactRoot', () => {
		render(ReactRoot)
	})
}
