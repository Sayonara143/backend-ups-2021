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
    UpdateUserSetMode,
    //settings users change
    UpdateUsersPasswordHashSalt,
    deleteUsersByLogin
}