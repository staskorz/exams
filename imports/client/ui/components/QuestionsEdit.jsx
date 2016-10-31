import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Paper, Badge, FloatingActionButton } from 'material-ui';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import { cyan500 } from 'material-ui/styles/colors';
import IconRemove from 'material-ui/svg-icons/content/remove';
import IconAdd from 'material-ui/svg-icons/content/add';
import { FormattedMessage, injectIntl } from 'react-intl';
import ReactDropzone from 'react-dropzone';

import AnswersEdit from './AnswersEdit';
import ConfirmedFloatingActionButton from './ConfirmedFloatingActionButton';


class QuestionsEdit extends Component {
	style = {
		paper: {
			marginTop: '40px',
			paddingTop: '10px',
			position: 'relative'
		},
		
		weightContainer: {
			position: 'absolute',
			top: '10px',
			left: '40px'
		},
		
		weightLabel: {
			display: 'inline-block',
			marginTop: '15px',
			marginLeft: '8px',
			verticalAlign: 'top'
		},
		
		weight: {
			width: '65px'
		},
		
		questionText: {
			marginBottom: '14px'
		},
		
		fieldsContainer: {
			padding: '40px',
			paddingTop: '0px'
		},
		
		removeQuestionButton: {
			position: 'absolute',
			bottom: '10px',
			right: '10px'
		},
		
		addQuestionButton: {
			marginLeft: '10px',
			marginTop: '10px'
		},
		
		dropzone: {
			borderWidth: '2px',
			borderColor: 'rgba(0, 0, 0, 0.2)',
			borderStyle: 'dashed',
			borderRadius: '4px',
			height: '80px',
			width: '70px',
			position: 'relative',
			transition: 'all 0.5s'
		},
		
		dropzoneActive: {
			borderColor: cyan500,
			borderStyle: 'solid'
		},
		
		dropzoneIcon: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			height: '32px',
			width: '32px',
			color: 'rgba(0, 0, 0, 0.2)'
		}
	};
	
	
	parseNumber = numberStr => {
		if(/^\d+$/.test(numberStr)) {
			return Number(numberStr);
		} else {
			return numberStr;
		}
	};
	
	
	addQuestion = () => {
		const { fields } = this.props;
		
		fields.push({
			weight: 10
		});
	};
	
	
	handleFileDrop = (acceptedFiles, rejectedFiles) => {
		console.log('Accepted files: ', acceptedFiles);
		console.log('Rejected files: ', rejectedFiles);
	};
	
	
	componentWillMount() {
		const { fields } = this.props;
		
		if(fields.length === 0) {
			this.addQuestion();
		}
	}
	
	
	render() {
		const { fields, submitFailed, intl: { formatMessage } } = this.props;
		
		return (
				<div>
					{ fields.map((question, index) => (
							<Paper style={ this.style.paper } key={ index }>
								<Badge badgeContent={ index + 1 } secondary={ true } />
								
								<div style={ this.style.weightContainer }>
									<span style={ this.style.weightLabel }><FormattedMessage id='weight' /> </span>
									<Field component={ TextField } name={ `${ question }.weight` } type='number' style={ this.style.weight }
										   parse={ this.parseNumber } />
								</div>
								
								<div style={ this.style.fieldsContainer }>
									<Field component={ TextField } name={ `${ question }.text` }
										   multiLine={ true } rows={ 1 } rowsMax={ 7 } fullWidth
										   style={ this.style.questionText }
										   floatingLabelText={ <FormattedMessage id='questionBody' /> } /><br />
									
									<div>
										<ReactDropzone onDrop={ this.handleFileDrop }
													   style={ this.style.dropzone } activeStyle={ this.style.dropzoneActive }>
											<AddPhotoIcon style={ this.style.dropzoneIcon } />
										</ReactDropzone>
									</div>
									
									<FieldArray name={ `${ question }.answers` } component={ AnswersEdit } props={{ submitFailed }} />
								</div>
								<ConfirmedFloatingActionButton
										mini={ true }
										style={ this.style.removeQuestionButton }
										disabled={ fields.length < 2 }
										onConfirm={ () => fields.remove(index) }
										text={ formatMessage({ id: 'areYouSure' }) }
								>
									<IconRemove />
								</ConfirmedFloatingActionButton>
							</Paper>
					)) }
					
					<FloatingActionButton mini={true} style={ this.style.addQuestionButton } onClick={ this.addQuestion }>
						<IconAdd />
					</FloatingActionButton>
				</div>
		);
	}
}


export default injectIntl(QuestionsEdit);
