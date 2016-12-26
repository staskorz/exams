import { resizeCanvas } from 'pica';

import shouldResize from './should-resize';
import calculateResizedImageSize from './calculate-resized-image-size';
import canvasToBlob from './canvas-to-blob';


export default (src, cb) => {
	const srcImage = new Image();
	const imageObjectUrl = URL.createObjectURL(src);
	srcImage.src = imageObjectUrl;
	
	runResultCallback = (err, result) => {
		URL.revokeObjectURL(imageObjectUrl);
		
		cb(err, result);
	};
	
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
					runResultCallback(err);
				}
				
				canvasToBlob(dst, image => {
					runResultCallback(null, { image, ...newSize });
				});
			})
		} else {
			runResultCallback(null, { image: src, height, width });
		}
	};
	
	srcImage.onerror = () => {
		runResultCallback('Source is not an image');
	};
};
