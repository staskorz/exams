import { Router } from 'express'

import exams from './exams'


const router = Router()


router.use('/exams', exams)


export default router
