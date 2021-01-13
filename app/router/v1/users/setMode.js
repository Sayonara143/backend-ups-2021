import express from 'express'
const router = express.Router()

import * as UserModelAPI from '../../../models/userModel'

router.get('/:mode', async (req,res) => {
  const mode = req.params["mode"] 
  try {
    const user = req.user
    const result = await UserModelAPI.UpdateUserSetMode(user.phone, mode)
    console.log(result)
    res.status(200)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router
