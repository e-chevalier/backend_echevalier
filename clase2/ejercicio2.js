const fin = () => console.log("terminé")

const mostrarLetras = ( word, timer, cb ) => {
   
    if(word.length) {
        console.log(word.at(0))
        setTimeout(()=>mostrarLetras( word.substring(1), timer, cb), timer)
    } else {
        cb()
    }
}



mostrarLetras("¡Hola!", 0, fin)
mostrarLetras("¡Hola!", 250, fin)
mostrarLetras("¡Hola!", 500, fin)