import 'dotenv/config'

let config = {
    port: process.env.PORT,
    db_pass: process.env.DB_PASS,
    db_domain: process.env.DB_DOMAIN,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    google_application_credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS
}

export { config }