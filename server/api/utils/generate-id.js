import { generate } from 'randomstring'


const charset = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz'
const length = 17


export default () => generate({
	charset,
	length,
})
