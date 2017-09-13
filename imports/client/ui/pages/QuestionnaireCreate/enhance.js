import { withState } from 'recompose'


const initialValue = {
	questionnaireName: 'TestQuestionnaire',
	published: true,
	
	questions: [
		{
			text: 'Question 1 Text',
			
			answers: [
				{
					text: 'Question 1 Answer 1 Text',
				},
				
				{
					text: 'Question 1 Answer 2 Text',
					freeText: true,
				},
				
				{
					text: 'Question 1 Answer 3 Text',
				},
			],
		},
		
		{
			text: 'Question 2 Text',
			multipleChoice: true,
			
			answers: [
				{
					text: 'Question 2 Answer 1 Text',
				},
				
				{
					text: 'Question 2 Answer 2 Text',
				},
				
				{
					text: 'Question 2 Answer 3 Text',
					freeText: true,
				},
			],
		},
	],
}


export default withState('value', 'setValue', initialValue)
