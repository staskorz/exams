import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';


class TakeExam extends Component {
	style = {
		mainContainer: {
			padding: '120px',
			paddingTop: '20px'
		},
		
		confirmationText: {
			fontSize: '20px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)'
		},
		
		cardActions: {
			padding: '16px'
		}
	};
	
	
	render() {
		const { exam: { _id, name, number, numOfQuestions }, ready, router } = this.props;
		
		return (
				<div style={ this.style.mainContainer }>
					{ ready ?
							<Card>
								<CardTitle
										title={ 'Exam Name: ' + name }
										subtitle={ 'Exam Number: ' + number + ', Number of Questions: ' + numOfQuestions }
								/>
								
								<CardText>
									<span style={ this.style.confirmationText }>Are you sure you want to take this exam <strong>now</strong>?</span>
								</CardText>
								
								<CardActions style={ this.style.cardActions }>
									<RaisedButton label='Yes' primary={ true } />
									<RaisedButton label='No' onClick={ () => router.goBack() } />
								</CardActions>
							</Card>
							
							:
							
							<LoadingIndicator />
					}
				</div>
		);
	};
}


export default withRouter(TakeExam);
