import React from 'react'

import 'react-virtualized/styles.css'
import './main.css'

import '../imports/startup/client/material-ui-touch-workaround'
import '../imports/startup/client/browser-history-counter'

import renderReactRoot from './ui/render-react-root'
import ReactRoot from '../imports/client/ui/ReactRoot'


renderReactRoot(<ReactRoot />)
