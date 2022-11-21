import 'dotenv/config'
import { createTransport } from "nodemailer";
import logger from "../logger/winston.js";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
    .default({
        provider: 'smtp.ethereal.email',
        subject: 'TEST',
        message: '<h1 style="color: blue;"> Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer.</span></h1>'
    })
    .alias({
        p: 'provider',
        s: 'subject',
        m: 'message'
    })
    .argv



const TEST_MAIL_ETHEREAL = process.env.TEST_MAIL_ETHEREAL
const TEST_PASS_ETHEREAL = process.env.TEST_PASS_ETHEREAL

const TEST_MAIL_GMAIL = process.env.TEST_MAIL_GMAIL
const TEST_PASS_GMAIL = process.env.TEST_PASS_GMAIL


const transport_gmail_config = {
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL_GMAIL,
        pass: TEST_PASS_GMAIL,
    }
}

const transport_ethereal_config = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL_ETHEREAL,
        pass: TEST_PASS_ETHEREAL
    }
}

const transport_config = argv.provider === 'gmail'? transport_gmail_config: transport_ethereal_config


const transporter = createTransport(transport_config)

const mailOptions = {
    from: 'Servidor Node.js',
    to: argv.provider === 'gmail'? TEST_MAIL_GMAIL : TEST_MAIL_ETHEREAL,
    subject: argv.subject,
    html: argv.message
}

const sendMailTest = async () => {
    try {

        let info = await transporter.sendMail(mailOptions)
        logger.info(info)

    } catch (error) {
        logger.error(error)
    }
}

logger.info(`Send email from: ${transport_config.auth.user} to: ${mailOptions.to}.`)

sendMailTest()

//export { transporter, sendMailTest }