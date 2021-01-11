require('dotenv').config()
import nodemailer from 'nodemailer'
import twilio from 'twilio'
//sms 
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const client = new twilio(accountSid, authToken)

//mongodb
const password = String(process.env.DB_PASS)
const login = String(process.env.DB_LOGIN)
const server = {
  port: process.env.portServerNode
}
const db = {
  url: `mongodb+srv://${login}:${password}@cluster0.4hyqa.mongodb.net/upsdb?retryWrites=true&w=majority`
}

//email 
const transporterEmail = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 587,
  // secure: true,
  auth: {
    user: 'registration_takeframe@mail.ru',
    pass: '8az-EkG-WTs-VQY'
  }
})

export{
  server,
  db,
  transporterEmail,
  client
}