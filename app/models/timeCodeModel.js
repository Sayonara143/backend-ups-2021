import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const expirationTime = 60 * 1000;
const getExpirationTime = () => {
    return Date.now() + expirationTime ; 
}
// Schemas
var timeCode = new Schema({
	value: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
    required: true,
    default: Date.now,
    expires: expirationTime/1000,
  },
  expireSet:{
    type: Date,
    default: getExpirationTime
  },
  userPhone:{
    type: String,
    required: true
  }
});




const TimeCode = mongoose.model('TimeCode', timeCode);


const createTimeCode = (code, userPhone) => {
  const newTimeCode = new TimeCode({
    value: code,
    userPhone: userPhone
  })
  return newTimeCode.save()
}


const findByValue = (value) => {
  return TimeCode.findOne({value:value}, {})
}
const findByPhone = (phone) => {
  return TimeCode.findOne({userPhone: phone}, {})
}
const deleteByUserPhoneMany = (phone)=>{
  return TimeCode.deleteMany({userPhone: phone}, {})
}


export{
  findByValue,
  createTimeCode,
  deleteByUserPhoneMany,
  findByPhone
}