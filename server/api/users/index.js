import { Router } from 'express'

import getAll from './get-all'


const router = Router()


router.get('/', getAll)


export default router
