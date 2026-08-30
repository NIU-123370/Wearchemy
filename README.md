# 穿搭炼金屋 (Wearchemy)

1. **ios手机访问**：[http://111.62.156.213:10350](http://111.62.156.213:10350)
2. **网页版模拟器**：[http://111.62.156.213:10350/miniprogram.html](http://111.62.156.213:10350/miniprogram.html)

![Wearchemy 白粉液态玻璃项目展示](assets/wearchemy-hero.png)

> 把已有衣橱，温柔地炼成你的风格配方。

Wearchemy 由 Wear（穿着）与 Alchemy（炼金术）融合而来，寓意将衣橱里熟悉的衣物，重新炼成专属于你的风格配方。它从你已经拥有的单品出发，结合天气、场合、情绪与身体状态，为每一天提供自然、舒适且富有表达力的搭配灵感。

每一次挑选、试穿、收藏与真正穿出门的搭配，都会成为理解你的线索，让零散的衣物逐渐形成清晰而独特的个人风格。我们相信，真正动人的风格并非来自拥有更多，而是更懂得珍惜、组合与表达。

## 🌷 项目背景

面对不断扩大的衣橱，人们常常仍会陷入“衣服很多，却不知道今天穿什么”的困境。传统穿搭工具更关注新品推荐和消费转化，却很少真正理解用户已经拥有的衣物，也难以照顾天气、场合、情绪、睡眠和身体节律共同带来的细微变化。

Wearchemy 因此诞生。项目希望把穿搭从一次性的选择，转化为一段持续认识自己的过程：让旧单品被重新看见，让每一次搭配都留下可复用的经验，也让风格不再由潮流定义，而是在日常生活里缓慢生长。它既是一间数字衣橱，也是一座连接衣物、心情与身体感受的个人风格实验室。

## 👥 目标用户

* **选择困难的日常穿搭者**：希望快速获得符合天气、场合与心情的搭配建议。
* **希望提高衣橱利用率的人群**：减少重复购买，重新组合已有单品，实践更可持续的消费方式。
* **关注身心状态的女性用户**：希望把睡眠、生理周期与身体感受纳入穿搭决策。
* **需要轻量工具的学生与年轻职场人**：无需安装复杂软件，通过浏览器或 iOS 主屏幕即可使用。

## 🧭 项目目标

1. 建立清晰、易维护的个人数字衣橱。
2. 根据场合、天气、心情与身体节律生成可解释的穿搭配方。
3. 记录收藏、穿着与睡眠反馈，逐步形成个性化风格画像。
4. 以轻量 PWA 提供接近原生客户端的跨设备体验。

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

## 💡 创新点

* **从“推荐购买”转向“重新理解已有衣橱”**：优先复用用户已有单品，用组合代替无止境的新增消费。
* **穿搭与身心节律联动**：将天气、情绪、睡眠质量和生理周期共同纳入推荐，让搭配不仅好看，也更贴近当天的真实感受。
* **可解释的风格配方**：推荐结果同时展示配色、场合、天气与舒适度依据，让用户知道“为什么这样搭”。
* **风格元素周期表**：把长期选择沉淀为可视化风格元素，让抽象的个人气质变成能够积累、观察和回顾的成长轨迹。
* **轻量液态玻璃客户端**：以原生 Web 技术实现白粉色 Liquid Glass 视觉，并通过 PWA 同时覆盖网页、iOS 主屏幕与桌面模拟演示场景。

## 🛠 技术栈

本项目主打**轻量、原生、零依赖**：

*   **前端**：原生 HTML5 / CSS3 / Vanilla JavaScript。不使用任何前端框架，通过原生 DOM 操作与 CSS 变量实现复杂的交互与主题。
*   **后端**：纯 Node.js 运行时（无 express 等依赖）。
*   **数据存储**：轻量级 JSON 文件持久化（自带防抖落盘），摆脱繁重的数据库配置。
*   **PWA 支持**：配置了完整的 manifest 与 Service Worker，支持离线缓存，并可在移动端直接“添加到主屏幕”作为原生 App 使用。

## 🤝 团队分工

当前按照职责协作，成员姓名可在正式提交材料时补充：

| 职责 | 主要工作 |
| --- | --- |
| 产品与策划 | 用户需求分析、功能规划、交互流程与项目文档 |
| UI/UX 设计 | 白粉液态玻璃视觉、移动端适配、图标与动效规范 |
| 前端开发 | 页面结构、交互逻辑、PWA、响应式布局与模拟器 |
| 后端与部署 | REST API、JSON 持久化、systemd 服务与公网访问 |
| 测试与内容 | 功能测试、兼容性检查、演示数据与答辩材料整理 |

## 🧩 开发过程

1. **需求梳理**：从“衣服很多却不会搭”的真实痛点出发，确定数字衣橱、穿搭配方和身心记录三条核心体验路径。
2. **原型与视觉设计**：完成移动端信息架构，以白粉色透明液态玻璃建立统一设计语言，并针对 iPhone 尺寸优化操作区域。
3. **核心功能实现**：依次完成衣橱管理、组合推荐、配方收藏、AR 镜像、睡眠打卡、生理周期与风格元素模块。
4. **数据与服务接入**：使用零依赖 Node.js 构建 REST API，通过 JSON 文件持久化衣物、配方、打卡和用户画像。
5. **跨端适配与部署**：加入 PWA、Service Worker 和桌面端 iPhone 模拟器，并在 Ubuntu 服务器上通过 systemd 持续运行。
6. **体验打磨**：围绕移动端比例、玻璃层次、加载反馈、离线访问和部署稳定性进行多轮调整。

## 🔭 后续计划

* 接入更准确的天气服务和基于图片的衣物识别，降低录入成本。
* 丰富推荐模型，让颜色、材质、版型、场景和历史反馈参与个性化排序。
* 完善 AR 试衣的尺寸标定、遮挡关系与服装贴合效果。
* 增加账号体系、云端同步、数据导出与隐私控制。
* 支持好友共享衣橱、搭配故事和匿名灵感社区，同时保留用户对数据的完整控制权。
* 推进无障碍适配、自动化测试与稳定域名部署，为后续上架独立 iOS 客户端做好准备。

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
