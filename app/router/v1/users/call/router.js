import express from 'express'
const router = express.Router();

import updateCallStars from './updateCallStars'
import createCall from './createCall'
import getInfoById from './getInfoById'
import getAllCall from './getAllCall'

router.use('/create', createCall)
router.use('/updateStars', updateCallStars)
router.use('/getAll', getAllCall)
router.use('/getInfoById', getInfoById)


export default router