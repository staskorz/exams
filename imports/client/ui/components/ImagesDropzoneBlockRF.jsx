import React from 'react';

import ImagesDropzoneBlock from './ImagesDropzoneBlock';


export default ({ input: { value, onChange, onBlur } }) => {
	const onChangeLocal = val => {
		onChange(val);
		onBlur(val)
	};
	
	return <ImagesDropzoneBlock images={ value } onChange={ onChangeLocal } />;
}
