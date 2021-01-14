import express from 'express'
import multer from 'multer'

import * as UserModelAPI from '../../../models/userModel'
import * as SensorDataAPI from '../../../models/sensorDataModel'
import * as SensorModelAPI from '../../../models/sensorModel'

import { recognize } from '../../../helpers/recognize'
import { preparation } from '../../../helpers/preparationPhoto'
import { deleteFile } from '../../../helpers/deleteFile'
import { configMode } from '../../../helpers/config-mode'

const router = express.Router()

let path
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null,"./public/sensor")
  },
  filename: (req, file, cb) =>{
     path =  Date.now() + '_' + file.originalname
    cb(null, path)
  } 
})


router.post('/:idSensor', multer({storage:storageConfig}).single('file'), async (req, res) => {
  let filedata = req.file
  const idSensor = req.params["idSensor"]
  console.log('Запрос от esp32'.yellow)
  console.log(`idSensor: ${idSensor}`.yellow)
  try {
    if(!filedata){
      res.sendStatus(400)
    } else {
      console.log('Фото пришло'.yellow)
      const sensor = await SensorModelAPI.findSensorByIdSensor(idSensor)
      const user = await UserModelAPI.findUserByPhone(sensor.userPhone)
      if(!sensor){
        deleteFile(String('public/sensor/' + path))
        res.status(409).json({info: 'датчик не опознан'})
      } else{ 
        console.log('Датчик опознан'.yellow)
        await preparation(String('public/sensor/' + path))
        let result = await recognize(String('public/sensor/' + path))

        if(result.status === 1){
          await SensorDataAPI.createSensorData(result.text, idSensor)
        }
        await deleteFile(String('public/sensor/' + path))
        console.log(`${result.status}:${user.mode}:${result.text}`.yellow)
        res.send(`${result.status}:${configMode(user.mode)}`)
      }
    }
  }
  catch (err) {
    console.error(err)
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router 