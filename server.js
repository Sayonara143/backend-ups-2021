import express from 'express'
import http from 'http'
import mainRouter from './app/router/router'
import mongoose  from 'mongoose'
import cors from 'cors'
import colors from 'colors'
import fs from 'fs'


require('dotenv').config()

import * as config from './app/helpers/config'
mongoose.set('useCreateIndex', true)
mongoose.connect(String('mongodb://localhost:27017/upsDB?readPreference=primary&appname=MongoDB%20Compass&ssl=false'), { useUnifiedTopology: true, useNewUrlParser: true  },  () => {
  console.log('[MONGODB] connect'.white)
})

const corsOptions = {
	origin: ['*', 'http://localhost:3000'],
	optionsSuccessStatus: 200,
	credentials: true // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const startServer = async () =>{
  const app = express();
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.use(cors(corsOptions))
  app.use(express.json({limit: '50mb'}))
  app.use(express.urlencoded({limit: '50mb', extended: true}))
  app.use(express.static( 'public'))
  app.use(mainRouter);
  
  const server = http.createServer(app)
  
  server.listen(config.server.port, '192.168.43.57', async ()=>{
    console.log('[SERVER] start'.white)
  })
}
startServer()