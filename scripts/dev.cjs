'use strict';
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const root = path.resolve(__dirname, '..');
const routes = {
  '/api/track': '../api/track', '/api/geo': '../api/geo', '/go/1win': '../api/go/1win', '/api/go/1win': '../api/go/1win',
  '/api/postback/1win': '../api/postback/1win', '/postback/partner': '../api/postback/1win',
  '/api/postback/1win/registration': '../api/postback/1win/registration',
  '/api/postback/1win/first-deposit': '../api/postback/1win/first-deposit',
  '/api/postback/1win/redeposit': '../api/postback/1win/redeposit',
};
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    res.status = code => { res.statusCode = code; return res; };
    res.json = value => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(value)); return res; };
    res.send = value => { res.end(value); return res; };
    res.redirect = (code, href) => { res.writeHead(code, { Location: href }); res.end(); return res; };
    if (routes[url.pathname]) return await require(routes[url.pathname])(req, res);
    const homepage = ['/', '/index.html', '/tt1', '/tt2', '/ig1', '/fb1'].includes(url.pathname);
    const relative = homepage ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
    if (!homepage && !relative.startsWith('assets/')) return res.status(404).send('Not found');
    const filename = path.resolve(root, relative);
    if (!filename.startsWith(root + path.sep) || !fs.existsSync(filename) || !fs.statSync(filename).isFile()) return res.status(404).send('Not found');
    res.setHeader('Content-Type', mime[path.extname(filename)] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    fs.createReadStream(filename).pipe(res);
  } catch (_) { res.statusCode = 500; res.end('Local server error'); }
});
server.listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log('Game Select: http://localhost:' + server.address().port));
