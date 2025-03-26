import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import helpers from './src/helpers/helpers.js'
const { prepareHTML, getURLPerEnvironments } = helpers;

const buildDir = process.env.BUILD_PATH || path.join(process.cwd(), 'build');
const port = process.env.PORT || 3333;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// SSL certificate and key paths
const certKeyPath = path.join(__dirname, './certs/private.key');
const certCertPath = path.join(__dirname, './certs/server.crt');

// Check if the SSL cert and key files exist
const hasCert = fs.existsSync(certKeyPath) && fs.existsSync(certCertPath);

const options = hasCert ? {
  key: fs.readFileSync(certKeyPath),
  cert: fs.readFileSync(certCertPath),
} : null;

const serverHandler = (req, res) => {
  const parsedUrl = new URL(req.url, `https://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const sectionId = parsedUrl.searchParams.get('sectionId');
  const integrity = parsedUrl.searchParams.get('integrity');
  let queryEnv = parsedUrl.searchParams.get('env');
  if (sectionId?.charAt(0) == '9') {
    queryEnv = 'eu';
  }
  const env = getURLPerEnvironments(queryEnv);

  if (pathname === '/') {
    fs.readFile(path.join(buildDir, 'index.html'), 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.end('Error reading index.html');
        return;
      }

      if (sectionId && env) {
        data = prepareHTML(data, sectionId, env, integrity);
      } else {
        data = data.replace('</body>', `<h1>Missing query parameters</h1></body>`);
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    const filePath = path.join(buildDir, pathname);
    fs.stat(filePath, (err, stat) => {
      if (err) {
        if (!pathname.includes('favicon.ico')) {
          const indexPath = path.join(buildDir, 'index.html');
          fs.readFile(indexPath, 'utf8', (readErr, data) => {
            if (readErr) {
              res.statusCode = 500;
              res.end('Error reading index.html');
              return;
            }
            if (sectionId && env) {
              data = prepareHTML(data, sectionId, env, integrity);
            } else {
              data = data.replace('</body>', `<h1>Missing query parameters</h1></body>`);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
          });
        } else {
          res.statusCode = 404;
          res.end('Not Found');
        }
        return;
      }

      const extname = path.extname(filePath);
      let contentType = 'text/html';
      if (extname === '.js') contentType = 'application/javascript';
      if (extname === '.css') contentType = 'text/css';
      if (extname === '.json') contentType = 'application/json';
      if (extname === '.png') contentType = 'image/png';
      if (extname === '.jpg') contentType = 'image/jpeg';
      if (extname === '.gif') contentType = 'image/gif';

      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });
  }
};

if (hasCert) {
  https.createServer(options, serverHandler).listen(port, () => {
    console.log(`🟢 HTTPS Server running at https://localhost:${port}, buildDir: ${buildDir}`);
  });
} else {
  http.createServer(serverHandler).listen(port, () => {
    console.log(`🟢 HTTP Server running at http://localhost:${port}, buildDir: ${buildDir}`);
  });
}
