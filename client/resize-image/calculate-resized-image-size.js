import { HEIGHT, WIDTH } from './constants'


export default ({ height, width }) => {
	const heightRatio = HEIGHT / height
	
	const newWidth = Math.round(width * heightRatio)
	
	if(newWidth <= WIDTH) {
		return {
			height: HEIGHT,
			width: newWidth,
		}
	}
	
	const widthRatio = WIDTH / width
	
	return {
		height: Math.round(height * widthRatio),
		width: WIDTH,
	}
}
