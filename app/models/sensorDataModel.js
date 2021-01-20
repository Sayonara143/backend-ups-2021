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

const findAllByIdSensor = (id) => {
  return sensorDataModel.find({idSensor:id}, {})
}

const findByValue = (value) => {
  return sensorDataModel.findOne({value:value}, {})
}
const findBySensorId = (idSensor) => {
  return sensorDataModel.findOne({idSensor: idSensor}, {})
}
const deleteBySensorId = (idSensor)=>{
  return sensorDataModel.deleteMany({idSensor: idSensor}, {})
}


export{
  findByValue,
  findAllByIdSensor,
  createSensorData,
  deleteBySensorId,
  findBySensorId
}