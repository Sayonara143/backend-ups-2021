import express from 'express'
const router = express.Router()

import * as UserModelAPI from '../../../models/userModel'

let data
const checkInput = (input) => {
  if (input.idSensor === null || input.typeSensor === null) {
    return false
  }
  else return true
}

router.post('/', async (req,res) => {
  data = req.body
  if(!checkInput(data)) {
    res.sendStatus(400)
    return
  }

  const { idSensor, typeSensor } = data
 
  try {
    const user = req.user
    if(typeSensor === 'water'){
      await UserModelAPI.UpdateUserLinkWater(user.phone, idSensor)
    }
    if(typeSensor === 'electric'){
      await UserModelAPI.UpdateUserlinkElectric(user.phone, idSensor)
    }
    res.sendStatus(200)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router
