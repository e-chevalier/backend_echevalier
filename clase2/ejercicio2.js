const mostrarLetras = ( word ) => {
   
    if(word.length) {
        console.log(word.at(0))
        setTimeout(()=>mostrarLetras( word.substring(1)), 250)
    } else {
        fin()
    }
}

const fin = () => console.log("terminé")


mostrarLetras("¡Hola!")