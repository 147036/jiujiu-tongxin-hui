const http = require('http');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'entries.json');
const ADMIN_FILE = path.join(__dirname, 'admin.html');
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API: 提交表单
  if (pathname === '/api/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const entry = {
          id: Date.now(),
          name: data.name || '',
          phone: data.phone || '',
          group: data.group || '',
          remark: data.remark || '',
          submittedAt: new Date().toISOString()
        };
        let entries = [];
        if (fs.existsSync(DATA_FILE)) {
          entries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        }
        entries.push(entry);
        fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, id: entry.id }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false }));
      }
    });
    return;
  }

  // API: 获取所有数据
  if (pathname === '/api/entries' && req.method === 'GET') {
    let entries = [];
    if (fs.existsSync(DATA_FILE)) {
      try {
        entries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      } catch (e) {
        entries = [];
      }
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(entries));
    return;
  }

  // API: 清空数据
  if (pathname === '/api/clear' && req.method === 'DELETE') {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // 管理后台
  if (pathname === '/' || pathname === '/admin') {
    if (fs.existsSync(ADMIN_FILE)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(ADMIN_FILE).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
    return;
  }

  // 静态文件服务
  const filePath = path.join(__dirname, '..', pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`管理后台: http://localhost:${PORT}/admin`);
});
