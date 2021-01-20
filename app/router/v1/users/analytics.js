import express from 'express'
const router = express.Router()

import * as UserModelAPI from '../../../models/userModel'
import * as SensorDataModelAPI from '../../../models/sensorDataModel'
import {assembly} from '../../../helpers/assembly'

let data
const checkInput = (input) => {
  if (input.idSensor === (null || undefined) || input.mode === (null || undefined) || input.from === '' || input.to === '' ) {
    return false
  }
  else return true
}

router.get('/', async (req,res) => {
  data = req.query
  console.log(data.from)
  if(!checkInput(data)) {
    res.sendStatus(400)
    return
  }
  try {
    const user = req.user
    const result = await assembly(data, user)

    res.sendStatus(200)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router
