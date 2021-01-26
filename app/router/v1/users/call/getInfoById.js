import express from 'express'
const router = express.Router()

import * as CallModelAPI from '../../../../models/callModel'


router.get('/:id', async (req,res) => {
 const id = req.params.id
  try {
    const result = await CallModelAPI.findCallById(id)
    res.status(200).json(result)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router