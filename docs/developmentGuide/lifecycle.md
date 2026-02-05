---
toc: content
title: '组件生命周期'
order: '12'
glossary: 生命周期 | 钩子 | HTML Element | DOM 树
---

# 组件生命周期

「KWC」提供完整的生命周期钩子，便于在组件各阶段执行特定逻辑。

本章将详细介绍各钩子的作用与使用时机。

## 生命周期流程图

组件完整生命周期的钩子执行顺序（从创建到销毁）：
`constructor()`（初始化实例） → 组件绑定属性 → `connectedCallback()`（挂载 DOM） → `render()`（渲染 UI） → `renderCallback()`（确认渲染完成） → （状态变化触发重渲染：标记脏状态 → `render()`→`renderCallback()`） → （异常触发：`errorCallback()`） → `disconnectedCallback()`（销毁解绑）

```plaintext
组件生命周期流程图：
├── 构造函数 (constructor)
├── 连接至DOM (connectedCallback)
├── 首次渲染 (render)
├── 渲染完成 (renderedCallback)
│   ├── 状态变更路径
│   │   ├── 状态变更事件
│   │   ├── 检查脏状态
│   │   │   ├── 是：触发重新渲染 → 回溯到 render 步骤
│   │   │   └── 否：保持当前状态
│   │   └── 组件移除阶段
│   │       ├── 从DOM移除 (disconnectedCallback)
│   │       └── 组件销毁
│   └── 错误处理路径
│       ├── 渲染期间发生错误
│       └── 错误处理 (errorCallback)
```

## 初始化阶段（constructor）

初始化阶段是组件生命周期的起点，核心是构造函数`constructor()`钩子，负责创建组件实例、建立基础原型链，此阶段尚未完成 DOM 挂载和属性传递，仅能执行最基础的实例初始化操作。<br>

`constructor()` 构造器函数会在创建组件实例时自动触发。此时，组件的属性可能尚未设置完毕，不应在此阶段访问或依赖它们。在 `connectedCallback()` 被调用时，可以安全地访问组件接收到的属性。

### 构造函数的规范

- 第一条语句必须是不带参数的 `super()` 调用：该调用会建立组件与 HTML Element 的原型链，初始化 `this` 指向，修改 `this` 之前必须先执行 `super()`。
- 禁止在构造函数体中使用 `return` 语句。
- 禁止使用 `document.write()` 或 `document.open()` 方法，避免破坏文档流。
- 禁止检查元素的属性、子元素及公共属性（此时相关资源尚未就绪）。

