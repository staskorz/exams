import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import { withRouter } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';

import ExamsCollection from '/imports/api/exams/collection';
import { insert as insertExam, update as updateExam } from '/imports/api/exams/methods';
import simpleSchemaValidator from '/imports/client/validators/simple-schema-validator';
import QuestionsEdit from '/imports/client/ui/components/QuestionsEdit';
import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';
import ConfirmedRaisedButton from '/imports/client/ui/components/ConfirmedRaisedButton';
import ConfirmationDialog from '/imports/client/ui/components/ConfirmationDialog';


class ExamEditForm extends Component {
	state = {
		saveConfirmationDialogOpen: false,
		formFields: null,
		canLeave: false
	};
	
	
	style = {
		mainContainer: {
			paddingBottom: '120px',
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
		
		submissionError: {
			height: '24px',
			marginTop: '16px',
			marginRight: '36px',
			fontFamily: 'Roboto, sans-serif',
			fontSize: '12px',
			lineHeight: '12px',
			color: 'rgb(244, 67, 54)'
		},
		
		button: {
			marginLeft: '8px',
			marginRight: '8px'
		}
	};
	
	
	goBack = () => {
		const { router } = this.props;
		
		this.setState({
			canLeave: true
		});
		
		this.state.canLeave = true;
		
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
	
	
	transformFormFieldsClientToServer = formFields => {
		const { questions, ...restFormFields } = formFields;
		
		const transformedQuestions = questions.map(({ images, ...restQuestionFields }) => {
			if(images) {
				return {
					...restQuestionFields,
					images: images.map(imageData => {
						if(imageData) {
							const { image, ...restImageFields } = imageData;
							
							return {
								...restImageFields,
								imageBlob: {
									blob: image
								}
							};
						}
					})
				};
			} else {
				return {
					...restQuestionFields,
				};
			}
			
		});
		
		return {
			...restFormFields,
			questions: transformedQuestions
		};
	};
	
	
	save = () => {
		const { formFields: rawFormFields } = this.state;
		
		const formFields = this.transformFormFieldsClientToServer(rawFormFields);
		
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
	
	
	updateCanLeaveState = props => {
		const { dirty, anyTouched } = props;
		
		this.setState({
			canLeave: !dirty || !anyTouched
		});
	};
	
	
	componentWillMount() {
		this.updateCanLeaveState(this.props);
	}
	
	
	componentDidMount() {
		const { router: { setRouteLeaveHook }, route } = this.props;
		
		setRouteLeaveHook(route, this.routerWillLeave);
	};
	
	
	componentWillReceiveProps(nextProps) {
		this.updateCanLeaveState(nextProps);
	}
	
	
	routerWillLeave = () => {
		const { canLeave } = this.state;
		
		if(!canLeave) {
			return 'Are you sure you want to leave this page?';
		}
	};
	
	
	render() {
		const { handleSubmit, submitFailed, invalid, edit, ready, submitting, intl: { formatMessage } } = this.props;
		
		if(edit && !ready) {
			return (
					<LoadingIndicator />
			);
		}
		
		let title;
		
		if(edit) {
			title = <FormattedMessage id='editExam' />;
		} else {
			title = <FormattedMessage id='createExam' />;
		}
		
		return (
				<div style={ this.style.mainContainer } className='main-container-padding'>
					<h1 style={ this.style.h1 }>{ title }</h1>
					
					<form>
						<div className='formContainer' style={ this.style.formContainer }>
							<Field component={ TextField } name='name'
									floatingLabelText={ <FormattedMessage id='examName' /> }
									style={ this.style.examName } /><br />
							<Field component={ Checkbox } name='published'
									label={ <FormattedMessage id='published' /> } />
							
							<FieldArray name='questions' component={ QuestionsEdit } props={{ submitFailed }} />
						</div>
						
						<div style={ this.style.submissionError }>{ submitFailed && invalid ?
								<FormattedMessage id='formHasErrors' /> : ' ' }</div>
						
						<div className='buttonsContainer'>
							<RaisedButton style={ this.style.button } label={ <FormattedMessage id='save' /> }
									primary={ true }
									onClick={ handleSubmit(this.handleSubmit) } disabled={ submitting } />
							<ConfirmedRaisedButton style={ this.style.button }
									text={ formatMessage({ id: 'areYouSure' }) }
									label={ <FormattedMessage id='cancel' /> } onConfirm={ this.goBack }
									disabled={ submitting } />
						</div>
					</form>
					
					<ConfirmationDialog
							open={ this.state.saveConfirmationDialogOpen }
							text={ formatMessage({ id: 'areYouSure' }) }
							onYesButtonClick={ this.handleSaveConfirmationDialogYesButtonClick }
							onNoButtonClick={ this.handleSaveConfirmationDialogNoButtonClick }
					/>
				</div>
		);
	}
}


const validate = rawValues => {
	const values = rawValues || {};
	
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
	
	return errors;
};


const withReduxForm = reduxForm({
	form: 'createExam',
	validate,
	enableReinitialize: true
});


export default injectIntl(withReduxForm(withRouter(ExamEditForm)));
