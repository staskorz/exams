import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Paper, FloatingActionButton } from 'material-ui';
import IconRemove from 'material-ui/svg-icons/content/remove';
import IconAdd from 'material-ui/svg-icons/content/add';
import { FormattedMessage, injectIntl } from 'react-intl';

import AnswersEdit from './AnswersEdit';
import ConfirmedFloatingActionButton from './ConfirmedFloatingActionButton';
import NumberBadge from './NumberBadge';
import ImageDropzone from './ImageDropzone';


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
	
	
	removeQuestion = index => {
		const { fields: { remove } } = this.props;
		
		remove(index);
	};
	
	
	onImageChange = (err, image) => {
		if(err) {
			console.log('image drop error:', err);
		} else {
			console.log('image:', image);
		}
	};
	
	
	componentWillMount() {
		const { fields } = this.props;
		
		if(fields.length === 0) {
			this.addQuestion();
		}
	}
	
	
	render() {
		const { fields, submitFailed, intl: { formatMessage } } = this.props;
		
		const questionRemovalConfirmationMessage = formatMessage({ id: 'areYouSure' });
		
		return (
				<div>
					{ fields.map((question, index) => (
							<Paper style={ this.style.paper } key={ index }>
								<NumberBadge content={ index + 1 } secondary={ true } />
								
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
									
									<ImageDropzone onChange={ this.onImageChange } />
									
									<FieldArray name={ `${ question }.answers` } component={ AnswersEdit } props={{ submitFailed }} />
								</div>
								<ConfirmedFloatingActionButton
										mini={ true }
										style={ this.style.removeQuestionButton }
										disabled={ fields.length < 2 }
										onConfirm={ this.removeQuestion }
										onConfirmParam={ index }
										text={ questionRemovalConfirmationMessage }
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
