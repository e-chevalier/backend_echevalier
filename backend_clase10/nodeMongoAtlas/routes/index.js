// TODO import componentes Routes

export const serverRoutes = ( app ) => {
    // TODO pass app to componentes routers
    app.get('/', (req, res, next) => {
        res.send("Todo ok!")
    })

    /**
    * Undefined endpoint
    */
     app.all('*', (req, res, next) => {
        res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
    })

}