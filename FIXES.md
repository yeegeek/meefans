# 问题修复记录

## 2024-01-30 修复

### 问题 1: Vite 需要 Node.js 20+

**错误信息**:
```
You are using Node.js 18.20.8. Vite requires Node.js version 20.19+ or 22.12+.
```

**原因**: Vite 7.3.1 需要 Node.js 20.19+ 或 22.12+，但 Dockerfile 使用的是 Node.js 18

**解决方案**:
- 将 `backend/Dockerfile` 和 `frontend/Dockerfile` 中的 `FROM node:18-alpine` 改为 `FROM node:20-alpine`

### 问题 2: bcrypt 模块找不到

**错误信息**:
```
Error: Cannot find module '/app/node_modules/.pnpm/bcrypt@5.1.1/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node'
```

**原因**: bcrypt 是原生模块，需要针对特定的 Node.js 版本编译。当 Node.js 版本改变时，需要重新安装。

**解决方案**:
1. 在 Dockerfile 中添加构建工具：
   ```dockerfile
   RUN apk add --no-cache python3 make g++
   ```

2. 删除 pnpm-lock.yaml 并重新安装依赖：
   ```dockerfile
   RUN rm -f pnpm-lock.yaml
   RUN pnpm install
   ```

## 修复后的 Dockerfile

### backend/Dockerfile

```dockerfile
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
```

### frontend/Dockerfile

```dockerfile
# 前端 Dockerfile
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 5173

# 启动命令（开发模式，允许外部访问）
CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]
```

## 如何应用修复

### 方式一：重新构建镜像（推荐）

```bash
# 停止并删除旧容器
docker compose down

# 删除旧镜像
docker rmi meefans-backend meefans-frontend

# 重新构建并启动
docker compose up --build -d

# 初始化数据库
docker compose exec backend pnpm run seed
```

### 方式二：清理所有并重新开始

```bash
# 停止并删除所有容器、网络、卷
docker compose down -v

# 删除所有项目相关镜像
docker images | grep meefans | awk '{print $3}' | xargs docker rmi -f

# 重新构建并启动
docker compose up --build -d

# 初始化数据库
docker compose exec backend pnpm run seed
```

## 验证修复

启动后检查：

```bash
# 查看服务状态
docker compose ps

# 查看后端日志
docker compose logs backend

# 查看前端日志
docker compose logs frontend

# 检查 Node.js 版本
docker compose exec backend node --version
docker compose exec frontend node --version
```

应该看到：
- 后端: `v20.x.x`
- 前端: `v20.x.x`
- 没有错误信息

## 访问应用

- 前端: http://localhost:5173
- 后端: http://localhost:3000

## 常见问题

### 问题：构建时间很长

**原因**: 需要编译 bcrypt 等原生模块

**解决**: 这是正常的，首次构建需要 3-5 分钟

### 问题：端口被占用

**解决**: 修改 `docker-compose.yml` 中的端口映射

### 问题：数据丢失

**原因**: 使用了 `docker compose down -v`

**解决**: 不要使用 `-v` 参数，或重新运行 `pnpm run seed`

## 预防措施

1. **版本匹配**: 确保 Dockerfile 中的 Node.js 版本与 package.json 中的要求匹配
2. **原生模块**: 对于包含原生模块的项目，确保安装了构建工具
3. **依赖锁定**: 在生产环境使用 `--frozen-lockfile` 锁定依赖版本
4. **测试**: 每次修改 Dockerfile 后都要测试构建和运行

## 相关资源

- [Vite 系统要求](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [bcrypt 文档](https://github.com/kelektiv/node.bcrypt.js)
- [Docker Alpine 镜像](https://hub.docker.com/_/node)
- [pnpm 文档](https://pnpm.io/)
