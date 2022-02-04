// https://nodejs.org/en/docs/guides/getting-started-guide/

const http = require('http');

const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    if(req.url == "/ping"){
        res.end("pong");
    }
    else{
        res.end('Hello There');
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});