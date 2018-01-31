import React from 'react'
import enhance from './enhance'
import TagsSelection from './TagsSelection'


export default WrappedComponent => enhance(props => <div>
	<TagsSelection { ...props } />
	
	<WrappedComponent { ...props } />
</div>)
