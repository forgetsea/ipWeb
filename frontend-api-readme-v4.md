# 前端网页对接文档（统一命名版 MVP，已对齐上游订单参数）

> 版本：v0.1
> 目标：前端只调用平台服务器接口。    
> 本文档已根据上游业务服务器 API 文档补齐关键运行参数。  
>
> 本文档中每个 API 都包含：
> - 功能说明
> - 请求参数表
> - 返回字段表
> - 错误码
> - 后端处理逻辑

---

# 1. 统一业务概念

## 1.1 平台账号
用户登录网站的账号。  
例如：邮箱、平台登录密码、昵称、手机号。

## 1.2 订单
用户购买套餐后生成的一条订单记录。  
订单号同时也是 API 调用时使用的 **API账号标识**。

## 1.3 订单 API 信息
订单支付成功并开通后，会对应一组 API 调用信息：

- `apiAccount`：API账号，通常等于订单号
- `isLocked`：当前订单 API 调用是否关闭
- `settings`：订单的提取设置
- `whitelist`：白名单
- `leftNum / allNum`：额度信息

说明：
- API密钥由平台服务器维护
- MVP 阶段不向前端返回 API密钥明文

## 1.4 订单设置
根据上游 API 文档，订单运行参数至少包括：

- `outip`：是否显示真实 IP
- `lsp`：是否显示运营商
- `prov`：是否显示省份
- `city`：是否显示城市
- `endtime`：是否显示结束时间
- `ifs`：是否去重
- `iptype`：返回格式
- `sessTime`：session 时间
- `userType`：订单类型（上游定义）
- `dayfetchlimit`：次数上限

## 1.5 套餐类型
平台侧仍使用易懂命名：

- `time_based`：包时型
- `balance`：余额 / 次数型

但要注意：上游创建与返回时使用的是：

- `userType = 0`：包月 / 包天用户
- `userType = 1`：次数用户

### 映射关系建议
- `packageType = time_based` -> `userType = 0`
- `packageType = balance` -> `userType = 1`

## 1.6 dayfetchlimit 的含义
这个字段必须重点说明：

- 当 `userType = 0` 时：`dayfetchlimit` 表示 **每日提取上限**
- 当 `userType = 1` 时：`dayfetchlimit` 表示 **总提取次数**

所以前端展示文案不能写死为“每日上限”，而要根据 `userType` 动态显示。

---

# 2. 基础约定

## 2.1 Base URL

```bash
测试环境: https://api-test.yourdomain.com
生产环境: https://api.yourdomain.com
```

## 2.2 请求头

登录后接口统一携带：

```http
Authorization: Bearer <token>
Content-Type: application/json
```

## 2.3 统一响应结构

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

---

# 3. 通用错误码

| 错误码 | 含义 | 前端建议 |
|---|---|---|
| 0 | 成功 | 正常处理 |
| 40001 | 参数错误 | 提示用户检查输入 |
| 40002 | 未登录或 token 失效 | 跳转登录页 |
| 40003 | 无权限 | 提示无权限 |
| 40004 | 资源不存在 | 提示数据不存在 |
| 40005 | 当前状态不允许操作 | 提示当前状态不可操作 |
| 40006 | 验证码错误 | 提示验证码错误 |
| 40007 | 请求过于频繁 | 提示稍后重试 |
| 40008 | 套餐不可购买 | 提示套餐不可用 |
| 40009 | 支付失败 | 提示支付失败 |
| 50001 | 平台服务器内部错误 | 提示系统异常 |
| 50002 | 上游服务调用失败 | 提示服务繁忙 |
| 50003 | 支付回调异常 | 提示支付处理中 |
| 50004 | 数据状态不一致 | 提示刷新重试 |

---

# 4. 订单状态命名

| 状态值 | 前端展示建议 | 含义 |
|---|---|---|
| pending_payment | 待支付 | 订单已创建，等待付款 |
| paid | 已支付 | 支付已成功，但尚未开通 |
| provisioning | 开通中 | 平台正在把订单同步给上游服务 |
| active | 生效中 | 已成功开通，可正常使用 |
| failed | 开通失败 | 已支付，但开通失败 |
| expired | 已失效 | 已过期不可用 |
| closed | 已关闭 | 已取消或关闭 |

