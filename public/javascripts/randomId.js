function sample(collection) {
  let randomIndex = Math.floor(Math.random() * collection.length)
  return collection[randomIndex]
}
// 產生亂數
function randomId(length) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  let collection = []
  let sessionId = ''

  collection = collection.concat(...lowerCaseLetters)
  collection = collection.concat(...upperCaseLetters)
  collection = collection.concat(...numbers)

  for (i = 0; i < length; i ++) {
    sessionId += String(sample(collection))
  }

  return sessionId
}
module.exports = randomId