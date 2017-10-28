import React from 'react'

import 'react-virtualized/styles.css'
import '../imports/client/static/main.css'

import '../imports/startup/client/material-ui-touch-workaround'

// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader'

import renderReactRoot from './ui/render-react-root'
import ReactRoot from '../imports/client/ui/ReactRoot'


const render = Component => renderReactRoot(<AppContainer><Component /></AppContainer>)


render(ReactRoot)


if(module.hot) {
	module.hot.accept('../imports/client/ui/ReactRoot', () => {
		render(ReactRoot)
	})
}
