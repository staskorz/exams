import React from 'react'
import IconCheckboxChecked from 'material-ui/svg-icons/toggle/check-box'
import IconCheckboxUnchecked from 'material-ui/svg-icons/toggle/check-box-outline-blank'

import * as colors from '/imports/client/ui/colors'


export default ({ checked, style }) => checked ?
		<IconCheckboxChecked style={{ ...style, color: colors.neutral }} /> :
		<IconCheckboxUnchecked style={{ ...style, color: colors.primary }} />
