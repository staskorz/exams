import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'
import { Field, FieldArray } from 'redux-form'
import { TextField, Checkbox } from 'redux-form-material-ui'
import { FormattedMessage } from 'react-intl'

import QuestionsEdit from './QuestionsEdit'
import ConfirmedRaisedButton from './ConfirmedRaisedButton'
import ConfirmationDialog from './ConfirmationDialog'


export default class ExamEditForm extends Component {
	state = {
		saveConfirmationDialogOpen: false,
		formFields: null,
		canLeave: false,
	}
	
	
	style = {
		mainContainer: {
			paddingBottom: '120px',
			paddingTop: '20px',
		},
		
		h1: {
			marginBottom: '0px',
		},
		
		formContainer: {
			paddingTop: '0px',
		},
		
		examName: {
			marginBottom: '28px',
		},
		
		submissionError: {
			height: '24px',
			marginTop: '16px',
			marginRight: '36px',
			fontFamily: 'Roboto, sans-serif',
			fontSize: '12px',
			lineHeight: '12px',
			color: 'rgb(244, 67, 54)',
		},
		
		button: {
			marginLeft: '8px',
			marginRight: '8px',
		},
	}
	
	
	goBack = () => {
		const { router } = this.props
		
		this.setState({
			canLeave: true,
		})
		
		this.state.canLeave = true
		
		router.push('/list-exams')
	}
	
	
	handleSubmit = formFields => {
		this.setState({
			saveConfirmationDialogOpen: true,
			formFields,
		})
	}
	
	
	closeSaveConfirmationDialog = () => {
		this.setState({
			saveConfirmationDialogOpen: false,
		})
	}
	
	
	handleSaveConfirmationDialogYesButtonClick = () => {
		this.closeSaveConfirmationDialog()
		
		this.save()
	}
	
	
	handleSaveConfirmationDialogNoButtonClick = () => {
		this.closeSaveConfirmationDialog()
	}
	
	
	transformFormFieldsClientToServer = formFields => {
		const { questions, ...restFormFields } = formFields
		
		const transformedQuestions = questions.map(({ images, ...restQuestionFields }) => {
			if(images) {
				return {
					...restQuestionFields,
					images: images.map(imageData => {
						if(imageData) {
							const { image, ...restImageFields } = imageData
							
							return {
								...restImageFields,
								imageBlob: {
									blob: image,
								},
							}
						}
					}),
				}
			} else {
				return restQuestionFields
			}
		})
		
		return {
			...restFormFields,
			questions: transformedQuestions,
		}
	}
	
	
	save = () => {
		const { formFields: rawFormFields } = this.state
		
		const formFields = this.transformFormFieldsClientToServer(rawFormFields)
		
		const { onSave } = this.props
		
		this.setState({
			canLeave: true,
		}, () => onSave(formFields))
	}
	
	
	updateCanLeaveState = props => {
		const { dirty, anyTouched, edit } = props
		
		this.setState({
			canLeave: (edit && !dirty) || (!edit && !anyTouched),
		})
	}
	
	
	componentWillMount() {
		this.updateCanLeaveState(this.props)
	}
	
	
	componentDidMount() {
		const { router: { setRouteLeaveHook }, route } = this.props
		
		setRouteLeaveHook(route, this.routerWillLeave)
	};
	
	
	componentWillReceiveProps(nextProps) {
		this.updateCanLeaveState(nextProps)
	}
	
	
	routerWillLeave = () => {
		const { canLeave } = this.state
		
		if(!canLeave) {
			return 'Are you sure you want to leave this page?'
		}
	}
	
	
	normalizeBoolean = b => !!b
	
	
	render() {
		const { canLeave } = this.state
		
		const { handleSubmit, submitFailed, invalid, edit, submitting, intl: { formatMessage } } = this.props
		
		let title
		
		if(edit) {
			title = <FormattedMessage id='editExam' />
		} else {
			title = <FormattedMessage id='createExam' />
		}
		
		return (
				<div style={ this.style.mainContainer } className='main-container-padding'>
					<h1 style={ this.style.h1 }>{ title }</h1>
					
					<form>
						<div className='formContainer' style={ this.style.formContainer }>
							<Field component={ TextField } name='name'
									floatingLabelText={ <FormattedMessage id='examName' /> }
									style={ this.style.examName } /><br />
							<Field component={ Checkbox } normalize={ this.normalizeBoolean } name='published'
									label={ <FormattedMessage id='published' /> } />
							
							<FieldArray name='questions' component={ QuestionsEdit } props={ { submitFailed } } />
						</div>
						
						<div style={ this.style.submissionError }>{ submitFailed && invalid ?
								<FormattedMessage id='formHasErrors' /> : ' ' }</div>
						
						<div className='buttonsContainer'>
							<RaisedButton style={ this.style.button } label={ <FormattedMessage id='save' /> }
									primary={ true }
									onClick={ handleSubmit(this.handleSubmit) } disabled={ submitting } />
							<ConfirmedRaisedButton style={ this.style.button } skipConfirmation={ canLeave }
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
		)
	}
}
