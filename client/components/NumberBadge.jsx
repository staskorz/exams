import React from 'react'
import { Badge } from 'material-ui'


export default ({ content, primary, secondary, style, badgeStyle }) => <Badge
		badgeContent={ content }
		primary={ primary }
		secondary={ secondary }
		style={ style }
		badgeStyle={ badgeStyle }
/>
