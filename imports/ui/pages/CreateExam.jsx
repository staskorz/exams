import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, TextField, FlatButton, FloatingActionButton } from 'material-ui';
import IconAdd from 'material-ui/svg-icons/content/add';

import QuestionEdit from '/imports/ui/components/QuestionEdit'


export default class CreateExam extends Component {
	style = {
		card: {
			padding: '120px',
			paddingTop: '40px',
			height: '100%'
		},
		
		addQuestionButton: {
			marginLeft: '10px',
			marginTop: '10px'
		}
	};
	
	
	render() {
		return (
				<Card style={ this.style.card }>
					<CardTitle title='Create Exam' />
					<CardText>
						<form>
							<TextField name='name' hintText='Exam Name' /><br />
							<TextField name='number' type='number' hintText='Exam Number' />
						</form>
						
						<QuestionEdit questionNumber={ 1 } />
						<FloatingActionButton mini={true} style={ this.style.addQuestionButton }><IconAdd /></FloatingActionButton>
					</CardText>
					<CardActions>
						<FlatButton label='Save' primary={ true } /><FlatButton label='Cancel' />
					</CardActions>
				</Card>
		);
	}
}
