import { resizeCanvas } from 'pica';

import canvasToBlob from './canvas-to-blob';


export default (src, cb) => {
	console.log('src:', src);
	
	const srcImage = new Image();
	srcImage.src = URL.createObjectURL(src);
	
	const dst = document.createElement('canvas');
	dst.width = 200;
	dst.height = 300;
	
	srcImage.onload = () => {
		resizeCanvas(srcImage, dst, {
			unsharpAmount: 80,
			unsharpRadius: 0.6,
			unsharpThreshold: 2
		}, err => {
			if(err) {
				console.log('error resizing image:', err);
				
				cb(err);
			}
			
			console.log('image resized successfully');
			
			canvasToBlob(dst, blob => {
				console.log('dst blob:', blob);
				
				cb(null, blob);
			});
		})
	};
};
