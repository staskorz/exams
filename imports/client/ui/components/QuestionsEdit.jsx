import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Paper, Badge, FloatingActionButton } from 'material-ui';
import IconRemove from 'material-ui/svg-icons/content/remove';
import IconAdd from 'material-ui/svg-icons/content/add';
import { FormattedMessage, injectIntl } from 'react-intl';

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
		}
	};
	
	
	addQuestion = () => {
		const { fields } = this.props;
		
		fields.push({
			weight: 10
		});
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
								<Badge badgeContent={ index + 1 } primary={ true } />
								
								<div style={ this.style.weightContainer }>
									<span style={ this.style.weightLabel }><FormattedMessage id='weight' /> </span>
									<Field component={ TextField } name={ `${ question }.weight` } type='number' style={ this.style.weight } />
								</div>
								
								<div style={ this.style.fieldsContainer }>
									<Field component={ TextField } name={ `${ question }.text` }
										   multiLine={ true } rows={ 1 } rowsMax={ 7 } fullWidth
										   style={ this.style.questionText }
										   floatingLabelText={ <FormattedMessage id='questionBody' /> } /><br />
									
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
