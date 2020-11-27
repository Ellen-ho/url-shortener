function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateUrl() {
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  let collection = lowerCaseLetters + upperCaseLetters + numbers
  let url = ''
  while (url.length <= 5){
    
  }