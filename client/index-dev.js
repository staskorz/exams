import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader'

import renderReactRoot from './ui/render-react-root'
import ReactRoot from './ui/ReactRoot'


const render = Component => renderReactRoot(<AppContainer><Component /></AppContainer>)


render(ReactRoot)


if(module.hot) {
	module.hot.accept('./ui/ReactRoot', () => {
		render(ReactRoot)
	})
}
