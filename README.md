# 九九同心会报名表单后端

## 📦 项目结构
```
2026-08-27-16-54-36/
├── api/                    # Vercel Serverless Functions
│   ├── submit.js          # POST /api/submit - 接收表单提交
│   └── entries.js         # GET /api/entries - 获取所有数据
├── backend/
│   ├── server.js          # 本地开发服务器
│   └── admin.html         # 管理后台页面
├── data/                   # 数据存储目录（运行时创建）
│   └── entries.json       # 报名数据文件
├── invitation-v8.html     # 邀请函页面
├── index.html             # 部署入口
├── package.json           # 项目配置
├── vercel.json            # Vercel 部署配置
└── README.md              # 本文档
```

## 🚀 部署到Vercel（推荐）

### 步骤1：注册 Vercel 账号
1. 打开 https://vercel.com
2. 点击 "Sign Up"，用 GitHub 登录（最简单）
3. 完成邮箱验证

### 步骤2：准备项目
方法A - 使用GitHub（推荐）：
```bash
# 在你的项目文件夹中初始化Git
cd /c/Users/30516/WorkBuddy/2026-08-27-16-54-36
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <你的GitHub仓库地址>
git push -u origin main
```

方法B - 直接上传文件夹：
1. 把整个 `2026-08-27-16-54-36` 文件夹压缩成zip
2. 上传到Vercel Dashboard

### 步骤3：部署
1. 进入 https://vercel.com/dashboard
2. 点击 "Add New..." → "Project"
3. 选择你的GitHub仓库（如果用了方法A）
4. 点击 "Deploy"，等待1-2分钟
5. 部署成功后会给你一个链接，类似：`https://your-project.vercel.app`

### 步骤4：设置环境变量（可选）
如果需要设置端口或其他配置，在Vercel Dashboard：
- 进入项目 Settings → Environment Variables
- 添加 `PORT=3000`（默认就是3000）

## 📱 部署后的链接

- **邀请函页面**：`https://your-project.vercel.app`
- **管理后台**：`https://your-project.vercel.app/admin`

## 🧪 本地测试

```bash
# 安装依赖（本项目无需额外依赖）
# npm install  # 不需要

# 启动本地服务器
node backend/server.js

# 访问
# 邀请函: http://localhost:3000
# 管理后台: http://localhost:3000/admin
```

## 📊 API 说明

### POST /api/submit
接收表单提交数据
```json
请求体：
{
  "name": "张三",
  "phone": "13800138000",
  "group": "项目组 · 落地深耕",
  "remark": "备注信息"
}

响应：
{
  "success": true,
  "message": "提交成功"
}
```

### GET /api/entries
获取所有报名数据
```json
响应：
[
  {
    "id": 1787888515133,
    "name": "张三",
    "phone": "13800138000",
    "group": "项目组 · 落地深耕",
    "remark": "备注信息",
    "submittedAt": "2026-08-28T03:41:55.133Z"
  }
]
```

### DELETE /api/clear
清空所有数据（管理后台使用）

## 🎯 注意事项

1. **数据存储**：Vercel 使用临时文件系统，每次服务器重启数据会丢失。如需持久化存储，建议改用：
   - MongoDB Atlas（免费）
   - Firebase Firestore（免费）
   - Supabase（免费）

2. **自动刷新**：管理后台每30秒自动刷新数据

3. **导出功能**：支持导出CSV格式，可用Excel打开

4. **CORS**：已配置跨域，允许任何域名访问API

## 🐛 常见问题

**Q: 部署后表单提交失败？**
A: 检查浏览器控制台是否有CORS错误，确认Vercel URL正确

**Q: 数据不保存？**
A: Vercel 免费版的文件系统是临时的，重新部署后数据会丢失。如需持久化，请升级到付费版或使用外部数据库

**Q: 管理后台打不开？**
A: 确认访问路径是 `/admin`，例如 `https://xxx.vercel.app/admin`
