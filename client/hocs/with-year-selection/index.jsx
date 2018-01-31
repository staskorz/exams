import React from 'react'

import TagsSelection from '../../components/TagsSelection'

import enhance from './enhance'


export default WrappedComponent => enhance(props => <div>
	<TagsSelection { ...props } />
	
	<WrappedComponent { ...props } />
</div>)
