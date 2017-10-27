import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'material-ui'

import LoadingIndicator from '../components/LoadingIndicator'


export default class Home extends Component {
	style = {
		card: {
			padding: '16px',
		},
		
		cardText: {
			minHeight: '250px',
		},
	}
	
	
	prepareAnswersState = props => {
		
	}
	
	
	componentWillMount() {
		this.prepareAnswersState(this.props)
	}
	
	
	componentWillReceiveProps(nextProps) {
		this.prepareAnswersState(nextProps)
	}
	
	
	render() {
		const { currentUser } = this.props
		
		if(!currentUser || !currentUser.username) {
			return <LoadingIndicator />
		}
		
		const { username, englishName, hebrewName, employeeId } = currentUser
		
		let titleText
		
		if(hebrewName) {
			titleText = hebrewName
		} else if(englishName) {
			titleText = englishName
		} else {
			titleText = username
		}
		
		let subTitleText
		
		if(employeeId) {
			subTitleText = employeeId
		} else {
			subTitleText = ''
		}
		
		return <div className='main-container-padding'>
			<Card style={ this.style.card }>
				<CardTitle title={ titleText } subtitle={ subTitleText } />
				
				<CardText style={ this.style.cardText }>
				</CardText>
			</Card>
		</div>
	}
}
