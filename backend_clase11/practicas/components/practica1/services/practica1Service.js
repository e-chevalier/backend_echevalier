const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

class Practica1 {

    getRandomIndex = (max) => {
        return Math.floor(Math.random() * (max));
    }
    

    getTenObjects = () => {
        let response = []
        for (let i = 0; i <  10; i++) {
            response.push(
                {
                    nombre: nombres[this.getRandomIndex(nombres.length)],
                    apellido: apellidos[this.getRandomIndex(apellidos.length)],
                    color: colores[this.getRandomIndex(colores.length)]
                })
        }
        return response
    }


    async test() {
        console.log(`test`)
        let response = this.getTenObjects()
        
        return { status: "OK", response: response}
    }
 
}

export let practica1Service = new Practica1()