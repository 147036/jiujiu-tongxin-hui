import fs from 'fs';
import path from 'path';

// 数据文件路径（Vercel临时文件系统）
const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'entries.json');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

export default function handler(req, res) {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
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

        res.status(200).json({ success: true, message: '提交成功' });
      } catch (e) {
        console.error('提交失败:', e);
        res.status(400).json({ success: false, message: '提交失败' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
