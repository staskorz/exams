import React, { Component } from 'react';
import { Field } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import { Badge, FlatButton } from 'material-ui';


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
									<Badge badgeContent={ index + 1 } secondary={ true } style={ this.style.numberBadge } />
								</div>
								<div style={ this.style.checkboxContainer }>
									<Field component={ Checkbox } name={ `${ answer }.correct` } style={ this.style.checkbox }
										   iconStyle={ iconStyle } />
								</div>
								<Field component={ TextField } name={ `${ answer }.text` }
									   floatingLabelText={ 'Answer ' + (index + 1) }
									   style={ this.style.answerTextField }
									   multiLine={ true } rows={ 1 } rowsMax={ 7 } fullWidth
								/>
								<div style={ this.style.addRemoveAnswerButtonsContainer }>
									<FlatButton label='Remove' secondary={ true } disabled={ fields.length < 3 }
												onClick={ () => fields.remove(index) }
									/>
								</div>
							</div>
					)) }
					
					<FlatButton label='Add' secondary={ true } disabled={ fields.length > 3 } onClick={ () => fields.push({}) } />
				</div>
		);
	};
};
