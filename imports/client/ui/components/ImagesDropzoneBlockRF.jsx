import React from 'react';

import ImagesDropzoneBlock from './ImagesDropzoneBlock';


export default ({ input: { value, onChange } }) => {
	return <ImagesDropzoneBlock images={ value } onChange={ onChange } />;
}
