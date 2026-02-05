---
toc: content
title: '工具库'
order: '16'
glossary: API | OpenAPI
---

# 工具库

`@kdcloudjs/kwc-shared-utils` 是为「KWC」（Kingdee Web Components）项目打造的通用共享工具库，封装了客户端环境检测、动态资源加载、API 请求适配、OpenAPI 规范对接、组件间通信等高频开发能力，适配「KWC」组件开发的各类通用场景，同时支持 ES Module 和 CommonJS 两种导入方式，可按需引用。

本章将介绍该工具库的主要功能与使用方式。

## 库准备

### 安装

在「KWC」项目根目录执行以下命令，完成工具库的安装：

```bash
npm install @kdcloudjs/kwc-shared-utils
```

### 模块导入

该库支持整体导入和按需导入，同时兼容 ES Module 和 CommonJS 两种模块化规范，可根据项目环境选择对应方式：

```js
// ES Module 导入
import {
  client,
  apiAdapter,
  openApiAdapter,
  platformResourceLoader,
} from '@kdcloudjs/kwc-shared-utils';

// 或者按需导入
import { client } from '@kdcloudjs/kwc-shared-utils';
import { platformResourceLoader } from '@kdcloudjs/kwc-shared-utils';

// CommonJS 导入
const { client, apiAdapter } = require('@kdcloudjs/kwc-shared-utils');
```

### 环境检测

基于 `client` 模块实现客户端运行环境的精准检测，分为应用检测、浏览器检测、设备检测三类，可根据检测结果做差异化的功能适配，核心方法调用简单、返回值直观。

#### 应用检测 (App Detection)

检测当前代码运行的第三方应用环境（如云之家、微信、钉钉等），支持精准区分移动端 / 桌面端：

```js
import { client } from 'kingdee/client';

// 获取当前应用名称
const appName = client.getAppName(); // 返回: 'yunzhijia', 'weixin', 'dingding' 等

// 检测具体应用
if (client.isYzj()) {
  console.log('运行在云之家移动端');
}

if (client.isYzjDesktop()) {
  console.log('运行在云之家桌面端');
}

if (client.isWX()) {
  console.log('运行在微信中');
}

if (client.isWxWork()) {
  console.log('运行在企业微信中');
}

if (client.isDD()) {
  console.log('运行在钉钉中');
}

if (client.isFeiShu()) {
  console.log('运行在飞书中');
}

if (client.isWeLink()) {
  console.log('运行在WeLink中');
}
```

#### 浏览器检测 (Browser Detection)

检测当前运行的浏览器类型，适配浏览器兼容性开发：

```js
// 获取浏览器名称
const browserName = client.getBrowserName(); // 返回: 'chrome', 'firefox', 'safari' 等

// 检测具体浏览器
if (client.isChrome()) {
  console.log('Chrome 浏览器');
}

if (client.isFirefox()) {
  console.log('Firefox 浏览器');
}

if (client.isSafari()) {
  console.log('Safari 浏览器');
}

if (client.isEdge()) {
  console.log('Edge 浏览器');
}

if (client.isIE()) {
  console.log('IE 浏览器');
}
```

#### 设备检测 (Device Detection)

简单区分移动设备 / PC 设备，适配端侧差异化布局与功能：

```js
if (client.isMobile()) {
  console.log('移动设备');
}

if (client.isPC()) {
  console.log('PC 设备');
}
```

---

## 库使用

### 动态加载外部资源

基于 `platformResourceLoader` 模块实现外部脚本（js）和样式表（css）的动态加载，是「KWC」组件中加载第三方资源的标准方式，内置缓存和错误处理机制，支持 Promise 和回调两种调用方式。

```js
import { platformResourceLoader } from 'kingdee/platformResourceLoader';

// 加载外部脚本
platformResourceLoader
  .loadScript(document.head, 'https://example.com/script.js')
  .then((url) => {
    console.log('脚本加载成功:', url);
  })
  .catch((error) => {
    console.error('脚本加载失败:', error);
  });

// 加载外部样式表
platformResourceLoader
  .loadStyle(document.head, 'https://example.com/style.css')
  .then((url) => {
    console.log('样式表加载成功:', url);
  })
  .catch((error) => {
    console.error('样式表加载失败:', error);
  });

// 使用回调方式
platformResourceLoader.loadScript(
  document.head,
  'https://example.com/script.js',
  (error, url) => {
    if (error) {
      console.error('加载失败:', error);
    } else {
      console.log('加载成功:', url);
    }
  },
);
```

**核心特性：**

- 自动缓存已加载的资源，避免重复加载
- 支持 Promise 和回调两种方式
- 自动处理加载错误

### API 模块

API 模块是对接后端 `Controller` 接口的请求适配器，封装了请求去重、缓存、取消等高频能力，无需手动处理 AbortController、请求队列等底层逻辑。<br>

提供两种调用方式：

- 适配器方式（adapterApi）：适合在组件内复用实例、享受请求去重与缓存。
- Promise 方式（promiseApi）：适合一次性调用或实时搜索（只保留最新），内置取消。

