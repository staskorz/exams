import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField, Toggle } from 'redux-form-material-ui';
import { Paper, Badge, FloatingActionButton } from 'material-ui';
import IconRemove from 'material-ui/svg-icons/content/remove';

import AnswerEdit from './AnswerEdit';


export default class QuestionEdit extends Component {
	static propTypes = {
		questionNumber: PropTypes.number,
		onRemove: PropTypes.func
	};
	
	state = {
		numOfAnswers: 1,
		multipleAnswers: false
	};
	
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
		}
	};
	
	
	handleQuestionRemoveButtonClick = () => {
		this.props.onRemove(this.props.questionNumber);
	};
	
	
	render() {
		return (
				<Paper style={ this.style.paper }>
					<Badge badgeContent={ this.props.questionNumber } primary={ true } />
					
					<div style={ this.style.weightContainer }>
						<span style={ this.style.weightLabel }>Weight </span>
						<Field component={ TextField } name='weight' type='number' defaultValue={ 10 } style={ this.style.weight } />
					</div>
					
					<div style={ this.style.fieldsContainer }>
						<Field component={ TextField } name='text'
							   multiLine={ true } rows={ 1 } rowsMax={ 7 } fullWidth
							   floatingLabelText='Question Body' /><br />
						
						<Field component={ Toggle } name='multiple'
							   style={ this.style.multipleAnswersToggle } className='text' label='Multiple Answers'
							   labelPosition='right' />
						
						<AnswerEdit number={ 1 } />
						<AnswerEdit number={ 2 } />
					</div>
					<FloatingActionButton mini={true} style={ this.style.removeQuestionButton } onTouchTap={ this.handleQuestionRemoveButtonClick }>
						<IconRemove />
					</FloatingActionButton>
				</Paper>
		);
	}
}
