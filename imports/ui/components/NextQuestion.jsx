import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';


const style = {
	mainContainer: {
		padding: '120px'
	},
	
	mainPaper: {
		padding: '32px'
	},
	
	descriptionText: {
		fontSize: '16px',
		fontWeight: 'normal',
		lineHeight: '36px',
		fontFamily: 'Roboto, sans-serif',
		color: 'rgba(0, 0, 0, 0.870588)',
		marginRight: '16px',
		width: '200px',
		display: 'inline-block'
	},
	
	mainText: {
		fontSize: '24px',
		fontWeight: 'normal',
		lineHeight: '36px',
		fontFamily: 'Roboto, sans-serif',
		color: 'rgba(0, 0, 0, 0.870588)'
	},
	
	actions: {
		paddingTop: '32px'
	},
	
	button: {
		marginRight: '16px'
	}
};


export default ({ text, multiple, answers, ready }) => {
	return (
			<div style={ style.mainContainer }>
				{ ready ?
						<Card>
							<CardTitle title={ null } />
							<span>Question:</span><span>{ text }</span><br />
							<span>Multiple:</span><span>{ multiple ? 'Yes' : 'No' }</span><br />
							{ answers.map((answer, index) => (
									<div key={ index }>{ index + 1 + '. ' + answer }</div>
							)) }
						</Card>
						
						:
						
						<LoadingIndicator />
				}
			</div>
	)
};
