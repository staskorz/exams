import React, { Component } from 'react'
import { Paper, RaisedButton } from 'material-ui'
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'


class ExamInfo extends Component {
	style = {
		mainPaper: {
			padding: '32px',
		},
		
		mainText: {
			fontSize: '24px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)',
		},
		
		actions: {
			paddingTop: '32px',
		},
		
		button: {
			marginRight: '16px',
		},
	}
	
	
	render() {
		const { router, onSave } = this.props
		
		return <div className='main-container-padding'>
			<Paper style={ this.style.mainPaper }>
				<div>
					<span style={ this.style.mainText }><FormattedMessage id='examMarkError' /></span>
				</div>
				
				<div style={ this.style.actions }>
					<RaisedButton label={ <FormattedMessage id='exit' /> } style={ this.style.button } onClick={ () => router.goBack() } />
					
					<RaisedButton label={ <FormattedMessage id='tryAgain' /> } style={ this.style.button } primary={ true } onClick={ onSave } />
				</div>
			</Paper>
		</div>
	}
}


export default withRouter(ExamInfo)
