const fs = require('fs');
const path = require('path');

// 数据文件路径（Vercel临时文件系统）
const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'entries.json');

module.exports = (req, res) => {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    let entries = [];
    if (fs.existsSync(DATA_FILE)) {
      try {
        entries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      } catch (e) {
        entries = [];
      }
    }
    res.status(200).json(entries);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
