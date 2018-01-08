import { compose, onlyUpdateForKeys, withHandlers } from 'recompose'
import { injectIntl } from 'react-intl'

import replaceArrayElement from '../../../util/replace-array-element'
import removeArrayElement from '../../../util/remove-array-element'


export default compose(
		injectIntl,
		
		onlyUpdateForKeys(['value', 'autoWeight']),
		
		withHandlers({
			onTextChange: ({ value, onChange, questionIndex }) => newText => {
				const { text, ...rest } = value
				
				onChange({
					text: newText,
					...rest,
				}, questionIndex)
			},
			
			onWeightChange: ({ value, onChange, questionIndex }) => newWeight => {
				const { weight, ...rest } = value
				
				onChange({
					weight: newWeight,
					...rest,
				}, questionIndex)
			},
			
			onImagesChange: ({ value, onChange, questionIndex }) => newImages => {
				const { images, ...rest } = value
				
				onChange({
					images: newImages,
					...rest,
				}, questionIndex)
			},
			
			onAnswerChange: ({ value, onChange, questionIndex }) => index => answer => {
				const { answers, ...rest } = value
				
				onChange({
					...rest,
					answers: replaceArrayElement(answers, index, answer),
				}, questionIndex)
			},
			
			onAnswerAdd: ({ value, onChange, questionIndex }) => () => {
				const { answers, ...rest } = value
				
				onChange({
					...rest,
					answers: [...answers, { text: '' }],
				}, questionIndex)
			},
			
			onAnswerRemove: ({ value, onChange, questionIndex }) => index => () => {
				const { answers, ...rest } = value
				
				onChange({
					...rest,
					answers: removeArrayElement(answers, index),
				}, questionIndex)
			},
		}),
)
