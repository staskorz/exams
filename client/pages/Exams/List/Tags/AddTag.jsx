import React from 'react'
import { AutoComplete } from 'material-ui'


export default ({ availableTags, onAddTag, onAddTagClose }) => <AutoComplete
		name='tags'
		dataSource={ availableTags }
		filter={ AutoComplete.caseInsensitiveFilter }
		openOnFocus={ true }
		onNewRequest={ onAddTag }
		onClose={ onAddTagClose }
		ref={ element => element && element.focus() }
/>
