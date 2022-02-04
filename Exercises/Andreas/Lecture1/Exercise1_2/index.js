// https://nodejs.org/en/docs/guides/getting-started-guide/

const http = require('http');

// Address and port of the server
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // We define what happens on the /ping endpoint and that it returns plaintext saying 'pong'
    if(req.url === '/ping') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('pong')
    } else if(req.url === '/') {
        // We define what happens at the default endpoint, just returning a plaintext saying 'Hello World'
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    } else { // Define what happens if we do not specify a "proper" endpoint
        res.statusCode = 404;
        res.end('An error occurred with error code 404. Sorry!') // We need to always do a .end() to send a result back
    }
});

// Start the server at the given port and with the hostname
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});