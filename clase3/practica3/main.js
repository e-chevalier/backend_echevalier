const moment = require('moment')

console.log("Hello")

const today = new Date()
const birthday = "29/11/1968"

const now = moment()
console.log(now)

const mBirthday = moment("29-11-1968", "DD-MM-YYYY")
console.log(mBirthday)

const difference = moment().diff(mBirthday)

console.log(new Date(difference))

let message = `Hoy es ${today.toLocaleDateString()}
Nací el ${birthday}
Desde mi nacimiento han pasado 52 años.
Desde mi nacimiento han pasado 19036 días.`

console.log(message)
