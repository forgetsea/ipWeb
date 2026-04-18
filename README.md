# ipWeb

ipWeb 是一个基于 Vite + React 的代理 IP 业务前端，包含官网首页、登录注册页和用户中心。当前页面已经预留了后端接口调用位置，适合先完成前端展示与交互，再逐步接入真实业务 API。

## 技术栈

- React 19
- React Router 7
- Vite 8
- ESLint 9

## 功能模块

- 首页：品牌展示、能力介绍、套餐信息、企业服务和新闻区块。
- 登录 / 注册：复用同一套表单页面骨架，已预留登录与创建用户接口。
- 用户中心：按子路由拆分为 API 凭据、账户概览、基础资料、安全设置、订单设置、白名单、IP 提取和接口参考。
- 接口请求：统一通过 `src/services/request.js` 发送 POST JSON 请求，方便后续补充 token、超时、错误上报等公共逻辑。

## 目录结构

```text
src
├─ app/                 # 应用路由配置
├─ components/          # 通用组件、布局组件和首页组件
├─ config/              # 前端接口地址与供应商接口参考
├─ data/                # 首页展示数据
├─ pages/               # 页面级组件
│  ├─ auth/             # 登录、注册页面
│  └─ user/             # 用户中心页面与数据适配
├─ router/              # 路由常量
├─ services/            # 请求封装和业务服务
├─ App.jsx
└─ main.jsx
```

## 本地运行

先安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

构建生产包：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

代码检查：

```bash
npm run lint
```

## 接口配置

接口地址集中在两个文件中：

- `src/config/authApi.js`：登录、注册接口。
- `src/config/userCenterApi.js`：用户中心业务接口，以及供应商原始接口参考。

当前 `API_BASE_URL` 使用 `URL` 作为占位：

```js
const API_BASE_URL = 'URL'
```

接入后端时，将它替换为真实后端网关地址即可，例如：

```js
const API_BASE_URL = 'https://api.example.com'
```

页面不会直接请求供应商原始接口，而是请求自有后端代理接口。这样可以把跨域、鉴权、供应商字段差异和敏感参数统一放在后端处理。

## 用户中心状态流转

用户中心父页面 `UserCenterPage` 维护账户信息、API 凭据、提交状态和提示消息，再通过 React Router 的 `Outlet context` 分发给各个子页面。子页面通过 `useUserCenter()` 获取共享状态和公共动作。

核心公共方法：

- `requireCredentials()`：提交前检查 API 账户和调用密码。
- `runAction()`：统一处理 loading、成功提示、错误提示和账户数据回写。
- `updateForm()`：复用表单字段变更逻辑。

后端返回账户数据时，如果字段来自供应商接口，可在 `src/pages/user/userCenterData.js` 的 `normalizeAccountData()` 中做一次转换，避免页面组件直接关心接口字段差异。

## 对接建议

- 优先确认后端代理接口的请求方法、字段名和返回结构。
- 如果登录后需要鉴权 token，可以在 `postJson()` 中统一添加请求头。
- 如果后端返回结构和当前示例不同，优先调整服务层或 `normalizeAccountData()`，尽量不要让页面组件散落字段适配逻辑。
- 供应商原始接口地址仅用于“接口参考”页面展示和对接说明，不建议直接暴露为浏览器端请求目标。
