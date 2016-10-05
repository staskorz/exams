import React from 'react';

import ReduxWrapper from './ReduxWrapper';
import EnsureLoginWrapper from './EnsureLoginWrapper';
import ReactIntlWrapper from './ReactIntlWrapper';
import MaterialUiWrapper from './MaterialUiWrapper';
import Routes from './Routes';


export default () => (
		<ReduxWrapper>
			<ReactIntlWrapper>
				<MaterialUiWrapper>
					<EnsureLoginWrapper>
						<Routes />
					</EnsureLoginWrapper>
				</MaterialUiWrapper>
			</ReactIntlWrapper>
		</ReduxWrapper>
);
