# Airtable 一键导入指南

## 📋 表格结构（已准备好）

我为你准备好了 CSV 模板文件：`airtable-template.csv`

包含以下列：
- **姓名** - 填写人的姓名
- **手机** - 填写人的手机号
- **组别** - 包含所有17个选项
- **备注** - 可选的备注信息

## 🚀 三步导入 Airtable

### 第一步：打开 Airtable
1. 访问 https://airtable.com
2. 登录或注册（免费）

### 第二步：创建并导入
1. 点击 **"Create a project"** → **"Quickly upload"**
2. 选择刚才下载的 `airtable-template.csv` 文件
3. 点击 **"Upload and import"**
4. Airtable 会自动识别列名和字段类型
5. 确认字段类型正确后点击 **"Import"**

### 第三步：获取 API 信息
1. 在 Airtable 中打开你刚导入的 base
2. 点击左侧菜单的 **"API"** 按钮
3. 复制以下信息发给我：
   - **Base ID**（URL 中 app 开头的部分）
   - **Table ID**（URL 中 tbl 开头的部分）
4. 然后点击右上角头像 → **"Developer hub"** → **"Create token"**
5. 复制生成的 **PAT Token**（pat 开头的长字符串）

---

## ✅ 完成后我会帮你做什么

1. 修改邀请函表单，直接提交到 Airtable
2. 隐藏之前的后端 API 调用
3. 重新部署到 CloudStudio
4. 测试表单提交功能

---

## 💡 小提示

- Airtable 免费版支持最多 1,200 条记录
- 你可以在 Airtable 中创建视图、筛选器、图表
- 支持导出 Excel、生成分享链接
- 数据实时同步，随时查看统计
