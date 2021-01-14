import Tesseract from 'tesseract.js'

async function recognize (path) {
  return Tesseract.recognize(path, 'eng',
    // { 
    //   logger: m => console.log(m) 
    // }
    )
    .then(async ({ data: { text } }) => {
      let status
      if (text == ''){
        status = 0
      } else {
        status = 1
      }
      return {status: status, text: text}
    })
    .catch((err)=>{
      console.log(err)
      return {text: null, status: 0}
    })
}
export{
  recognize
}