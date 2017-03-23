import React from 'react'

import QuestionNumber from './QuestionNumber'
import NumberedImagesBlock from '../NumberedImagesBlock'
import Variant from './Variant'


const style = {
	mainContainer: {
		marginTop: '32px',
	},
	
	questionNumber: {
		padding: 0,
		paddingRight: '24px',
		top: '-18px',
	},
	
	weight: {
		color: '#b1b1b1',
		marginRight: '8px',
		marginLeft: '8px',
		fontSize: 'small',
	},
	
	text: {
		fontSize: '24px',
		fontWeight: 'normal',
		lineHeight: '36px',
		color: 'rgba(0, 0, 0, 0.870588)',
		display: 'inline-block',
	},
	
	numberedImagesBlock: {
		paddingTop: '8px',
		paddingRight: '32px',
	},
}


export default ({ number, text, correct, weight, images, variants }) => <div style={ style.mainContainer }>
	<QuestionNumber number={ number } correct={ correct } style={ style.questionNumber } />
	<span style={ style.weight }>{ weight }</span>
	<span style={ style.text }>{ text }</span>
	<br />
	
	<NumberedImagesBlock images={ images } style={ style.numberedImagesBlock } />
	
	{ variants.map(({ text, userChecked, correctChecked }, index) => <Variant
			key={ index }
			number={ index + 1 }
			{ ...{ text, userChecked, correctChecked, correct } }
	/>) }
</div>
