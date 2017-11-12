import React, { Component } from 'react';
import { Field } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';

import AddAnswerButton from './AddAnswerButton';
import RemoveAnswerButton from './RemoveAnswerButton';
import NumberBadge from './NumberBadge';


export default class AnswersEdit extends Component {
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
	
	
	handleAddAnswerButtonClick = () => {
		const { fields } = this.props;
		
		fields.push({});
	};
	
	
	handleRemoveAnswerButtonClick = index => {
		const { fields: { remove } } = this.props;
		
		remove(index);
	};
	
	
	normalizeBoolean = b => !!b
	
	
	componentWillMount() {
		const { fields } = this.props;
		
		if(fields.length === 0) {
			fields.push({});
			fields.push({});
		}
	}
	
	
	render() {
		const { fields, submitFailed, meta: { error } } = this.props;
		
		let iconStyle;
		
		if(error && submitFailed) {
			iconStyle = {
				fill: 'rgb(244, 67, 54)'
			};
		}
		
		return (
				<div>
					{ fields.map((answer, index) => (
							<div style={ this.style.answersContainer } key={ index }>
								<div style={ this.style.numberContainer }>
									<NumberBadge content={ index + 1 } primary={ true } style={ this.style.numberBadge } />
								</div>
								<div style={ this.style.checkboxContainer }>
									<Field component={ Checkbox } name={ `${ answer }.correct` } style={ this.style.checkbox }
											normalize={ this.normalizeBoolean } iconStyle={ iconStyle } />
								</div>
								<Field component={ TextField } name={ `${ answer }.text` }
										floatingLabelText={ <FormattedMessage id='answer' values={{ number: index + 1 }} /> }
										style={ this.style.answerTextField }
										multiLine={ true } rows={ 1 } rowsMax={ 7 } fullWidth
								/>
								<div style={ this.style.addRemoveAnswerButtonsContainer }>
									<RemoveAnswerButton disabled={ fields.length < 3 } onClick={ this.handleRemoveAnswerButtonClick }
											number={ index } />
								</div>
							</div>
					)) }
					
					<AddAnswerButton disabled={ fields.length > 3 } onClick={ this.handleAddAnswerButtonClick } />
				</div>
		);
	};
};
