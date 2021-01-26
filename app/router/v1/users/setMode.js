import express from 'express'
const router = express.Router()

import * as UserModelAPI from '../../../models/userModel'
import * as ScheduleModelAPI from '../../../models/scheduleModel'

import {modeSch} from '../../../helpers/config-mode'

router.post('/:mode', async (req,res) => {
  const mode =  req.params.mode
  const data = req.body
  try {
    const user = req.user
    if (mode === String(1)) {
      await modeSch.forEach(async day => {
        await ScheduleModelAPI.UpdateScheduleByPhoneDay(user.phone, day, 2)
      })
    }
    if (mode === String(2)) {
      await data.day.forEach(async day => {
        await ScheduleModelAPI.UpdateScheduleByPhoneDay(user.phone, day, data.period)
      })
    }
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router
