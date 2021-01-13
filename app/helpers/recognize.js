import Tesseract from 'tesseract.js'

async function recognize (path) {
  return Tesseract.recognize(path, 'eng',
    // { 
    //   logger: m => console.log(m) 
    // }
    )
    .then(async ({ data: { text } }) => {
      let result
      if (text == ''){
        result = { status: 0 }
      } else {
        result = { text: text, status: 1}
      }
      return result
    })
    .catch((err)=>{
      console.log(err)
      return {text: null, status: 0}
    })
}
export{
  recognize
}