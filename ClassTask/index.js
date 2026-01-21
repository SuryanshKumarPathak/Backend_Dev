const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // parse query params
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === '/' && req.method === 'GET') {
    // Plain text response
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to our Node.js HTTP Server!');
  
  } else if (pathname === '/about' && req.method === 'GET') {
    // HTML response
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head><title>About Page</title></head>
        <body>
          <h1>About Our Server</h1>
          <p>This is a simple Node.js HTTP server example.</p>
        </body>
      </html>
    `);

  } else if (pathname === '/user' && req.method === 'GET') {
    // JSON response with query params
    const name = query.name || 'Unknown';
    const age = query.age || 'Not specified';

    const responseData = {
      name,
      age,
      message: 'User data received successfully'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseData));

  } else {
    // 404 for invalid routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Page Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});