import mongoose, { Mongoose, SchemaType } from 'mongoose'
const Schema = mongoose.Schema

// Schemas
const callModel = new Schema({
	troubleName: {
	  type: String,
    required: true
  },
  statusCall: {
    type: Boolean,
    default: false
  },
  specialistWork:{
    type: String,
    required: true
  },
  specialistNumber:{
    type: String,
    default: '+79865404241'
  },
  specialistName:{
    type: String,
    default: 'Дмитрий'
  },
	createdAt: {
		type: Date,
		default: Date.now()
  },
  phone: {
    type: String,
    required: true
  },
  admissionTime:{
    type: String,
    required: true
  },
  specialistStars: {
    type: Number,
    default: 0
  }
})

const CallModel = mongoose.model('CallModel', callModel)

const createCall = (callData) =>{
    const newCallModel = new CallModel({
      troubleName: callData.troubleName,
      specialistWork: callData.specialistWork,
      phone: callData.phone,
      admissionTime: callData.admissionTime
    })
    return newCallModel.save()
}

const findCallById = (id) => {
  return CallModel.findOne({_id: mongoose.Types.ObjectId(id)}, {__v: 0, phone: 0})
}
const findCallAll = (phone) => {
  return CallModel.find({phone: phone}, {__v: 0, admissionTime: 0, phone: 0, specialistWork: 0, specialistName: 0})
}
const deleteUserByLogin = (login)=>{
    return CallModel.deleteOne({login: login}, {})
}
const findUserByPhone = (phone) => {
  return UserModel.findOne({phone: phone}, {})
}

const UpdateCallSpecialistStars = (id, stars) => {
	return CallModel.updateOne({_id: mongoose.Types.ObjectId(id)}, {specialistStars: stars}, {upsert: false})
}

export{
  findCallById,
  createCall,
  findCallAll,
  deleteUserByLogin,
  findUserByPhone,
  UpdateCallSpecialistStars
}