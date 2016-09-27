import React, { Component } from 'react';

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';


export default class ExamResults extends Component {
	render() {
		const { ready } = this.props;
		
		if(!ready) {
			return <LoadingIndicator />;
		}
		
		return (
				<h1>Exam Results Placeholder</h1>
		);
	}
};
