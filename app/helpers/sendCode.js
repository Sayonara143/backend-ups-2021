import * as TimeCodeAPI from '../models/timeCodeModel'
import * as config from './config'


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

async function sendCode (phone){
  await TimeCodeAPI.deleteByUserPhoneMany(phone)
  let code = getRandomArbitrary(1000, 9999)
  code = await TimeCodeAPI.createTimeCode(String(code).substring(0,4), phone)
  config.client.messages.create({
    body: `Ваш код: ${code.value}`,
    from: '+19382231668',  // Text this number
    to: phone // From a valid Twilio number
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error))
}
export{
  sendCode
}