const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 7821;
const root = __dirname;

const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.json': 'application/json', '.woff2': 'font/woff2'
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0].split('#')[0];
  if (url === '/' || url === '') url = '/index.html';
  if (url.endsWith('/')) url += 'index.html';
  const file = path.join(root, url);
  if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log(`Serving ${root} on port ${port}`));
