import * as SnesorDataModelAPI from '../models/sensorDataModel'
import moment from 'moment'

async function day(){
  moment().add(-1, 'D')
}


async function assembly (data, user){
  const sensorData = await SnesorDataModelAPI.findBySensorId(data.idSensor)
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