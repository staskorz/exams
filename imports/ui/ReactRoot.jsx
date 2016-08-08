import React from 'react';

import ReduxWrapper from './ReduxWrapper';
import MaterialUiWrapper from './MaterialUiWrapper';
import Routes from './Routes';


export default () => (
		<ReduxWrapper>
			<MaterialUiWrapper>
				<Routes />
			</MaterialUiWrapper>
		</ReduxWrapper>
);
