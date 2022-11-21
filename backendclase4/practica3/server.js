import express from 'express';
const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

let frase = 'Frase inicial'
const fraseArray = frase.split(' ')

app.get('/api/frase',  (req, res) => {
    console.log('GET Request received');
    
    res.json({
        result: 'ok',
        frase: fraseArray.join(' ')
    })
})

app.get('/api/palabras/:pos',  (req, res) => {
    console.log('GET Request received');
    let idx = Number(req.params.pos)
    res.json(idx > 0 && idx <= fraseArray.length ? { result: 'ok', buscada: fraseArray[idx - 1]}: { result: 'error', error: "El parámetro está fuera de rango" })

})

app.post('/api/palabras',  (req, res) => {
    console.log('POST Request received');

    let palabra = req.body.palabra

    fraseArray.push(palabra.trim())

    console.log(fraseArray)

    res.json({
        result: 'ok',
        agregada: palabra.trim(),
        pos: fraseArray.length
    })
})

app.put('/api/palabras/:pos',  (req, res) => {
    console.log('PUT Request received');

    let palabra = req.body.palabra
    let idx = Number(req.params.pos)
    let result = {}

    if(idx > 0 && idx <= fraseArray.length) {
        result = { 
            result: 'ok',
            actualizada: palabra.trim(),
            anterior: fraseArray[idx-1]
        }
        fraseArray[idx-1] = palabra.trim()
    } else {
        result = { 
            result: 'error',
            error: "El parámetro está fuera de rango"
        }
    }

    res.json(result)
})

app.delete('/api/palabras/:pos',  (req, res) => {
    console.log('DELETE Request received');

    let idx = Number(req.params.pos)
    let result = {}

    if(idx > 0 && idx <= fraseArray.length) {
        result = { 
            result: 'ok',
            eliminada: fraseArray.splice(idx-1,1)
        }
        
    } else {
        result = { 
            result: 'error',
            error: "El parámetro está fuera de rango"
        }
    }

    res.json(result)
})



