import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { FlatButton, FloatingActionButton } from 'material-ui';
import IconAdd from 'material-ui/svg-icons/content/add';

import QuestionEdit from '/imports/ui/components/QuestionEdit'


class CreateExam extends Component {
	style = {
		mainContainer: {
			padding: '120px',
			paddingTop: '20px'
		},
		
		h1: {
			marginBottom: '0px'
		},
		
		formContainer: {
			paddingTop: '0px'
		},
		
		addQuestionButton: {
			marginLeft: '10px',
			marginTop: '10px'
		}
	};
	
	
	render() {
		return (
				<div style={ this.style.mainContainer }>
					<h1 style={ this.style.h1 }>Create Exam</h1>
					<div className='formContainer' style={ this.style.formContainer }>
						<form>
							<Field component={ TextField } name='name' floatingLabelText='Exam Name' /><br />
							<Field component={ TextField } name='number' type='number' floatingLabelText='Exam Number' />
						</form>
						
						<QuestionEdit questionNumber={ 1 } />
						<FloatingActionButton mini={true} style={ this.style.addQuestionButton }><IconAdd /></FloatingActionButton>
					</div>
					<div className='buttonsContainer'>
						<FlatButton label='Save' primary={ true } /><FlatButton label='Cancel' />
					</div>
				</div>
		);
	}
}


export default reduxForm({
	form: 'createExam'
})(CreateExam);
