const mode = ['20000000','60000000','120000000']
const configMode =  (numberMode) =>{
  return mode[numberMode-1]
}
export { 
  configMode
}