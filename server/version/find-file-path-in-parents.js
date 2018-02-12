import { resolve } from 'path'
import { existsSync } from 'fs'


const MAX_DEPTH = 5


let count = 0


const find = (path, fileName) => {
	const filePath = resolve(path, fileName)
	
	if(count >= MAX_DEPTH) {
		throw new Error('Could not find ' + fileName)
	} else if(existsSync(filePath)) {
		return filePath
	} else {
		count++
		
		return find(resolve(path, '..'), fileName)
	}
}


export default fileName => find(__dirname, fileName)
