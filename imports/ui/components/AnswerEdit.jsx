import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import { Badge, FlatButton } from 'material-ui';


export default class AnswersEdit extends Component {
	static propTypes = {
		number: PropTypes.number,
		removable: PropTypes.bool
	};
	
	style = {
		answersContainer: {
			display: 'table'
		},
		
		numberContainer: {
			display: 'table-cell',
			verticalAlign: 'bottom',
			position: 'relative',
			paddingRight: '8px'
		},
		
		numberBadge: {
			display: 'inline-block',
			verticalAlign: 'bottom'
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
		},
		
		addRemoveAnswerButtonIcons: {
			width: '24px'
		}
	};
	
	
	render() {
		const textLabel = 'Answer ' + this.props.number;
		
		return (
				<div style={ this.style.answersContainer }>
					<div style={ this.style.numberContainer }>
						<Badge badgeContent={ this.props.number } secondary={ true } style={ this.style.numberBadge } />
					</div>
					<div style={ this.style.checkboxContainer }>
						<Field component={ Checkbox } name='correct' style={ this.style.checkbox } />
					</div>
					<Field component={ TextField } name='text'
							floatingLabelText={ textLabel }
							style={ this.style.answerTextField }
							multiLine={ true } rows={ 1 } rowsMax={ 7 } fullWidth
					/>
					<div style={ this.style.addRemoveAnswerButtonsContainer }>
						<FlatButton label='Remove' secondary={ true } disabled={ !this.props.removable } />
					</div>
				</div>
		);
	}
};
