import { createApp, config, React, ReactDOMServer, serveStatic } from "../config/deps.ts";
import App from '../components/App.tsx';


const { PORT } = config();
const app = createApp();

app.use(serveStatic("./public"));

app.handle("/", async (req) => {

    
    await req.respond({
        status:200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),
    body: ReactDOMServer.renderToString(
        <html lang="es">
            <head>
                <meta charSet="utf-8"/>
                <title>Desafio Clase 24</title>
                <link rel="stylesheet" href="style.css" />
                <script defer src="script.js"></script>
            </head>
            <body>
                <App />
            </body>
        </html>
    ), 
    });
});

app.listen({port: Number(PORT)});