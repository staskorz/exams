import React, { Component } from 'react';
import { Badge, TextField, Checkbox, RadioButtonGroup, RadioButton, IconButton } from 'material-ui';
import IconAdd from 'material-ui/svg-icons/content/add-circle'
import IconRemove from 'material-ui/svg-icons/content/remove-circle'


export default class AnswersEdit extends Component {
	style = {
		answersContainer: {
			display: 'table'
		},
		
		numberContainer: {
			display: 'table-cell',
			verticalAlign: 'bottom'
		},
		
		number: {
			fontSize: '16px',
			lineHeight: '24px',
			fontFamily: 'Roboto, sans-serif',
			marginBottom: '11px',
			position: 'relative',
			display: 'inline-block'
		},
		
		checkboxContainer: {
			display: 'table-cell',
			verticalAlign: 'bottom'
		},
		
		checkbox: {
			marginBottom: '12px',
			marginLeft: '8px'
		},
		
		answerTextField: {
			display: 'table-cell'
		},
		
		addRemoveAnswerButtonsContainer: {
			whiteSpace: 'nowrap',
			display: 'table-cell',
			verticalAlign: 'bottom'
		},
		
		addRemoveAnswerButtons: {
			display: 'inline-block',
			verticalAlign: 'bottom',
			paddingLeft: '0px',
			paddingRight: '0px'
		},
		
		addRemoveAnswerButtonIcons: {
			width: '24px'
		}
	};
	
	
	render() {
		return (
				<div style={ this.style.answersContainer }>
					<div style={ this.style.numberContainer }>
						<span style={ this.style.number }>1.</span>
					</div>
					<div style={ this.style.checkboxContainer }>
						<Checkbox style={ this.style.checkbox } />
					</div>
					<TextField
							floatingLabelText='Answer 1' hintText='Answer 1'
							style={ this.style.answerTextField }
							multiLine={ true } rows={ 1 } rowsMax={ 7 } fullWidth
					/>
					<div style={ this.style.addRemoveAnswerButtonsContainer }>
						{/*<IconButton iconStyle={ this.style.addRemoveAnswerButtonIcons } style={ this.style.addRemoveAnswerButtons }>
							<IconAdd />
						</IconButton>*/}
						<IconButton iconStyle={ this.style.addRemoveAnswerButtonIcons } style={ this.style.addRemoveAnswerButtons }>
							<IconRemove />
						</IconButton>
					</div>
				</div>
		);
	}
};
