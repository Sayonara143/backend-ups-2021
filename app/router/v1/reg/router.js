import express from 'express'
const router = express.Router();

import regUser from './createUser'
import getCode from './getCode'


router.use('/user', regUser)
router.use('/getCode', getCode)

export default router 