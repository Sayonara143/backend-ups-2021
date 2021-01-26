import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Schemas
const scheduleModel = new Schema({
	day: {
	  type: String,
    required: true
  },
  period:{
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})

const ScheduleModel = mongoose.model('ScheduleModel', scheduleModel)

const createSchedule = (ScheduleData) =>{
  const newScheduleModel = new ScheduleModel({
      day: ScheduleData.day,
      period: ScheduleData.period,
      phone: ScheduleData.phone
  })
  return newScheduleModel.save()
}

const findScheduleByDay = (login) => {
  return ScheduleModel.findOne({login: login}, {})
}

const findScheduleByPhone = (phone) => {
  return ScheduleModel.findOne({phone: phone}, {})
}

const UpdateScheduleByPhoneDay = (phone, day, period) => {
  return ScheduleModel.updateOne({phone: phone, day: day},{period: period }, {upsert: true})
}

export{
  createSchedule,
  findScheduleByDay,
  findScheduleByPhone,
  UpdateScheduleByPhoneDay
}