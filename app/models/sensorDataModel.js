import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// Schemas
var sensorData = new Schema({
	value: {
		type: String,
		required: true
	},
  idSensor:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now()
  }
});




const sensorDataModel = mongoose.model('sensorDataModel', sensorData);


const createSensorData = (value, idSensor) => {
  const newSensorData = new sensorDataModel({
    value: value,
    idSensor: idSensor,
  })
  return newSensorData.save()
}


const findByValue = (value) => {
  return TimeCode.findOne({value:value}, {})
}
const findBySensorId = (idSensor) => {
  return TimeCode.findOne({idSensor: idSensor}, {})
}
const deleteBySensorId = (idSensor)=>{
  return TimeCode.deleteMany({idSensor: idSensor}, {})
}


export{
  findByValue,
  createSensorData,
  deleteBySensorId,
  findBySensorId
}