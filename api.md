---
title: 默认模块
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 默认模块

无忧陪伴平台 API 接口集合

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# Loveoversea

## POST 用户注册

POST /register

> Body 请求参数

```json
{
  "email": "user@example.com",
  "name": "string",
  "display_name": "string",
  "password": "string",
  "pid": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» email|body|string(email)| 是 |none|
|» name|body|string| 是 |none|
|» display_name|body|string| 是 |none|
|» password|body|string| 是 |none|
|» pid|body|integer| 否 |none|

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|Inline|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» field|string|true|none||none|

## POST 发送验证码

POST /code

> Body 请求参数

```json
{
  "name": "{{name}}",
  "email": "{{email}}",
  "exists": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» email|body|string| 否 |none|
|» exists|body|integer| 否 |none|
|» name|body|string| 否 |none|
|» *anonymous*|body|object| 否 |none|
|» *anonymous*|body|object| 否 |none|

> 返回示例

> 201 Response

```json
{
  "email": "string",
  "code": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» email|string|true|none||none|
|» code|integer|true|none||none|

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» field|string|true|none||none|

## POST 用户登陆

POST /authenticate

> Body 请求参数

```json
{
  "name": "{{name}}",
  "password": "{{password}}",
  "email": "{{email}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[LoginParam](#schemaloginparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "token": "string",
  "channel": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» token|string|true|none||none|
|» channel|string|true|none||none|

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» field|string|true|none||none|

## GET 登出

GET /logout

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|none|[Error](#schemaerror)|

### 返回数据结构

状态码 **401**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» field|string|false|none||none|

## POST 登出Post

POST /logout

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|none|[Error](#schemaerror)|

### 返回数据结构

状态码 **401**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» field|string|false|none||none|

## GET 页脚页面

GET /page

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "about": {
    "content": "string",
    "updated_at": "string"
  },
  "policy": {
    "content": "string",
    "updated_at": "string"
  },
  "terms": {
    "content": "string",
    "updated_at": "string"
  },
  "help": {
    "content": "string",
    "updated_at": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» about|[Footer](#schemafooter)|true|none||none|
|»» content|string|true|none||none|
|»» updated_at|string|true|none||none|
|» policy|[Footer](#schemafooter)|true|none||none|
|»» content|string|true|none||none|
|»» updated_at|string|true|none||none|
|» terms|[Footer](#schemafooter)|true|none||none|
|»» content|string|true|none||none|
|»» updated_at|string|true|none||none|
|» help|[Footer](#schemafooter)|true|none||none|
|»» content|string|true|none||none|
|»» updated_at|string|true|none||none|

## GET 获取动态

GET /feeds

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|k|query|string| 否 |搜索关键字|
|max_id|query|integer| 否 |ID分页|
|c|query|string| 否 |分类： browse | following |popular|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "feeds": [
    {
      "id": 0,
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "type": "string",
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ],
      "comment": 0,
      "translate": 0,
      "engine": 0,
      "content": "string",
      "cost": 0,
      "top": 0,
      "counter": {
        "liked": 0,
        "commented": 0,
        "tipped": 0,
        "tipped_amount": 0
      }
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_max_id": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» feeds|[[Feed](#schemafeed)]|true|none||none|
|»» id|integer|true|none||none|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» type|string|true|none||none|
|»» created_at|string|true|none||none|
|»» files|[[File](#schemafile)]|true|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|»» comment|integer|true|none||none|
|»» translate|integer|true|none||none|
|»» engine|integer|true|none||none|
|»» content|string|true|none||none|
|»» cost|number|true|none||none|
|»» top|integer|true|none||none|
|»» counter|[FeedCounter](#schemafeedcounter)|false|none||none|
|»»» liked|integer|true|none||none|
|»»» commented|integer|true|none||none|
|»»» tipped|integer|true|none||none|
|»»» tipped_amount|number|true|none||none|
|» pagination|[PageID](#schemapageid)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_max_id|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## POST 发布动态

POST /feeds

> Body 请求参数

```json
{
  "upload_ids": [
    1110437
  ],
  "charge": 1,
  "comment": 0,
  "content": "what's going on?"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[FeedParam](#schemafeedparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "feeds": [
    {
      "id": 0,
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "type": "string",
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ],
      "comment": 0,
      "translate": 0,
      "engine": 0,
      "content": "string",
      "cost": 0,
      "top": 0,
      "counter": {
        "liked": 0,
        "commented": 0,
        "tipped": 0,
        "tipped_amount": 0
      }
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» feeds|[[Feed](#schemafeed)]|true|none||none|
|»» id|integer|true|none||none|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» type|string|true|none||none|
|»» created_at|string|true|none||none|
|»» files|[[File](#schemafile)]|true|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|»» comment|integer|true|none||none|
|»» translate|integer|true|none||none|
|»» engine|integer|true|none||none|
|»» content|string|true|none||none|
|»» cost|number|true|none||none|
|»» top|integer|true|none||none|
|»» counter|[FeedCounter](#schemafeedcounter)|false|none||none|
|»»» liked|integer|true|none||none|
|»»» commented|integer|true|none||none|
|»»» tipped|integer|true|none||none|
|»»» tipped_amount|number|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 获取动态评论

GET /comment/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |动态ID|
|max_id|query|string| 否 |按照ID分页|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "feed": {
    "id": 0,
    "user": {
      "id": 0,
      "name": "string",
      "display_name": "string",
      "gender": 0,
      "avatar": "string",
      "cover": "string",
      "location": "string",
      "vip": 0,
      "friend": 0,
      "block": 0,
      "request": 0,
      "x": 0,
      "content": "string",
      "cost": 0,
      "translate": 0,
      "engine": 0,
      "online": 0
    },
    "type": "string",
    "created_at": "string",
    "files": [
      {
        "id": 0,
        "type": "string",
        "charge": 0,
        "paid": 0,
        "price": 0,
        "src": "string",
        "w": 0,
        "h": 0,
        "top": 0,
        "thumb": "string",
        "duration": 0
      }
    ],
    "comment": 0,
    "translate": 0,
    "engine": 0,
    "content": "string",
    "cost": 0,
    "top": 0,
    "counter": {
      "liked": 0,
      "commented": 0,
      "tipped": 0,
      "tipped_amount": 0
    }
  },
  "comments": [
    {
      "id": 0,
      "post_id": 0,
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "translate": 0,
      "engine": 0,
      "content": "string",
      "cost": 0,
      "files": {
        "id": 0,
        "type": "string",
        "charge": 0,
        "paid": 0,
        "price": 0,
        "src": "string",
        "w": 0,
        "h": 0,
        "top": 0,
        "thumb": "string",
        "duration": 0
      },
      "created_at": "string"
    }
  ],
  "likes": [
    {
      "id": 0,
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      }
    }
  ],
  "tips": [
    {
      "id": 0,
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "amount": "string"
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_max_id": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» feed|[Feed](#schemafeed)|true|none||none|
|»» id|integer|true|none||none|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» type|string|true|none||none|
|»» created_at|string|true|none||none|
|»» files|[[File](#schemafile)]|true|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|»» comment|integer|true|none||none|
|»» translate|integer|true|none||none|
|»» engine|integer|true|none||none|
|»» content|string|true|none||none|
|»» cost|number|true|none||none|
|»» top|integer|true|none||none|
|»» counter|[FeedCounter](#schemafeedcounter)|false|none||none|
|»»» liked|integer|true|none||none|
|»»» commented|integer|true|none||none|
|»»» tipped|integer|true|none||none|
|»»» tipped_amount|number|true|none||none|
|» comments|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» post_id|integer|false|none||none|
|»» user|[User](#schemauser)|false|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» translate|integer|false|none||none|
|»» engine|integer|false|none||none|
|»» content|string|false|none||none|
|»» cost|number|false|none||none|
|»» files|[File](#schemafile)|false|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|»» created_at|string|false|none||none|
|» likes|[[Like](#schemalike)]|true|none||none|
|»» id|integer|false|none||none|
|»» user|[User](#schemauser)|false|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|» tips|[[Tip](#schematip)]|true|none||none|
|»» id|integer|false|none||none|
|»» user|[User](#schemauser)|false|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» amount|string|false|none||none|
|» pagination|[PageID](#schemapageid)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_max_id|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## DELETE 删除评论

DELETE /comment/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|X-Client-ID|header|string| 否 |none|

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

## GET 获取用户主页（动态）

GET /feeds/user/{name}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |none|
|max_id|query|string| 否 |none|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "feeds": [
    {
      "id": 0,
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "type": "string",
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ],
      "comment": 0,
      "translate": 0,
      "engine": 0,
      "content": "string",
      "cost": 0,
      "top": 0,
      "counter": {
        "liked": 0,
        "commented": 0,
        "tipped": 0,
        "tipped_amount": 0
      }
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_max_id": 0
  },
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» feeds|[[Feed](#schemafeed)]|true|none||none|
|»» id|integer|true|none||none|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» type|string|true|none||none|
|»» created_at|string|true|none||none|
|»» files|[[File](#schemafile)]|true|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|»» comment|integer|true|none||none|
|»» translate|integer|true|none||none|
|»» engine|integer|true|none||none|
|»» content|string|true|none||none|
|»» cost|number|true|none||none|
|»» top|integer|true|none||none|
|»» counter|[FeedCounter](#schemafeedcounter)|false|none||none|
|»»» liked|integer|true|none||none|
|»»» commented|integer|true|none||none|
|»»» tipped|integer|true|none||none|
|»»» tipped_amount|number|true|none||none|
|» pagination|[PageID](#schemapageid)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_max_id|integer|true|none||none|
|» user|[User](#schemauser)|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» display_name|string|true|none||none|
|»» gender|integer|true|none||none|
|»» avatar|string|false|none||none|
|»» cover|string|false|none||none|
|»» location|string|false|none||none|
|»» vip|integer|true|none||none|
|»» friend|integer|true|none||none|
|»» block|integer|true|none||none|
|»» request|integer|true|none||none|
|»» x|integer|false|none||是否是partner， 1是0不是|
|»» content|string|false|none||自我介绍|
|»» cost|integer|false|none||自我介绍翻译费用|
|»» translate|integer|false|none||自我介绍是否翻译|
|»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»» online|integer|false|none||是否在线|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 获取用户照片

GET /photos/{name}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|path|string| 是 |none|
|page|query|string| 否 |none|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "files": [
    {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_page": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» user|[User](#schemauser)|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» display_name|string|true|none||none|
|»» gender|integer|true|none||none|
|»» avatar|string|false|none||none|
|»» cover|string|false|none||none|
|»» location|string|false|none||none|
|»» vip|integer|true|none||none|
|»» friend|integer|true|none||none|
|»» block|integer|true|none||none|
|»» request|integer|true|none||none|
|»» x|integer|false|none||是否是partner， 1是0不是|
|»» content|string|false|none||自我介绍|
|»» cost|integer|false|none||自我介绍翻译费用|
|»» translate|integer|false|none||自我介绍是否翻译|
|»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»» online|integer|false|none||是否在线|
|» files|[[File](#schemafile)]|true|none||none|
|»» id|integer|true|none||none|
|»» type|string|true|none||none|
|»» charge|integer|true|none||none|
|»» paid|integer|true|none||none|
|»» price|integer|true|none||none|
|»» src|string|true|none||none|
|»» w|integer|true|none||none|
|»» h|integer|true|none||none|
|»» top|integer|true|none||none|
|»» thumb|string|false|none||none|
|»» duration|integer|false|none||none|
|» pagination|[Page](#schemapage)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_page|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 获取推荐用户

GET /recommend

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |none|
|k|query|string| 否 |搜索关键字 @xxxx #xxxx等等|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "top": 0,
      "remark": "string",
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ]
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_page": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» users|[[UserList](#schemauserlist)]|true|none||none|
|»» id|integer|true|none||none|
|»» top|integer|false|none||是否置顶|
|»» remark|string|false|none||备注|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» created_at|string|false|none||none|
|»» files|[[File](#schemafile)]|false|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|» pagination|[Page](#schemapage)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_page|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 获取热度用户

GET /hottest

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |none|
|k|query|string| 否 |搜索关键字 @xxxx #xxxx等等|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "top": 0,
      "remark": "string",
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ]
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_page": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» users|[[UserList](#schemauserlist)]|true|none||none|
|»» id|integer|true|none||none|
|»» top|integer|false|none||是否置顶|
|»» remark|string|false|none||备注|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» created_at|string|false|none||none|
|»» files|[[File](#schemafile)]|false|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|» pagination|[Page](#schemapage)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_page|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 获取最新用户

GET /newest

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |none|
|k|query|string| 否 |搜索关键字 @xxxx #xxxx等等|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "name": "string",
      "display_name": "string",
      "gender": 0,
      "avatar": "string",
      "cover": "string",
      "location": "string",
      "vip": 0,
      "friend": 0,
      "block": 0,
      "request": 0,
      "x": 0,
      "content": "string",
      "cost": 0,
      "translate": 0,
      "engine": 0,
      "online": 0
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_page": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» users|[[User](#schemauser)]|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» display_name|string|true|none||none|
|»» gender|integer|true|none||none|
|»» avatar|string|false|none||none|
|»» cover|string|false|none||none|
|»» location|string|false|none||none|
|»» vip|integer|true|none||none|
|»» friend|integer|true|none||none|
|»» block|integer|true|none||none|
|»» request|integer|true|none||none|
|»» x|integer|false|none||是否是partner， 1是0不是|
|»» content|string|false|none||自我介绍|
|»» cost|integer|false|none||自我介绍翻译费用|
|»» translate|integer|false|none||自我介绍是否翻译|
|»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»» online|integer|false|none||是否在线|
|» pagination|[Page](#schemapage)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_page|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 获取在线用户

GET /online

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |none|
|k|query|string| 否 |搜索关键字 @xxxx #xxxx等等|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "top": 0,
      "remark": "string",
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ]
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_page": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» users|[[UserList](#schemauserlist)]|true|none||none|
|»» id|integer|true|none||none|
|»» top|integer|false|none||是否置顶|
|»» remark|string|false|none||备注|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» created_at|string|false|none||none|
|»» files|[[File](#schemafile)]|false|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|» pagination|[Page](#schemapage)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_page|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 首页推荐用户

GET /front

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "top": 0,
      "remark": "string",
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ]
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» users|[[UserList](#schemauserlist)]|true|none||none|
|»» id|integer|true|none||none|
|»» top|integer|false|none||是否置顶|
|»» remark|string|false|none||备注|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» created_at|string|false|none||none|
|»» files|[[File](#schemafile)]|false|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## POST 搜索接口

POST /search

> Body 请求参数

```json
{
  "k": "zheng"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» k|body|string| 是 |none|

> 返回示例

> 201 Response

```json
{
  "users": [
    {
      "id": 0,
      "name": "string",
      "display_name": "string",
      "gender": 0,
      "avatar": "string",
      "cover": "string",
      "location": "string",
      "vip": 0,
      "friend": 0,
      "block": 0,
      "request": 0,
      "x": 0,
      "content": "string",
      "cost": 0,
      "translate": 0,
      "engine": 0,
      "online": 0
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» users|[[User](#schemauser)]|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» display_name|string|true|none||none|
|»» gender|integer|true|none||none|
|»» avatar|string|false|none||none|
|»» cover|string|false|none||none|
|»» location|string|false|none||none|
|»» vip|integer|true|none||none|
|»» friend|integer|true|none||none|
|»» block|integer|true|none||none|
|»» request|integer|true|none||none|
|»» x|integer|false|none||是否是partner， 1是0不是|
|»» content|string|false|none||自我介绍|
|»» cost|integer|false|none||自我介绍翻译费用|
|»» translate|integer|false|none||自我介绍是否翻译|
|»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»» online|integer|false|none||是否在线|
|» bench|object|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## POST 客服创建工单

POST /support

> Body 请求参数

```json
{
  "username": "Sam",
  "email": "samqiang@gmail.com",
  "content": "what is going on? I can open site. ",
  "category": "contact"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» username|body|string| 否 |none|
|» email|body|string(email)| 否 |none|
|» content|body|string| 是 |none|
|» category|body|string| 是 |['contact', 'chat', 'complaint', 'apply'];|
|» about|body|string| 否 |['translation', 'message', 'photo', 'user', 'feed', 'other', 'contact', 'post', 'comment', 'creator'];|
|» captcha|body|string| 否 |验证码字符串|
|» related_id|body|integer| 是 |相关ID|

#### 枚举值

|属性|值|
|---|---|
|» category|contact|
|» category|chat|
|» category|complaint|
|» category|apply|
|» about|translation|
|» about|message|
|» about|photo|
|» about|user|
|» about|feed|
|» about|other|
|» about|contact|
|» about|post|
|» about|comment|
|» about|creator|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 帮助问答

GET /faq

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "questions": [
    {
      "q": "string",
      "a": "string",
      "updated_at": "string"
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» questions|[[QA](#schemaqa)]|true|none||none|
|»» q|string|true|none||none|
|»» a|string|true|none||none|
|»» updated_at|string|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## PUT 修改密码

PUT /password/reset

> Body 请求参数

```json
{
  "password": "{{password}}",
  "new_password": "{{password}}",
  "new_password_confirm": "{{password}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[PasswordParam](#schemapasswordparam)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 删除账户

POST /user

> Body 请求参数

```json
{
  "password": "{{password}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[PasswordParam](#schemapasswordparam)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 修改账户

PUT /user

> Body 请求参数

```json
{
  "name": "oowf",
  "display_name": "One Only",
  "gender": 1,
  "language": "zh",
  "location": 569,
  "introduction": "asdf",
  "avatar": 1110435,
  "cover": 1110436,
  "email": "samqiang@gmail.com",
  "invisible": 1,
  "privacy": 0,
  "msg_from": 1,
  "engine": 2,
  "email_friend": 0,
  "email_visitor": 0,
  "email_like": 0,
  "email_message": 0,
  "email_promotion": 0,
  "email_tip": 0,
  "email_comment": 0,
  "email_post": 0,
  "email_login": 0,
  "sound": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[Setting](#schemasetting)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取我的信息

GET /me

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "display_name": "string",
  "email": "string",
  "gender": 0,
  "avatar": "string",
  "cover": "string",
  "location": "string",
  "language": "string",
  "engine": 0,
  "vip": 0,
  "vip_expired_at": "string",
  "privacy": 0,
  "msg_from": 0,
  "msg_limit": 0,
  "seeking": 0,
  "sound": 0,
  "email_post": 0,
  "email_comment": 0,
  "email_tip": 0,
  "email_friend": 0,
  "email_visitor": 0,
  "email_like": 0,
  "email_message": 0,
  "email_promotion": 0,
  "email_bill": 0,
  "email_login": 0,
  "channel": "string",
  "invisible": 0,
  "is_partner": 0,
  "change_name": 0,
  "created_at": "string",
  "updated_at": "string",
  "content": "string",
  "location_id": 0,
  "balance": "string",
  "bd": 0,
  "counter": {
    "request": 0,
    "likeme": 0,
    "message": 0,
    "visitor": 0,
    "notification": 0,
    "charms": 0,
    "orders": 0
  },
  "minlen": 0,
  "recommend": [
    {
      "id": 0,
      "name": "string",
      "display_name": "string",
      "gender": 0,
      "avatar": "string",
      "cover": "string",
      "location": "string",
      "vip": 0,
      "friend": 0,
      "block": 0,
      "request": 0,
      "x": 0,
      "content": "string",
      "cost": 0,
      "translate": 0,
      "engine": 0,
      "online": 0
    }
  ],
  "clients": [
    {
      "client_id": "string",
      "client": "string",
      "ip": {
        "address": "string",
        "country_code": "string",
        "country": "string",
        "location": "string"
      },
      "last_active": "string",
      "current": 0
    }
  ],
  "pay_id": "string",
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Me](#schemame)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|none|[Error](#schemaerror)|

## POST 创作者提现

POST /withdraw

> Body 请求参数

```json
{
  "cashout": 1,
  "rate": 15,
  "bank_type": "bank",
  "bank_name": "Samzhang",
  "bank_number": "120304-20",
  "bank_detail": "what2222",
  "auto_withdraw": 0,
  "phone": "2029341324",
  "amount": 10.5
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[Creator](#schemacreator)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "wage": {
    "id": 0,
    "amount": "string",
    "phone": "string",
    "bank_type": "string",
    "bank_name": "string",
    "bank_number": "string",
    "bank_detail": "string",
    "paid": 0,
    "created_at": "string"
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» wage|[Wage](#schemawage)|true|none||none|
|»» id|integer|true|none||none|
|»» amount|string|true|none||none|
|»» phone|string|true|none||none|
|»» bank_type|string|true|none||none|
|»» bank_name|string|true|none||none|
|»» bank_number|string|true|none||none|
|»» bank_detail|string|true|none||none|
|»» paid|integer|true|none||none|
|»» created_at|string|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» field|string|true|none||none|

## GET 获取创作者信息

GET /creator

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "creator": {
    "cashout": 0,
    "rate": 0,
    "bank_type": "string",
    "bank_name": "string",
    "bank_number": "string",
    "bank_detail": "string",
    "auto_withdraw": 0,
    "phone": "string",
    "amount": 0
  },
  "wages": [
    {
      "id": 0,
      "amount": "string",
      "phone": "string",
      "bank_type": "string",
      "bank_name": "string",
      "bank_number": "string",
      "bank_detail": "string",
      "paid": 0,
      "created_at": "string"
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» creator|[Creator](#schemacreator)|true|none||none|
|»» cashout|integer|false|none||是否可以取款|
|»» rate|integer|false|none||提成比例|
|»» bank_type|string|true|none||取款方式|
|»» bank_name|string|false|none||开户行名称|
|»» bank_number|string|true|none||收款账号信息|
|»» bank_detail|string|false|none||其他说明信息|
|»» auto_withdraw|integer|false|none||自动提现|
|»» phone|string|false|none||电话|
|»» amount|number|true|none||金额|
|» wages|[[Wage](#schemawage)]|true|none||none|
|»» id|integer|true|none||none|
|»» amount|string|true|none||none|
|»» phone|string|true|none||none|
|»» bank_type|string|true|none||none|
|»» bank_name|string|true|none||none|
|»» bank_number|string|true|none||none|
|»» bank_detail|string|true|none||none|
|»» paid|integer|true|none||none|
|»» created_at|string|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 获取地区

GET /location

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|k|query|string| 否 |关键字搜索地址|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "locations": [
    {
      "location_id": 0,
      "location": "string"
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» locations|[[Location](#schemalocation)]|true|none||none|
|»» location_id|integer|true|none||none|
|»» location|string|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## POST 备注名称

POST /alias

> Body 请求参数

```json
{
  "user_id": 135242,
  "display_name": "MyLover"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[AliasParam](#schemaaliasparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» bench|object|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## POST 关注用户

POST /follow

> Body 请求参数

```json
{
  "user_id": 135242
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[UserIDParam](#schemauseridparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» bench|object|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## PUT [取消]置顶用户

PUT /follow

> Body 请求参数

```json
{
  "user_id": 135242,
  "top": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[UserIDParam](#schemauseridparam)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 取消阻止用户

POST /unfollow

> Body 请求参数

```json
{
  "user_id": 135242
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[UserIDParam](#schemauseridparam)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 阻止用户

POST /block

> Body 请求参数

```json
{
  "user_id": 135242
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[UserIDParam](#schemauseridparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» bench|object|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 黑名单列表

GET /block

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |分页|
|k|query|string| 否 |关键字|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "created_at": "string",
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      }
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» users|[[Blacklist](#schemablacklist)]|true|none||none|
|»» id|integer|true|none||none|
|»» created_at|string|true|none||none|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 关注用户列表

GET /following

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |分页|
|k|query|string| 否 |关键字|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "top": 0,
      "remark": "string",
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "vip": 0,
        "age": "string",
        "online": 0,
        "follow": 0,
        "block": 0,
        "fan": 0,
        "blocked": 0
      },
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0
        }
      ]
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» users|[[UserList](#schemauserlist)]|true|none||none|
|»» id|integer|true|none||none|
|»» top|integer|false|none||none|
|»» remark|string|false|none||none|
|»» user|object|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» vip|integer|true|none||none|
|»»» age|string|true|none||none|
|»»» online|integer|true|none||none|
|»»» follow|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» fan|integer|true|none||none|
|»»» blocked|integer|true|none||none|
|»» created_at|string|false|none||none|
|»» files|[object]|false|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 粉丝列表

GET /followers

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |分页|
|k|query|string| 否 |关键字|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "users": [
    {
      "id": 0,
      "top": 0,
      "remark": "string",
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "vip": 0,
        "age": "string",
        "online": 0,
        "follow": 0,
        "block": 0,
        "fan": 0,
        "blocked": 0
      },
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0
        }
      ]
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» users|[[UserList](#schemauserlist)]|true|none||none|
|»» id|integer|true|none||none|
|»» top|integer|false|none||none|
|»» remark|string|false|none||none|
|»» user|object|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» vip|integer|true|none||none|
|»»» age|string|true|none||none|
|»»» online|integer|true|none||none|
|»»» follow|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» fan|integer|true|none||none|
|»»» blocked|integer|true|none||none|
|»» created_at|string|false|none||none|
|»» files|[object]|false|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## DELETE 删除我的动态

DELETE /feeds/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |我的动态ID|
|X-Client-ID|header|string| 否 |none|

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

## PUT 修改动态（置顶评论）

PUT /feeds/{id}

> Body 请求参数

```json
{
  "comment": 3,
  "top": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |我的动态ID|
|X-Client-ID|header|string| 否 |none|
|body|body|[FeedUpdate](#schemafeedupdate)| 否 |none|

> 返回示例

> 404 Response

```json
{
  "code": 0,
  "message": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|Inline|

### 返回数据结构

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|

## POST 喜欢帖子

POST /likes/{id}

> Body 请求参数

```json
{
  "yes": "1"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» yes|body|string| 是 |喜欢或者取消喜欢，1喜欢0取消喜欢|

#### 枚举值

|属性|值|
|---|---|
|» yes|1|
|» yes|0|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 打赏帖子/用户

POST /tip

> Body 请求参数

```json
{
  "user_id": 1001123,
  "related_id": 1131074,
  "amount": 1.2
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[TipParam](#schematipparam)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取用户交易

GET /trades

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|max_id|query|string| 否 |none|
|k|query|string| 否 |关键字搜索|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "trades": [
    {
      "id": 0,
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "amount": "string",
      "balance": "string",
      "related_id": 0,
      "related_user_id": 0,
      "type": "string",
      "remark": "string",
      "created_at": "string"
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_max_id": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» trades|[[Trade](#schematrade)]|true|none||none|
|»» id|integer|true|none||none|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» amount|string|true|none||none|
|»» balance|string|true|none||none|
|»» related_id|integer|true|none||none|
|»» related_user_id|integer|true|none||none|
|»» type|string|true|none||none|
|»» remark|string|true|none||none|
|»» created_at|string|true|none||none|
|» pagination|[PageID](#schemapageid)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_max_id|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## POST 评论动态

POST /comment

> Body 请求参数

```json
{
  "id": 152610,
  "content": "very nice"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[CommentParam](#schemacommentparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "comment": {
    "id": 0,
    "post_id": 0,
    "user": {
      "id": 0,
      "name": "string",
      "display_name": "string",
      "gender": 0,
      "avatar": "string",
      "cover": "string",
      "location": "string",
      "vip": 0,
      "friend": 0,
      "block": 0,
      "request": 0,
      "x": 0,
      "content": "string",
      "cost": 0,
      "translate": 0,
      "engine": 0,
      "online": 0
    },
    "translate": 0,
    "engine": 0,
    "content": "string",
    "cost": 0,
    "files": [
      {
        "id": 0,
        "type": "string",
        "charge": 0,
        "paid": 0,
        "price": 0,
        "src": "string",
        "w": 0,
        "h": 0,
        "top": 0,
        "thumb": "string",
        "duration": 0
      }
    ],
    "created_at": "string"
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» comment|[Comment](#schemacomment)|true|none||none|
|»» id|integer|true|none||none|
|»» post_id|integer|true|none||none|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» translate|integer|true|none||是否翻译了|
|»» engine|integer|true|none||翻译引擎|
|»» content|string|true|none||内容：原文｜译文|
|»» cost|number|true|none||none|
|»» files|[[File](#schemafile)]|true|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|»» created_at|string|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## DELETE 删除全部评论

DELETE /comments/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |动态ID|
|X-Client-ID|header|string| 否 |none|

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

## POST 上传GIF链接

POST /gif

> Body 请求参数

```json
{
  "link": "https://media0.giphy.com/media/ieJXRlUHIGnkVWqhIh/giphy.webp?cid=6893b2dahnf6t728cu6h74lxy1n650mwj2hdysrydf46qahn&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
  "w": 480,
  "h": 480
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[GifParam](#schemagifparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "files": [
    {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» files|[[File](#schemafile)]|true|none||none|
|»» id|integer|true|none||none|
|»» type|string|true|none||none|
|»» charge|integer|true|none||none|
|»» paid|integer|true|none||none|
|»» price|integer|true|none||none|
|»» src|string|true|none||none|
|»» w|integer|true|none||none|
|»» h|integer|true|none||none|
|»» top|integer|true|none||none|
|»» thumb|string|false|none||none|
|»» duration|integer|false|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 上传过的图片

GET /attachments/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |收件人ID|
|category|query|string| 否 |文件夹[private, secret, gif]|
|page|query|string| 否 |none|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "files": [
    {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_page": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» files|[[File](#schemafile)]|true|none||none|
|»» id|integer|true|none||none|
|»» type|string|true|none||none|
|»» charge|integer|true|none||none|
|»» paid|integer|true|none||none|
|»» price|integer|true|none||none|
|»» src|string|true|none||none|
|»» w|integer|true|none||none|
|»» h|integer|true|none||none|
|»» top|integer|true|none||none|
|»» thumb|string|false|none||none|
|»» duration|integer|false|none||none|
|» pagination|[Page](#schemapage)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_page|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## PUT 付费查看私密内容

PUT /uploads/pay

> Body 请求参数

```json
{
  "id": 1110442
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» id|body|integer| 是 |none|

> 返回示例

> 202 Response

```json
{
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|none|Inline|

### 返回数据结构

状态码 **202**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 获取通知

GET /notifications

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 否 |none|
|max_id|query|string| 否 |none|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "notifications": [
    {
      "id": 0,
      "type": "string",
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "related_id": "string",
      "related": {
        "like": "string",
        "feed": {
          "files": [
            null
          ],
          "content": "string"
        }
      },
      "created_at": "string"
    }
  ],
  "pagination": {
    "next_url": "string",
    "next_max_id": 0
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» notifications|[[Notification](#schemanotification)]|true|none||none|
|»» id|integer|true|none||none|
|»» type|string|true|none||none|
|»» user|[User](#schemauser)¦null|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» related_id|string|true|none||none|
|»» related|object¦null|true|none||none|
|»»» like|string|true|none||none|
|»»» feed|object|true|none||none|
|»»»» files|[[File](#schemafile)]|true|none||none|
|»»»»» id|integer|true|none||none|
|»»»»» type|string|true|none||none|
|»»»»» charge|integer|true|none||none|
|»»»»» paid|integer|true|none||none|
|»»»»» price|integer|true|none||none|
|»»»»» src|string|true|none||none|
|»»»»» w|integer|true|none||none|
|»»»»» h|integer|true|none||none|
|»»»»» top|integer|true|none||none|
|»»»»» thumb|string|false|none||none|
|»»»»» duration|integer|false|none||none|
|»»»» content|string|true|none||none|
|»» created_at|string|true|none||none|
|» pagination|[PageID](#schemapageid)|true|none||none|
|»» next_url|string|true|none||none|
|»» next_max_id|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## DELETE 删除所有通知

DELETE /notifications

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

## DELETE 删除某些通知

DELETE /notification/{type}/{related_id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|path|string| 是 |类型|
|related_id|path|string| 是 |相关ID|
|X-Client-ID|header|string| 否 |none|

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

## GET 获取虚拟礼物

GET /gifts

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "gifts": [
    {
      "id": 0,
      "thumb": "string",
      "src": "string",
      "price": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ],
      "category": "string",
      "hit": 0
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» gifts|[[Gift](#schemagift)]|true|none||none|
|»» id|integer|true|none||none|
|»» thumb|string|true|none||none|
|»» src|string|true|none||none|
|»» price|string|true|none||none|
|»» files|[[File](#schemafile)]|true|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|»» category|string|true|none||none|
|»» hit|integer|true|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## POST 发送消息

POST /messages

> Body 请求参数

```json
{
  "message_content": "text message",
  "message_type": "image",
  "thread_id": 1000011,
  "upload_ids": [
    1110444
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[MessageParam](#schemamessageparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "id": 0,
  "summary": "string",
  "updated_at": "string",
  "unread": 0,
  "last_read_at": "string",
  "engine": 0,
  "send": 0,
  "receive": 0,
  "refuse": 0,
  "top": 0,
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "avatar": "string",
    "cover": "string",
    "gender": 0,
    "vip": 0,
    "age": 0,
    "online": 0,
    "follow": 0,
    "block": 0,
    "fan": 0,
    "blocked": 0
  },
  "draft": "string",
  "messages": [
    {
      "id": 0,
      "thread_id": 0,
      "sender": 0,
      "receiver": 0,
      "type": "string",
      "charge": 0,
      "status": 0,
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ]
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[Thread](#schemathread)|

## GET 获取对话列表

GET /message_threads

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|k|query|string| 否 |关键字搜索|
|page|query|string| 否 |none|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "threads": [
    {
      "id": 0,
      "summary": "string",
      "updated_at": "string",
      "unread": 0,
      "last_read_at": "string",
      "engine": 0,
      "send": 0,
      "receive": 0,
      "refuse": 0,
      "top": 0,
      "user": {
        "id": 0,
        "name": "string",
        "display_name": "string",
        "gender": 0,
        "avatar": "string",
        "cover": "string",
        "location": "string",
        "vip": 0,
        "friend": 0,
        "block": 0,
        "request": 0,
        "x": 0,
        "content": "string",
        "cost": 0,
        "translate": 0,
        "engine": 0,
        "online": 0
      },
      "draft": "string",
      "messages": [
        {
          "id": 0,
          "thread_id": 0,
          "sender": 0,
          "receiver": 0,
          "type": "string",
          "charge": 0,
          "status": 0,
          "created_at": "string",
          "files": [
            {}
          ]
        }
      ]
    }
  ],
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» threads|[[Thread](#schemathread)]|true|none||none|
|»» id|integer|true|none||none|
|»» summary|string|true|none||none|
|»» updated_at|string|true|none||none|
|»» unread|integer|true|none||none|
|»» last_read_at|string|true|none||none|
|»» engine|integer|true|none||none|
|»» send|integer|true|none||none|
|»» receive|integer|true|none||none|
|»» refuse|integer|true|none||none|
|»» top|integer|true|none||none|
|»» user|[User](#schemauser)|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» display_name|string|true|none||none|
|»»» gender|integer|true|none||none|
|»»» avatar|string|false|none||none|
|»»» cover|string|false|none||none|
|»»» location|string|false|none||none|
|»»» vip|integer|true|none||none|
|»»» friend|integer|true|none||none|
|»»» block|integer|true|none||none|
|»»» request|integer|true|none||none|
|»»» x|integer|false|none||是否是partner， 1是0不是|
|»»» content|string|false|none||自我介绍|
|»»» cost|integer|false|none||自我介绍翻译费用|
|»»» translate|integer|false|none||自我介绍是否翻译|
|»»» engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|»»» online|integer|false|none||是否在线|
|»» draft|string|true|none||none|
|»» messages|[[Message](#schemamessage)]|false|none||none|
|»»» id|integer|false|none||none|
|»»» thread_id|integer|false|none||none|
|»»» sender|integer|false|none||none|
|»»» receiver|integer|false|none||none|
|»»» type|string|false|none||none|
|»»» charge|integer|false|none||none|
|»»» status|integer|false|none||none|
|»»» created_at|string|false|none||none|
|»»» files|[[File](#schemafile)]|false|none||none|
|»»»» id|integer|true|none||none|
|»»»» type|string|true|none||none|
|»»»» charge|integer|true|none||none|
|»»»» paid|integer|true|none||none|
|»»»» price|integer|true|none||none|
|»»»» src|string|true|none||none|
|»»»» w|integer|true|none||none|
|»»»» h|integer|true|none||none|
|»»»» top|integer|true|none||none|
|»»»» thumb|string|false|none||none|
|»»»» duration|integer|false|none||none|
|» bench|[Bench](#schemabench)|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## GET 获取某个对话信件

GET /message_threads/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |对话ID， 或者，用户ID|
|user|query|string| 否 |ID是否是用户|
|max_id|query|string| 否 |最大ID用于分页|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "id": 0,
  "summary": "string",
  "updated_at": "string",
  "unread": 0,
  "last_read_at": "string",
  "engine": 0,
  "send": 0,
  "receive": 0,
  "refuse": 0,
  "top": 0,
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "draft": "string",
  "messages": [
    {
      "id": 0,
      "thread_id": 0,
      "sender": 0,
      "receiver": 0,
      "type": "string",
      "charge": 0,
      "status": 0,
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Thread](#schemathread)|

## PUT 设置某个对话

PUT /message_threads/{id}

> Body 请求参数

```json
{
  "top": 1,
  "translate_send": 0,
  "translate_receive": 1,
  "translate_engine": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» top|body|integer| 否 |none|
|» translate_send|body|integer| 否 |none|
|» translate_receive|body|integer| 否 |none|
|» translate_engine|body|integer| 否 |none|

#### 枚举值

|属性|值|
|---|---|
|» top|0|
|» top|1|
|» translate_send|0|
|» translate_send|1|
|» translate_receive|0|
|» translate_receive|1|
|» translate_engine|0|
|» translate_engine|1|
|» translate_engine|2|

> 返回示例

> 202 Response

```json
{
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|none|Inline|

### 返回数据结构

状态码 **202**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» bench|object|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## DELETE 删除对话

DELETE /message_threads/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|X-Client-ID|header|string| 否 |none|

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

## POST 撤回消息

POST /recall

> Body 请求参数

```json
{
  "id": 10000051
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» id|body|integer| 是 |none|

> 返回示例

> 201 Response

```json
{
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» bench|object|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## DELETE 删除消息

DELETE /messages/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|X-Client-ID|header|string| 否 |none|

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

## POST 请求翻译

POST /translations

> Body 请求参数

```json
{
  "translation_type": "feeds",
  "translation_type_id": 1131101,
  "status": 0,
  "engine": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[TranslateParam](#schematranslateparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "translation": "string",
  "option": 0,
  "price": 0,
  "engine": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[Translation](#schematranslation)|

## GET 获取翻译进度

GET /progress

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 否 |feeds, messages, introductions|
|id|query|string| 否 |相关ID|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "percent": 0,
  "minute": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[TranslationProgress](#schematranslationprogress)|

## POST GPT生成内容

POST /suggest

> Body 请求参数

```json
{
  "content": "你没在线吗？ 你在干嘛呢？ ",
  "mode": "generate"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[GPTParam](#schemagptparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "content": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[GPT](#schemagpt)|

## POST Websocket认证

POST /pusher/authenticate

> Body 请求参数

```json
{
  "channel_name": "05d889d8f9521d72724de176bdb1c1ed",
  "socket_id": 284955.60440198897
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[SocketParam](#schemasocketparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "auth": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» auth|string|true|none||none|

## POST 优惠券兑换

POST /redeem

> Body 请求参数

```json
{
  "vcode": "S7BA2GC6"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» vcode|body|string| 是 |none|

> 返回示例

> 201 Response

```json
{
  "amount": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|[Error](#schemaerror)|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» amount|string|true|none||none|

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» field|string|false|none||none|

## POST Paypal充值结果处理

POST /paypal/approve

> Body 请求参数

```json
{
  "pay_id": "Ae2vi9HSF-sstTofzD6tK0tlG0GEbeHyZKRvsa80se7H9Hz9xtysL7vMerVOe4s0u3hOJShqLEViEXEJ"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[PaypalParam](#schemapaypalparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "mode": "recharge",
  "status": "success",
  "amount": 20,
  "reason": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[PayPalSuccess](#schemapaypalsuccess)|

## POST 创建PayPal充值请求

POST /paypal/create

> Body 请求参数

```json
{
  "amount": 200,
  "pay_id": "AX_x417gQp3VI3Jysg6JIOSpI3z571hnKtJTL5W5v3tspKphDl3864tO8eAp6_Zt1PI9m7JAanM0vNEK"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[PaypalParam](#schemapaypalparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "id": "string",
  "status": "string",
  "payment_source": {
    "paypal": [
      "string"
    ]
  },
  "links": [
    {
      "href": "string",
      "rel": "string",
      "method": "string"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» id|string|true|none||none|
|» status|string|true|none||none|
|» payment_source|object|true|none||none|
|»» paypal|[string]|true|none||none|
|» links|[object]|true|none||none|
|»» href|string|true|none||none|
|»» rel|string|true|none||none|
|»» method|string|true|none||none|

## GET 获取产品列表

GET /products

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |分页|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "products": [
    {
      "id": 0,
      "category": "string",
      "name": "string",
      "description": "string",
      "material": "string",
      "price": "string",
      "vip_discount": "string",
      "vip_price": "string",
      "photo": {
        "id": 0,
        "type": "string",
        "charge": 0,
        "paid": 0,
        "price": 0,
        "src": "string",
        "w": 0,
        "h": 0,
        "top": 0,
        "thumb": "string",
        "duration": 0
      },
      "photos": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ],
      "on_shelf": 0,
      "times": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» products|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» category|string|true|none||none|
|»» name|string|true|none||none|
|»» description|string|true|none||none|
|»» material|string|true|none||none|
|»» price|string|true|none||none|
|»» vip_discount|string|true|none||none|
|»» vip_price|string|true|none||none|
|»» photo|[File](#schemafile)|true|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|»» photos|[[File](#schemafile)]|true|none||none|
|»»» id|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» charge|integer|true|none||none|
|»»» paid|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» src|string|true|none||none|
|»»» w|integer|true|none||none|
|»»» h|integer|true|none||none|
|»»» top|integer|true|none||none|
|»»» thumb|string|false|none||none|
|»»» duration|integer|false|none||none|
|»» on_shelf|integer|true|none||none|
|»» times|integer|true|none||none|

## POST 下单购买产品

POST /products

> Body 请求参数

```json
{
  "who": "friend",
  "to": "wengshan",
  "product_id": 9,
  "address": "",
  "recipient": "",
  "cellphone": "",
  "quantity": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[PurchaseParam](#schemapurchaseparam)| 否 |none|

> 返回示例

> 201 Response

```json
{
  "order": {
    "id": 0,
    "product": {
      "id": 0,
      "category": "string",
      "name": "string",
      "description": "string",
      "material": "string",
      "price": "string",
      "vip_discount": "string",
      "vip_price": "string",
      "photo": {
        "id": 0,
        "type": "string",
        "charge": 0,
        "paid": 0,
        "price": 0,
        "src": "string",
        "w": 0,
        "h": 0,
        "top": 0,
        "thumb": "string",
        "duration": 0
      },
      "photos": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ],
      "on_shelf": 0,
      "times": 0
    },
    "price": 0,
    "quantity": 0,
    "from_id": 0,
    "from_name": "string",
    "to_id": 0,
    "to_name": "string",
    "phone": "string",
    "recipient": "string",
    "address": "string",
    "deliver_no": null,
    "status": 0,
    "noticed": null,
    "created_at": "string",
    "confirm": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» order|[Order](#schemaorder)|true|none||none|
|»» id|integer|true|none||none|
|»» product|[Product](#schemaproduct)|true|none||none|
|»»» id|integer|true|none||none|
|»»» category|string|true|none||none|
|»»» name|string|true|none||none|
|»»» description|string|true|none||none|
|»»» material|string|true|none||none|
|»»» price|string|true|none||none|
|»»» vip_discount|string|true|none||none|
|»»» vip_price|string|true|none||none|
|»»» photo|[File](#schemafile)|true|none||none|
|»»»» id|integer|true|none||none|
|»»»» type|string|true|none||none|
|»»»» charge|integer|true|none||none|
|»»»» paid|integer|true|none||none|
|»»»» price|integer|true|none||none|
|»»»» src|string|true|none||none|
|»»»» w|integer|true|none||none|
|»»»» h|integer|true|none||none|
|»»»» top|integer|true|none||none|
|»»»» thumb|string|false|none||none|
|»»»» duration|integer|false|none||none|
|»»» photos|[[File](#schemafile)]|true|none||none|
|»»»» id|integer|true|none||none|
|»»»» type|string|true|none||none|
|»»»» charge|integer|true|none||none|
|»»»» paid|integer|true|none||none|
|»»»» price|integer|true|none||none|
|»»»» src|string|true|none||none|
|»»»» w|integer|true|none||none|
|»»»» h|integer|true|none||none|
|»»»» top|integer|true|none||none|
|»»»» thumb|string|false|none||none|
|»»»» duration|integer|false|none||none|
|»»» on_shelf|integer|true|none||none|
|»»» times|integer|true|none||none|
|»» price|integer|true|none||none|
|»» quantity|integer|true|none||none|
|»» from_id|integer|true|none||none|
|»» from_name|string|true|none||none|
|»» to_id|integer|true|none||none|
|»» to_name|string|true|none||none|
|»» phone|string|true|none||none|
|»» recipient|string|true|none||none|
|»» address|string|true|none||none|
|»» deliver_no|null|true|none||none|
|»» status|integer|true|none||none|
|»» noticed|null|true|none||none|
|»» created_at|string|true|none||none|
|»» confirm|integer|true|none||none|

## GET 获取订单列表

GET /orders

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 否 |all | sent | received|
|k|query|string| 否 |关键字搜索|
|page|query|string| 否 |分页|
|X-Client-ID|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "orders": [
    {
      "id": 0,
      "product": {
        "id": 0,
        "category": "string",
        "name": "string",
        "description": "string",
        "material": "string",
        "price": "string",
        "vip_discount": "string",
        "vip_price": "string",
        "photo": {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        },
        "photos": [
          {
            "id": null,
            "type": null,
            "charge": null,
            "paid": null,
            "price": null,
            "src": null,
            "w": null,
            "h": null,
            "top": null,
            "thumb": null,
            "duration": null
          }
        ],
        "on_shelf": 0,
        "times": 0
      },
      "price": 0,
      "quantity": 0,
      "from_id": 0,
      "from_name": "string",
      "to_id": 0,
      "to_name": "string",
      "phone": "string",
      "recipient": "string",
      "address": "string",
      "deliver_no": null,
      "status": 0,
      "noticed": null,
      "created_at": "string",
      "confirm": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» orders|[[Order](#schemaorder)]|true|none||none|
|»» id|integer|true|none||none|
|»» product|[Product](#schemaproduct)|true|none||none|
|»»» id|integer|true|none||none|
|»»» category|string|true|none||none|
|»»» name|string|true|none||none|
|»»» description|string|true|none||none|
|»»» material|string|true|none||none|
|»»» price|string|true|none||none|
|»»» vip_discount|string|true|none||none|
|»»» vip_price|string|true|none||none|
|»»» photo|[File](#schemafile)|true|none||none|
|»»»» id|integer|true|none||none|
|»»»» type|string|true|none||none|
|»»»» charge|integer|true|none||none|
|»»»» paid|integer|true|none||none|
|»»»» price|integer|true|none||none|
|»»»» src|string|true|none||none|
|»»»» w|integer|true|none||none|
|»»»» h|integer|true|none||none|
|»»»» top|integer|true|none||none|
|»»»» thumb|string|false|none||none|
|»»»» duration|integer|false|none||none|
|»»» photos|[[File](#schemafile)]|true|none||none|
|»»»» id|integer|true|none||none|
|»»»» type|string|true|none||none|
|»»»» charge|integer|true|none||none|
|»»»» paid|integer|true|none||none|
|»»»» price|integer|true|none||none|
|»»»» src|string|true|none||none|
|»»»» w|integer|true|none||none|
|»»»» h|integer|true|none||none|
|»»»» top|integer|true|none||none|
|»»»» thumb|string|false|none||none|
|»»»» duration|integer|false|none||none|
|»»» on_shelf|integer|true|none||none|
|»»» times|integer|true|none||none|
|»» price|integer|true|none||none|
|»» quantity|integer|true|none||none|
|»» from_id|integer|true|none||none|
|»» from_name|string|true|none||none|
|»» to_id|integer|true|none||none|
|»» to_name|string|true|none||none|
|»» phone|string|true|none||none|
|»» recipient|string|true|none||none|
|»» address|string|true|none||none|
|»» deliver_no|null|true|none||none|
|»» status|integer|true|none||none|
|»» noticed|null|true|none||none|
|»» created_at|string|true|none||none|
|»» confirm|integer|true|none||none|

## PUT 订单处理

PUT /order/{id}

> Body 请求参数

```json
{
  "mode": "confirm",
  "cellphone": "15517889822",
  "address": "shandong",
  "recipient": "yuxi"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|X-Client-ID|header|string| 否 |none|
|body|body|[OrderParam](#schemaorderparam)| 否 |none|

> 返回示例

> 202 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|none|Inline|

### 返回数据结构

## PUT 重置计数器

PUT /counters

> Body 请求参数

```json
{
  "type": "orders"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[CounterParam](#schemacounterparam)| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 询问其他用户信息

POST /ask

> Body 请求参数

```json
{
  "who": 113188,
  "what": "age"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|[AskParam](#schemaaskparam)| 否 |none|

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

## POST 获取文件上传链接

POST /uploads

> Body 请求参数

```json
{
  "files": [
    {
      "upload_from": "public",
      "charge": "0",
      "name": "abc.jpg",
      "type": "image/jpeg"
    },
    {
      "upload_from": "public",
      "charge": "0",
      "name": "abc.jpg",
      "type": "image/jpeg"
    },
    {
      "upload_from": "public",
      "charge": "0",
      "name": "abc.jpg",
      "type": "image/jpeg"
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» files|body|[[UploadFileParam](#schemauploadfileparam)]| 是 |none|
|»» upload_from|body|string| 是 |none|
|»» charge|body|string| 是 |none|
|»» file_name|body|string| 是 |none|
|»» type|body|string| 是 |none|

> 返回示例

> 201 Response

```json
{
  "urls": {
    "url": "string",
    "key": "string"
  },
  "bench": {
    "time": "string",
    "memory": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

状态码 **201**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» urls|[UploadUrl](#schemauploadurl)|true|none||none|
|»» url|string|true|none||none|
|»» key|string|true|none||none|
|» bench|object|true|none||none|
|»» time|string|true|none||none|
|»» memory|string|true|none||none|

## POST 上传保存

POST /upload/save

> Body 请求参数

```json
{
  "files": [
    {
      "upload_from": "public",
      "charge": "1",
      "price": "22",
      "file_name": "app.jpg",
      "key": "/images/abc/eft",
      "w": "1024",
      "h": "768"
    },
    {
      "upload_from": "public",
      "charge": "1",
      "price": "22",
      "file_name": "app.jpg",
      "key": "/images/abc/eft",
      "w": "1024",
      "h": "768"
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|X-Client-ID|header|string| 否 |none|
|body|body|object| 否 |none|
|» files|body|[[UploadSaveParam](#schemauploadsaveparam)]| 是 |none|
|»» upload_from|body|string| 是 |none|
|»» charge|body|string| 是 |none|
|»» price|body|string| 是 |none|
|»» file_name|body|string| 是 |none|
|»» key|body|string| 是 |none|
|»» w|body|string| 是 |none|
|»» h|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 数据模型

<h2 id="tocS_Bench">Bench</h2>

<a id="schemabench"></a>
<a id="schema_Bench"></a>
<a id="tocSbench"></a>
<a id="tocsbench"></a>

```json
{
  "time": "string",
  "memory": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|time|string|true|none||none|
|memory|string|true|none||none|

<h2 id="tocS_Error">Error</h2>

<a id="schemaerror"></a>
<a id="schema_Error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "code": 0,
  "message": "string",
  "field": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|true|none||none|
|message|string|true|none||none|
|field|string|false|none||none|

<h2 id="tocS_LoginParam">LoginParam</h2>

<a id="schemaloginparam"></a>
<a id="schema_LoginParam"></a>
<a id="tocSloginparam"></a>
<a id="tocsloginparam"></a>

```json
{
  "email": "user@example.com",
  "name": "string",
  "password": "string",
  "code": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|email|string(email)|false|none||none|
|name|string|false|none||none|
|password|string|false|none||none|
|code|string|false|none||none|

<h2 id="tocS_Footer">Footer</h2>

<a id="schemafooter"></a>
<a id="schema_Footer"></a>
<a id="tocSfooter"></a>
<a id="tocsfooter"></a>

```json
{
  "content": "string",
  "updated_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|content|string|true|none||none|
|updated_at|string|true|none||none|

<h2 id="tocS_PageID">PageID</h2>

<a id="schemapageid"></a>
<a id="schema_PageID"></a>
<a id="tocSpageid"></a>
<a id="tocspageid"></a>

```json
{
  "next_url": "string",
  "next_max_id": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|next_url|string|true|none||none|
|next_max_id|integer|true|none||none|

<h2 id="tocS_File">File</h2>

<a id="schemafile"></a>
<a id="schema_File"></a>
<a id="tocSfile"></a>
<a id="tocsfile"></a>

```json
{
  "id": 0,
  "type": "string",
  "charge": 0,
  "paid": 0,
  "price": 0,
  "src": "string",
  "w": 0,
  "h": 0,
  "top": 0,
  "thumb": "string",
  "duration": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|type|string|true|none||none|
|charge|integer|true|none||none|
|paid|integer|true|none||none|
|price|integer|true|none||none|
|src|string|true|none||none|
|w|integer|true|none||none|
|h|integer|true|none||none|
|top|integer|true|none||none|
|thumb|string|false|none||none|
|duration|integer|false|none||none|

<h2 id="tocS_Feed">Feed</h2>

<a id="schemafeed"></a>
<a id="schema_Feed"></a>
<a id="tocSfeed"></a>
<a id="tocsfeed"></a>

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "type": "string",
  "created_at": "string",
  "files": [
    {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    }
  ],
  "comment": 0,
  "translate": 0,
  "engine": 0,
  "content": "string",
  "cost": 0,
  "top": 0,
  "counter": {
    "liked": 0,
    "commented": 0,
    "tipped": 0,
    "tipped_amount": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|user|[User](#schemauser)|true|none||none|
|type|string|true|none||none|
|created_at|string|true|none||none|
|files|[[File](#schemafile)]|true|none||none|
|comment|integer|true|none||none|
|translate|integer|true|none||none|
|engine|integer|true|none||none|
|content|string|true|none||none|
|cost|number|true|none||none|
|top|integer|true|none||none|
|counter|[FeedCounter](#schemafeedcounter)|false|none||none|

<h2 id="tocS_Tip">Tip</h2>

<a id="schematip"></a>
<a id="schema_Tip"></a>
<a id="tocStip"></a>
<a id="tocstip"></a>

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "amount": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|false|none||none|
|user|[User](#schemauser)|false|none||none|
|amount|string|false|none||none|

<h2 id="tocS_Like">Like</h2>

<a id="schemalike"></a>
<a id="schema_Like"></a>
<a id="tocSlike"></a>
<a id="tocslike"></a>

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|false|none||none|
|user|[User](#schemauser)|false|none||none|

<h2 id="tocS_Page">Page</h2>

<a id="schemapage"></a>
<a id="schema_Page"></a>
<a id="tocSpage"></a>
<a id="tocspage"></a>

```json
{
  "next_url": "string",
  "next_page": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|next_url|string|true|none||none|
|next_page|integer|true|none||none|

<h2 id="tocS_Setting">Setting</h2>

<a id="schemasetting"></a>
<a id="schema_Setting"></a>
<a id="tocSsetting"></a>
<a id="tocssetting"></a>

```json
{
  "name": "string",
  "display_name": "string",
  "gender": 0,
  "language": "string",
  "location": 0,
  "introduction": "string",
  "avatar": 0,
  "cover": 0,
  "email": "string",
  "invisible": 0,
  "privacy": 0,
  "msg_from": 0,
  "engine": 0,
  "email_friend": 0,
  "email_visitor": 0,
  "email_like": 0,
  "email_message": 0,
  "email_promotion": 0,
  "email_tip": 0,
  "email_comment": 0,
  "email_post": 0,
  "email_login": 0,
  "sound": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|name|string|false|none||账号用户名|
|display_name|string|false|none||全名|
|gender|integer|false|none||性别0， 1|
|language|string|false|none||母语['en', 'tw', 'zh', 'de', 'it', 'fr', 'ja', 'ko']|
|location|integer|false|none||地址ID|
|introduction|string|false|none||个人介绍|
|avatar|integer|false|none||头像ID，上传接口返回的ID|
|cover|integer|false|none||封面ID， 上传接口返回的ID|
|email|string|false|none||又想|
|invisible|integer|false|none||不显示在线状态|
|privacy|integer|false|none||个人隐私|
|msg_from|integer|false|none||只接受男｜女性来信， 0女性1男性|
|engine|integer|false|none||翻译引擎， 0不翻译， 1机器翻译， 2人工翻译|
|email_friend|integer|false|none||关注通知： 0不通知1通知|
|email_visitor|integer|false|none||访客通知： 0不通知1通知|
|email_like|integer|false|none||点赞通知： 0不通知1通知|
|email_message|integer|false|none||信件通知： 0不通知1通知|
|email_promotion|integer|false|none||促销通知： 0不通知1通知|
|email_tip|integer|false|none||打赏通知： 0不通知1通知|
|email_comment|integer|false|none||评论通知： 0不通知1通知|
|email_post|integer|false|none||新帖子通知： 0不通知1通知|
|email_login|integer|false|none||新登陆通知： 0不通知1通知|
|sound|integer|false|none||声音提示： 0不提示1提示|

<h2 id="tocS_Counter">Counter</h2>

<a id="schemacounter"></a>
<a id="schema_Counter"></a>
<a id="tocScounter"></a>
<a id="tocscounter"></a>

```json
{
  "request": 0,
  "likeme": 0,
  "message": 0,
  "visitor": 0,
  "notification": 0,
  "charms": 0,
  "orders": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|request|integer|true|none||none|
|likeme|integer|true|none||none|
|message|integer|true|none||none|
|visitor|integer|true|none||none|
|notification|integer|true|none||none|
|charms|integer|true|none||none|
|orders|integer|true|none||none|

<h2 id="tocS_Wage">Wage</h2>

<a id="schemawage"></a>
<a id="schema_Wage"></a>
<a id="tocSwage"></a>
<a id="tocswage"></a>

```json
{
  "id": 0,
  "amount": "string",
  "phone": "string",
  "bank_type": "string",
  "bank_name": "string",
  "bank_number": "string",
  "bank_detail": "string",
  "paid": 0,
  "created_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|amount|string|true|none||none|
|phone|string|true|none||none|
|bank_type|string|true|none||none|
|bank_name|string|true|none||none|
|bank_number|string|true|none||none|
|bank_detail|string|true|none||none|
|paid|integer|true|none||none|
|created_at|string|true|none||none|

<h2 id="tocS_Me">Me</h2>

<a id="schemame"></a>
<a id="schema_Me"></a>
<a id="tocSme"></a>
<a id="tocsme"></a>

```json
{
  "id": 0,
  "name": "string",
  "display_name": "string",
  "email": "string",
  "gender": 0,
  "avatar": "string",
  "cover": "string",
  "location": "string",
  "language": "string",
  "engine": 0,
  "vip": 0,
  "vip_expired_at": "string",
  "privacy": 0,
  "msg_from": 0,
  "msg_limit": 0,
  "seeking": 0,
  "sound": 0,
  "email_post": 0,
  "email_comment": 0,
  "email_tip": 0,
  "email_friend": 0,
  "email_visitor": 0,
  "email_like": 0,
  "email_message": 0,
  "email_promotion": 0,
  "email_bill": 0,
  "email_login": 0,
  "channel": "string",
  "invisible": 0,
  "is_partner": 0,
  "change_name": 0,
  "created_at": "string",
  "updated_at": "string",
  "content": "string",
  "location_id": 0,
  "balance": "string",
  "bd": 0,
  "counter": {
    "request": 0,
    "likeme": 0,
    "message": 0,
    "visitor": 0,
    "notification": 0,
    "charms": 0,
    "orders": 0
  },
  "minlen": 0,
  "recommend": [
    {
      "id": 0,
      "name": "string",
      "display_name": "string",
      "gender": 0,
      "avatar": "string",
      "cover": "string",
      "location": "string",
      "vip": 0,
      "friend": 0,
      "block": 0,
      "request": 0,
      "x": 0,
      "content": "string",
      "cost": 0,
      "translate": 0,
      "engine": 0,
      "online": 0
    }
  ],
  "clients": [
    {
      "client_id": "string",
      "client": "string",
      "ip": {
        "address": "string",
        "country_code": "string",
        "country": "string",
        "location": "string"
      },
      "last_active": "string",
      "current": 0
    }
  ],
  "pay_id": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|name|string|true|none||none|
|display_name|string|true|none||none|
|email|string|true|none||none|
|gender|integer|true|none||none|
|avatar|string|true|none||none|
|cover|string|true|none||none|
|location|string|true|none||none|
|language|string|true|none||none|
|engine|integer|true|none||翻译引擎， 0 不翻译，1机器翻译，2人工翻译|
|vip|integer|true|none||none|
|vip_expired_at|string|true|none||none|
|privacy|integer|true|none||none|
|msg_from|integer|true|none||none|
|msg_limit|integer|true|none||none|
|seeking|integer|true|none||none|
|sound|integer|true|none||none|
|email_post|integer|true|none||none|
|email_comment|integer|true|none||none|
|email_tip|integer|true|none||none|
|email_friend|integer|true|none||none|
|email_visitor|integer|true|none||none|
|email_like|integer|true|none||none|
|email_message|integer|true|none||none|
|email_promotion|integer|true|none||none|
|email_bill|integer|true|none||none|
|email_login|integer|true|none||none|
|channel|string|true|none||none|
|invisible|integer|true|none||none|
|is_partner|integer|true|none||是不是合作伙伴|
|change_name|integer|true|none||是否可以修改用户名， 用于第三方登录|
|created_at|string|true|none||none|
|updated_at|string|true|none||none|
|content|string|true|none||自我介绍|
|location_id|integer|true|none||none|
|balance|string|true|none||none|
|bd|integer|true|none||有绑定或者有消费的用户（有主）|
|counter|[Counter](#schemacounter)|true|none||none|
|minlen|integer|true|none||发送文字消息不少于多少字符|
|recommend|[[User](#schemauser)]|true|none||none|
|clients|[[Client](#schemaclient)]|true|none||none|
|pay_id|string|true|none||PayPal支付接口ID|

<h2 id="tocS_Location">Location</h2>

<a id="schemalocation"></a>
<a id="schema_Location"></a>
<a id="tocSlocation"></a>
<a id="tocslocation"></a>

```json
{
  "location_id": 0,
  "location": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|location_id|integer|true|none||none|
|location|string|true|none||none|

<h2 id="tocS_UserList">UserList</h2>

<a id="schemauserlist"></a>
<a id="schema_UserList"></a>
<a id="tocSuserlist"></a>
<a id="tocsuserlist"></a>

```json
{
  "id": 0,
  "top": 0,
  "remark": "string",
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "created_at": "string",
  "files": [
    {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|top|integer|false|none||是否置顶|
|remark|string|false|none||备注|
|user|[User](#schemauser)|true|none||none|
|created_at|string|false|none||none|
|files|[[File](#schemafile)]|false|none||none|

<h2 id="tocS_FeedParam">FeedParam</h2>

<a id="schemafeedparam"></a>
<a id="schema_FeedParam"></a>
<a id="tocSfeedparam"></a>
<a id="tocsfeedparam"></a>

```json
{
  "upload_ids": [
    0
  ],
  "charge": 0,
  "comment": 0,
  "content": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|upload_ids|[integer]|true|none||none|
|charge|integer|true|none||是否为付费动态， 0否1是|
|comment|integer|true|none||是否可以评论，1 关闭评论， 0 开启评论|
|content|string|true|none||动态内容|

<h2 id="tocS_FeedUpdate">FeedUpdate</h2>

<a id="schemafeedupdate"></a>
<a id="schema_FeedUpdate"></a>
<a id="tocSfeedupdate"></a>
<a id="tocsfeedupdate"></a>

```json
{
  "comment": 0,
  "top": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|comment|integer|false|none||none|
|top|integer|false|none||none|

<h2 id="tocS_TipParam">TipParam</h2>

<a id="schematipparam"></a>
<a id="schema_TipParam"></a>
<a id="tocStipparam"></a>
<a id="tocstipparam"></a>

```json
{
  "user_id": 0,
  "related_id": 0,
  "amount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user_id|integer|true|none||none|
|related_id|integer|false|none||帖子ID，存在打赏帖子，不存在打赏用户|
|amount|number|true|none||打赏金额|

<h2 id="tocS_Trade">Trade</h2>

<a id="schematrade"></a>
<a id="schema_Trade"></a>
<a id="tocStrade"></a>
<a id="tocstrade"></a>

```json
{
  "id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "amount": "string",
  "balance": "string",
  "related_id": 0,
  "related_user_id": 0,
  "type": "string",
  "remark": "string",
  "created_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|user|[User](#schemauser)|true|none||none|
|amount|string|true|none||none|
|balance|string|true|none||none|
|related_id|integer|true|none||none|
|related_user_id|integer|true|none||none|
|type|string|true|none||none|
|remark|string|true|none||none|
|created_at|string|true|none||none|

<h2 id="tocS_CommentParam">CommentParam</h2>

<a id="schemacommentparam"></a>
<a id="schema_CommentParam"></a>
<a id="tocScommentparam"></a>
<a id="tocscommentparam"></a>

```json
{
  "id": 0,
  "upload_ids": [
    0
  ],
  "content": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||动态ID|
|upload_ids|[integer]|false|none||如果有Gif的话，GIF ID|
|content|string|true|none||none|

<h2 id="tocS_Comment">Comment</h2>

<a id="schemacomment"></a>
<a id="schema_Comment"></a>
<a id="tocScomment"></a>
<a id="tocscomment"></a>

```json
{
  "id": 0,
  "post_id": 0,
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "translate": 0,
  "engine": 0,
  "content": "string",
  "cost": 0,
  "files": [
    {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    }
  ],
  "created_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|post_id|integer|true|none||none|
|user|[User](#schemauser)|true|none||none|
|translate|integer|true|none||是否翻译了|
|engine|integer|true|none||翻译引擎|
|content|string|true|none||内容：原文｜译文|
|cost|number|true|none||none|
|files|[[File](#schemafile)]|true|none||none|
|created_at|string|true|none||none|

<h2 id="tocS_Notification">Notification</h2>

<a id="schemanotification"></a>
<a id="schema_Notification"></a>
<a id="tocSnotification"></a>
<a id="tocsnotification"></a>

```json
{
  "id": 0,
  "type": "string",
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "related_id": "string",
  "related": {
    "like": "string",
    "feed": {
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ],
      "content": "string"
    }
  },
  "created_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|type|string|true|none||none|
|user|[User](#schemauser)|true|none||none|
|related_id|string|true|none||none|
|related|object¦null|true|none||none|
|» like|string|true|none||none|
|» feed|object|true|none||none|
|»» files|[[File](#schemafile)]|true|none||none|
|»» content|string|true|none||none|
|created_at|string|true|none||none|

<h2 id="tocS_Gift">Gift</h2>

<a id="schemagift"></a>
<a id="schema_Gift"></a>
<a id="tocSgift"></a>
<a id="tocsgift"></a>

```json
{
  "id": 0,
  "thumb": "string",
  "src": "string",
  "price": "string",
  "files": [
    {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    }
  ],
  "category": "string",
  "hit": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|thumb|string|true|none||none|
|src|string|true|none||none|
|price|string|true|none||none|
|files|[[File](#schemafile)]|true|none||none|
|category|string|true|none||none|
|hit|integer|true|none||none|

<h2 id="tocS_MessageParam">MessageParam</h2>

<a id="schemamessageparam"></a>
<a id="schema_MessageParam"></a>
<a id="tocSmessageparam"></a>
<a id="tocsmessageparam"></a>

```json
{
  "message_content": "string",
  "message_type": "text",
  "thread_id": 0,
  "upload_ids": [
    0
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|message_content|string|false|none||文本内容|
|message_type|string|true|none||[text, image, goods, video, audio]|
|thread_id|integer|true|none||对话ID|
|upload_ids|[integer]|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|message_type|text|
|message_type|image|
|message_type|goods|
|message_type|audio|
|message_type|video|

<h2 id="tocS_Message">Message</h2>

<a id="schemamessage"></a>
<a id="schema_Message"></a>
<a id="tocSmessage"></a>
<a id="tocsmessage"></a>

```json
{
  "id": 0,
  "thread_id": 0,
  "sender": 0,
  "receiver": 0,
  "type": "string",
  "charge": 0,
  "status": 0,
  "created_at": "string",
  "files": [
    {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|false|none||none|
|thread_id|integer|false|none||none|
|sender|integer|false|none||none|
|receiver|integer|false|none||none|
|type|string|false|none||信件类型： text，image|
|charge|integer|false|none||none|
|status|integer|false|none||none|
|created_at|string|false|none||none|
|files|[[File](#schemafile)]|false|none||none|

<h2 id="tocS_Thread">Thread</h2>

<a id="schemathread"></a>
<a id="schema_Thread"></a>
<a id="tocSthread"></a>
<a id="tocsthread"></a>

```json
{
  "id": 0,
  "summary": "string",
  "updated_at": "string",
  "unread": 0,
  "last_read_at": "string",
  "engine": 0,
  "send": 0,
  "receive": 0,
  "refuse": 0,
  "top": 0,
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  },
  "draft": "string",
  "messages": [
    {
      "id": 0,
      "thread_id": 0,
      "sender": 0,
      "receiver": 0,
      "type": "string",
      "charge": 0,
      "status": 0,
      "created_at": "string",
      "files": [
        {
          "id": 0,
          "type": "string",
          "charge": 0,
          "paid": 0,
          "price": 0,
          "src": "string",
          "w": 0,
          "h": 0,
          "top": 0,
          "thumb": "string",
          "duration": 0
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|summary|string|true|none||none|
|updated_at|string|true|none||none|
|unread|integer|true|none||none|
|last_read_at|string|true|none||none|
|engine|integer|true|none||none|
|send|integer|true|none||none|
|receive|integer|true|none||none|
|refuse|integer|true|none||none|
|top|integer|true|none||none|
|user|[User](#schemauser)|true|none||none|
|draft|string|true|none||none|
|messages|[[Message](#schemamessage)]|false|none||none|

<h2 id="tocS_TranslateParam">TranslateParam</h2>

<a id="schematranslateparam"></a>
<a id="schema_TranslateParam"></a>
<a id="tocStranslateparam"></a>
<a id="tocstranslateparam"></a>

```json
{
  "translation_type": "feeds",
  "translation_type_id": 0,
  "status": 0,
  "engine": 1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|translation_type|string|true|none||messages, feeds, introductions, comments|
|translation_type_id|integer|true|none||相关ID|
|status|integer|true|none||status: 0 未翻译, 1已翻译, 2正在翻译, 3自行翻译 + 机器翻译, 4可选自行翻译 + 机器翻译, -1 与自己语言相通, 不需要翻译|
|engine|integer|true|none||翻译引擎： 1 机器翻译， 2 人工翻译|

#### 枚举值

|属性|值|
|---|---|
|translation_type|feeds|
|translation_type|messages|
|translation_type|introductions|
|engine|1|
|engine|2|

<h2 id="tocS_Translation">Translation</h2>

<a id="schematranslation"></a>
<a id="schema_Translation"></a>
<a id="tocStranslation"></a>
<a id="tocstranslation"></a>

```json
{
  "translation": "string",
  "option": 0,
  "price": 0,
  "engine": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|translation|string|true|none||译文|
|option|integer|true|none||是否显示翻译选项， 主要用于免翻译得奖励功能|
|price|integer|true|none||翻译费用|
|engine|integer|true|none||翻译引擎： 1 机器翻译， 2人工翻译|

<h2 id="tocS_TranslationProgress">TranslationProgress</h2>

<a id="schematranslationprogress"></a>
<a id="schema_TranslationProgress"></a>
<a id="tocStranslationprogress"></a>
<a id="tocstranslationprogress"></a>

```json
{
  "percent": 0,
  "minute": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|percent|integer|true|none||none|
|minute|integer|true|none||none|

<h2 id="tocS_GPT">GPT</h2>

<a id="schemagpt"></a>
<a id="schema_GPT"></a>
<a id="tocSgpt"></a>
<a id="tocsgpt"></a>

```json
{
  "content": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|content|string|true|none||none|

<h2 id="tocS_SocketParam">SocketParam</h2>

<a id="schemasocketparam"></a>
<a id="schema_SocketParam"></a>
<a id="tocSsocketparam"></a>
<a id="tocssocketparam"></a>

```json
{
  "channel_name": "string",
  "socket_id": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|channel_name|string|true|none||none|
|socket_id|number|true|none||none|

<h2 id="tocS_PaypalParam">PaypalParam</h2>

<a id="schemapaypalparam"></a>
<a id="schema_PaypalParam"></a>
<a id="tocSpaypalparam"></a>
<a id="tocspaypalparam"></a>

```json
{
  "amount": 0,
  "pay_id": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|amount|integer|true|none||none|
|pay_id|string|true|none||none|

<h2 id="tocS_PayPalSuccess">PayPalSuccess</h2>

<a id="schemapaypalsuccess"></a>
<a id="schema_PayPalSuccess"></a>
<a id="tocSpaypalsuccess"></a>
<a id="tocspaypalsuccess"></a>

```json
{
  "mode": "string",
  "status": "string",
  "amount": 0,
  "reason": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|mode|string|true|none||none|
|status|string|true|none||none|
|amount|integer|true|none||none|
|reason|string|true|none||none|

<h2 id="tocS_Product">Product</h2>

<a id="schemaproduct"></a>
<a id="schema_Product"></a>
<a id="tocSproduct"></a>
<a id="tocsproduct"></a>

```json
{
  "id": 0,
  "category": "string",
  "name": "string",
  "description": "string",
  "material": "string",
  "price": "string",
  "vip_discount": "string",
  "vip_price": "string",
  "photo": {
    "id": 0,
    "type": "string",
    "charge": 0,
    "paid": 0,
    "price": 0,
    "src": "string",
    "w": 0,
    "h": 0,
    "top": 0,
    "thumb": "string",
    "duration": 0
  },
  "photos": [
    {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    }
  ],
  "on_shelf": 0,
  "times": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|category|string|true|none||none|
|name|string|true|none||none|
|description|string|true|none||none|
|material|string|true|none||none|
|price|string|true|none||none|
|vip_discount|string|true|none||none|
|vip_price|string|true|none||none|
|photo|[File](#schemafile)|true|none||none|
|photos|[[File](#schemafile)]|true|none||none|
|on_shelf|integer|true|none||none|
|times|integer|true|none||none|

<h2 id="tocS_PurchaseParam">PurchaseParam</h2>

<a id="schemapurchaseparam"></a>
<a id="schema_PurchaseParam"></a>
<a id="tocSpurchaseparam"></a>
<a id="tocspurchaseparam"></a>

```json
{
  "who": "string",
  "to": "string",
  "product_id": 0,
  "address": "string",
  "recipient": "string",
  "cellphone": "string",
  "quantity": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|who|string|true|none||发送给谁， friend | myself|
|to|string|true|none||用户名， 发送给谁|
|product_id|integer|true|none||产品ID|
|address|string|false|none||收货地址，可空|
|recipient|string|false|none||收件人名字， 可空|
|cellphone|string|false|none||收件人电话， 可空|
|quantity|integer|true|none||数量|

<h2 id="tocS_Order">Order</h2>

<a id="schemaorder"></a>
<a id="schema_Order"></a>
<a id="tocSorder"></a>
<a id="tocsorder"></a>

```json
{
  "id": 0,
  "product": {
    "id": 0,
    "category": "string",
    "name": "string",
    "description": "string",
    "material": "string",
    "price": "string",
    "vip_discount": "string",
    "vip_price": "string",
    "photo": {
      "id": 0,
      "type": "string",
      "charge": 0,
      "paid": 0,
      "price": 0,
      "src": "string",
      "w": 0,
      "h": 0,
      "top": 0,
      "thumb": "string",
      "duration": 0
    },
    "photos": [
      {
        "id": 0,
        "type": "string",
        "charge": 0,
        "paid": 0,
        "price": 0,
        "src": "string",
        "w": 0,
        "h": 0,
        "top": 0,
        "thumb": "string",
        "duration": 0
      }
    ],
    "on_shelf": 0,
    "times": 0
  },
  "price": 0,
  "quantity": 0,
  "from_id": 0,
  "from_name": "string",
  "to_id": 0,
  "to_name": "string",
  "phone": "string",
  "recipient": "string",
  "address": "string",
  "deliver_no": null,
  "status": 0,
  "noticed": null,
  "created_at": "string",
  "confirm": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|product|[Product](#schemaproduct)|true|none||none|
|price|integer|true|none||none|
|quantity|integer|true|none||none|
|from_id|integer|true|none||none|
|from_name|string|true|none||none|
|to_id|integer|true|none||none|
|to_name|string|true|none||none|
|phone|string|true|none||none|
|recipient|string|true|none||none|
|address|string|true|none||none|
|deliver_no|null|true|none||none|
|status|integer|true|none||none|
|noticed|null|true|none||none|
|created_at|string|true|none||none|
|confirm|integer|true|none||none|

<h2 id="tocS_OrderParam">OrderParam</h2>

<a id="schemaorderparam"></a>
<a id="schema_OrderParam"></a>
<a id="tocSorderparam"></a>
<a id="tocsorderparam"></a>

```json
{
  "mode": "accept",
  "cellphone": 0,
  "address": "string",
  "recipient": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|mode|string|true|none||accept | decline | confirm|
|cellphone|number|true|none||电话|
|address|string|true|none||收货地址|
|recipient|string|true|none||收货人|

#### 枚举值

|属性|值|
|---|---|
|mode|accept|
|mode|decline|
|mode|confirm|

<h2 id="tocS_CounterParam">CounterParam</h2>

<a id="schemacounterparam"></a>
<a id="schema_CounterParam"></a>
<a id="tocScounterparam"></a>
<a id="tocscounterparam"></a>

```json
{
  "type": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|type|string|true|none||['message', 'likeme', 'request', 'notification', 'orders']|

<h2 id="tocS_AskParam">AskParam</h2>

<a id="schemaaskparam"></a>
<a id="schema_AskParam"></a>
<a id="tocSaskparam"></a>
<a id="tocsaskparam"></a>

```json
{
  "who": 0,
  "what": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|who|integer|true|none||问谁|
|what|string|true|none||'age', 'height', 'weight', 'orientation', 'marriage', 'children'|

<h2 id="tocS_UploadUrl">UploadUrl</h2>

<a id="schemauploadurl"></a>
<a id="schema_UploadUrl"></a>
<a id="tocSuploadurl"></a>
<a id="tocsuploadurl"></a>

```json
{
  "url": "string",
  "key": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|url|string|true|none||none|
|key|string|true|none||none|

<h2 id="tocS_UploadFileParam">UploadFileParam</h2>

<a id="schemauploadfileparam"></a>
<a id="schema_UploadFileParam"></a>
<a id="tocSuploadfileparam"></a>
<a id="tocsuploadfileparam"></a>

```json
{
  "upload_from": "string",
  "charge": "string",
  "file_name": "string",
  "type": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|upload_from|string|true|none||none|
|charge|string|true|none||none|
|file_name|string|true|none||none|
|type|string|true|none||none|

<h2 id="tocS_UploadSaveParam">UploadSaveParam</h2>

<a id="schemauploadsaveparam"></a>
<a id="schema_UploadSaveParam"></a>
<a id="tocSuploadsaveparam"></a>
<a id="tocsuploadsaveparam"></a>

```json
{
  "upload_from": "string",
  "charge": "string",
  "price": "string",
  "file_name": "string",
  "key": "string",
  "w": "string",
  "h": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|upload_from|string|true|none||none|
|charge|string|true|none||none|
|price|string|true|none||none|
|file_name|string|true|none||none|
|key|string|true|none||none|
|w|string|true|none||none|
|h|string|true|none||none|

<h2 id="tocS_User">User</h2>

<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 0,
  "name": "string",
  "display_name": "string",
  "gender": 0,
  "avatar": "string",
  "cover": "string",
  "location": "string",
  "vip": 0,
  "friend": 0,
  "block": 0,
  "request": 0,
  "x": 0,
  "content": "string",
  "cost": 0,
  "translate": 0,
  "engine": 0,
  "online": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|name|string|true|none||none|
|display_name|string|true|none||none|
|gender|integer|true|none||none|
|avatar|string|false|none||none|
|cover|string|false|none||none|
|location|string|false|none||none|
|vip|integer|true|none||none|
|friend|integer|true|none||none|
|block|integer|true|none||none|
|request|integer|true|none||none|
|x|integer|false|none||是否是partner， 1是0不是|
|content|string|false|none||自我介绍|
|cost|integer|false|none||自我介绍翻译费用|
|translate|integer|false|none||自我介绍是否翻译|
|engine|integer|false|none||自我介绍翻译引擎 1 机器，2人工|
|online|integer|false|none||是否在线|

<h2 id="tocS_FeedCounter">FeedCounter</h2>

<a id="schemafeedcounter"></a>
<a id="schema_FeedCounter"></a>
<a id="tocSfeedcounter"></a>
<a id="tocsfeedcounter"></a>

```json
{
  "liked": 0,
  "commented": 0,
  "tipped": 0,
  "tipped_amount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|liked|integer|true|none||none|
|commented|integer|true|none||none|
|tipped|integer|true|none||none|
|tipped_amount|number|true|none||none|

<h2 id="tocS_QA">QA</h2>

<a id="schemaqa"></a>
<a id="schema_QA"></a>
<a id="tocSqa"></a>
<a id="tocsqa"></a>

```json
{
  "q": "string",
  "a": "string",
  "updated_at": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|q|string|true|none||none|
|a|string|true|none||none|
|updated_at|string|true|none||none|

<h2 id="tocS_PasswordParam">PasswordParam</h2>

<a id="schemapasswordparam"></a>
<a id="schema_PasswordParam"></a>
<a id="tocSpasswordparam"></a>
<a id="tocspasswordparam"></a>

```json
{
  "password": "string",
  "new_password": "string",
  "new_password_confirm": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|password|string|true|none||none|
|new_password|string|false|none||none|
|new_password_confirm|string|false|none||none|

<h2 id="tocS_Client">Client</h2>

<a id="schemaclient"></a>
<a id="schema_Client"></a>
<a id="tocSclient"></a>
<a id="tocsclient"></a>

```json
{
  "client_id": "string",
  "client": "string",
  "ip": {
    "address": "string",
    "country_code": "string",
    "country": "string",
    "location": "string"
  },
  "last_active": "string",
  "current": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|client_id|string|true|none||none|
|client|string|true|none||none|
|ip|object|true|none||none|
|» address|string|true|none||none|
|» country_code|string|true|none||none|
|» country|string|true|none||none|
|» location|string|true|none||none|
|last_active|string|true|none||none|
|current|integer|true|none||none|

<h2 id="tocS_Creator">Creator</h2>

<a id="schemacreator"></a>
<a id="schema_Creator"></a>
<a id="tocScreator"></a>
<a id="tocscreator"></a>

```json
{
  "cashout": 0,
  "rate": 0,
  "bank_type": "string",
  "bank_name": "string",
  "bank_number": "string",
  "bank_detail": "string",
  "auto_withdraw": 0,
  "phone": "string",
  "amount": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|cashout|integer|false|none||是否可以取款|
|rate|integer|false|none||提成比例|
|bank_type|string|true|none||取款方式|
|bank_name|string|false|none||开户行名称|
|bank_number|string|true|none||收款账号信息|
|bank_detail|string|false|none||其他说明信息|
|auto_withdraw|integer|false|none||自动提现|
|phone|string|false|none||电话|
|amount|number|true|none||金额|

<h2 id="tocS_AliasParam">AliasParam</h2>

<a id="schemaaliasparam"></a>
<a id="schema_AliasParam"></a>
<a id="tocSaliasparam"></a>
<a id="tocsaliasparam"></a>

```json
{
  "user_id": 0,
  "display_name": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user_id|integer|true|none||none|
|display_name|string|true|none||none|

<h2 id="tocS_UserIDParam">UserIDParam</h2>

<a id="schemauseridparam"></a>
<a id="schema_UserIDParam"></a>
<a id="tocSuseridparam"></a>
<a id="tocsuseridparam"></a>

```json
{
  "user_id": 0,
  "top": 1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user_id|integer|true|none||none|
|top|integer|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|top|1|
|top|0|

<h2 id="tocS_Blacklist">Blacklist</h2>

<a id="schemablacklist"></a>
<a id="schema_Blacklist"></a>
<a id="tocSblacklist"></a>
<a id="tocsblacklist"></a>

```json
{
  "id": 0,
  "created_at": "string",
  "user": {
    "id": 0,
    "name": "string",
    "display_name": "string",
    "gender": 0,
    "avatar": "string",
    "cover": "string",
    "location": "string",
    "vip": 0,
    "friend": 0,
    "block": 0,
    "request": 0,
    "x": 0,
    "content": "string",
    "cost": 0,
    "translate": 0,
    "engine": 0,
    "online": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer|true|none||none|
|created_at|string|true|none||none|
|user|[User](#schemauser)|true|none||none|

<h2 id="tocS_GifParam">GifParam</h2>

<a id="schemagifparam"></a>
<a id="schema_GifParam"></a>
<a id="tocSgifparam"></a>
<a id="tocsgifparam"></a>

```json
{
  "link": "string",
  "w": 0,
  "h": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|link|string|true|none||none|
|w|integer|true|none||none|
|h|integer|true|none||none|

<h2 id="tocS_GPTParam">GPTParam</h2>

<a id="schemagptparam"></a>
<a id="schema_GPTParam"></a>
<a id="tocSgptparam"></a>
<a id="tocsgptparam"></a>

```json
{
  "content": "string",
  "mode": "translate"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|content|string|true|none||none|
|mode|string|true|none||none|

#### 枚举值

|属性|值|
|---|---|
|mode|translate|
|mode|rewrite|
|mode|generate|

