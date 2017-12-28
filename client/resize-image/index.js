import picaCreator from 'pica/dist/pica'

import shouldResize from './should-resize'
import calculateResizedImageSize from './calculate-resized-image-size'


const pica = picaCreator()


export default (src, cb) => {
	const srcImage = new Image()
	const imageObjectUrl = URL.createObjectURL(src)
	srcImage.src = imageObjectUrl
	
	const runResultCallback = (err, result) => {
		URL.revokeObjectURL(imageObjectUrl)
		
		cb(err, result)
	}
	
	srcImage.onload = () => {
		const { height, width } = srcImage
		
		if(shouldResize({ height, width })) {
			const newSize = calculateResizedImageSize({ height, width })
			
			const dst = document.createElement('canvas')
			
			dst.height = newSize.height
			dst.width = newSize.width
			
			pica.resize(srcImage, dst, {
				alpha: true,
				unsharpAmount: 80,
				unsharpRadius: 0.6,
				unsharpThreshold: 2,
			}).then(result => pica.toBlob(result, 'image/png')).then(image => {
				runResultCallback(null, { image, ...newSize })
			}).catch(err => {
				runResultCallback(err)
			})
		} else {
			runResultCallback(null, { image: src, height, width })
		}
	}
	
	srcImage.onerror = () => {
		runResultCallback('Source is not an image')
	}
}
