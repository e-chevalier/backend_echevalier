
const operacion = (a, b, comando) => {
    return comando(a,b)
}


const sumar = (a, b) => a + b 
const restar = (a, b) => a - b
const multiplicar = (a,b ) => a * b
const dividir = (a,b) => a/b


console.log("Sumar: 8 + 2 = " + operacion(8,2,sumar))
console.log("Restar: 8 - 2 = " + operacion(8,2,restar))
console.log("Multiplicar: 8 * 2 = " + operacion(8,2,multiplicar))
console.log("Dividir: 8 / 2 = " + operacion(8,2,dividir))
