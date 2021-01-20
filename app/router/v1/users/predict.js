'use strict'
import express from 'express'
import {spawn, spawnSync} from 'child_process'
import moment from 'moment'
const router = express.Router()

import * as UserModelAPI from '../../../models/userModel'
import * as SensorDataModelAPI from '../../../models/sensorDataModel'
import * as SensorModelAPI from '../../../models/sensorModel'

async function predict(period, date , sensorData, res) {

  const process = spawn('python',['./predict.py', period, 0, sensorData])

  let predictData =  process.stdout.on('data', (data) => {
    let response = []
    console.log(`${data.toString()}`.blue)
    predictData = data.toString()
    predictData = predictData.split('[')[1].split(']')[0].split(', ')
    predictData.forEach(element => {
      response.push(element)
    });
    res.status(200).json({predict: response})
  })
  process.on('close', (code) =>{
    console.log(`code: ${code}`)
    if(code === 1){
      res.status(200).json({info: 'ошибка'})
    }
   })
   return predictData
}

let data
const checkInput = (input) => {
  if (input.id === null || input.period === null) {
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
  const {idSensor, period} = data
  const user = req.user
  try {
    let predictData = []
    const sensor = await SensorModelAPI.findSensorByIdSensor(idSensor)
    if(!sensor){
      res.status(409).json({info: 'sensor not found'})
      return
    }
    const sensorData = await SensorDataModelAPI.findAllByIdSensor(idSensor)
    sensorData.forEach(data => {
      if(moment(new Date(data.date), 'MM')>moment().add(-1, 'M')){
        predictData.push(data)
      }
    })
    let arrayData = []
    predictData.sort(function(a, b) {
      var c = new Date(a.date)
      var d = new Date(b.date)
      return c - d
    })
    for (let i = 0; i < predictData.length-1; i++) {
      const element = predictData[i]
      const elementNext = predictData[i+1]
      const firstData =  (String(element.date.getFullYear())+String(Number(element.date.getMonth())+1)+String(element.date).split('')[8]+String(element.date).split('')[9])
      const lastData =  (String(elementNext.date.getFullYear())+String(Number(elementNext.date.getMonth())+1)+String(elementNext.date).split('')[8]+String(elementNext.date).split('')[9])
      if(firstData< lastData){
        arrayData.push(element.value)
      }

      
    }
    arrayData.push(predictData[predictData.length-1].value)
    console.log(arrayData)
    await predict(period, 0, arrayData, res)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router
