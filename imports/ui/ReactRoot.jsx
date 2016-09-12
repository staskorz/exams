import React from 'react';

import ReduxWrapper from './ReduxWrapper';
import ReactIntlWrapper from './ReactIntlWrapper';
import MaterialUiWrapper from './MaterialUiWrapper';
import Routes from './Routes';


export default () => (
		<ReduxWrapper>
			<ReactIntlWrapper>
				<MaterialUiWrapper>
					<Routes />
				</MaterialUiWrapper>
			</ReactIntlWrapper>
		</ReduxWrapper>
);
