// https://nodejs.org/en/docs/guides/getting-started-guide/

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if(req.url === '/ping') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('pong');
    } else if (req.url === '/tobias') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('er smuk');
    }
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});