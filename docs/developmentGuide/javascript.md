---
toc: content
title: '编写 JavaScript 逻辑'
order: '5'
glossary: ES6 类 | 装饰器
---

# 编写 JavaScript 逻辑

JavaScript 是赋予「KWC」组件交互能力与业务逻辑的核心。

本章将介绍如何在「KWC」组件中组织 JavaScript 代码，实现数据响应、状态管理及与外部资源交互。

## Javascript 完整结构

### 基础结构

每个「KWC」组件都是一个继承自 `KingdeeElement` 的 ES6 类。这是组件 JavaScript 逻辑的起点。如下所示：

```javascript
// myComponent.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class MyComponent extends KingdeeElement {
  // 1. 属性与状态声明区域
  // 2. 生命周期钩子方法
  // 3. 事件处理方法
  // 4. 计算属性（Getter）
  // 5. 公共 API 方法
  // 6. 私有辅助方法
}
```

注意事项：

- 必须继承 `KingdeeElement` 基类
- 必须使用 `export default` 导出类
- 类名通常使用 Pascal Case（首字母大写）

### 核心装饰器

「KWC」提供了多个装饰器来增强组件功能：

```javascript
import {
  KingdeeElement,
  api, // 声明可供父组件调用的公共属性或方法
  track, // 声明响应式状态，其变化会触发视图更新
  wire, // 声明与外部数据源的响应式连接
} from '@kdcloudjs/kwc';
```

**正确的导入方式**：

```javascript
// ✅ 正确：命名导入所需装饰器
import { KingdeeElement, api, track, wire } from '@kdcloudjs/kwc';
```

**错误的导入方式**：

```javascript
// ❌ 错误：不支持默认导入
import「KWC」from '@kdcloudjs/kwc';

// ❌ 错误：不支持通配符导入
import * as「KWC」from '@kdcloudjs/kwc';

// ❌ 错误：不能直接导入未暴露的模块
import { registerTemplate } from '@kdcloudjs/kwc';
```

---

## 响应式状态管理

响应式状态管理是「KWC」框架的核心机制，支撑组件视图与状态的自动联动。框架会自动检测响应式状态的变更，重新计算依赖该状态的计算属性，并仅更新模板中关联该状态的视图部分，实现状态与视图的高效同步。

「KWC」提供了多类核心能力实现响应式管理：通过 `@track` 声明组件私有响应式状态，`@api` 声明可被父组件访问的公共响应式属性与方法，Getter 语法定义基于响应式状态的动态计算属性，`@wire` 实现与外部数据源的响应式连接。

需注意，对于对象或数组，修改其内部属性（如 `obj.name`）不会被自动检测，需要通过赋予全新对象/数组来触发更新。

### 使用 @track 装饰器

`@track` 装饰器用于声明响应式状态。当被 `@track` 修饰的属性发生变化时，组件会自动重新渲染。

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class Counter extends KingdeeElement {
  // 基本类型
  @track count = 0;
  @track isActive = false;

  // 对象类型 - 需要重新赋值
  @track user = { name: '张三', age: 30 };

  increment() {
    this.count++; // ✅ 触发重新渲染
  }

  updateUser() {
    // ✅ 正确：创建新对象
    this.user = { ...this.user, age: 31 };

    // ❌ 错误：直接修改属性不会触发更新
    // this.user.age = 31;
  }
}
```

### 使用 @api 装饰器

`@api` 装饰器用于声明组件的公共属性和方法，使其可以从父组件访问。

**公共属性**：

```javascript
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class UserCard extends KingdeeElement {
  // 基本类型公共属性
  @api userId = '';
  @api userName = '匿名用户';

  // Getter 形式的公共属性（只读）
  @api
  get displayInfo() {
    return `${this.userName} (ID: ${this.userId})`;
  }

  // 带 Setter 的公共属性
  @api
  get score() {
    return this._score || 0;
  }

  set score(value) {
    // 验证和转换逻辑
    this._score = Math.max(0, Math.min(100, Number(value)));
  }
}
```

**公共方法**

```javascript
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class MediaPlayer extends KingdeeElement {
  @api mediaUrl = '';

  // 播放状态（只读）
  @api
  get isPlaying() {
    const player = this.template.querySelector('video');
    return player ? !player.paused : false;
  }

  // 公共方法
  @api
  play() {
    const player = this.template.querySelector('video');
    if (player) player.play();
  }

  @api
  seekTo(timeInSeconds) {
    const player = this.template.querySelector('video');
    if (player) player.currentTime = timeInSeconds;
  }
}
```

### 使用 @wire 数据连接

`@wire` 装饰器用于声明与外部数据源的响应式连接，通常用于与 AICB（「金蝶 AI 苍穹」平台集成总线）服务交互。

```javascript
import { KingdeeElement, wire, api } from '@kdcloudjs/kwc';
import { getRecord } from '@kdcloudjs/kwc/data';

