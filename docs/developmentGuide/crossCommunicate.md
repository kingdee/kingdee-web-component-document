---
toc: content
title: '跨级通信'
order: '10'
glossary: bubbles | messageService | composed | 事件冒泡 | 消息中心 | DOM 树
---

# 跨级通信

跨级通信指组件间跨越直接父子关系的通信方式。在「KWC」中，主要通过事件冒泡配置（bubbles）和消息中心（messageService）两种机制实现。

本章将详细介绍两种机制的使用场景与方法。

## 事件冒泡（bubbles 和 composed）

### 属性说明

通过配置自定义事件的 `bubbles` 和 `composed` 属性，可以控制事件在 DOM 树中的传播行为，实现跨层级通信。

- `Event.bubbles`：布尔值，决定事件是否沿 DOM 树向上冒泡，默认为 `false` ；
- `Event.composed`：布尔值，决定事件能否穿越 Shadow DOM 边界，默认为 `false` 。

**使用说明**

- `bubbles` 和 `composed` 仅作用于子传父的事件传递（基于 `CustomEvent` 自定义事件），与父传子（属性绑定）无关；
- 二者的核心价值是让子传父突破基础层级限制，实现跨级通信（也叫跨组件层级 / 跨 Shadow DOM 通信），本质是增强子组件事件的传递范围，不会改变子传父的基础通信方向。

:::info
如需获取有关事件的信息，请使用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event" target="_blank"> Event </a> Web API 的这些属性和方法。
:::

### 事件传播与获取

事件传播过程中，可通过以下属性和方法获取相关信息：

- `Event.target`：触发事件的 DOM 节点。当事件跨越 <a href="https://developer.salesforce.com/docs/platform/lwc/guide/create-dom.html" target="_blank"> Shadow DOM </a> 边界时，target 值会调整为与监听器同作用域的元素，保持组件封装性；
  - 示例： `<my-button>` 上的点击监听器始终接收 `my-button` 作为目标，即使点击发生在 `button` 元素上
- `Event.currentTarget`：当事件在 DOM 中传播时，此属性始终指向附加了事件处理程序的元素；
- `Event.composedPath()`：事件遍历 DOM 时，监听器会被调用的事件目标数组。

```html
<!-- myButton.html -->
<template>
  <button>{label}</button>
</template>
```

### 配置组合和使用场景

在「KWC」组件通信中，`bubbles` 和 `composed` 通常配合使用，对应不同的子传父场景，核心组合如下：

| 配置组合                                | 通信场景                         | 适用场景                               |
| :-------------------------------------- | :------------------------------- | :------------------------------------- |
| bubbles: false, composed: false（默认） | 仅子组件内部可监听，无法向外传递 | 组件内部私有事件，无需外部组件感知     |
| bubbles: true, composed: false          | 仅 Shadow DOM 内部跨级冒泡       | 组件内部包含多层子元素，需内部跨级通信 |
| bubbles: true, composed: true（常用）   | 突破 Shadow DOM，外部跨级子传父  | 子组件需向外部多层祖先组件传递数       |

### 静态组合

以下通过一个简单的三层组件嵌套，演示不同配置组合的事件传播效果，该示例未使用插槽，为基础的静态组件组合结构，可直观体现事件的传播范围。

以下示例中，组件层级关系为：`c-app`（顶层）→ `c-parent`（中间层）→ `c-child`（底层，触发事件），各组件均监听 buttonclick 事件：

```html
<c-app onbuttonclick="{handleButtonClick}"></c-app>
```

应用程序中的父组件处理按钮点击事件。

```html
<!-- app.html -->
<template>
  <h2>My app</h2>
  <c-parent onbuttonclick="{handleButtonClick}"></c-parent>
</template>
```

父组件包含一个包装器，包装器中包含一个子组件，两者都监听按钮点击事件。

```html
<!-- parent.html -->
<template>
  <h3>I'm a parent component</h3>
  <div class="wrapper" onbuttonclick="{handleButtonClick}">
    <c-child onbuttonclick="{handleButtonClick}"></c-child>
  </div>
</template>
```

子组件包含带有 `onclick` 处理程序的按钮。

```html
<!-- child.html -->
<template>
  <h3>I'm a child component</h3>
  <button onclick="{handleClick}">click me</button>
</template>
```

```js
// child.js
handleClick() {
    const buttonclicked = new CustomEvent('buttonclick', {
        //event options
    });
    this.dispatchEvent(buttonclicked);
}
```

此示例在按钮被点击时，从 `c-child` 元素触发 `buttonclick` 事件。以下元素已附加自定义事件的事件监听器：

- `body`
- `c-app` host
- `c-parent`
- `div.wrapper`
- `c-child` host

这个三层嵌套组件展开的完整 DOM 树，如下所示：

```html
<body>
  <!-- Listening for buttonclick event -->
  <c-app>
    <!-- Listening for buttonclick event -->
    #shadow-root |
    <h2>My app</h2>
    |
    <c-parent>
      |
      <!-- Listening for buttonclick event -->
      | #shadow-root | |
      <h3>I'm a parent component</h3>
      | |
      <div class="wrapper">
        | |
        <!-- Listening for buttonclick event -->
        | |
        <c-child>
          | | #shadow-root | | |
          <!-- Listening for buttonclick event -->
          | | |
          <h3>I'm a child component</h3>
          | | | <button>click me</button> | |
        </c-child>
        | |
      </div>
      |
    </c-parent>
  </c-app>
</body>
```

### 组合一：仅子组件内部监听

该配置组合为 `bubbles: false`, `composed: false`，为默认配置。事件不会冒泡，也无法穿越 Shadow DOM 边界。这意味着事件仅在派发该事件的组件实例本身（即 `c-child` 的宿主元素）的上下文中可被捕获，其 Shadow DOM 内部的元素、外部的父组件以及 DOM 树中的其他祖先均无法监听到此事件。这是封装性最强的配置。

