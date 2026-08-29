#!/bin/bash
# 部署脚本
echo "开始部署..."
echo "设置环境变量..."
vercel env add FEISHU_APP_ID cli_aaa4628c85789cfc production << EOF
n
EOF
vercel env add FEISHU_APP_SECRET "你的AppSecret" production << EOF
n
EOF
echo "部署到 Vercel..."
vercel --prod --yes
