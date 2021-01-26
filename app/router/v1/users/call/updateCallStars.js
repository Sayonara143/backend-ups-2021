import express from 'express'
const router = express.Router()

import * as CallModelAPI from '../../../../models/callModel'

let data
const checkInput = (input) => {
  if (input.id === null || input.stars === null ) {
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

  const { id, stars} = data
 
  try {
    const user = req.user
    await CallModelAPI.UpdateCallSpecialistStars(id, Number(stars))
    res.sendStatus(200)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router