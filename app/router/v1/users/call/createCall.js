import express from 'express'
const router = express.Router()

import * as CallModelAPI from '../../../../models/callModel'

let data
const checkInput = (input) => {
  if (input.troubleName === null || input.specialistWork === null || input.admissionTime === null) {
    return false
  }
  else return true
}

router.post('/', async (req,res) => {
  data = req.body
  console.log(data)
  if(!checkInput(data)) {
    res.sendStatus(400)
    return
  }

  const { troubleName, specialistWork, admissionTime } = data
 
  try {
    const user = req.user
    const newCallData = {
      troubleName: troubleName,
      phone: user.phone,
      specialistWork: specialistWork,
      admissionTime: String(admissionTime)
    }
    await CallModelAPI.createCall(newCallData)
    res.sendStatus(200)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router