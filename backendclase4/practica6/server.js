import express from 'express';
import multer from 'multer'

const app = express()
const router = express.Router()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname )
    }
})

let upload = multer({storage: storage })



const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html')
})

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if(!file) {
        const error = new Error('Please upload a File')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if(!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})

