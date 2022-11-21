import express from 'express';
const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})


server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/api/sumar/:num1/:num2', (req, res) => {
    let result = Number(req.params.num1) +  Number(req.params.num2)
    res.send(result.toString())
})

app.get('/api/sumar', (req, res) => {
    let result = Number(req.query.num1) +  Number(req.query.num2)
    res.send(result.toString())
})

app.get('/api/operacion/:num1:operator:num2', (req, res) => {
    let result = Number(req.params.num1) +  Number(req.params.num2)
    res.send(result.toString())
})

app.post('/api',  (req, res) => {
    console.log('Post Request received');
    // TODO Create new element
    res.json({
        result: 'ok',
        body: req.body
    })
})

app.put('/api/:id',  (req, res) => {
    console.log('Put Request received');
    // TODO UPDATE element with id equal to req.params.id
    res.json({
        result: 'ok',
        id: req.params.id,
        new: req.body
    })
})

app.delete('/api/:id',  (req, res) => {
    console.log('Delete Request received');

    // TODO Delete element with id equal to req.params.id

    res.json({
        result: 'ok',
        id: req.params.id
    })
})



