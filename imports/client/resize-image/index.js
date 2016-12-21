import { resizeCanvas } from 'pica';

import shouldResize from './should-resize';
import calculateResizedImageSize from './calculate-resized-image-size';
import canvasToBlob from './canvas-to-blob';


export default (src, cb) => {
	const srcImage = new Image();
	srcImage.src = URL.createObjectURL(src);
	
	srcImage.onload = () => {
		const { height, width } = srcImage;
		
		if(shouldResize({ height, width })) {
			const newSize = calculateResizedImageSize({ height, width });
			
			const dst = document.createElement('canvas');
			
			dst.height = newSize.height;
			dst.width = newSize.width;
			
			resizeCanvas(srcImage, dst, {
				alpha: true,
				unsharpAmount: 80,
				unsharpRadius: 0.6,
				unsharpThreshold: 2
			}, err => {
				if(err) {
					cb(err);
				}
				
				canvasToBlob(dst, image => {
					cb(null, { image, ...newSize, resized: true });
				});
			})
		} else {
			cb(null, { image: src, height, width });
		}
	};
	
	srcImage.onerror = () => {
		cb('Source is not an image');
	};
};
