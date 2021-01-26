import express from 'express'
const router = express.Router()

import * as CallModelAPI from '../../../../models/callModel'

let data
const checkInput = (input) => {
  if (input.phone === null) {
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

  const { phone } = data
 
  try {
    const result = await CallModelAPI.findCallAll(phone)
    res.status(200).json(result)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router