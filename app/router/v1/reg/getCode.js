import express from 'express'
import * as UserAPI from '../../../models/userModel'
import * as TimeCodeAPI from '../../../models/timeCodeModel'
import * as config from '../../../helpers/config'
import { sendCode } from '../../../helpers/sendCode'

const router = express.Router()


const checkInput = (input) => {
  if (input.phone === null) {
    return false
  }
  else return true
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
      await sendCode(phone)
      res.sendStatus(200)
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