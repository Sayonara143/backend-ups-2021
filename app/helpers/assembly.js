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
      if(moment(new Date(data.date), 'MM')>moment().add(-1, 'd')){
        predictData.push({
          'date': data.date,
          'value': data.value
        })
      }
    })
  }
  return predictData
}

async function week(sd){
  let predictData = []
  let responseData = []
  let arrayData = []
  if(sd.length === 0){
    predictData = {info: 'данных нету'}
  }
  if(sd.length > 1){
    sd.forEach(data => {
      if(moment(data.date, 'MM')>moment().add(-9, 'd')){
        predictData.push({
          'date': data.date,
          'value': data.value
        })
      }
    })
    
    predictData.sort(function(a, b) {
      var c = new Date(a.date)
      var d = new Date(b.date)
      return c - d
    })
    console.log(predictData)
    for (let i = 0; i < predictData.length-1; i++) {
      const element = predictData[i]
      const elementNext = predictData[i+1]
      const firstData =  (String(element.date.getFullYear())+String(Number(element.date.getMonth())+1)+String(element.date).split('')[8]+String(element.date).split('')[9])
      const lastData =  (String(elementNext.date.getFullYear())+String(Number(elementNext.date.getMonth())+1)+String(elementNext.date).split('')[8]+String(elementNext.date).split('')[9])
      if(firstData< lastData){
        arrayData.push(element)
      }
    }
    arrayData.push(predictData[predictData.length-1])
    console.log(arrayData)
    for (let i = 0; i < arrayData.length-1; i++) {
      const element = arrayData[i]
      const elementNext = arrayData[i+1]
      responseData.push({
        'date': elementNext.date,
        'value': elementNext.value-element.value
      })

      
    }
  }
  return responseData
}

async function month(sd){
  let predictData = []
  let responseData = []
  let arrayData = []
  if(sd.length === 0){
    predictData = {info: 'данных нету'}
  }
  if(sd.length > 1){
    sd.forEach(data => {
      if(moment(data.date, 'MM')>moment(moment().add(-1, 'M')).add(-1, 'd')){
        predictData.push({
          'date': data.date,
          'value': data.value
        })
      }
    })
    
    predictData.sort(function(a, b) {
      var c = new Date(a.date)
      var d = new Date(b.date)
      return c - d
    })
    console.log(predictData)
    for (let i = 0; i < predictData.length-1; i++) {
      const element = predictData[i]
      const elementNext = predictData[i+1]
      const firstData =  (String(element.date.getFullYear())+String(Number(element.date.getMonth())+1)+String(element.date).split('')[8]+String(element.date).split('')[9])
      const lastData =  (String(elementNext.date.getFullYear())+String(Number(elementNext.date.getMonth())+1)+String(elementNext.date).split('')[8]+String(elementNext.date).split('')[9])
      if(firstData< lastData){
        arrayData.push(element)
      }
    }
    arrayData.push(predictData[predictData.length-1])
    console.log(arrayData)
    for (let i = 0; i < arrayData.length-1; i++) {
      const element = arrayData[i]
      const elementNext = arrayData[i+1]
      responseData.push({
        'date': elementNext.date,
        'value': elementNext.value-element.value
      })

      
    }
  }
  return responseData
}
async function custom(from, to, sd){
  let predictData = []
  let responseData = []
  let arrayData = []
  if(Number(to.split('-')[2]) === Number(from.split('-')[2])){
    const dateFrom = moment(moment(new Date(from), 'MM')).add(-1, 'd')
    const dateTo = moment(moment(new Date(to), 'MM')).add(+1, 'd')
    if(sd.length > 1){
      sd.forEach(data => {
        if((moment(new Date(data.date), 'MM')) > dateFrom){
          if((moment(new Date(data.date), 'MM')) < dateTo){
            predictData.push({
              'date': data.date,
              'value': data.value
            })
          }
        }
      })
      for (let i = 0; i < predictData.length-1; i++) {
        const element = predictData[i]
        const elementNext = predictData[i+1]
        responseData.push({
          'date': elementNext.date, 
          'value': elementNext.value-element.value
        })
      }
      return responseData
    }
  }
  const dateFrom = moment(new Date(from), 'MM')
  const dateTo = moment(new Date(to), 'MM')
  if(sd.length > 1){
    sd.forEach(data => {
      if((moment(new Date(data.date), 'MM')) > dateFrom){
        if((moment(new Date(data.date), 'MM')) < dateTo){
          predictData.push({
            'date': data.date,
            'value': data.value
          })
        }
      }
    })
  }
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
      arrayData.push(element)
    }
  }
  arrayData.push(predictData[predictData.length-1])
  console.log(predictData)
  for (let i = 0; i < arrayData.length-1; i++) {
    const element = arrayData[i]
    const elementNext = arrayData[i+1]
    responseData.push({
      'date': elementNext.date, 
      'value': elementNext.value-element.value
    })
    // predictData = []
    // let summa = 0
    // for (let i = 0; i < responseData.length; i++) {
    //   const element = responseData[i]
    //   summa = 
      
    // }
    
  }
  return responseData
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