export default class AccountDetails extends KingdeeElement {
  @api recordId;

  // 使用 @wire 连接数据服务
  @wire(getRecord, {
    // getRecord 是从 @kdcloudjs/kwc/data 导入的服务函数
    recordId: '$recordId', // ‘$‘ 前缀表示动态绑定到响应式属性 recordId
    fields: ['Name', 'Industry', 'Phone'],
  })
  account;

  // 处理加载状态
  get isLoading() {
    return this.account && this.account.loading;
  }

  get hasError() {
    return this.account && this.account.error;
  }
}
```

### 计算属性（Getter）

计算属性基于响应式状态动态计算值，当依赖的状态变化时自动重新计算。

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class ShoppingCart extends KingdeeElement {
  @track items = [
    { name: '商品A', price: 100, quantity: 2 },
    { name: '商品B', price: 200, quantity: 1 },
  ];

  @track discountRate = 0.1;

  // 计算总数量
  get totalQuantity() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // 计算总金额
  get totalAmount() {
    const subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return subtotal * (1 - this.discountRate);
  }

  // 带条件的计算属性
  get hasItems() {
    return this.items.length > 0;
  }
}
```

---

## 生命周期钩子

「KWC」组件提供了一系列生命周期钩子，让你在组件的不同阶段执行代码。

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class LifecycleExample extends KingdeeElement {
  @track data = null;

  // 1. 构造函数
  constructor() {
    super(); // 必须首先调用
    this._internalId = this.generateId();
  }

  // 2. 组件插入 DOM
  connectedCallback() {
    super.connectedCallback();
    this.loadData();
    this.setupEventListeners();
  }

  // 3. 组件渲染完成
  renderedCallback() {
    if (!this._initialized && this.data) {
      this.initializeUI();
      this._initialized = true;
    }
  }

  // 4. 组件从 DOM 移除
  disconnectedCallback() {
    this.cleanupEventListeners();
  }

  // 5. 错误处理
  errorCallback(error, stack) {
    console.error('组件错误:', error);
    this.showErrorUI(error.message);
  }

  // 辅助方法
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  loadData() {
    // 加载数据逻辑
  }

  setupEventListeners() {
    // 设置事件监听器
  }

  cleanupEventListeners() {
    // 清理事件监听器
  }

  initializeUI() {
    // 初始化 UI
  }

  showErrorUI(message) {
    // 显示错误界面
  }
}
```

---

## 代码组织与模块化

### 组件内模块化

对于复杂组件，可以将逻辑拆分为多个模块文件，保持代码清晰。

```
    ───myComponent
        ├──myComponent.html
        ├── myComponent.js      # 主入口文件
        ├── myComponent.css
        ├── dataService.js      # 数据服务模块
        ├── validationUtils.js  # 验证工具模块
        └── constants.js        # 常量定义模块
```

**数据服务模块示例**：

```javascript
// 命名导出
export async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('获取用户失败');
  return response.json();
}

export async function updateUser(userId, userData) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
}

// 默认导出
export default { fetchUser, updateUser };
```

**在主组件中导入模块**：

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import { fetchUser, updateUser } from './dataService.js';
import validationUtils from './validationUtils.js';

export default class MyComponent extends KingdeeElement {
  @track userData = null;

  async loadUser(userId) {
    try {
      this.userData = await fetchUser(userId);
    } catch (error) {
      console.error('加载用户失败:', error);
    }
  }
}
```

