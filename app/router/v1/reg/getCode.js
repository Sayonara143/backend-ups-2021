import express from 'express'
import * as UserAPI from '../../../models/userModel'
import * as TimeCodeAPI from '../../../models/timeCodeModel'
import * as config from '../../../helpers/config'

const router = express.Router()


const checkInput = (input) => {
  if (input.phone === null) {
    return false
  }
  else return true
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
let data
router.post('/', async (req, res) => {
  data = req.body
  if(!checkInput(data)) {
    res.sendStatus(400)
    return
  }

  const { phone } = data

  try {
    const user = await UserAPI.findUserByPhone(phone)
    if (!user) {
      await TimeCodeAPI.deleteByUserPhoneMany(phone)
      let code = getRandomArbitrary(1000, 9999)
      code = await TimeCodeAPI.createTimeCode(String(code).substring(0,4), phone)
      config.client.messages.create({
        body: `аххааххахах хватит спать, пора ботать: ${code.value}`,
        from: '+19382231668',  // Text this number
        to: '+79995640335' // From a valid Twilio number
      })
      .then((message) => console.log(message.sid))
      //.catch((error) => console.error(error))
      res.status(200).json({timeCode: code.value})
    }
    else {
      res.status(409).json({ info: 'Невозможно отправить код, номер уже зареган' })
    }
  }
  catch (err) {
    console.error(err)
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router