---

# 5. 认证接口

## 5.1 发送邮箱验证码

### 接口
**POST** `/api/v1/auth/email/send-code`

### 功能说明
在注册或找回密码前，向用户邮箱发送验证码。该接口只负责发送验证码，不创建平台账号。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| email | string | 是 | 用户邮箱 |
| scene | string | 是 | `register` / `reset_password` |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| code | number | 结果码 |
| message | string | 说明 |
| data | object | 空对象 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 邮箱格式错误 / 参数缺失 |
| 40007 | 发送过于频繁 |
| 50001 | 邮件发送失败 |

### 后端处理逻辑
1. 校验邮箱与场景。  
2. 校验发送频率。  
3. 生成验证码并落库。  
4. 调邮件服务发送。  
5. 返回结果。

---

## 5.2 用户注册

### 接口
**POST** `/api/v1/auth/register`

### 功能说明
用户使用邮箱、验证码和密码注册平台账号。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| email | string | 是 | 用户邮箱 |
| password | string | 是 | 平台登录密码 |
| confirmPassword | string | 否 | 确认密码 |
| verifyCode | string | 是 | 邮箱验证码 |
| nickname | string | 否 | 用户昵称 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.token | string | 登录 token |
| data.user.id | number | 用户 ID |
| data.user.email | string | 邮箱 |
| data.user.nickname | string | 昵称 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 参数错误 |
| 40006 | 验证码错误或过期 |
| 40007 | 请求过于频繁 |
| 50001 | 注册失败 |

### 后端处理逻辑
1. 校验参数。  
2. 校验验证码状态。  
3. 检查邮箱是否已注册。  
4. 加密保存密码。  
5. 创建用户。  
6. 生成 token。

---

## 5.3 用户登录

### 接口
**POST** `/api/v1/auth/login`

### 功能说明
用户使用平台账号登录网站。当前阶段默认用邮箱登录。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| account | string | 是 | 登录账号 |
| password | string | 是 | 平台登录密码 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.token | string | 登录 token |
| data.user.id | number | 用户 ID |
| data.user.email | string | 邮箱 |
| data.user.nickname | string | 昵称 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 参数错误 |
| 40002 | 账号或密码错误 |
| 40003 | 账号被禁用 |

### 后端处理逻辑
1. 查询用户。  
2. 校验密码。  
3. 校验状态。  
4. 生成 token。

---

## 5.4 获取当前登录用户

### 接口
**GET** `/api/v1/auth/me`

### 功能说明
获取当前 token 对应的平台用户信息。

### 请求参数表
无

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.id | number | 用户 ID |
| data.email | string | 邮箱 |
| data.nickname | string | 昵称 |
| data.phone | string | 手机号 |
| data.emailVerified | boolean | 邮箱验证状态 |
| data.phoneVerified | boolean | 手机验证状态 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | token 无效或已过期 |

### 后端处理逻辑
1. 解析 token。  
2. 获取用户。  
3. 返回资料。

---

## 5.5 退出登录

### 接口
**POST** `/api/v1/auth/logout`

### 功能说明
退出当前平台账号登录状态。

### 请求参数表
无

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| code | number | 结果码 |
| message | string | 说明 |
| data | object | 空对象 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |

### 后端处理逻辑
1. 解析 token。  
2. 使 token 失效。  
3. 返回成功。

---

# 6. 平台用户资料接口

## 6.1 获取个人资料

### 接口
**GET** `/api/v1/user/profile`

### 功能说明
获取当前登录用户的资料。

### 请求参数表
无

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.id | number | 用户 ID |
| data.email | string | 邮箱 |
| data.phone | string | 手机号 |
| data.nickname | string | 昵称 |
| data.emailVerified | boolean | 邮箱验证状态 |
| data.phoneVerified | boolean | 手机验证状态 |
| data.createdAt | string | 注册时间 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |

### 后端处理逻辑
1. 获取当前用户。  
2. 返回资料。

---

## 6.2 修改个人资料

### 接口
**PUT** `/api/v1/user/profile`

