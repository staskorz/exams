import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './Routes';

export default () => (
	<MuiThemeProvider>
		<Routes />
	</MuiThemeProvider>
);
