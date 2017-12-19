import React from 'react'

import { Badge } from 'material-ui'


export default ({ number, correct, style }) => <Badge
		badgeContent={ number }
		style={ style }
		badgeStyle={ { backgroundColor: correct ? '#01bc01' : 'red', color: 'white' } }
/>
