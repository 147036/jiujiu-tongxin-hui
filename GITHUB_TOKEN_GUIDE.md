# 如何生成 GitHub Personal Access Token

## 步骤（5分钟搞定）

### 第1步：打开 GitHub 设置
1. 登录 https://github.com
2. 右上角点你的头像 → **Settings**

### 第2步：找到 Developer settings
1. 左侧菜单最底部找 **Developer settings**
2. 点进去

### 第3步：创建 Token
1. 左侧选 **Personal access tokens** → **Tokens (classic)**
2. 点右上角 **Generate new token (classic)**
3. 填写：
   - **Note**: 随便写，比如 "九九同心会项目"
   - **Expiration**: 选 "No expiration" 或 "7 days" 都行
   - **Select scopes**: 勾选 `repo`（这个必须有）
4. 点 **Generate token**

### 第4步：复制 Token
- 会看到一个很长的字符串，类似 `ghp_xxxxxxxxxxxx`
- **立刻复制保存**（只能看一次！）

### 第5步：用 Token 推送代码
把下面的命令中的 `YOUR_TOKEN_HERE` 换成你复制的 token：

```bash
cd "C:\Users\30516\WorkBuddy\2026-08-27-16-54-36"
git push https://用户名:YOUR_TOKEN_HERE@github.com/147036/jiujiu-tongxin-hui.git main
```

或者更简单的方式，把 token 加到 remote URL 里：
```bash
git remote set-url origin https://你的用户名:YOUR_TOKEN_HERE@github.com/147036/jiujiu-tongxin-hui.git
git push -u origin main
```
