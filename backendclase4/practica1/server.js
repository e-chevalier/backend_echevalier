import express from 'express';
const app = express()

const PORT = 8080
const frase = 'Hola mundo como están'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})


server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/api/frase', (req, res) => {
    res.send(frase)
})

app.get('/api/letras/:num', (req, res) => {

    const fraseJoin = frase.split(" ").join("")
    let idx = Number(req.params.num)
    res.send(idx > 0 && idx <= fraseJoin.length ? fraseJoin.charAt(idx - 1): { error: "El parámetro está fuera de rango" })

})

app.get('/api/palabras/:num', (req, res) => {
    const fraseArray = frase.split(' ')
    let idx = Number(req.params.num)
    res.send(idx > 0 && idx <= fraseArray.length ? fraseArray[idx - 1]: { error: "El parámetro está fuera de rango" })
})


