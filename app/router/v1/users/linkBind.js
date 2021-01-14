import express from 'express'
const router = express.Router()

import * as UserModelAPI from '../../../models/userModel'
import * as SensorModelAPI from '../../../models/sensorModel'

let data
const checkInput = (input) => {
  if (input.idSensor === null ) {
    return false
  }
  else return true
}

router.post('/', async (req,res) => {
  data = req.body
  if(!checkInput(data)) {
    res.sendStatus(400)
    return
  }

  const { idSensor, name, typeSensor } = data
 
  try {
    const user = req.user
    const newSensorData = {
      name: name,
      userPhone: user.phone,
      idSensor: idSensor,
      typeSensor: typeSensor
    }
    await SensorModelAPI.createSensor(newSensorData)
    res.sendStatus(200)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router