### 功能说明
修改平台用户资料。MVP 只改昵称和手机号。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| nickname | string | 否 | 用户昵称 |
| phone | string | 否 | 手机号 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.nickname | string | 昵称 |
| data.phone | string | 手机号 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 参数格式错误 |
| 40002 | 未登录 |

### 后端处理逻辑
1. 获取用户。  
2. 校验参数。  
3. 更新资料。  
4. 返回结果。

---

## 6.3 修改平台登录密码

### 接口
**PUT** `/api/v1/user/password`

### 功能说明
修改平台登录密码。不是订单 API密钥修改接口。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| oldPassword | string | 是 | 原密码 |
| newPassword | string | 是 | 新密码 |
| confirmPassword | string | 否 | 确认密码 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| code | number | 结果码 |
| message | string | 说明 |
| data | object | 空对象 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 参数错误 |
| 40002 | 未登录 |
| 40005 | 原密码错误 / 新密码不合法 |

### 后端处理逻辑
1. 获取用户。  
2. 校验原密码。  
3. 校验新密码。  
4. 更新密码哈希。  
5. 可选：让旧 token 失效。

---

# 7. 套餐接口

## 7.1 获取套餐列表

### 接口
**GET** `/api/v1/packages`

### 功能说明
获取前台展示的套餐列表，支持包时型和余额型。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| channel | string | 否 | `normal` / `premium` |
| packageType | string | 否 | `time_based` / `balance` |
| recommended | boolean | 否 | 是否只看推荐 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.list | array | 套餐列表 |
| data.list[].id | number | 套餐 ID |
| data.list[].name | string | 套餐名称 |
| data.list[].channel | string | 渠道分类 |
| data.list[].packageType | string | 套餐类型 |
| data.list[].userType | number | 上游订单类型，0 包时，1 次数 |
| data.list[].durationDays | number/null | 包时天数 |
| data.list[].price | number | 售价 |
| data.list[].originalPrice | number | 原价 |
| data.list[].dailyLimit | number/null | 每日上限（平台语义） |
| data.list[].totalQuota | number/null | 总额度（平台语义） |
| data.list[].defaultSessTime | number | 默认 session 时间 |
| data.list[].defaultOutip | number | 默认显示真实 IP |
| data.list[].defaultLsp | number | 默认显示运营商 |
| data.list[].defaultProv | number | 默认显示省份 |
| data.list[].defaultCity | number | 默认显示城市 |
| data.list[].defaultEndtime | number | 默认显示结束时间 |
| data.list[].defaultIfs | number | 默认是否去重 |
| data.list[].defaultIptype | number | 默认返回格式 |
| data.list[].recommended | boolean | 是否推荐 |
| data.list[].description | string | 简短说明 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 查询参数错误 |

### 后端处理逻辑
1. 查询已上架套餐。  
2. 返回套餐及其默认配置参数。

---

## 7.2 获取套餐详情

### 接口
**GET** `/api/v1/packages/{id}`

### 功能说明
获取单个套餐详情，用于套餐页和订单确认页。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| id | path number | 是 | 套餐 ID |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.id | number | 套餐 ID |
| data.name | string | 套餐名称 |
| data.channel | string | 渠道分类 |
| data.packageType | string | 套餐类型 |
| data.userType | number | 上游订单类型 |
| data.durationDays | number/null | 包时天数 |
| data.price | number | 售价 |
| data.originalPrice | number | 原价 |
| data.dailyLimit | number/null | 每日上限 |
| data.totalQuota | number/null | 总额度 |
| data.defaultSessTime | number | 默认 session 时间 |
| data.defaultOutip | number | 默认显示真实 IP |
| data.defaultLsp | number | 默认显示运营商 |
| data.defaultProv | number | 默认显示省份 |
| data.defaultCity | number | 默认显示城市 |
| data.defaultEndtime | number | 默认显示结束时间 |
| data.defaultIfs | number | 默认是否去重 |
| data.defaultIptype | number | 默认返回格式 |
| data.features | array | 功能卖点 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40004 | 套餐不存在 |

### 后端处理逻辑
1. 查询套餐。  
2. 校验状态。  
3. 返回详情和默认配置。

---

# 8. 订单与支付接口

## 8.1 创建订单

### 接口
**POST** `/api/v1/orders`

