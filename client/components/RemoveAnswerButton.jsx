import React, { Component } from 'react'
import { FlatButton } from 'material-ui'
import { FormattedMessage } from 'react-intl'


export default class RemoveAnswerButton extends Component {
	shouldComponentUpdate(nextProps) {
		const { disabled, onClick, number } = this.props
		
		return nextProps.disabled !== disabled || nextProps.onClick !== onClick || nextProps.number !== number
	};
	
	handleClick = () => {
		const { onClick, number } = this.props
		
		onClick(number)
	}
	
	render() {
		const { disabled } = this.props
		
		return <FlatButton
				label={ <FormattedMessage id='remove' /> }
				secondary={ true }
				disabled={ disabled }
				onClick={ this.handleClick }
		/>
	}
}
