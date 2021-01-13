import express from 'express'
const router = express.Router();

import v1Sensor from './v1/sensor/router'
import v1Users from './v1/users/router'
import v1Reg from './v1/reg/router'

import * as oauthUsers from '../services/ouath2Users'
import * as oauthUsersByphone from '../services/oauthUsersByPhone'


router.use('/api/v1/oauth/tokens/users', oauthUsersByphone.token)
router.use('/api/v1/oauth/refresh/users', oauthUsersByphone.refresh)

router.use('/api/v1/sensor', v1Sensor)
router.use('/api/v1/users', oauthUsersByphone.authorize, v1Users)
router.use('/api/v1/reg', v1Reg)

export default router 
