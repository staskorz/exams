import { Router } from 'express'

import getByExamId from './get-by-exam-id'


const router = Router()


router.get('/:examId', getByExamId)


export default router
