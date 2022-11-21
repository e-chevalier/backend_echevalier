// TODO import componentes Routes

export const serverRoutes = ( app ) => {
    // TODO pass app to componentes routers
    app.get('/', (req, res, next) => {
        res.render('main')
    })

    app.post('/new-contact', (req, res, next) => {
        console.log(req.body)
        res.send('received!!!')
    })

    /**
    * Undefined endpoint
    */
     app.all('*', (req, res, next) => {
        res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
    })

}