import React from 'react';
import { Link } from 'react-router';
import { pinkA200 } from 'material-ui/styles/colors';


const FAILED_THRESHOLD = 70;


export default ({ mark, id }) => <Link
		to={ '/exam-answers/' + id }
		style={{ color: mark < FAILED_THRESHOLD ? pinkA200 : 'inherit' }}>
	{ mark }
</Link>;