---

## 共享 JavaScript 代码

在「KWC」中，组件之间共享代码需要遵循特定的模式和规则。主要支持两种共享方式：组件内共享和跨组件共享。

### 方式一：组件内共享

在组件的文件夹中创建 JavaScript 文件，在组件内部使用相对路径导入代码。

```
    ───myComponent
        ├──myComponent.html
        ├──myComponent.js
        ├──myComponent.js-meta.xml
        ├──myFunction.js
        └──utils.js
```

```js
// myComponent.js
import { getAmount, calculateCost } from './utils';
import myFunction from './myFunction';
```

### 方式二：跨组件共享

创建一个 API 模块组件库，其它组件可以使用 `x/componentName`语法导入这些代码：

```
kwc
  └───myComponent
    ├──myComponent.html
    ├──myComponent.js
    ├──myComponent.js-meta.xml
    ├──myFunction.js
    └──utils.js
```

```js
// myComponent.js
import { getTermOptions, calculateMonthlyPayment } from 'c/mortgageUtils';
```

:::warning
在 `import`语句中，请指定要导入的文件夹而不是文件。
:::

### 导出默认函数和变量

在 JavaScript ES6 模块中导出默认函数和变量的话，可以使用 `export default`：

```js
export default MyComponent;
// 或者
export { MyComponent as default };
```

### 导出命名函数和变量

```js
const getTempOptions = () => {
  return [];
};

const name = 'Hello';

export { getTempOptions, name };
```

### 入口文件解析

「KWC」框架仅会将组件文件夹中的同名 JavaScript 文件或者 css 文件作为入口。如 `x/moduleName`中，入口文件是 `moduleName.js`，当该文件不存在时，会寻找 `moduleName.css`，如果两者都不存在的话，那么编译将会失败。

### 多文件导出

在一个组件文件夹中可能会存在多个 JavaScript 文件，你可以从不同文件导出函数以供外部调用。<br>
对于上述场景，可以在需要导出的内容的文件中，先 `export` 到外部，再从入口文件利用 `export from` 进行导出。

```
├──utils
    ├── utils.js
    ├── moreUtils.js
```

```js
// moreUtils.js
const functionOne = () => {};
const functionTwo = (arg1) => {};

export { functionOne, functionTwo };
```

```js
// utils.js
export { functionOne, functionTwo } from './moreUtils';

// 或者可以使用通配符导出所有moreUtils中暴露的模块
export * from './moreUtils';
```

---

## 使用第三方库

「KWC」框架中可以导入第三方 JavaScript 库来增强组件功能。例如，可以使用 ECharts 等图表库来降低代码复杂度。

### 加载第三方库

要引入第三方库，我们需要使用 `@kdcloudjs/kwc-shared-utils`中提供的 `loadScript`方法。

```js
import { loadScript } from '@kdcloudjs/kwc-shared-utils'

loadScript('第三方库地址').then(() => { ... });
```

### 手动操作 DOM

如果你的第三方库需要直接操作 DOM（例如调用 `appendChild()` 等方法），则需要在模板中添加 `kwc:dom="manual"` 指令。这个指令会告诉「KWC」引擎，组件的所有者会手动操作 DOM。

```html
<template>
  <div kwc:dom="manual"></div>
</template>
```

### 第三方集成示例

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';
import { loadScript } from '@kdcloudjs/kwc-shared-utils';

export default class ChartComponent extends KingdeeElement {
  @track chartData = [];

  async connectedCallback() {
    super.connectedCallback();

    // 加载 ECharts 库
    try {
      await loadScript(
        'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js',
      );
      this.initializeChart();
    } catch (error) {
      console.error('加载图表库失败:', error);
    }
  }

  initializeChart() {
    if (!window.echarts) return;

    const chart = window.echarts.init(
      this.template.querySelector('.chart-container'),
    );

    chart.setOption({
      xAxis: { data: ['一月', '二月', '三月'] },
      yAxis: {},
      series: [{ data: this.chartData, type: 'bar' }],
    });
  }
}
```
