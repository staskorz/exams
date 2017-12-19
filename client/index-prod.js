import React from 'react'

import 'react-virtualized/styles.css'
import './main.css'

import './startup/material-ui-touch-workaround'
import './startup/browser-history-counter'

import renderReactRoot from './react-init/render-react-root'
import ReactRoot from './react-init/ReactRoot'


renderReactRoot(<ReactRoot />)
