import React from 'react'

import 'react-virtualized/styles.css'
import './main.css'

import './startup/material-ui-touch-workaround'
import './startup/browser-history-counter'

// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader'

import renderReactRoot from './react-init/render-react-root'
import ReactRoot from './react-init/ReactRoot'


const render = Component => renderReactRoot(<AppContainer><Component /></AppContainer>)


render(ReactRoot)


if(module.hot) {
	module.hot.accept('./react-init/ReactRoot', () => {
		render(ReactRoot)
	})
}
