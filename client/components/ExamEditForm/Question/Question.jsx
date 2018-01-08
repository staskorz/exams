import React from 'react'
import { Paper, FlatButton } from 'material-ui'
import IconRemove from 'material-ui/svg-icons/content/remove'
import { FormattedMessage } from 'react-intl'

import TextField from '../../TextField'
import ConfirmedFloatingActionButton from '../../ConfirmedFloatingActionButton'
import NumberBadge from '../../NumberBadge'
import ImagesDropzoneBlock from '../../ImagesDropzoneBlock'

import Answer from './Answer'


const style = {
	paper: {
		marginTop: '40px',
		paddingTop: '10px',
		position: 'relative',
	},
	
	weightContainer: {
		position: 'absolute',
		top: '10px',
		left: '40px',
	},
	
	weightLabel: {
		display: 'inline-block',
		marginTop: '15px',
		marginLeft: '8px',
		verticalAlign: 'top',
	},
	
	weight: {
		width: '65px',
	},
	
	questionText: {
		marginBottom: '14px',
	},
	
	fieldsContainer: {
		padding: '40px',
		paddingTop: '0px',
	},
	
	removeQuestionButton: {
		position: 'absolute',
		bottom: '10px',
		right: '10px',
	},
}


export default ({
					value, errors, onTextChange, onWeightChange, onImagesChange, onAnswerChange, onAnswerAdd,
					onAnswerRemove, onRemove, removable, intl: { formatMessage }, questionIndex, autoWeight,
				}) => <Paper style={ style.paper }>
	<NumberBadge content={ questionIndex + 1 } secondary={ true } />
	
	{ autoWeight ? null : <div style={ style.weightContainer }>
		<span style={ style.weightLabel }><FormattedMessage id='weight' /></span>
		
		<TextField
				name='weight'
				value={ value.weight }
				errorText={ errors.weight }
				onChange={ onWeightChange }
				type='number'
				style={ style.weight }
		/>
	</div> }
	
	<div style={ style.fieldsContainer }>
		<TextField
				name='text'
				value={ value.text }
				errorText={ errors.text }
				onChange={ onTextChange }
				multiLine={ true }
				rows={ 1 }
				rowsMax={ 7 }
				fullWidth
				style={ style.questionText }
				label={ <FormattedMessage id='questionBody' /> }
		/>
		
		<ImagesDropzoneBlock value={ value.images } onChange={ onImagesChange } />
		
		{ value.answers.map((answer, index) => <Answer
				value={ answer }
				errors={ errors.answers[index] }
				onChange={ onAnswerChange(index) }
				onRemove={ onAnswerRemove(index) }
				answerIndex={ index }
				removable={ value.answers.length > 2 }
				key={ index }
		/>) }
		
		<FlatButton
				label={ <FormattedMessage id='add' /> }
				secondary={ true }
				disabled={ value.answers.length > 3 }
				onClick={ onAnswerAdd }
		/>
	</div>
	
	<ConfirmedFloatingActionButton
			mini={ true }
			style={ style.removeQuestionButton }
			disabled={ !removable }
			onConfirm={ () => onRemove(questionIndex) }
			text={ formatMessage({ id: 'areYouSure' }) }
	>
		<IconRemove />
	</ConfirmedFloatingActionButton>
</Paper>
