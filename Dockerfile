# 使用轻量级的 Node.js Alpine 镜像作为基础
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 复制当前目录下的所有文件到容器中
COPY . .

# 声明数据挂载目录，防止容器重启后数据（db.json）丢失
VOLUME [ "/app/data" ]

# 设置环境变量，确保服务监听所有网络接口，并指定端口
ENV HOST=0.0.0.0
ENV PORT=8787

# 声明容器对外暴露的端口
EXPOSE 8787

# 启动命令
CMD ["node", "server.js"]
