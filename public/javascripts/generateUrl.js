function sample (collection) {
  const index = Math.floor(Math.random() * collection.length)
  return collection[index]
}

function generateUrl (length) {
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const collection = lowerCaseLetters + upperCaseLetters + numbers
  let url = ''

  while (url.length < length) {
    url += sample(collection)
  }
}

module.exports = generateUrl
