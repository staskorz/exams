import React from 'react'
import enhance from './enhance'
import TagsSelection from './TagsSelection/index'


export default WrappedComponent => enhance(props => <div>
	<TagsSelection { ...props } />
	
	<WrappedComponent { ...props } />
</div>)
