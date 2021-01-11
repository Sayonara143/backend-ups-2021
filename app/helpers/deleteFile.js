import fs from 'fs'
async function deleteFile (path){
  fs.unlink(String('C:/Sirius2021/backend-ups/' + path), (err) => {
    if (err) throw err
    console.log('Файл успешно удален: ' + String('C:/Sirius2021/backend-ups/' + path).yellow)
  })
}
export{
  deleteFile
}