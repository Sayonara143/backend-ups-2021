import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Schemas
const userModel = new Schema({
	name: {
	  type: String,
    required: true
  },
  infoTCG:{
    type: String,
    required: true
  },
	date: {
		type: Date,
		default: Date.now()
  },
  phone: {
    type: String,
    required: true
  },
  linkWaterCold: {
    type: String,
    default: ''
  },
  linkWaterHot: {
    type: String,
    default: ''
  },
  mode:{
    type:String,
    default: '1'
  }
})

const UserModel = mongoose.model('UserModel', userModel)

const createUser = (userData) =>{
    const newUsersModel = new UserModel({
        name: userData.name,
        phone: userData.phone,
        infoTCG: userData.infoTCG
    })
    return newUsersModel.save()
}

const findUserByLogin = (login) => {
    return UserModel.findOne({login: login}, {})
}
const deleteUserByLogin = (login)=>{
    return UserModel.deleteOne({login: login}, {})
}
const findUserByPhone = (phone) => {
  return UserModel.findOne({phone: phone}, {})
}
const findUserByLinkHot = (idSensor) => {
  return UserModel.findOne({linkWaterHot: idSensor}, {})
}

const findUserByLinkCold = (idSensor) => {
  return UserModel.findOne({linkWaterCold: idSensor}, {})
}

const UpdateUserLinkWaterHot = (phone, idSensor) => {
	return UserModel.updateOne({phone: phone},{linkWaterHot: idSensor }, {upsert: false})
}
const UpdateUserlinkWaterCold = (phone, idSensor) => {
	return UserModel.updateOne({phone: phone},{linkWaterCold: idSensor }, {upsert: false})
}
const UpdateUserSetMode = (phone, mode) => {
	return UserModel.updateOne({phone: phone},{mode: mode }, {upsert: false})
}
// settings change users
const UpdateUsersPasswordHashSalt = (login, passwordHash, salt) => {
	return UserModel.updateOne({login:login},{passwordHash:passwordHash,salt:salt }, {upsert: false, multi: true})
}
const deleteUsersByLogin = (login) => {
    return UserModel.deleteOne({login: login})
}



export{
    findUserByLogin,
    createUser,
    deleteUserByLogin,
    findUserByPhone,
    UpdateUserLinkWaterHot,
    UpdateUserlinkWaterCold,
    UpdateUserSetMode,
    findUserByLinkCold,
    findUserByLinkHot,
    //settings users change
    UpdateUsersPasswordHashSalt,
    deleteUsersByLogin
}