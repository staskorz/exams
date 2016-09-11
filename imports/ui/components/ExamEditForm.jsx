import React, { Component } from 'react';
import { FlatButton } from 'material-ui';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import { withRouter } from 'react-router';

import ExamsCollection from '/imports/api/exams/collection';
import { insert as insertExam, update as updateExam } from '/imports/api/exams/methods';
import simpleSchemaValidator from '/imports/client/validators/simple-schema-validator';
import QuestionsEdit from '/imports/ui/components/QuestionsEdit';
import LoadingIndicator from '/imports/ui/components/LoadingIndicator';
import ConfirmedFlatButton from '/imports/ui/components/ConfirmedFlatButton';
import ConfirmationDialog from '/imports/ui/components/ConfirmationDialog';


class ExamEditForm extends Component {
	state = {
		saveConfirmationDialogOpen: false,
		formFields: null
	};
	
	
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
		
		examName: {
			marginBottom: '28px'
		},
		
		examNumber: {
			marginBottom: '28px'
		}
	};
	
	
	goBack = () => {
		const { router } = this.props;
		
		router.push('/list-exams');
	};
	
	
	handleSubmit = formFields => {
		this.setState({
			saveConfirmationDialogOpen: true,
			formFields
		});
	};
	
	
	closeSaveConfirmationDialog = () => {
		this.setState({
			saveConfirmationDialogOpen: false
		});
	};
	
	
	handleSaveConfirmationDialogYesButtonClick = () => {
		this.closeSaveConfirmationDialog();
		
		this.save();
	};
	
	
	handleSaveConfirmationDialogNoButtonClick = () => {
		this.closeSaveConfirmationDialog();
	};
	
	
	save = () => {
		const { formFields } = this.state;
		
		console.log('formFields:', formFields);
		
		const { edit } = this.props;
		
		if(edit) {
			updateExam.call(formFields, (error, result) => {
				if(error) {
					console.log('updateExam error:', error);
				} else {
					this.goBack();
				}
			});
		} else {
			insertExam.call(formFields, (error, result) => {
				if(error) {
					console.log('insertExam error:', error);
				} else {
					this.goBack();
				}
			});
		}
	};
	
	
	render() {
		const { handleSubmit, submitFailed, edit, ready } = this.props;
		
		if(edit && !ready) {
			return (
					<LoadingIndicator />
			);
		}
		
		let title;
		
		if(edit) {
			title = 'Edit Exam';
		} else {
			title = 'Create Exam';
		}
		
		return (
				<div style={ this.style.mainContainer }>
					<h1 style={ this.style.h1 }>{ title }</h1>
					
					<form>
						<div className='formContainer' style={ this.style.formContainer }>
							<Field component={ TextField } name='name' floatingLabelText='Exam Name' style={ this.style.examName } /><br />
							<Field component={ TextField } name='number' type='number' floatingLabelText='Exam Number'
								   style={ this.style.examNumber } />
							<Field component={ Checkbox } name='published' label='Published' />
							
							<FieldArray name='questions' component={ QuestionsEdit } props={{ submitFailed }} />
						</div>
						
						<div className='buttonsContainer'>
							<FlatButton label='Save' primary={ true } onClick={ handleSubmit(this.handleSubmit) } />
							<ConfirmedFlatButton text='Are you sure?' label='Cancel' onConfirm={ this.goBack } />
						</div>
					</form>
					
					<ConfirmationDialog
							open={ this.state.saveConfirmationDialogOpen }
							text='Are you sure?'
							onYesButtonClick={ this.handleSaveConfirmationDialogYesButtonClick }
							onNoButtonClick={ this.handleSaveConfirmationDialogNoButtonClick }
					/>
				</div>
		);
	}
}


const validate = values => {
	const errors = {
		questions: []
	};
	
	if(values.questions) {
		let totalWeight = 0;
		let weightHasErrors = false;
		
		values.questions.forEach((elem, index) => {
			const weightError = simpleSchemaValidator(ExamsCollection, 'questions.$.weight', elem.weight);
			
			if(weightError) {
				errors.questions[index] = { weight: weightError };
				weightHasErrors = true;
			} else {
				totalWeight += elem.weight;
			}
			
			errors.questions[index] = Object.assign({}, errors.questions[index], {
				text: simpleSchemaValidator(ExamsCollection, 'questions.$.text', elem.text)
			});
			
			if(elem.answers) {
				errors.questions[index].answers = [];
				
				if(!elem.answers.some(elem2 => elem2 && elem2.correct)) {
					errors.questions[index].answers._error = 'At least one correct answer required';
				}
				
				elem.answers.forEach((elem2, index2) => {
					errors.questions[index].answers[index2] = {
						text: simpleSchemaValidator(ExamsCollection, 'questions.$.answers.$.text', elem2.text)
					};
				});
			}
		});
		
		if(!weightHasErrors) {
			let weightError;
			
			if(totalWeight > 100) {
				weightError = totalWeight + " > 100";
			} else if(totalWeight < 100) {
				weightError = totalWeight + " < 100";
			}
			
			if(weightError) {
				values.questions.forEach((elem, index) => {
					errors.questions[index] = Object.assign({}, errors.questions[index], { weight: weightError });
				});
			}
		}
	}
	
	errors.name = simpleSchemaValidator(ExamsCollection, 'name', values.name);
	errors.number = simpleSchemaValidator(ExamsCollection, 'number', values.number);
	
	return errors;
};


const CreateExamWithRouter = withRouter(ExamEditForm);


export default reduxForm({
	form: 'createExam',
	validate,
	enableReinitialize: true
})(CreateExamWithRouter);
