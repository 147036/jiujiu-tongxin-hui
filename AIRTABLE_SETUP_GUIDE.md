# Airtable 报名表单 - 完整配置指南

## 第一步：创建 Airtable Base

1. 打开 https://airtable.com
2. 点击 **"Create a project"** → **"Start from scratch"**
3. 输入项目名称：**"九九同心会报名表"**
4. 点击 Create

## 第二步：添加字段（列）

删除默认字段，按顺序添加以下列：

| # | 字段名 | 类型 | 选项/说明 |
|---|--------|------|----------|
| 1 | 姓名 | Single line text | 必填 |
| 2 | 手机 | Phone number | 格式：+86 |
| 3 | 组别 | Single select | 见下方选项列表 |
| 4 | 备注 | Long text | 可选 |
| 5 | 提交时间 | Created time | 自动填充 |

### 组别选项（Single select）
复制以下内容到 Airtable 的单选选项：

```
综合管理组·领航先锋
项目组·落地深耕
项目组·市场开拓
项目组·产品创新
项目组·运营优化
项目组·风险控制
项目组·技术支持
项目组成员A
项目组成员B
项目组成员C
项目组成员D
项目组成员E
项目组成员F
项目组成员G
项目组成员H
项目组成员I
其他
```

## 第三步：获取 API 信息

1. 在 Airtable 中打开你的 base
2. 点击左侧菜单的 **"API"** 按钮
3. 你会看到类似这样的 URL：
   ```
   https://api.airtable.com/v0/appXXXXXXXXXXXXXXX/tblXXXXXXXXXXXXXX
   ```
4. **复制 Base ID**（app 开头的部分）
5. **复制 Table ID**（tbl 开头的部分）

## 第四步：创建 API Token

1. 点击右上角头像 → **"Developer hub"**
2. 点击 **"Create token"**
3. 填写：
   - Name: `九九同心会报名表`
   - Scopes: 勾选 `data.records:read` 和 `data.records:write`
   - Access: 选择你刚创建的 base
4. 点击 **"Create"**
5. **复制生成的 token**（pat 开头的长字符串）

## 第五步：把信息发给我

请把以下三个信息发给我（我会帮你配置邀请函）：

1. **Base ID**: `appXXXXXXXXXXXXXXX`
2. **Table ID**: `tblXXXXXXXXXXXXXX`
3. **PAT Token**: `patXXXXXXXXXXXXXXX`

---

## 完成后的效果

- 用户填写表单 → 数据自动保存到 Airtable
- 你可以在 Airtable 中实时查看、筛选、统计
- 支持导出 Excel、生成图表
- 完全免费（最多 1,200 条记录）
