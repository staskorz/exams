import React from 'react';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';


export default ({ text, multiple, answers, ready }) => {
	return (
			<div>
				{ ready ?
						<div>
							<span>Question:</span><span>{ text }</span><br />
							<span>Multiple:</span><span>{ multiple ? 'Yes' : 'No' }</span><br />
							{ answers.map((answer, index) => (
									<div key={ index }>{ index + 1 + '. ' + answer }</div>
							)) }
						</div>
						
						:
						
						<LoadingIndicator />
				}
			</div>
	)
};
