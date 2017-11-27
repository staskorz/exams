import { generate } from 'randomstring'

import { charset, length } from '../../../common/constants/id'


export default () => generate({
	charset,
	length,
})
