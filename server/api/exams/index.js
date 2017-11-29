import { Router } from 'express'

import getAll from './get-all'
import getById from './get-by-id'
import create from './create'
import update from './update'


const router = Router()


router.get('/', getAll)
router.get('/:examId', getById)
router.post('/', create)
router.put('/:examId', update)


export default router
