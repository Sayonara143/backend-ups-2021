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
        name: sensorData.name,
        typeSensor: sensorData.typeSensor,
        idSensor: sensorData.idSensor,
        userPhone: sensorData.userPhone
    })
    return newSensorModel.save()
}

const findSensorByIdSensor = (idSensor) => {
    return SensorModel.findOne({idSensor: idSensor}, {})
}
const deleteSensorByIdSensor = (login)=>{
    return SensorModel.deleteOne({login: login}, {})
}
const findSensorByUserPhone = (userPhone) => {
  return SensorModel.findOne({userPhone: userPhone}, {})
}
const findSensorsByUserPhone = (userPhone) => {
  return SensorModel.find({userPhone: userPhone}, {})
}

const UpdateSensorByUserPhoneAndIdSensor = (phone, idSensor) => {
	return SensorModel.updateOne({phone: phone},{linkWaterHot: idSensor }, {upsert: false})
}


export{
  findSensorByIdSensor,
  findSensorsByUserPhone,
  createSensor,
  deleteSensorByIdSensor,
  findSensorByUserPhone,
  UpdateSensorByUserPhoneAndIdSensor
}