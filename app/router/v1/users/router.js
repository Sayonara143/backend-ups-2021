import express from 'express'
const router = express.Router();

import sync from './sync'
import linkBind from './linkBind'
import analytics from './analytics'
import setMode from './setMode'
import predict from './predict'
import getSensorsName from './getSensorsName'

router.use('/sync', sync)
router.use('/linkBind', linkBind)
router.use('/analytics', analytics)
router.use('/setMode', setMode)
router.use('/predict', predict)
router.use('/getSensorsName', getSensorsName)

export default router