import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const expirationTime = 3600 * 1000;
const getExpirationTime = () => {
    return Date.now() + expirationTime
}
// Schemas
const accessToken = new Schema({
	value: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
    required: true,
    default: Date.now,
    expires: expirationTime/1000
  },
  expireSet:{
    type: Date,
    default: getExpirationTime
  },
  user:{
    type: String
  }
})

const AccessToken = mongoose.model('AccessTokenModel', accessToken)

const create = (token, userPhone) =>{
  const newAccessToken = new AccessToken({
    value:token,
    user: userPhone
  })
  return newAccessToken.save()
}

const findByValue = (value) => {
  return AccessToken.findOne({value:value}, {})
}
const deleteByUserPhone = (phone)=>{
  return AccessToken.deleteOne({user: phone},{})
}

export{
  findByValue,
  create,
  deleteByUserPhone
}
