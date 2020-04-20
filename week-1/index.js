const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;


const url = require('url');
var fs = require('fs');
const homepage = fs.readFileSync('public/index.html');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  switch (parsedUrl.pathname) {
    case '/about':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('about');
    case '/contact':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('contact');
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(homepage);
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});