import express from 'express'
import hashkod from 'pbkdf2-password'

import * as UserAPI from '../../../models/userModel'
import * as TimeCodeAPI from '../../../models/timeCodeModel'

import * as config from '../../../helpers/config'

const router = express.Router()
let data
const hash = hashkod()

function hashPromise(hashingData) {
  return new Promise((resolve, reject) => {
      hash(hashingData, function (err, pass, salt, hash) {
        if (err) reject(err)
        resolve({ hash: hash, salt: salt })
      })
  })
}

const checkInput = (input) => {
  if (input.name === null || input.phone === null || input.timeCode === null || input.infoTCG === null ) {
    return false
  }
  else return true
}


router.post('/', async (req, res) => {
  data = req.body
  if(!checkInput(data)) {
    res.sendStatus(400)
    return
  }

  const { name, phone, timeCode, infoTCG} = data

  try {
    const user = await UserAPI.findUserByPhone(phone)
    if (!user) {
      const code = await TimeCodeAPI.findByPhone(phone)
      if(!code){
        res.status(409).json({ info: 'Код не был отправлен' })
      } else {
        if(code.value === timeCode){
          const newUserData = {
            name: name,
            phone: phone,
            infoTCG: infoTCG
          }
          await UserAPI.createUser(newUserData)
          res.sendStatus(200)
        } else{
          res.status(409).json({info: 'неверный код'})
        }
      }
    }
    else {
      res.status(409).json({ info: 'номер уже зареган' })
    }
  }
  catch (err) {
    console.error(err)
    res.status(500).json({error: "sorry, the server crashed"})
  }
})

export default router