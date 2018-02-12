import { readFileSync } from 'fs'

import find from './find-file-path-in-parents'


const path = find('package.json')
const content = readFileSync(path)
const { version } = JSON.parse(content)

export default version
