import React from 'react'
import { Badge } from 'material-ui'


export default ({ number, style, primary, secondary }) => <Badge
		badgeContent={ number }
		primary={ primary }
		secondary={ secondary }
		style={ style }
/>
