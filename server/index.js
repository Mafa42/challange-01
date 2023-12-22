const http = require('http');
const { PORT = 8000 } = process.env;
const fs = require('fs');
const path = require('path');

const PUBLIC_DIRECTORY = path.join(__dirname, '..', 'public');

function onRequest(req, res) {
  const urlPath = req.url === '/' ? '/index.html' : req.url;

  // Menangani permintaan file CSS
  if (urlPath.endsWith('.css')) {
    const cssFilePath = path.join(PUBLIC_DIRECTORY, 'css', path.basename(urlPath));
    serveFile(cssFilePath, 'text/css', res);
  }
  // Menangani permintaan file gambar dan ikon
  else if ((urlPath.startsWith('/images/') || urlPath.startsWith('/icon/')) && (urlPath.endsWith('.png') || urlPath.endsWith('.jpg') || urlPath.endsWith('.jpeg') || urlPath.endsWith('.gif'))) {
    const imgFilePath = path.join(PUBLIC_DIRECTORY, urlPath);
    serveFile(imgFilePath, getContentType(urlPath), res);
  }
  // Menangani permintaan file HTML untuk /cars
  else if (urlPath === '/cars') {
    const carsHtmlFilePath = path.join(PUBLIC_DIRECTORY, 'cars.html');
    serveFile(carsHtmlFilePath, 'text/html', res);
  }
  // Menangani permintaan file HTML
  else {
    const filePath = path.join(PUBLIC_DIRECTORY, urlPath);
    serveFile(filePath, 'text/html', res);
  }
}

function serveFile(filePath, contentType, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1>');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

function getContentType(urlPath) {
  const extname = path.extname(urlPath);
  switch (extname) {
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.gif':
    default:
      return 'application/octet-stream';
  }
}



const server = http.createServer(onRequest);

// Jalankan server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