### 功能说明
创建平台订单。此时只创建订单，不初始化上游订单。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| packageId | number | 是 | 套餐 ID |
| payMethod | string | 是 | `wechat` / `alipay` |
| source | string | 否 | 下单来源，默认 `web` |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.orderNo | string | 平台订单号 |
| data.apiAccount | string | API账号，通常等于订单号 |
| data.amount | number | 订单金额 |
| data.packageType | string | 套餐类型 |
| data.userType | number | 上游订单类型 |
| data.orderStatus | string | 初始状态，一般为 `pending_payment` |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40008 | 套餐不可购买 |
| 50001 | 创建订单失败 |

### 后端处理逻辑
1. 获取当前用户。  
2. 校验套餐。  
3. 生成订单号。  
4. 将订单号作为 API账号。  
5. 落库订单快照。  
6. 返回结果。

---

## 8.2 获取我的订单列表

### 接口
**GET** `/api/v1/orders`

### 功能说明
获取当前用户的订单列表。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| status | string | 否 | 订单状态 |
| packageType | string | 否 | `time_based` / `balance` |
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页条数 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.list | array | 订单列表 |
| data.list[].orderNo | string | 订单号 |
| data.list[].apiAccount | string | API账号 |
| data.list[].packageName | string | 套餐名称 |
| data.list[].packageType | string | 套餐类型 |
| data.list[].userType | number | 上游订单类型 |
| data.list[].amount | number | 金额 |
| data.list[].orderStatus | string | 订单状态 |
| data.list[].payStatus | string | 支付状态 |
| data.list[].createdAt | string | 下单时间 |
| data.list[].paidAt | string/null | 支付时间 |
| data.list[].activeAt | string/null | 生效时间 |
| data.list[].expiredAt | string/null | 结束时间 |
| data.list[].dayfetchlimit | number | 次数上限 |
| data.list[].displayLimitLabel | string | 前端直接显示的文案，如“每日次数上限”/“总次数” |
| data.list[].remainingQuota | number/null | 剩余额度 |
| data.page | number | 页码 |
| data.pageSize | number | 每页条数 |
| data.total | number | 总数 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |

### 后端处理逻辑
1. 查询当前用户订单。  
2. 聚合订单和订单 API 信息。  
3. 根据 `userType` 组装展示文案。  
4. 返回分页结果。

---

## 8.3 获取订单详情

### 接口
**GET** `/api/v1/orders/{orderNo}`

### 功能说明
查看某一订单的详情，兼容包时型和余额型，并对齐上游参数。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| orderNo | path string | 是 | 平台订单号 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.orderNo | string | 订单号 |
| data.apiAccount | string | API账号 |
| data.packageName | string | 套餐名称 |
| data.packageType | string | 套餐类型 |
| data.userType | number | 上游订单类型 |
| data.amount | number | 金额 |
| data.orderStatus | string | 订单状态 |
| data.payStatus | string | 支付状态 |
| data.createdAt | string | 下单时间 |
| data.paidAt | string/null | 支付时间 |
| data.activeAt | string/null | 生效时间 |
| data.expiredAt | string/null | 结束时间 |
| data.dayfetchlimit | number | 次数上限 |
| data.displayLimitLabel | string | 上限展示名称 |
| data.remainingQuota | number/null | 剩余额度 |
| data.usedQuota | number/null | 已使用额度 |
| data.sessTime | number | session 时间 |
| data.isLocked | number | 0 开启，1 关闭 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40003 | 无权限查看该订单 |
| 40004 | 订单不存在 |

### 后端处理逻辑
1. 查询订单。  
2. 校验订单归属。  
3. 聚合订单与订单 API 配置。  
4. 根据 `userType` 组装次数上限含义。  
5. 返回详情。

---

## 8.4 查询订单状态

### 接口
**GET** `/api/v1/orders/{orderNo}/status`

### 功能说明
支付结果页轮询订单状态。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| orderNo | path string | 是 | 平台订单号 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.orderNo | string | 订单号 |
| data.orderStatus | string | 订单状态 |
| data.payStatus | string | 支付状态 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 返回最新状态。

---

## 8.5 发起支付

### 接口
**POST** `/api/v1/payments/create`

