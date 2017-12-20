import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


const muiTheme = getMuiTheme({
	isRtl: true,
})


export default ({ children }) => <MuiThemeProvider muiTheme={ muiTheme }>
	{ children }
</MuiThemeProvider>
