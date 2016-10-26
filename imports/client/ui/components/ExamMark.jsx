import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { canGoBack } from '/imports/client/ui/browserHistoryCounter';


class ExamInfo extends Component {
	style = {
		mainPaper: {
			padding: '32px'
		},
		
		descriptionText: {
			fontSize: '16px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)',
			marginRight: '16px',
			width: '200px',
			display: 'inline-block'
		},
		
		mainText: {
			fontSize: '24px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)'
		},
		
		actions: {
			paddingTop: '32px'
		},
		
		button: {
			marginRight: '16px'
		}
	};
	
	
	render() {
		const { exam, examMark, router } = this.props;
		const { name } = exam || {};
		
		return (
				<div className='main-container-padding'>
					<Paper style={ this.style.mainPaper }>
						<div>
							<span style={ this.style.descriptionText }><FormattedMessage id='examName' />:</span>
							<span style={ this.style.mainText }>{ name }</span>
						</div>
						
						<div>
							<span style={ this.style.descriptionText }><FormattedMessage id='yourMark' />:</span>
							<span style={ this.style.mainText }>{ examMark }</span>
						</div>
						
						{ canGoBack() ?
								<div style={ this.style.actions }>
									<RaisedButton label={ <FormattedMessage id='exit' /> } primary={ true } onClick={ () => router.goBack() } />
								</div>
								
								:
								
								''
						}
					</Paper>
				</div>
		);
	};
}


export default withRouter(ExamInfo);
