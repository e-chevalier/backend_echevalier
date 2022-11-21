
class Practica1 {

    async saludo() {
        try {
            
            let response = ''

            for(let i=0; i < 10000; i++){
                response += 'Hola que tal'
            }
            
            return { status: "OK", response: response }

        } catch (error) {
            console.log(error)
        }
    }
}

export let practica1Service = new Practica1()