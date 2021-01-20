import * as SnesorDataModelAPI from '../models/sensorDataModel'
import moment from 'moment'

async function day(sd){
  let predictData = []
  if(sd.length === 1){
    if(moment(new Date(data.date), 'MM')>moment().add(-1, 'd')){
      predictData.push({
        'date': data.date,
        'value': data.value
      })
    }
  }
  if(sd.length === 0){
    predictData = {info: 'данных нету'}
  }
  if(sd.length > 1){
    sd.forEach(data => {
      if(moment(new Date(data.date), 'MM')>moment().add(-1, 'D')){
        predictData.push({
          'date': data.date,
          'value': data.value
        })
      }
    })
  }
  return predictData
}


async function assembly (data, user){
  const sensorData = await SnesorDataModelAPI.findAllByIdSensor(data.idSensor)
  if(String(data.mode) === 'day'){
    return await day(sensorData)
  }
  if(String(data.mode) === 'week'){
    return await week(sensorData)
  }
  if(String(data.mode) === 'month'){
    return await month(sensorData)
  }
  if(String(data.mode) === 'custom'){
    return await custom(data.from, data.to, sensorData)
  }
}
export {
  assembly
}