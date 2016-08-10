import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { TextField, Toggle } from 'redux-form-material-ui';
import { Paper, Badge, FloatingActionButton } from 'material-ui';
import IconRemove from 'material-ui/svg-icons/content/remove';
import IconAdd from 'material-ui/svg-icons/content/add';

import AnswersEdit from './AnswersEdit';
import ConfirmedFloatingActionButton from './ConfirmedFloatingActionButton';


export default class QuestionsEdit extends Component {
	style = {
		paper: {
			marginTop: '40px',
			paddingTop: '10px',
			position: 'relative'
		},
		
		weightContainer: {
			position: 'absolute',
			top: '10px',
			right: '40px'
		},
		
		weightLabel: {},
		
		weight: {
			width: '45px'
		},
		
		fieldsContainer: {
			padding: '40px',
			paddingTop: '0px'
		},
		
		multipleAnswersToggle: {},
		
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
	
	
	componentWillMount() {
		const { fields } = this.props;
		
		if(fields.length === 0) {
			fields.push({});
		}
	}
	
	
	render() {
		const { fields } = this.props;
		
		return (
				<div>
					{ fields.map((question, index) => (
							<Paper style={ this.style.paper } key={ index }>
								<Badge badgeContent={ index + 1 } primary={ true } />
								
								<div style={ this.style.weightContainer }>
									<span style={ this.style.weightLabel }>Weight </span>
									<Field component={ TextField } name={ `${ question }.weight` } type='number' defaultValue={ 10 }
										   style={ this.style.weight } />
								</div>
								
								<div style={ this.style.fieldsContainer }>
									<Field component={ TextField } name={ `${ question }.text` }
										   multiLine={ true } rows={ 1 } rowsMax={ 7 } fullWidth
										   floatingLabelText='Question Body' /><br />
									
									<Field component={ Toggle } name={ `${ question }.multiple` }
										   style={ this.style.multipleAnswersToggle } className='text' label='Multiple Correct Answers'
										   labelPosition='right' defaultToggled={ false } />
									
									<FieldArray name={ `${ question }.answers` } component={ AnswersEdit } />
								</div>
								<ConfirmedFloatingActionButton
										mini={ true }
										style={ this.style.removeQuestionButton }
										disabled={ fields.length < 2 }
										onConfirm={ () => fields.remove(index) }
										text='Are you sure?'
								>
									<IconRemove />
								</ConfirmedFloatingActionButton>
							</Paper>
					)) }
					
					<FloatingActionButton mini={true} style={ this.style.addQuestionButton } onClick={ () => fields.push({}) }>
						<IconAdd />
					</FloatingActionButton>
				</div>
		);
	}
}
