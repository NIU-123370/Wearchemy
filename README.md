# 穿搭炼金屋 (Wearchemy)

1. **iOS 手机访问**：[https://fundamentals-tunnel-gender-raymond.trycloudflare.com](https://fundamentals-tunnel-gender-raymond.trycloudflare.com)
2. **网页版模拟器**：[https://fundamentals-tunnel-gender-raymond.trycloudflare.com/miniprogram.html](https://fundamentals-tunnel-gender-raymond.trycloudflare.com/miniprogram.html)
3. **网页版**：[http://111.62.156.213:10350](http://111.62.156.213:10350)

> 把已有衣橱，温柔地炼成你的风格配方。

Wearchemy 由 Wear（穿着）与 Alchemy（炼金术）融合而来，寓意将衣橱里熟悉的衣物，重新炼成专属于你的风格配方。它从你已经拥有的单品出发，结合天气、场合、情绪与身体状态，为每一天提供自然、舒适且富有表达力的搭配灵感。

每一次挑选、试穿、收藏与真正穿出门的搭配，都会成为理解你的线索，让零散的衣物逐渐形成清晰而独特的个人风格。我们相信，真正动人的风格并非来自拥有更多，而是更懂得珍惜、组合与表达。

## 🎯 核心功能

*   **👗 衣橱管理**：拍照或上传已有单品，归类收纳，轻松掌握已有资产。
*   **✨ 一键炼金**：基于选择的场合、天气和今日心情，自动生成胶囊搭配与风格配方。
*   **🪞 AR 镜像试衣**：调用摄像头，将虚拟单品直接覆盖至实景人像，免换装比对上身效果。
*   **🌌 身心星轨**：内置睡眠打卡、睡眠债计算与生理周期预测，将身体节律与穿搭情绪相连。
*   **💎 风格元素周期表**：每次收藏与记录都会点亮你的专属风格元素（如“松弛”、“笃定”等），积累个性权重。

## 🎨 设计语言与界面

*   **客户端布局**：桌面端采用侧边导航，移动端自动切换为底部悬浮 Dock，完美适配各类屏幕。
*   **白粉液态玻璃 (Liquid Glass)**：全局采用高斯模糊的毛玻璃材质、内嵌高光边缘与柔和的白粉色系渐变，带来晶莹剔透的呼吸感。
*   **小程序模拟器**：专为桌面演示打造的 miniprogram.html，以 iPhone 17 的 402 × 874 逻辑屏幕还原微信小程序外壳及胶囊按钮交互。

## 🛠 技术栈

本项目主打**轻量、原生、零依赖**：

*   **前端**：原生 HTML5 / CSS3 / Vanilla JavaScript。不使用任何前端框架，通过原生 DOM 操作与 CSS 变量实现复杂的交互与主题。
*   **后端**：纯 Node.js 运行时（无 express 等依赖）。
*   **数据存储**：轻量级 JSON 文件持久化（自带防抖落盘），摆脱繁重的数据库配置。
*   **PWA 支持**：配置了完整的 manifest 与 Service Worker，支持离线缓存，并可在移动端直接“添加到主屏幕”作为原生 App 使用。

## 🚀 启动与部署

Wearchemy 没有 npm 依赖。准备好 Node.js 18 或更高版本后，即可直接运行。

### 1. 本地运行

```bash
git clone https://github.com/NIU-123370/Wearchemy.git
cd Wearchemy
node server.js
```

启动后可访问：

* **客户端**：[http://127.0.0.1:8787/index.html](http://127.0.0.1:8787/index.html)
* **小程序模拟器**：[http://127.0.0.1:8787/miniprogram.html](http://127.0.0.1:8787/miniprogram.html)
* **健康检查**：[http://127.0.0.1:8787/api/health](http://127.0.0.1:8787/api/health)

局域网预览时可监听所有网卡：

```bash
HOST=0.0.0.0 PORT=8787 node server.js
```

### 2. Ubuntu 服务器直接部署

当服务器无法访问 Docker Hub 时，可以使用经过验证的 Node.js + systemd 方式部署：

```bash
sudo apt update
sudo apt install -y nodejs git

git clone https://github.com/NIU-123370/Wearchemy.git /root/Wearchemy
cd /root/Wearchemy
node --check server.js
```

创建 `/etc/systemd/system/wearchemy.service`：

```ini
[Unit]
Description=Wearchemy Web Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/Wearchemy
Environment=HOST=0.0.0.0
Environment=PORT=8787
ExecStart=/usr/bin/node /root/Wearchemy/server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

启动并验证：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now wearchemy
sudo systemctl status wearchemy --no-pager
curl http://127.0.0.1:8787/api/health
```

更新版本：

```bash
cd /root/Wearchemy
git pull origin main
sudo systemctl restart wearchemy
```

### 3. 共享公网与端口映射

如果服务器网卡只有 `10.x`、`172.16-31.x` 或 `192.168.x` 内网地址，需要在云平台创建入站端口映射：

```text
协议：TCP
公网端口：平台自动分配或选择未占用端口
内网 IP：服务器的内网 IPv4
内网端口：8787
```

同时在安全组中放行 TCP `8787`。已有的 SSH 公网端口不要删除或改作网页端口。映射完成后，通过 `http://公网IP:公网端口` 访问。

### 4. Docker 部署

```bash
docker build -t wearchemy:latest .
docker volume create wearchemy-data

docker run -d \
  --name wearchemy \
  --restart unless-stopped \
  -p 8787:8787 \
  -v wearchemy-data:/app/data \
  wearchemy:latest
```

如果构建阶段下载 `node:22-alpine` 超时，说明服务器无法连接 Docker Hub，并非项目构建失败。可配置可信的 Registry Mirror，或使用上面的 Node.js 直接部署方案。

### 5. HTTPS 与 iOS PWA

正式环境建议绑定域名，并使用 Caddy、Nginx 或 Cloudflare Tunnel 提供 HTTPS。iPhone 安装步骤：

1. 使用 Safari 打开 HTTPS 地址。
2. 点击“分享”。
3. 选择“添加到主屏幕”。
4. 从主屏幕打开 Wearchemy。

没有域名时，可使用 Cloudflare Quick Tunnel 临时测试：

```bash
cloudflared tunnel --url http://127.0.0.1:8787
```

命令会生成一个随机的 `https://*.trycloudflare.com` 地址。Quick Tunnel 仅适合测试：终端关闭或进程重启后地址会失效或改变，不应作为正式生产入口。
