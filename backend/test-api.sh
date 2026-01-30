#!/bin/bash

# API 测试脚本
# 用于快速测试 API 端点

BASE_URL="http://localhost:3000"
TOKEN=""

echo "========================================="
echo "无忧陪伴平台 API 测试脚本"
echo "========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试函数
test_endpoint() {
  local method=$1
  local endpoint=$2
  local data=$3
  local description=$4
  
  echo -e "${YELLOW}测试: ${description}${NC}"
  echo "请求: $method $endpoint"
  
  if [ -z "$data" ]; then
    if [ -z "$TOKEN" ]; then
      response=$(curl -s -X $method "$BASE_URL$endpoint" -H "Content-Type: application/json")
    else
      response=$(curl -s -X $method "$BASE_URL$endpoint" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN")
    fi
  else
    if [ -z "$TOKEN" ]; then
      response=$(curl -s -X $method "$BASE_URL$endpoint" -H "Content-Type: application/json" -d "$data")
    else
      response=$(curl -s -X $method "$BASE_URL$endpoint" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d "$data")
    fi
  fi
  
  echo "响应: $response"
  echo ""
  
  # 返回响应供后续使用
  echo "$response"
}

# 1. 健康检查
echo -e "${GREEN}1. 健康检查${NC}"
test_endpoint "GET" "/health" "" "检查服务器状态"

# 2. 用户注册
echo -e "${GREEN}2. 用户注册${NC}"
TIMESTAMP=$(date +%s)
REGISTER_DATA="{\"email\":\"test${TIMESTAMP}@example.com\",\"name\":\"testuser${TIMESTAMP}\",\"display_name\":\"Test User\",\"password\":\"password123\"}"
test_endpoint "POST" "/register" "$REGISTER_DATA" "注册新用户"

# 3. 用户登录
echo -e "${GREEN}3. 用户登录${NC}"
LOGIN_DATA="{\"name\":\"testuser${TIMESTAMP}\",\"password\":\"password123\"}"
LOGIN_RESPONSE=$(test_endpoint "POST" "/authenticate" "$LOGIN_DATA" "用户登录")
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}登录失败，无法继续测试${NC}"
  exit 1
fi

echo -e "${GREEN}登录成功，获取到 Token${NC}"
echo ""

# 4. 获取动态列表
echo -e "${GREEN}4. 获取动态列表${NC}"
test_endpoint "GET" "/feeds" "" "获取所有动态"

# 5. 发布动态
echo -e "${GREEN}5. 发布动态${NC}"
FEED_DATA="{\"content\":\"这是一条测试动态 ${TIMESTAMP}\",\"upload_ids\":[],\"charge\":0,\"comment\":1}"
FEED_RESPONSE=$(test_endpoint "POST" "/feeds" "$FEED_DATA" "发布新动态")

# 6. 获取用户信息
echo -e "${GREEN}6. 获取用户信息${NC}"
test_endpoint "GET" "/user/testuser${TIMESTAMP}" "" "获取用户信息"

# 7. 登出
echo -e "${GREEN}7. 用户登出${NC}"
test_endpoint "POST" "/logout" "" "用户登出"

echo "========================================="
echo -e "${GREEN}测试完成！${NC}"
echo "========================================="
