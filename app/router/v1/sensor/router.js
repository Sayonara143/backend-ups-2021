import express from 'express'
const router = express.Router();

import dowPhoto from './dowPhoto'
import sync from './sync'

router.use('/dowPhoto', dowPhoto);
router.use('/sync', sync);

export default router