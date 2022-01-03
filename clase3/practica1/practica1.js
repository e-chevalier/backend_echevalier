getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


let response = {}

for(let i=0; i < 10000; i++){
    let temp = getRandomIntInclusive(1,20)
    response[temp] ? response[temp]++ : response[temp] = 1
}

console.log(response)
  

// let values = []
// let res = {}

// for(let i=0; i < 1000; i++){
//     values.push(getRandomIntInclusive(1,20))
// }

// for(let i=1; i<21; i++){
//     res = {...res, [i]: values.filter(v => v == i).length}
// }

// console.log(res)
