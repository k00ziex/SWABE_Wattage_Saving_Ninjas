const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use('/api/text', require('./router_text'))
app.use('/api/json', require('./router_json'))

app.listen(port, _ => {
    console.debug(`Server running 'multi-router' on port ${port}`);
});

/*const server = http.createServer((req, res) => {
  if(req.url === '/') {
    if(req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, Node.js');
    } else if(req.method === 'POST') {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      });
      req.on('end', _ => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(body)
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  } else if(req.url === '/json') {
    if(req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({'message': 'Hello, Node.js'}));
    } else if(req.method === 'POST') {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      });
      req.on('end', _ => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({'message': body}));
      });     
    } else {
      res.statusCode = 404;
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running 'http-methods-and-routes' on port ${port}/`);
});*/