### 示例

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class UserProfile extends KingdeeElement {
  constructor() {
    // 必须首先调用父类构造函数
    super();

    // 初始化内部状态
    this._internalState = {
      loading: false,
      error: null,
      data: null,
    };

    // 绑定方法上下文（如果使用非箭头函数）
    this.handleDataLoad = this.handleDataLoad.bind(this);

    // 生成唯一ID
    this._instanceId = `user-profile-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }
}
```

---

## 挂载阶段（connectedCallback）

挂载阶段是组件接入页面 DOM 的核心阶段，将初始化完成的组件实例插入 DOM 树并建立关联；此阶段组件可正常访问宿主元素、执行业务初始化操作，核心挂载钩子为 `connectedCallback()`，配套提供 `disconnectedCallback()` 作为卸载清理钩子，这两个构造函数均遵循父组件到子组件的流程。

当需要访问宿主元素时，使用 `this`。要访问模板的话使用 `this.template`。要检查组件是否连接到 DOM，可以使用 `this.isConnected`.

该挂载钩子`connectedCallback()`是组件挂载的核心，也是进入渲染流程前的关键钩子。

- 通过 `this` 访问组件宿主元素；
- 通过 `this.template` 访问组件模板；
- 通过 `this.isConnected` 判断组件是否已连接 DOM。

在 `connectedCallback()`函数中，我们可以：

- 与当前文档或容器建立通信
- 执行初始化任务，例如获取数据，设置缓存或者监听事件
- 订阅和取消订阅
- 导入第三方组件

:::info
当组件被移除 DOM 后再次插入到另一个位置时，该钩子会被多次触发；若需让钩子内代码仅执行一次，需通过自定义逻辑（如添加标记位）进行控制。
:::

### 示例

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class DataTable extends KingdeeElement {
  connectedCallback() {
    super.connectedCallback(); // 调用父类实现

    // 加载初始数据
    this.loadInitialData();

    // 设置窗口大小变化监听
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);

    // 订阅全局消息
    this.unsubscribe = messageService.subscribe(
      this,
      'data:refresh',
      this.handleDataRefresh,
    );

    // 初始化第三方图表库
    if (window.ECharts) {
      this.initializeChart();
    }
  }

  // 清理函数
  disconnectedCallback() {
    super.disconnectedCallback();

    // 移除事件监听
    window.removeEventListener('resize', this.handleResize);

    // 取消订阅
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    // 清理图表实例
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }
}
```

---

## 渲染阶段（render + renderCallback）

渲染阶段的核心是将组件的 HTML 模板结构渲染到 DOM 中，并确认渲染完成，此阶段是组件 UI 展示的关键，同时需处理重渲染逻辑。

### 渲染执行`render()`

`render()` 是组件 UI 渲染的核心方法，当组件的响应式状态（被 `@track` 装饰）发生变化时，框架会自动安排一次重新渲染，届时会调用 `render()` 方法来获取最新的模板。

**示例**：

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';
import mainTemplate from './mainTemplate.html';
import loadingTemplate from './loadingTemplate.html';
import errorTemplate from './errorTemplate.html';

export default class DynamicView extends KingdeeElement {
  // 响应式状态
  loading = false;
  error = null;
  data = null;

  // 动态渲染不同模板
  render() {
    if (this.loading) {
      return loadingTemplate;
    }

    if (this.error) {
      return errorTemplate;
    }

    if (this.data) {
      return mainTemplate;
    }

    // 默认返回空模板
    return null;
  }

  // 模拟数据加载
  async loadData() {
    this.loading = true;

    try {
      const response = await fetch('/api/data');
      this.data = await response.json();
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }
}
```

### 渲染确认`renderCallback()`

`renderCallback()` 会在组件完成渲染（ UI 已渲染到 DOM 中）后自动执行，核心作用是确认渲染结果、执行渲染后的后续操作，其执行顺序遵循子组件 → 父组件的流程（子组件渲染完成后，再通知父组件）。

**示例**：

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class AutoFocusInput extends KingdeeElement {
  _hasRendered = false;

  renderedCallback() {
    // 确保只执行一次
    if (this._hasRendered) {
      return;
    }

    // 获取输入框元素并设置焦点
    const input = this.template.querySelector('input');
    if (input) {
      input.focus();
      input.select();
    }

    // 初始化第三方组件（如日期选择器）
    if (window.flatpickr) {
      this.datePicker = window.flatpickr(
        this.template.querySelector('.date-input'),
        { dateFormat: 'Y-m-d' },
      );
    }

    this._hasRendered = true;
  }

  disconnectedCallback() {
    // 清理第三方组件
    if (this.datePicker) {
      this.datePicker.destroy();
    }
  }
}
```

**注意事项**：

- 不要在此钩子函数中更新适配器配置对象的属性；
- 不要在此钩子函数中更新公共属性；
- 组件在整个生命周期中可能会被多次渲染，若需在此钩子中执行一次性操作（如初始化第三方插件），可通过 `hasRendered` 等自定义属性跟踪钩子的执行状态，避免重复执行。

### 组件重新渲染

组件成功连接 DOM 并完成首次渲染后，其内部状态的任何更改都会触发重渲染，流程如下：

1. 组件状态发生变化，被标记为“脏”状态（表示需要更新 UI）；
2. 组件重新渲染的微任务被加入浏览器任务队列，等待执行；
3. 任务执行时，调用 `render()` 重新渲染 UI，渲染完成后触发 `renderCallback()`。

---

## 错误处理（errorCallback）

错误处理阶段是组件生命周期的“容错机制”，核心是捕获组件树中的异常，避免错误扩散导致整个组件崩溃，同时提供友好的降级体验。<br>
通过 `errorCallback`钩子创建一个错误边界组件，该组件会捕获其组件树中所有子组件的异常，类似于 JavaScript 中的 `catch{}` 代码块。`errorCallback()` 会捕获生命周期钩子或 HTML 模板中声明的事件处理程序中发生的错误。你可以编写错误边界组件的代码，使其记录堆栈信息，并渲染一个替代视图，告知用户发生异常及下一步操作。

### 示例

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ErrorBoundary extends KingdeeElement {
  error = null;
  errorInfo = null;

  errorCallback(error, stack) {
    // 记录错误信息
    this.error = error;
    this.errorInfo = stack;

    // 上报错误到监控系统
    this.reportError(error, stack);

    // 更新状态显示错误界面
    this.showError = true;
  }

  // 错误报告
  reportError(error, stack) {
    console.error('组件错误:', error, stack);

    // 在实际应用中，这里会上报到错误监控服务
    // fetch('/api/error-log', {
    //   method: 'POST',
    //   body: JSON.stringify({ error, stack })
    // });
  }

  // 重置错误状态
  resetError() {
    this.error = null;
    this.errorInfo = null;
    this.showError = false;
  }

  render() {
    if (this.showError) {
      return `
        <div class="error-boundary">
          <h3>组件发生错误</h3>
          <p>${this.error?.message || '未知错误'}</p>
          <button onclick="{resetError}">重试</button>
          <details>
            <summary>错误详情</summary>
            <pre>${this.errorInfo || '无堆栈信息'}</pre>
          </details>
        </div>
      `;
    }

    // 正常渲染子内容
    return '<slot></slot>';
  }
}
```

错误边界使用示例：

```html
<!-- 父组件中使用错误边界 -->
<template>
  <error-boundary>
    <x-unstable-component></x-unstable-component>
  </error-boundary>
</template>
```

---

## 销毁阶段（disconnectedCallback）

销毁阶段是组件生命周期的终点，核心是将组件从 DOM 树中移除、清理挂载阶段创建的资源，避免内存泄漏，确保组件彻底“退出”运行。<br>
核心钩子为`disconnectedCallback()` ，与 `connectedCallback()` 的功能相反，会在组件从 DOM 树中移除（或被隐藏）时自动触发，执行顺序遵循父组件 → 子组件的流程。<br>
此阶段核心作用为专门清理 `connectedCallback()` 中创建的资源，包括移除事件监听器、清空缓存、取消消息订阅等，避免内存泄漏。

### 示例

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class RealTimeComponent extends KingdeeElement {
  // 内部状态
  _timers = [];
  _listeners = [];
  _socket = null;

  connectedCallback() {
    super.connectedCallback();

    // 设置定时器
    this._timers.push(setInterval(() => this.updateTime(), 1000));

    // 设置自定义事件监听
    const handleCustomEvent = (e) => this.handleEvent(e);
    document.addEventListener('custom-event', handleCustomEvent);
    this._listeners.push({
      target: document,
      type: 'custom-event',
      handler: handleCustomEvent,
    });

    // 连接 WebSocket
    this.connectWebSocket();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // 清理所有定时器
    this._timers.forEach((timer) => clearInterval(timer));
    this._timers = [];

    // 移除所有事件监听
    this._listeners.forEach(({ target, type, handler }) => {
      target.removeEventListener(type, handler);
    });
    this._listeners = [];

    // 断开 WebSocket
    if (this._socket) {
      this._socket.close();
      this._socket = null;
    }
  }
}
```
