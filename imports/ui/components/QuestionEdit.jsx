import React, { Component, PropTypes } from 'react';
import { Paper, Badge, TextField, Checkbox, FloatingActionButton } from 'material-ui';
import IconRemove from 'material-ui/svg-icons/content/remove';

import AnswersEdit from './AnswersEdit';


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
		
		fieldsContainer: {
			padding: '40px',
			paddingTop: '0px'
		},
		
		numOfAnswersLabel: {
			color: '#000000de'
		},
		
		numOfAnswers: {
			width: '25px'
		},
		
		multipleAnswersCheckbox: {
			width: '174px'
		},
		
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
					
					<div style={ this.style.fieldsContainer }>
						<TextField name='text'
								   multiLine={ true } rows={ 1 } rowsMax={ 7 } fullWidth
								   floatingLabelText='Question Body' hintText='Question Body' /><br />
						
						<span style={ this.style.numOfAnswersLabel }>Number Of Answers </span>
						<TextField name='numOfAnswers'
								   type='number' defaultValue={ 4 }
								   style={ this.style.numOfAnswers } />
						
						<Checkbox style={ this.style.multipleAnswersCheckbox } label='Multiple Answers' labelPosition='left' />
						
						<AnswersEdit />
					</div>
					<FloatingActionButton mini={true} style={ this.style.removeQuestionButton } onTouchTap={ this.handleQuestionRemoveButtonClick }>
						<IconRemove />
					</FloatingActionButton>
				</Paper>
		);
	}
}
