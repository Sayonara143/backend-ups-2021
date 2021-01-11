import Jimp from 'jimp'

async function preparation (path) {
  return Jimp.read(path)
    .then(image => {
      return image
        .greyscale() // set greyscale
        .write(path) // save
    })
    .catch(err => {
      console.error(err)
      return {info: err, status: 500}
    })
}
export{
  preparation
}