### 功能说明
根据订单号生成支付信息。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| orderNo | string | 是 | 订单号 |
| payMethod | string | 是 | `wechat` / `alipay` |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.payMethod | string | 支付方式 |
| data.payUrl | string | 支付地址 / 收银台地址 |
| data.expireAt | string | 支付过期时间 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40004 | 订单不存在 |
| 40005 | 当前订单不可支付 |
| 50001 | 创建支付单失败 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属和状态。  
3. 创建支付单。  
4. 返回支付信息。

---

## 8.6 查询支付结果

### 接口
**GET** `/api/v1/payments/{orderNo}/result`

### 功能说明
用于支付结果页查询支付结果。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| orderNo | path string | 是 | 订单号 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.orderNo | string | 订单号 |
| data.payStatus | string | 支付状态 |
| data.orderStatus | string | 订单状态 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40004 | 订单不存在 |

### 后端处理逻辑
1. 查询订单与支付记录。  
2. 校验归属。  
3. 返回结果。

---

# 9. 用户中心接口

## 9.1 获取控制台首页数据

### 接口
**GET** `/api/v1/dashboard`

### 功能说明
返回用户中心首页汇总信息。

### 请求参数表
无

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.user.nickname | string | 用户昵称 |
| data.user.email | string | 用户邮箱 |
| data.summary.activeOrderCount | number | 生效中订单数 |
| data.summary.expiredOrderCount | number | 已失效订单数 |
| data.summary.whitelistCount | number | 白名单总数 |
| data.summary.leftNum | number/null | 最近有效订单剩余额度 |
| data.summary.allNum | number/null | 最近有效订单总额度 |
| data.latestActiveOrder.orderNo | string | 最近有效订单号 |
| data.latestActiveOrder.apiAccount | string | API账号 |
| data.latestActiveOrder.packageName | string | 套餐名称 |
| data.latestActiveOrder.packageType | string | 套餐类型 |
| data.latestActiveOrder.userType | number | 上游订单类型 |
| data.latestActiveOrder.expiredAt | string/null | 到期时间 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |

### 后端处理逻辑
1. 获取当前用户。  
2. 聚合订单和白名单统计。  
3. 返回首页数据。

---

# 10. 订单 API 信息与设置接口

## 10.1 获取订单 API 信息

### 接口
**GET** `/api/v1/order-api/{orderNo}`

### 功能说明
获取某个订单的 API 信息和当前设置。MVP 阶段不返回 API密钥明文。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| orderNo | path string | 是 | 平台订单号 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.orderNo | string | 订单号 |
| data.apiAccount | string | API账号 |
| data.orderStatus | string | 订单状态 |
| data.isLocked | number | 0 开启，1 关闭 |
| data.leftNum | number/null | 剩余额度 |
| data.allNum | number/null | 总额度 |
| data.settings.outip | number | 显示真实 IP |
| data.settings.lsp | number | 显示运营商 |
| data.settings.prov | number | 显示省份 |
| data.settings.city | number | 显示城市 |
| data.settings.endtime | number | 显示结束时间 |
| data.settings.ifs | number | 是否去重 |
| data.settings.iptype | number | 返回格式 |
| data.settings.sessTime | number | session 时间 |
| data.settings.userType | number | 上游订单类型 |
| data.settings.dayfetchlimit | number | 次数上限 |
| data.whitelist | array | 白名单列表 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 查询订单 API 信息、设置、白名单。  
4. 返回聚合结果。

---

## 10.2 刷新订单 API 信息

### 接口
**POST** `/api/v1/order-api/{orderNo}/sync`

### 功能说明
主动同步该订单在上游服务中的最新信息。

### 请求参数表
无

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.synced | boolean | 是否同步成功 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |
| 50002 | 上游服务调用失败 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 调上游查询最新信息。  
4. 更新本地缓存。  
5. 返回结果。

---

## 10.3 开启/关闭订单 API 调用

### 接口
**PUT** `/api/v1/order-api/{orderNo}/status`

### 功能说明
控制该订单的 API 调用开关。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| isLocked | number | 是 | 0 开启，1 关闭 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.isLocked | number | 最新开关状态 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |
| 50002 | 上游服务调用失败 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 调上游修改开关。  
4. 更新本地 `isLocked`。  
5. 返回结果。

