import * as AccessTokenAPI from '../models/accessTokenModel'
import * as RefreshTokenAPI from '../models/refreshTokenModel'
import * as UsersAPI from '../models/userModel'

import uid from 'uid-safe'
import hashkod from 'pbkdf2-password'

const hash = hashkod()

function hashPromise(hashingData) {
  return new Promise((resolve, reject) => {
    hash(hashingData, function (err, pass, salt, hash) {
      if (err) reject(err)
      resolve({ hash: hash, salt: salt })
    })
  })
}

function createToken() {
  return uid(32)
}
 
function parseBearer(req) {
  let authHeader = req.get('Authorization')
  let bearer = ''

  if (authHeader)
    bearer = authHeader.split(' ')[1]
    console.log(bearer)
    return bearer
}

async function token(req, res) {
  let phone = req.body.phone
  let password = req.body.password
  console.log('req.body', req.body)
  try {
    let user = await UsersAPI.findUserByPhone(phone)
    if (!user) {
      res.status(404).json({error: "user not found"})
      return
    }     
    let hashParams = await(hashPromise({ password: password, salt: user.salt}))
    if (hashParams.hash === user.passwordHash) {
      await AccessTokenAPI.deleteByUserPhone(user.phone)
      await RefreshTokenAPI.deleteByUserPhone(user.phone)
      //create tokens
      let accessToken = await AccessTokenAPI.create(await createToken(), user.phone)
      let refreshToken = await RefreshTokenAPI.create(await createToken(), user.phone)
      res.status(200).json({
        accessToken: accessToken.value,
        refreshToken: refreshToken.value
      })
      } else{
        res.status(404).json({error: "error password"})
      }
  }
  catch (err) {
    console.error(err)
    res.status(500).json({error: "sorry, the server crashed"});
  }
}
 
async function authorize(req, res, next) {
  let bearer = parseBearer(req)
  try {
    let accessToken = await AccessTokenAPI.findByValue(bearer)
    if (!accessToken) { //if accessToken not found
      console.log('accessToken not found')
      res.sendStatus(401)
      return
    }
    let user = await UsersAPI.findUserByPhone(accessToken.user)
    if (!user) { //if accessToken doesn't linked with user
      res.sendStatus(401)
    }
    req.user = user
    next()
  }
  catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

async function refresh(req, res) {
  let token = req.body.refreshToken
  console.log('refreshToken', token)
  try {
  //find refresh token
    let refreshToken = await RefreshTokenAPI.findByValue(token)
    if (!refreshToken) {
      res.status(404).json({error: "token is not found"})
      return
    }
    //find user
    let user = await UsersAPI.findUserByPhone(refreshToken.user)
    if (!user) {
      res.status(404).json({error: "the user's token search failed"})
      return
    }
 
    //remove old access token
    await AccessTokenAPI.deleteByUserPhone(user.phone)
    await RefreshTokenAPI.deleteByUserPhone(user.phone)
 
    //create new access token
    let newAccessToken = await AccessTokenAPI.create(await createToken(), user.phone)
    let newRefreshToken = await RefreshTokenAPI.create(await createToken(), user.phone)
    res.status(200).json({
      accessToken: newAccessToken.value,
      refreshToken: newRefreshToken.value
    })
  }
  catch (err) {
    console.error(err)
    res.status(500).json({error: "sorry, the server crashed"})
  }
}

export{
  token,
  authorize,
  refresh
}