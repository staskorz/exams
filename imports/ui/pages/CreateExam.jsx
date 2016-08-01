import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, TextField, FlatButton } from 'material-ui';


export default class CreateExam extends Component {
	style = {
		card: {
			margin: '80px',
			marginTop: '40px',
			padding: '90px'
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
				</CardText>
				<CardActions>
					<FlatButton label='Save' primary={ true } /><FlatButton label='Cancel' />
				</CardActions>
			</Card>
		);
	}
}