---

## 10.4 修改订单设置

### 接口
**PUT** `/api/v1/order-api/{orderNo}/settings`

### 功能说明
修改订单提取设置。该接口只修改显示项 / 去重 / 返回格式 / session 等参数，不修改 dayfetchlimit。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| outip | number | 否 | 是否显示真实 IP |
| lsp | number | 否 | 是否显示运营商 |
| prov | number | 否 | 是否显示省份 |
| city | number | 否 | 是否显示城市 |
| endtime | number | 否 | 是否显示结束时间 |
| ifs | number | 否 | 是否去重 |
| iptype | number | 否 | 返回格式 |
| sessTime | number | 否 | session 时间 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.settings | object | 最新设置 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 参数错误 |
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |
| 50002 | 上游服务调用失败 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 校验设置参数。  
4. 调上游 `update_set`。  
5. 更新本地缓存。  
6. 返回最新设置。

---

## 10.5 修改次数上限

### 接口
**PUT** `/api/v1/order-api/{orderNo}/limit`

### 功能说明
单独修改订单的次数上限。对应上游 `update_setlimit.act`。  
注意：
- `userType = 0` 时，它表示每日次数上限
- `userType = 1` 时，它表示总次数

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| dayfetchlimit | number | 是 | 次数上限 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.dayfetchlimit | number | 最新次数上限 |
| data.displayLimitLabel | string | 展示名称 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 参数错误 |
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |
| 50002 | 上游服务调用失败 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 校验次数上限范围。  
4. 调上游 `update_setlimit`。  
5. 更新本地缓存。  
6. 根据 `userType` 返回展示文案。

---

## 10.6 查询订单额度

### 接口
**GET** `/api/v1/order-api/{orderNo}/quota`

### 功能说明
获取某个订单当前可用额度和总额度。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| orderNo | path string | 是 | 订单号 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.leftNum | number/null | 剩余额度 |
| data.allNum | number/null | 总额度 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |
| 50002 | 上游服务调用失败 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 调上游查询额度或返回缓存。  
4. 更新缓存。  
5. 返回结果。

---

# 11. 白名单接口（支持批量）

## 11.1 获取白名单列表

### 接口
**GET** `/api/v1/order-api/{orderNo}/whitelist`

### 功能说明
获取某个订单的白名单列表。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| orderNo | path string | 是 | 订单号 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.list | array | 白名单 IP 列表 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 查询白名单缓存或同步上游。  
4. 返回列表。

---

## 11.2 批量新增白名单

### 接口
**POST** `/api/v1/order-api/{orderNo}/whitelist`

### 功能说明
批量新增白名单 IP。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| ips | string[] | 是 | IPv4 地址数组 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.successIps | array | 成功 IP 列表 |
| data.failedIps | array | 失败明细 |
| data.failedIps[].ip | string | 失败 IP |
| data.failedIps[].reason | string | 失败原因 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 参数错误 / 数组为空 / IP格式错误 |
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |
| 50002 | 上游服务调用失败 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 校验 IP 数组。  
4. 批量或逐个调用上游。  
5. 更新本地缓存。  
6. 返回成功 / 失败明细。

---

## 11.3 批量删除白名单

### 接口
**DELETE** `/api/v1/order-api/{orderNo}/whitelist`

### 功能说明
批量删除白名单 IP。

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| ips | string[] | 是 | 要删除的 IP 数组 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.successIps | array | 成功删除列表 |
| data.failedIps | array | 失败明细 |
| data.failedIps[].ip | string | 失败 IP |
| data.failedIps[].reason | string | 失败原因 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 参数错误 / 数组为空 / IP格式错误 |
| 40002 | 未登录 |
| 40003 | 无权限 |
| 40004 | 订单不存在 |
| 50002 | 上游服务调用失败 |

### 后端处理逻辑
1. 查询订单。  
2. 校验归属。  
3. 校验参数。  
4. 批量或逐个调用上游。  
5. 更新本地缓存。  
6. 返回成功 / 失败明细。

---

# 12. 帮助与文档接口

## 12.1 获取帮助文章列表

### 接口
**GET** `/api/v1/help/articles`

