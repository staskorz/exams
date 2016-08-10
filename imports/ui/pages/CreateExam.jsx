import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { FlatButton } from 'material-ui';

import QuestionsEdit from '/imports/ui/components/QuestionsEdit'


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
		}
	};
	
	
	handleSubmit = (formFields) => {
		console.log('formFields:', formFields);
	};
	
	
	render() {
		const { handleSubmit } = this.props;
		
		return (
				<div style={ this.style.mainContainer }>
					<h1 style={ this.style.h1 }>Create Exam</h1>
					
					<form onSubmit={ handleSubmit(this.handleSubmit) }>
						<div className='formContainer' style={ this.style.formContainer }>
							<Field component={ TextField } name='name' floatingLabelText='Exam Name' /><br />
							<Field component={ TextField } name='number' type='number' floatingLabelText='Exam Number' />
							
							<FieldArray name='questions' component={ QuestionsEdit } />
						</div>
						
						<div className='buttonsContainer'>
							<FlatButton label='Save' primary={ true } type='submit' /><FlatButton label='Cancel' />
						</div>
					</form>
				</div>
		);
	}
}


export default reduxForm({
	form: 'createExam'
})(CreateExam);
