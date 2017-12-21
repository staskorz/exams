import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui'


const style = {
	card: {
		padding: '16px',
	},
	
	cardText: {
		minHeight: '250px',
	},
}


export default ({ currentUser: { username, englishName, hebrewName, employeeId } }) => {
	const titleText = hebrewName ? hebrewName : (englishName ? englishName : username)
	
	const subTitleText = employeeId ? employeeId : ''
	
	return <div className='main-container-padding'>
		<Card style={ style.card }>
			<CardTitle title={ titleText } subtitle={ subTitleText } />
			
			<CardText style={ style.cardText } />
		</Card>
	</div>
}
