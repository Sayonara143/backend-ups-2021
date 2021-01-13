import express from 'express'
const router = express.Router();

import sync from './sync'
import linkBind from './linkBind'
import analytics from './analytics'
import setMode from './setMode'

router.use('/sync', sync)
router.use('/linkBind', linkBind)
router.use('/analytics', analytics)
router.use('/setMode', setMode)

export default router