import express from 'express'
const router = express.Router()

import * as UserModelAPI from '../../../models/userModel'
import * as SensorModelAPI from '../../../models/sensorModel'

router.get('/', async (req,res) => {
  try {
    let sensorsData = []
    const user = req.user
    const sensor = await SensorModelAPI.findSensorsByUserPhone(user.phone)
    if(sensor === []){
      res.status(409).json({info: 'счетчиков нет'})
    }
    sensor.forEach(data => {
      sensorsData.push({
        name: data.name,
        id: data.idSensor
      })
    })
    res.status(200).json({"sensorData":sensorsData})
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router
