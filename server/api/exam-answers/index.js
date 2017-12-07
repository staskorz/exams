import { Router } from 'express'

import getByExamId from './get-by-exam-id'
import create from './create'


const router = Router()


router.get('/:examId', getByExamId)
router.post('/:examId', create)


export default router
