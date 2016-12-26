import React, { Component } from 'react';

import { findOne as findOneExam } from '/imports/api/exams/methods';
import ExamEditForm from '/imports/client/ui/components/ExamEditForm';


export default class EditExamContainer extends Component {
	state = {
		ready: false,
		exam: {}
	};
	
	
	transformFormFieldsServerToClient = formFields => {
		const { questions, ...restFormFields } = formFields;
		
		const transformedQuestions = questions.map(({ images, ...restQuestionFields }) => {
			if(images) {
				return {
					...restQuestionFields,
					images: images.map(imageData => {
						if(imageData) {
							const { imageBlob, ...restImageFields } = imageData;
							
							return {
								...restImageFields,
								image: imageBlob.blob
							};
						}
					})
				};
			} else {
				return {
					...restQuestionFields,
				};
			}
			
		});
		
		return {
			...restFormFields,
			questions: transformedQuestions
		};
	};
	
	
	componentDidMount() {
		const { examId } = this.props;
		
		findOneExam.call({ examId }, (err, res) => {
			if(err) {
				console.log('findOneExam error:', err);
			} else {
				this.setState({
					ready: true,
					exam: this.transformFormFieldsServerToClient(res)
				});
			}
		});
	};
	
	
	render() {
		const { ready, exam } = this.state;
		
		return (
				<ExamEditForm ready={ ready } initialValues={ exam } edit={ true } />
		);
	};
};
