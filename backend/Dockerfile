# 后端 Dockerfile
FROM node:20-alpine

# 安装构建工具（bcrypt 需要）
RUN apk add --no-cache python3 make g++

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 删除 pnpm-lock.yaml 以强制重新安装
RUN rm -f pnpm-lock.yaml

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 创建上传目录
RUN mkdir -p uploads

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["pnpm", "run", "dev"]
