import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Schemas
const sensorModel = new Schema({
	name: {
	  type: String,
    required: true
  },
  typeSensor:{
    type: String,
    required: true
  },
	date: {
		type: Date,
		default: Date.now()
  },
  idSensor: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: true
  }
})

const SensorModel = mongoose.model('SensorModel', sensorModel)

const createSensor = (sensorData) =>{
    const newSensorModel = new SensorModel({
        name: userData.name,
        typeSensor: sensorData.typeSensor,
        idSensor: sensorData.idSensor,
        userPhone: userData.phone
    })
    return newSensorModel.save()
}

const findSensorByIdSensor = (login) => {
    return SensorModel.findOne({login: login}, {})
}
const deleteSensorByIdSensor = (login)=>{
    return SensorModel.deleteOne({login: login}, {})
}
const findSensorByUserPhone = (userPhone) => {
  return SensorModel.findOne({userPhone: userPhone}, {})
}

const UpdateSensorByUserPhoneAndIdSensor = (phone, idSensor) => {
	return SensorModel.updateOne({phone: phone},{linkWaterHot: idSensor }, {upsert: false})
}


export{
  findSensorByIdSensor,
  createSensor,
  deleteSensorByIdSensor,
  findSensorByUserPhone,
  UpdateSensorByUserPhoneAndIdSensor
}