### 功能说明
获取帮助中心文章列表。
版本V0.2 增加动态获取。现以静态页面模拟

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| category | string | 否 | 分类 |
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页条数 |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.list | array | 文章列表 |
| data.list[].id | number | 文章 ID |
| data.list[].title | string | 标题 |
| data.list[].summary | string | 摘要 |
| data.list[].category | string | 分类 |
| data.page | number | 页码 |
| data.pageSize | number | 每页条数 |
| data.total | number | 总数 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40001 | 查询参数错误 |

### 后端处理逻辑
1. 查询已发布文章。  
2. 按分类和分页返回。

---

## 12.2 获取帮助文章详情

### 接口
**GET** `/api/v1/help/articles/{id}`

### 功能说明
获取帮助文章详情。
版本V0.2 增加动态获取。现以静态页面模拟

### 请求参数表

| 参数名 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| id | path number | 是 | 文章 ID |

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.id | number | 文章 ID |
| data.title | string | 标题 |
| data.category | string | 分类 |
| data.content | string | 正文 |
| data.updatedAt | string | 更新时间 |

### 错误码

| 错误码 | 含义 |
|---|---|
| 40004 | 文章不存在 |

### 后端处理逻辑
1. 查询文章。  
2. 校验状态为已发布。  
3. 返回详情。

---

## 12.3 获取 API 文档摘要

### 接口
**GET** `/api/v1/docs/api-summary`

### 功能说明
返回面向网站用户的 API 文档摘要内容。
版本V0.2 增加动态获取。现以静态页面模拟

### 请求参数表
无

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.title | string | 标题 |
| data.content | string | 正文内容 |

### 错误码
异常时一般返回 `50001`。

### 后端处理逻辑
1. 查询 API 文档配置。  
2. 返回内容。

---

## 12.4 获取代码示例列表

### 接口
**GET** `/api/v1/docs/code-demos`

### 功能说明
获取代码示例列表，例如 Java / Python / PHP。
版本V0.2 增加动态获取。现以静态页面模拟

### 请求参数表
无

### 返回字段表

| 字段名 | 类型 | 说明 |
|---|---|---|
| data.list | array | 示例列表 |
| data.list[].language | string | 语言 |
| data.list[].title | string | 标题 |
| data.list[].code | string | 代码内容 |

### 错误码
异常时一般返回 `50001`。

### 后端处理逻辑
1. 查询代码示例配置。  
2. 返回列表。

---

# 13. 页面与接口映射

## 13.1 登录页
- `POST /api/v1/auth/login`

## 13.2 注册页
- `POST /api/v1/auth/email/send-code`
- `POST /api/v1/auth/register`

## 13.3 套餐页
- `GET /api/v1/packages`
- `GET /api/v1/packages/{id}`

## 13.4 订单确认页
- `POST /api/v1/orders`
- `POST /api/v1/payments/create`

## 13.5 支付结果页
- `GET /api/v1/orders/{orderNo}/status`
- `GET /api/v1/payments/{orderNo}/result`

## 13.6 用户中心首页
- `GET /api/v1/dashboard`

## 13.7 我的订单
- `GET /api/v1/orders`

## 13.8 订单详情页
- `GET /api/v1/orders/{orderNo}`
- `GET /api/v1/order-api/{orderNo}`
- `GET /api/v1/order-api/{orderNo}/quota`

## 13.9 订单设置页 / API 设置区
- `PUT /api/v1/order-api/{orderNo}/settings`
- `PUT /api/v1/order-api/{orderNo}/limit`
- `PUT /api/v1/order-api/{orderNo}/status`

## 13.10 白名单管理页
- `GET /api/v1/order-api/{orderNo}/whitelist`
- `POST /api/v1/order-api/{orderNo}/whitelist`
- `DELETE /api/v1/order-api/{orderNo}/whitelist`

## 13.11 个人资料页
- `GET /api/v1/user/profile`
- `PUT /api/v1/user/profile`

## 13.12 安全设置页
- `PUT /api/v1/user/password`

## 13.13 帮助中心
- `GET /api/v1/help/articles`
- `GET /api/v1/help/articles/{id}`

## 13.14 API 文档 / 代码示例页
- `GET /api/v1/docs/api-summary`
- `GET /api/v1/docs/code-demos`
