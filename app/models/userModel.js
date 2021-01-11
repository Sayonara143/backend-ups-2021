import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Schemas
const userModel = new Schema({
	surname: {
		type: String,
		required: true
	},
	name: {
	  type: String,
    required: true
  },
  patronymic:{
    type: String,
    required: true
  },
	passwordHash: {
		type: String,
		required: true
  },
	salt:{
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
  linkWater: {
    type: String,
    default: ''
  },
  linkElectric: {
    type: String,
    default: ''
  }
})

const UserModel = mongoose.model('UserModel', userModel)

const createUser = (userData) =>{
    const newUsersModel = new UserModel({
        surname: userData.surname,
        name: userData.name,
        patronymic: userData.patronymic,
        login: userData.login,
        passwordHash: userData.passwordHash,
        salt: userData.salt,
        phone: userData.phone
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
const UpdateUserLinkWater = (phone, idSensor) => {
	return UserModel.updateOne({phone: phone},{linkWater: idSensor }, {upsert: false})
}
const UpdateUserlinkElectric = (phone, idSensor) => {
	return UserModel.updateOne({phone: phone},{linkElectric: idSensor }, {upsert: false})
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
    UpdateUserLinkWater,
    UpdateUserlinkElectric,
    //settings users change
    UpdateUsersPasswordHashSalt,
    deleteUsersByLogin
}