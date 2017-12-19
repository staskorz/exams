import React from 'react'

import NumberedImage from './NumberedImage'


export default ({ images, style: propsStyle }) => {
	if(!images || !images.length || !images[0]) {
		return <div></div>
	}
	
	return <div style={ propsStyle }>
		{ images.map((imageData, index) => imageData ?
				<NumberedImage image={ imageData.image } number={ index + 1 } key={ index } /> : '') }
	</div>
}
