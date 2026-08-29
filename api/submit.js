// Vercel Serverless Function - 接收表单并提交到飞书
const BASE_APP_TOKEN = 'LAmbbGBd2aYmxws9PUTc1zs6nfd';
const TABLE_ID = 'tblo4DtKVozriyxo';

export default async function handler(req, res) {
  // 处理 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    // 获取临时 Token
    const tokenRes = await fetch('https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: process.env.FEISHU_APP_ID,
        app_secret: process.env.FEISHU_APP_SECRET
      })
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.app_access_token;

    // 提交到飞书
    const recordRes = await fetch(`https://open.feishu.cn/open-apis/base/v2/apps/${BASE_APP_TOKEN}/tables/${TABLE_ID}/records/batch_create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            '姓名': data.name,
            '手机号码': data.phone,
            '所属组别': data.group || '',
            '活动服装尺码': data.clothingSize,
            '备注信息': data.remark || ''
          }
        }]
      })
    });

    const recordData = await recordRes.json();
    
    if (recordData.code === 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: recordData.msg });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
