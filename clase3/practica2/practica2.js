const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

const productosToString= () => {
    return productos.map(prod => prod.nombre).join()
}


const precioTotal = () => {
    return productos.map(prod => prod.precio).reduce( (a,b) => a + b ).toFixed(2)
}

const precioPromedio = () => {
    return (precioTotal()/productos.length).toFixed(2)
}

const precioMin = () => {
    return [...productos].sort((a,b) => a.precio - b.precio)[0]
}

const precioMax = () => {
    return [...productos].sort((a,b) => b.precio - a.precio)[0]
}

//console.log(productosToString())
//console.log("Precio TOTAL: " + precioTotal())
// console.log("Precio Promedio: " + precioPromedio())
// console.log(precioMin())
// console.log(precioMax())

console.log({
    prodToString: productosToString(),
    precioTotal: Number(precioTotal()),
    precioPromedio: Number(precioPromedio()),
    precioMin: precioMin(),
    precioMax: precioMax()
})
//console.log(productos)