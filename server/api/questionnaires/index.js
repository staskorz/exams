import { Router } from 'express'

import validateId from '../../../common/validations/fields/id'
import validate from '../../../common/validations/questionnaire'
import sanitize from '../../../common/sanitizations/questionnaire'


const router = Router()


router.get('/', (req, res) => {
	const { db } = req
	
	const questionnairesCollection = db.collection('Questionnaires')
	
	const fields = {
		name: 1,
		published: 1,
		createdAt: 1,
		updatedAt: 1,
	}
	
	questionnairesCollection.find({}, fields).toArray().then(questionnaires => {
		res.json(questionnaires)
	}).catch(err => {
		const errorMessage = 'Error fetching questionnaires from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
})


router.get('/:questionnaireId', (req, res) => {
	const { db } = req
	
	const questionnaireId = req.params['questionnaireId']
	
	const questionnairesCollection = db.collection('Questionnaires')
	
	const fields = {
		name: 1,
		description: 1,
		published: 1,
		questions: 1,
	}
	
	questionnairesCollection.findOne({ _id: questionnaireId }, fields).then(questionnaire => {
		if(!questionnaire) {
			res.status(404).send('Questionnaire not found')
			
			return
		}
		
		res.json(questionnaire)
	}).catch(err => {
		const errorMessage = 'Error fetching questionnaire from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
})


router.put('/:questionnaireId', (req, res) => {
	const questionnaireId = req.params['questionnaireId']
	
	if(!validateId(questionnaireId)) {
		res.status(500).send('Invalid id')
		
		throw new Error('Invalid id')
	}
	
	const { db } = req
	
	const questionnairesCollection = db.collection('Questionnaires')
	
	const questionnaire = req.body
	
	const { errorsDetected } = validate(questionnaire, f => f)
	
	if(errorsDetected) {
		res.status(500).send('Invalid data')
		
		throw new Error('Invalid data')
	}
	
	const sanitizedQuestionnaire = sanitize(questionnaire)
	
	questionnairesCollection.update({ _id: questionnaireId }, { $set: sanitizedQuestionnaire }).then(() => {
		res.status(200).send()
	}).catch(err => {
		const errorMessage = 'Error updating questionnaire DB record.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
})


export default router
