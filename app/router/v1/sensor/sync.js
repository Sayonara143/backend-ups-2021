import express from 'express'
const router = express.Router();


router.get('/', async (req,res) => {
  console.log('gjjggodjsgv')
  try {
    //let user = req.user
    res.sendStatus(200)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "sorry, the server crashed"})
  }
});


export default router