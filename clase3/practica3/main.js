const moment = require('moment')

const now = moment()
const birthday = moment("29-11-1968", "DD-MM-YYYY")
const diffYears = moment().diff(birthday, 'years')
const diffDays = moment().diff(birthday, 'days')


let message = `Hoy es ${now.format('DD/MM/YYYY')}
Nací el ${birthday.format('DD/MM/YYYY')}
Desde mi nacimiento han pasado ${diffYears} años.
Desde mi nacimiento han pasado ${diffDays} días.`

console.log(message)
