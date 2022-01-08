const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // type number
  let hour = new Date().getHours()
  let message = ''

  if( hour >= 6 && hour <= 12 ) {
    message = 'Buenos días!'
  }
  if (hour >= 13 && hour <= 19 ) {
    message = 'Buenos tardes!'
  }
  if (hour >= 20 && hour <= 5) {
    message = 'Buenas noches!'
  }

  res.end(message);
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});
