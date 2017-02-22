import React from 'react';
import { pinkA200 } from 'material-ui/styles/colors';


const FAILED_THRESHOLD = 70;


export default ({ mark }) => <span style={{ color: mark < FAILED_THRESHOLD ? pinkA200 : null }}>{ mark }</span>;
