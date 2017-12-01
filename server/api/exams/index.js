import { Router } from 'express'

import getAll from './get-all'
import getAllPublished from './get-all-published'
import getById from './get-by-id'
import getExamineeVersion from './get-examinee-version'
import create from './create'
import update from './update'


const router = Router()


router.get('/', getAll)
router.get('/published', getAllPublished)
router.get('/:examId', getById)
router.get('/examinee-version/:examId', getExamineeVersion)
router.post('/', create)
router.put('/:examId', update)


export default router
