import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const expirationTime = 1209600 * 1000
const getExpirationTime = () => {
    return Date.now() + expirationTime
}
// Schemas
var refreshToken = new Schema({
	value: {
		type: String,
		required: true
	},
	createdAT: {
		type: Date,
    required: true,
    default: Date.now,
    expires: expirationTime/1000
  },
  expireSet:{
    type: Date,
    value: getExpirationTime
  },
  user:{
    type: String
  }
})

const RefreshToken = mongoose.model('RefreshTokenModel', refreshToken)

const create = (token, userPhone) =>{
  const newRefreshToken = new RefreshToken({
    value: token,
    user: userPhone
  })
  return newRefreshToken.save()
}

const findByValue = (value) => {
  return RefreshToken.findOne({value: value}, {})
}
const deleteByUserPhone = (phone)=>{
  return RefreshToken.deleteOne({user: phone},{})
}
export{
    findByValue,
    deleteByUserPhone,
    create,
}