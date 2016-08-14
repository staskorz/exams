import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { FlatButton } from 'material-ui';

import ExamsCollection from '/imports/api/exams/collection';
import simpleSchemaValidator from '/imports/client/validators/simple-schema-validator';
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


const validate = values => {
	const errors = {
		questions: []
	};
	
	if(values.questions) {
		const weight = values.questions.reduce((acc, elem) => {
			const { weight } = elem;
			
			if(weight === 0 || weight === '') {
				return acc;
			} else if(weight) {
				return acc + weight;
			} else {
				return acc + 10;
			}
		}, 0);
		
		if(weight > 100) {
			values.questions.forEach((elem, index) => {
				errors.questions[index] = { weight: weight + " > 100" };
			});
		} else if(weight < 100) {
			values.questions.forEach((elem, index) => {
				errors.questions[index] = { weight: weight + " < 100" };
			});
		}
		
		values.questions.forEach((elem, index) => {
			errors.questions[index] = Object.assign({}, errors.questions[index], {
				text: simpleSchemaValidator(ExamsCollection, 'questions.$.text', elem.text)
			});
			
			if(elem.answers) {
				errors.questions[index].answers = [];
				
				if(!elem.answers.some(elem2 => elem2 && elem2.correct)) {
					errors.questions[index]._error = 'At least one correct answer required';
				}
				
				elem.answers.forEach((elem2, index2) => {
					errors.questions[index].answers[index2] = {
						text: simpleSchemaValidator(ExamsCollection, 'questions.$.answers.$.text', elem2.text)
					};
				});
			}
		});
	}
	
	errors.name = simpleSchemaValidator(ExamsCollection, 'name', values.name);
	errors.number = simpleSchemaValidator(ExamsCollection, 'number', values.number);
	
	return errors;
};


export default reduxForm({
	form: 'createExam',
	validate
})(CreateExam);
