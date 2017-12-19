import React, { Component } from 'react';
import { FlatButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';


export default class AddAnswerButton extends Component {
	shouldComponentUpdate(nextProps) {
		const { disabled, onClick } = this.props;
		
		return nextProps.disabled !== disabled || nextProps.onClick !== onClick;
	};
	
	
	render() {
		const { disabled, onClick } = this.props;
		
		return <FlatButton
				label={ <FormattedMessage id='add' /> }
				secondary={ true }
				disabled={ disabled }
				onClick={ onClick }
		/>;
	}
}
