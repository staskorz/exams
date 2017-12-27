import React from 'react'


const style = {
	tag: {
		marginLeft: '4px',
		marginRight: '4px',
		backgroundColor: 'rgb(224, 224, 224)',
		borderRadius: '16px',
		paddingLeft: '12px',
		paddingRight: '12px',
		lineHeight: '32px',
		display: 'inline-flex',
	},
}


export default ({ tags }) => <span>{
	tags.map((tag, index) => <span key={ index } style={ style.tag }>{ tag }</span>)
}</span>
