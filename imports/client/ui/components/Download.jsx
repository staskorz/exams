import React from 'react'
import { IconButton } from 'material-ui'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'

import csvExport from '../../../../client/util/csv-export'


const handleClick = (generate, filename) => () => {
	csvExport(filename, generate())
}


export default ({ generate, filename }) => <IconButton
		onClick={ handleClick(generate, filename) }>
	<DownloadIcon />
</IconButton>