#### 模块导入

```js
import { adapterApi, promiseApi } from 'kingdee/api';
```

#### 适配器方式（adapterApi）

组件内重复调用同一接口、需要请求缓存和去重的场景（如列表查询、数据详情）。**核心用法**：

1. 先创建适配器实例并绑定回调；
2. 再通过 update 传入请求配置发起请求，无需使用时手动断开实例。

```js
const adapter = adapterApi.doGet(({ data, error }) => {
  if (error) {
    // 处理错误
    return;
  }
  // 使用 data
});

adapter.update({
  endpointConfig: { isv: 'kd', app: 'demo', source: 'search', version: 'v1' },
  params: { q: 'keyword' }, // GET → 查询串；非 GET → JSON body
  headers: { 'X-Custom': 'value' }, // 自定义请求头
});

// 不再需要时断开
adapter.disconnect();
```

**行为特点**

- 请求去重：相同 `requestKey` 的请求不会重复入队。
- 最新请求优先：在发起新的 `fetch` 前，会自动中止上一个进行中的 `fetch`（内部 `AbortController`），但不对外暴露取消 API。
- 内置缓存：实例内默认缓存 5 分钟，重复请求直接返回缓存数据；
- 无需手动处理取消，底层自动管理。

#### Promise 方式（promiseApi）

接口一次性调用、需要手动取消请求的场景（如实时搜索、弹窗内单次查询）。

**核心用法**：直接传入配置发起请求，返回带 `cancel` 方法的 `Promise` 实例，支持任意时刻取消请求，缓存机制对该方式不生效。

```js
const p = promiseApi.doGetPromise({
  endpointConfig: { isv: 'kd', app: 'demo', source: 'search', version: 'v1' },
  params: { q: 'keyword' },
});

p.then(({ data }) => {
  // 使用数据
}).catch((err) => {
  if (err?.status === 'CANCELED') return; // 忽略取消错误
  // 处理其他错误
});

// 任意时刻取消（链式返回的 Promise 也会继承 cancel）
p.cancel();
```

**取消行为**

- `cancel()` 会调用内部 `AbortController.abort()` 并 `adapter.disconnect()`。
- 若 Promise 尚未决议，会立即以 `{ message: 'Request canceled', status: 'CANCELED' }` 拒绝。
- 由于每次调用都会新建适配器实例并在完成后断开，缓存对 Promise 方式不生效。

**实时搜索只保留最新**

```js
let last = null;

function onInput(term) {
  // 取消上一条（如果存在）
  if (last) last.cancel();

  const p = promiseApi.doGetPromise({
    endpointConfig: { isv: 'kd', app: 'demo', source: 'search', version: 'v1' },
    params: { q: term },
  });

  last = p;

  p.then(({ data }) => {
    // 渲染搜索结果
  }).catch((err) => {
    if (err?.status === 'CANCELED') return;
    // 处理其他错误
  });
}
```

#### 通用配置说明

- `endpointConfig`：可为字符串或对象，内部自动拼接 `endpoint`

  - 字符串：直接用作 `endpoint`（例如：`'/api/search'`）。
  - 对象：

    - `endpointConfig.isv`: ISV 标识
    - `endpointConfig.app`: 应用名称
    - `endpointConfig.source`: 数据源
    - `endpointConfig.version`: API 版本（默认 v1）
    - `endpointConfig.sourceId`: 可选的源 ID
    - `endpointConfig.subSource`: 可选的子源
    - `endpointConfig.action`: 可选的操作

- `params`：请求参数

  - `GET`：转为查询字符串附加到 URL
  - 非 `GET`：作为 JSON body 发送

- `headers`：与默认头合并（包含 `Content-Type: application/json` 与 `access_token`）。

#### 回调与错误模型

- 适配器回调：`({ data, error })`

  - 成功：`data` 为响应体，`error` 为 `null`
  - 失败：`data: null`，`error: { message, status, ... }`

    - 认证失败：`status: 'AUTH_FAILED'`
    - 网络或非 2xx：`status: 'NETWORK_ERROR'`（或 HTTP 文本）

- Promise 方式：

  - 成功：`resolve({ data, error: null })`
  - 失败：`reject({ message, status, ... })`
  - 取消：`reject({ message: 'Request canceled', status: 'CANCELED' })`

#### 选择建议

- 需要复用实例与缓存 → 使用适配器方式。
- 需要“只保留最新请求”、方便取消 → 使用 Promise 方式。

#### API 一览

- `adapterApi`

  - `doGet(fn)`, `doPost(fn)`, `doDelete(fn)`, `doPut(fn)`, `doPatch(fn)` → 返回 `Adapter` 实例
  - `Adapter` 主要方法：`connect()`, `update(config)`, `disconnect()`

- `promiseApi`

  - `doGetPromise(config)`, `doPostPromise(config)`, `doDeletePromise(config)`, `doPutPromise(config)`, `doPatchPromise(config)` → 返回带 `cancel()` 的 Promise

