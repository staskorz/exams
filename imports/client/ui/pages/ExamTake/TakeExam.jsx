import React, { Component } from 'react'

import ExamInfo from './ExamInfo'
import ExamMissing from './ExamMissing'
import QuestionAsk from './QuestionAsk'
import ExamMark from './ExamMark'
import ExamMarkError from './ExamMarkError'
import shuffleArray from './shuffle-array'


export default class TakeExam extends Component {
	state = {
		questionNumber: -1,
		shuffledExam: null,
		unShuffleAnswers: null,
		examMark: -1,
		examMarkCalculating: false,
		examMarkError: false,
	}
	
	
	handleNextButtonClick = () => {
		const { questionNumber } = this.state
		const { exam: { questions } } = this.props
		
		if(questionNumber + 1 < questions.length) {
			this.setState({
				questionNumber: questionNumber + 1,
			})
		}
	}
	
	
	handlePrevButtonClick = () => {
		const { questionNumber } = this.state
		
		if(questionNumber > 0) {
			this.setState({
				questionNumber: questionNumber - 1,
			})
		}
	}
	
	
	handleFinishButtonClick = shuffledAnswers => {
		const { exam: { _id: examId } } = this.props
		
		const answers = this.unShuffleAnswers(shuffledAnswers)
		
		const answersObject = {
			examId,
			questions: answers.map(answer => ({ answers: answer })),
		}
		
		this.setState({
			examMarkCalculating: true,
		})
		
		insertAnswers.call(answersObject, (error, result) => {
			if(error) {
				console.log('insertAnswers error:', error)
				
				this.setState({
					examMarkCalculating: false,
					examMarkError: true,
				})
			} else {
				this.setState({
					examMarkCalculating: false,
					examMark: result,
				})
			}
		})
	}
	
	
	unShuffleAnswers = answers => {
		const { unShuffleAnswers } = this.state
		
		return unShuffleAnswers(answers)
	}
	
	
	updateShuffledExamInState = ({ ready, exam }) => {
		if(ready && exam) {
			const { name, questions } = exam
			
			const { shuffledArray, unShuffle } = shuffleArray(questions)
			
			const shuffledExam = Object.assign({}, { name, questions: shuffledArray })
			
			this.setState({
				shuffledExam,
				unShuffleAnswers: unShuffle,
			})
		}
	}
	
	
	componentWillMount() {
		this.updateShuffledExamInState(this.props)
	}
	
	
	componentWillReceiveProps(nextProps) {
		this.updateShuffledExamInState(nextProps)
	}
	
	
	render() {
		const { shuffledExam, questionNumber, examMark, examMarkCalculating, examMarkError } = this.state
		
		if(examMarkCalculating) {
			return <LoadingIndicator />
		}
		
		if(!shuffledExam) {
			return <ExamMissing />
		}
		
		if(questionNumber === -1) {
			return <ExamInfo exam={ shuffledExam } onStart={ this.handleNextButtonClick } />
		}
		
		if(examMarkError) {
			return <ExamMarkError />
		}
		
		if(examMark !== -1) {
			return <ExamMark exam={ shuffledExam } examMark={ examMark } />
		}
		
		return <QuestionAsk
				exam={ shuffledExam }
				questionNumber={ questionNumber }
				onNext={ this.handleNextButtonClick }
				onPrev={ this.handlePrevButtonClick } onFinish={ this.handleFinishButtonClick }
		/>
	}
}