```html
<body>
  <c-app>
    #shadow-root |
    <c-parent>
      | #shadow-root | |
      <div class="wrapper">
        | |
        <c-child>
          | |
          <!-- Event bubbles up here -->
          | | #shadow-root | | |
          <h3>I'm a child component</h3>
          | | | <button>click me</button> | |
        </c-child>
        | |
      </div>
      |
    </c-parent>
  </c-app>
</body>
```

**事件属性返回值**
`c-child` 的事件处理程序中，返回以下值：

- `event.currentTarget` = `c-child`
- `event.target` = `c-child`

### 组合二：Shadow DOM 内部跨级冒泡

该配置组合为 `bubbles: true`, `composed: false`。事件会沿 DOM 树向上冒泡，但传播至 Shadow DOM 边界时会停止，无法跨越边界向外传播。因此， `c-child` 和 `div.wrapper` 都可以响应该事件。

```html
<body>
  <c-app>
    #shadow-root |
    <c-parent>
      | #shadow-root | |
      <div class="wrapper">
        | |
        <!-- Event bubbles up here -->
        | |
        <c-child>
          | |
          <!-- Event bubbles up here -->
          | | #shadow-root | | |
          <h3>I'm a child component</h3>
          | | | <button>click me</button> | |
        </c-child>
        | |
      </div>
      |
    </c-parent>
  </c-app>
</body>
```

**事件属性返回值**

- `c-child` 操作

  - `event.currentTarget` = `c-child`
  - `event.target` = `c-child`

- `div.childWrapper` 操作
  - `event.currentTarget` = `div.childWrapper`
  - `event.target` = `c-child`

此配置有两种使用场景：

**第一种：创建内部活动**

需在组件模板内部实现事件冒泡时，可在模板内指定元素上分发事件，该事件仅会向上冒泡至模板内的祖先元素，到达 Shadow DOM 边界后停止，外部包含组件无法监听。

    // myComponent.js
    this.template.querySelector("div").dispatchEvent(new CustomEvent("notify", { bubbles: true }));

```html
<!-- container.html -->
<template>
  <!-- handleNotify doesn’t execute -->
  <c-my-component onnotify="{handleNotify}"></c-my-component>
</template>
```

**第二种：向组件的祖父组件发送事件**

当组件通过插槽被嵌入父组件，且需要将事件冒泡至包含插槽的祖父组件时，可在组件宿主元素上分发事件，该事件仅在祖父组件的模板内可见并可被处理。

在下面的示例代码中，组件层级结构（从子组件到祖父组件）为 `c-contact-list-item-bubbling` -> `kd-layout-item` -> `c-event-bubbling`。`c-contact-list-item-bubbling` 组件会分发一个名为 `contactselect` 自定义事件，其中 `bubbles: true` 。事件监听器 `oncontactselect` 位于其父级 `kd-layout-item` 上，该事件在其祖父级 `c-event-bubbling` 中处理。

```html
<!-- eventBubbling.html -->
<template>
  <kd-card title="EventBubbling" icon-name="standard:logging">
    <template kwc:if="{contacts.data}">
      <kd-layout class="kdds-var-m-around_medium">
        <!-- c-contact-list-item-bubbling emits a bubbling event so a single listener on a containing element works -->
        <kd-layout-item class="wide" oncontactselect="{handleContactSelect}">
          <template for:each="{contacts.data}" for:item="contact">
            <c-contact-list-item-bubbling
              class="kdds-show slds-is-relative"
              key="{contact.Id}"
              contact="{contact}"
            ></c-contact-list-item-bubbling>
          </template>
        </kd-layout-item>
      </kd-layout>
    </template>
  </kd-card>
</template>
```

```js
// contactListItemBubbling.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ContactListItemBubbling extends KingdeeElement {
  @api contact;

  handleSelect(event) {
    // Prevent default behavior of anchor tag click which is to navigate to the href url
    event.preventDefault();
    const selectEvent = new CustomEvent('contactselect', {
      bubbles: true,
    });
    this.dispatchEvent(selectEvent);
  }
}
```

### 组合三：外部跨级子传父

该配置组合为 `bubbles: true`, `composed: true`，事件会沿 DOM 树向上冒泡，可直接跨越 Shadow DOM 边界，持续传播至文档根目录，实现外部多层祖先组件的跨级监听。

:::info
该配置下，事件类型将成为组件公共 API 的一部分，强制使用该组件的所有祖先组件在其 API 中兼容该事件。
:::

:::warning
由于此配置会将事件一直冒泡到文档根目录，易引发事件名称冲突，导致错误的事件监听器被触发，开发时需做好事件命名规范。
:::

如果使用此配置，请在事件类型前加上命名空间，例如 `mydomain__myevent` 。否则，HTML 中的事件监听器名称会显得冗余，例如 `onmydomain__myevent` 。

```html
<body>
  <!-- Event bubbles up here -->
  <c-app>
    <!-- Event bubbles up here -->
    #shadow-root |
    <c-parent>
      |
      <!-- Event bubbles up here -->
      | #shadow-root | |
      <div class="wrapper">
        | |
        <!-- Event bubbles up here -->
        | |
        <c-child>
          | |
          <!-- Event bubbles up here -->
          | | #shadow-root | | |
          <h3>I'm a child component</h3>
          | | | <button>click me</button> | |
        </c-child>
        | |
      </div>
      |
    </c-parent>
  </c-app>
</body>
```

---

## 组件间消息中心（messageService）

「KWC」框架中，提供了 messageService，messageService 可用于组件之间的通信，支持本地与跨页签广播。

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
