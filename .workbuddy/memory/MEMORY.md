# 九九同心会邀请函项目记忆

## 核心交付物
- 邀请函：`index.html`（国风设计，带背景音乐和开场引导层）
- 部署链接：https://7c2e73dea0b54e9bbb367bd6576969a2.app.workbuddy.link
- 数据收集：Airtable（等待用户配置后接入）

## 项目状态
- ✅ 邀请函设计完成（v8，国风 + 动效 + 音乐）
- ✅ 部署到 CloudStudio
- ⏳ 表单数据收集：等待用户创建 Airtable Base 并提供 API 信息

## 技术细节
- CloudStudio 只支持静态网站，不支持后端 API
- 表单数据需要直接提交到 Airtable（前端直连）
- 需要准备：Base ID、Table ID、PAT Token

## 待办事项
- [ ] 用户创建 Airtable Base 并配置字段
- [ ] 获取 Base ID、Table ID、PAT Token
- [ ] 修改表单提交逻辑，直接调用 Airtable API
- [ ] 重新部署并测试
