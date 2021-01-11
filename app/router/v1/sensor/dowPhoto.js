import express from 'express'
import multer from 'multer'

import * as SensorDataAPI from '../../../models/sensorDataModel'

import { recognize } from '../../../helpers/recognize'
import { preparation } from '../../../helpers/preparationPhoto'
import { deleteFile } from '../../../helpers/deleteFile'

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


router.post('/', multer({storage:storageConfig}).single('file'), async (req, res) => {
  let filedata = req.file
  console.log('Запрос от esp32'.yellow)
  try {
    if(!filedata){
      res.sendStatus(400)
    }
    else{
      console.log('Данные пришли'.yellow)
      await preparation(String('public/sensor/' + path))
      let text = await recognize(String('public/sensor/' + path))
      console.log(text)
      if(text.text === '') {
        await deleteFile(String('public/sensor/' + path))
        text.info = 'Текст не обноружен'
      } else{
        await SensorDataAPI.createSensorData(text.text, '1')
        await deleteFile(String('public/sensor/' + path))
      }
      res.json(text)
    }
  }
  catch (err) {
    console.error(err)
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router 