import Tesseract from 'tesseract.js'

async function recognize (path) {
  return Tesseract.recognize(path, 'ara+eng',
    // { 
    //   logger: m => console.log(m) 
    // }
    )
    .then(async ({ data: { text } }) => {
      return {text: text, status: 200, info: 'успешно'}
    })
    .catch((err)=>{
      console.log(err)
      return {text: null, status: 500, info: `ERROR ${err}`}
    })
}
export{
  recognize
}