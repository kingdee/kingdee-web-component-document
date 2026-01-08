---
toc: content
title: '工具库'
order: '30'
---

# 工具库

## kwc-shared-utils

`@kdcloudjs/kwc-shared-utils` 是一个为 KWC (Kingdee Web Components) 项目提供的共享工具库，包含客户端检测、API 请求、OpenAPI 适配器和平台资源加载等功能模块。

### 安装

```bash
npm install @kdcloudjs/kwc-shared-utils
```

### 模块导入

该库支持 ES Module 和 CommonJS 两种导入方式：

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

### Client 模块 - 客户端环境检测

#### 应用检测 (App Detection)

检测当前运行的应用环境：

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

检测当前浏览器类型：

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

检测设备类型：

```js
if (client.isMobile()) {
  console.log('移动设备');
}

if (client.isPC()) {
  console.log('PC 设备');
}
```

### Platform Resource Loader 模块 - 资源加载器

动态加载外部脚本和样式文件：

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

**特性：**

- 自动缓存已加载的资源，避免重复加载
- 支持 Promise 和回调两种方式
- 自动处理加载错误

### API 模块

API 请求适配器需要搭配后端 Controller 请求方式进行使用。

支持两种调用方式：adapter & promise

支持两种调用方式：

- 适配器方式（adapterApi）：适合在组件内复用实例、享受请求去重与缓存。
- Promise 方式（promiseApi）：适合一次性调用或实时搜索（只保留最新），内置取消。

#### **导入**

```js
import { adapterApi, promiseApi } from 'kingdee/api';
```

#### **适配器方式（adapterApi）**

**用法**

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

- 请求队列与去重：相同 `requestKey` 的请求不会重复入队。
- 最新请求优先：在发起新的 `fetch` 前，会中止上一个进行中的 `fetch`（内部 `AbortController`），但不对外暴露取消 API。
- 适配器实例内带缓存（默认 5 分钟）。

#### **Promise 方式（promiseApi）**

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

#### **配置说明（通用）**

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

#### **回调与错误模型**

- 适配器回调：`({ data, error })`

  - 成功：`data` 为响应体，`error` 为 `null`
  - 失败：`data: null`，`error: { message, status, ... }`

    - 认证失败：`status: 'AUTH_FAILED'`
    - 网络或非 2xx：`status: 'NETWORK_ERROR'`（或 HTTP 文本）

- Promise 方式：

  - 成功：`resolve({ data, error: null })`
  - 失败：`reject({ message, status, ... })`
  - 取消：`reject({ message: 'Request canceled', status: 'CANCELED' })`

#### **选择建议**

- 需要复用实例与缓存 → 使用适配器方式。
- 需要“只保留最新请求”、方便取消 → 使用 Promise 方式。

#### **API 一览**

- `adapterApi`

  - `doGet(fn)`, `doPost(fn)`, `doDelete(fn)`, `doPut(fn)`, `doPatch(fn)` → 返回 `Adapter` 实例
  - `Adapter` 主要方法：`connect()`, `update(config)`, `disconnect()`

- `promiseApi`

  - `doGetPromise(config)`, `doPostPromise(config)`, `doDeletePromise(config)`, `doPutPromise(config)`, `doPatchPromise(config)` → 返回带 `cancel()` 的 Promise

### OpenAPI Adapter 模块

专门用于 OpenAPI 规范的请求：

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

### 组件间消息中心（messageService）

KWC 框架中，提供了 messageService，messageService 可用于组件之间的通信，支持本地与跨页签广播。

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

特性：

- 使用 `BroadcastChannel`（自动降级到 `postMessage`）实现跨标签页/iframe 通信
- 每个组件实例的订阅以 `WeakMap` 管理，自动清理泄漏
- 错误隔离，单个订阅错误不会影响其他订阅者
