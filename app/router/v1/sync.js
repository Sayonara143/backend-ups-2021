import express from 'express'
const router = express.Router();

import * as SensorDataAPI from '../../models/sensorDataModel'
router.get('/:value/:idSensor', async (req,res) => {
  const value = req.params.value
  const idSensor = req.params.idSensor
  try {
    //let user = req.user
    await SensorDataAPI.createSensorData(value, idSensor)
    res.sendStatus(200)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
});


export default router