### OpenAPI Adapter 模块

`openApiAdapter` 是专门适配 OpenAPI 规范的请求模块，封装了 OpenAPI 认证、请求发送的底层逻辑，是「KWC」组件对接 OpenAPI 接口的标准方式，核心包含认证初始化、请求发送、认证状态检查三个能力。

```js
import { openApiAdapter } from 'kingdee/openApiAdapter';

// 初始化认证
openApiAdapter.initializeAuth({
  endpoint: '', // 认证地址
  method: '', // 请求方法
  headers: '', // 请求头
  body: {}, // 请求体
  params: {}, // 查询参数
});

// 发送 OpenAPI 请求
const fetchData = openApiAdapter.doFetch({
  endpointConfig: {
    isv: 'kd',
    app: 'myapp',
    form: 'myform',
    serviceName: 'myservice',
    version: 'v2',
  },
  params: { query: 'test' },
});

fetchData.then((result) => {
  console.log('OpenAPI 请求结果:', result);
});

// 检查认证状态
if (openApiAdapter.isAuthenticated()) {
  console.log('已认证');
}
```

### API & openAPI 模块高级用法

#### 使用适配器模式

API 和 OpenAPI 模块都支持适配器模式，可以创建可重用的数据适配器：

```js
    import { KingdeeElement, wire } from '@kdcloudjs/kwc';
    import { openApiAdapter } from '@kdcloudjs/kwc-shared-utils';

    export default class Adapter from KingdeeElement {
        connectedCallback() {
            openApiAdapter.initializeAuth({...})
        }

        // 通过 wire 调用doFetch，后端 Controller 返回的响应在 result 中处理
        @wire (openApiAdapter.doFetch, {
            endpointConfig: {
                isv: '',
                //...
            }
        })
        data(result) {
        }
    }
```

#### 错误处理

```js
try {
  const result = await apiAdapter.doGet(config);
  console.log('成功:', result);
} catch (error) {
  console.error('请求失败:', error.message);
  console.error('状态:', error.status);
}
```

#### 注意事项

1.  **浏览器兼容性**: 该库依赖现代浏览器 API，如 `fetch`、`Promise` 等
2.  **认证管理**: OpenAPI 模块需要正确配置认证信息
3.  **错误处理**: 建议在生产环境中添加适当的错误处理逻辑
4.  **缓存机制**: 资源加载器和 API 适配器都内置了缓存机制，注意缓存策略

---

## 通信与集成

「KWC」框架通过 `messageService` 实现组件间的跨实例通信，支持本地组件通信和跨浏览器页签 /iframe 广播，是组件之间解耦通信的标准方案，内置订阅管理和自动降级机制，无需手动处理通信底层逻辑。

```js
import { messageService } from '@kdcloudjs/kwc-shared-utils';

// 在组件上进行订阅（如组件的 connectedCallback 或者其它组件上的 init）
// component 一般传入 this
const off = messageService.subscribe(component, 'user:login', (payload) => {});

// 发布消息（默认同时本地触发并跨标签广播）
messageService.publish('user:login', { id: 'u001' });

// 仅本地触发
messageService.publish('user:login', { id: 'u001' }, { global: false });

// 在不需要使用时或者组件释放销毁时进行取消订阅
off();

// 整体取消某组件在某事件上的订阅
messageService.unsubscribe(component, 'user:login');
```

### 特性

- 跨端通信：基于 `BroadcastChannel` 实现跨页签 /iframe 通信，不支持的浏览器会自动降级到 `postMessage`；
- 自动清理：以 `WeakMap` 管理组件订阅，组件实例销毁时自动清理无效订阅，避免内存泄漏；
- 错误隔离：单个订阅的回调执行出错，不会影响其他订阅者；
- 命名规范：消息名称建议使用 模块:事件 格式（如 user:login/table:refresh），避免命名冲突。

---

## 注意事项

- 浏览器兼容性：该库依赖现代浏览器 API（ `fetch` / `Promise` / `BroadcastChannel` / `AbortController`），不兼容 IE 浏览器；
- 导入规范：所有模块的导入路径均为 `@kdcloudjs/kwc-shared-utils`，请勿使用自定义别名（如 kingdee/client）；
- 资源管理：`adapterApi` 适配器实例、`messageService` 订阅需在组件销毁时执行 `disconnect()` / `offSubscribe()`，避免内存泄漏；
- 认证管理：`openApiAdapter` 必须先执行 `initializeAuth` 完成认证，才能发起有效请求，建议在组件挂载阶段执行一次；
- 缓存机制：`platformResourceLoader` 自动缓存已加载的资源，`adapterApi` 内置 5 分钟请求缓存，`promiseApi` 无缓存；
- 错误处理：生产环境中需为所有异步操作（资源加载、API 请求）添加错误捕获，忽略 `Promise` 方式中主动取消的 `CANCELED` 错误；
- 跨页签通信：`messageService` 跨页签广播要求多个页签的域名一致，否则会触发浏览器跨域限制。
