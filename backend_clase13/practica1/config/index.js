import 'dotenv/config'

const config = {
    port: process.env.PORT,
    db_pass: process.env.MONGODBATLAS_DB_PASS,
    db_domain: process.env.MONGODBATLAS_DB_DOMAIN || 'cluster0.pku21.mongodb.net',
    db_name: process.env.MONGODBATLAS_DB_NAME || 'sessions',
    db_user: process.env.MONGODBATLAS_DB_USER || 'xyzwqt'
}



export default config