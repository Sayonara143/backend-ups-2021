import express from 'express'
const router = express.Router()

import * as UserModelAPI from '../../../models/userModel'
import {configMode} from '../../../helpers/config-mode'

router.post('/', async (req,res) => {
  const data = req.body
  console.log(data)
  try {
    const user = req.user
    const result = 0
    //const result = await UserModelAPI.UpdateUserSetMode(user.phone, configMode[mode])
    console.log(result)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router
