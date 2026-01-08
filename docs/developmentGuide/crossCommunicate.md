---
toc: content
title: '跨级通信'
order: '9'
---

## 事件冒泡（bubbles 和 composed）

创建事件时，使用事件上的两个属性 `bubbles` 和 `composed` 来定义事件传播行为。

- `Event.bubbles` 一个布尔值，指示事件是否会向上冒泡穿过 DOM。默认为 `false` 。
- `Event.composed`

&#x20;一个布尔值，指示事件是否可以穿过 shadow 边界。默认为 `false` 。

要获取有关事件的信息，请使用 [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) Web API 的这些属性和方法。

- `Event.target` 触发事件的元素。 每个组件的内部 DOM 都被封装在一个[影子 DOM](https://developer.salesforce.com/docs/platform/lwc/guide/create-dom.html) 中。影子边界是常规 DOM（也称为浅色 DOM）和影子 DOM 之间的分界线。如果事件冒泡并跨越影子边界，则 `Event.target` 的值会改变，以指向与监听器处于同一作用域的元素。事件重定向可以保持组件的封装性，并防止暴露组件的内部结构。 例如， `<my-button>` 上的点击监听器始终接收 `my-button` 作为目标，即使点击发生在 `button` 元素上。

```html
<!-- myButton.html -->
<template>
  <button>{label}</button>
</template>
```

- `Event.currentTarget` 当事件在 DOM 中传播时，此属性始终指向附加了事件处理程序的元素。
- `Event.composedPath()` 事件遍历 DOM 时，监听器会被调用的事件目标数组。

**重要说明**

1.  `bubbles` 和 `composed` 仅作用于「子传父」的事件传递（基于 CustomEvent 自定义事件），与「父传子」（属性绑定）无关；
2.  二者的核心价值是让「子传父」突破基础层级限制，实现「跨级通信」（也叫跨组件层级 / 跨 Shadow DOM 通信），本质是增强了子组件事件的传递范围，而非改变「子传父」的通信方向。

在 KWC 组件通信中，`bubbles` 和 `composed` 通常配合使用，对应不同的子传父场景，核心组合如下：

| 配置组合                                | 通信场景                         | 适用场景                               |
| :-------------------------------------- | :------------------------------- | :------------------------------------- |
| bubbles: false, composed: false（默认） | 仅子组件内部可监听，无法向外传递 | 组件内部私有事件，无需外部组件感知     |
| bubbles: true, composed: false          | 仅 Shadow DOM 内部跨级冒泡       | 组件内部包含多层子元素，需内部跨级通信 |
| bubbles: true, composed: true（常用）   | 突破 Shadow DOM，外部跨级子传父  | 子组件需向外部多层祖先组件传递数       |

### 静态组合

静态组合不使用插槽。在这个简单的例子中， `c-app` 组合了 `c-parent` ，c-parent 又组合了 `c-child` 。

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

展开来的树看起来是这样的：

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

### bubbles\:false 和 composed\:false

默认配置。该事件不会向上冒泡穿过 DOM，也不会跨越 Shadow 边界。监听此事件的唯一方法是在触发该事件的组件上直接添加事件监听器。

建议采用这种配置，因为它对现有系统的干扰最小，并且能为您的组件提供最佳的封装。

该事件仅向上传递给 `c-child` 。

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

检查 `c-child` 处理程序会在事件中返回这些值。

- `event.currentTarget` = `c-child`
- `event.target` = `c-child`

### bubbles\:true 和 composed\:false

事件会向上冒泡穿过 DOM，但不会越过 shadow 边界。因此， `c-child` 和 `div.wrapper` 都可以响应该事件。

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

事件处理程序返回以下内容：

**`c-child` 操作**

- `event.currentTarget` = `c-child`
- `event.target` = `c-child`

**`div.childWrapper` 操作**

- `event.currentTarget` = `div.childWrapper`
- `event.target` = `c-child`

此配置有两种使用场景：

- **创建内部活动**

要在组件模板内部冒泡事件，请在模板中的某个元素上分发该事件。事件只会向上冒泡到模板内该元素的祖先元素。当事件到达 shadow 边界时，它就会停止冒泡。

    // myComponent.js
    this.template.querySelector("div").dispatchEvent(new CustomEvent("notify", { bubbles: true }));

该事件必须在 `myComponent.js` 中处理。包含组件中的处理程序不会执行，因为该事件不会跨越影子边界。

```html
<!-- container.html -->
<template>
  <!-- handleNotify doesn’t execute -->
  <c-my-component onnotify="{handleNotify}"></c-my-component>
</template>
```

- **向组件的祖父组件发送事件**

如果将组件传递给插槽 ，并且您希望将该组件的事件冒泡到包含它的模板，请在宿主元素上分发该事件。该事件仅在包含该组件的模板中可见。

让我们来看下面示例代码。组件层级结构（从子组件到祖父组件）为 c-contact-list-item-bubbling -> kd-layout-item -> c-event-bubbling。

`c-contact-list-item-bubbling` 组件会分发一个名为 `contactselect` 自定义事件，其中 `bubbles: true` 。

事件监听器 `oncontactselect` 位于其父级 `kd-layout-item` 上，该事件在其祖父级 `c-event-bubbling` 中处理。

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

### bubbles\:true 和 composed\:true

事件会向上冒泡穿过 DOM，越过 shadow 边界，并继续向上冒泡穿过 DOM 到达文档根目录。

**重要提示：** 如果事件使用此配置，则事件类型将成为组件公共 API 的一部分。它还会强制使用该事件的组件及其所有祖先组件在其 API 中包含该事件。

由于此配置会将事件一直冒泡到文档根目录，因此可能会导致名称冲突。名称冲突会导致触发错误的事件监听器。

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

如果使用此配置，请在事件类型前加上命名空间，例如 `mydomain__myevent` 。否则，HTML 事件监听器的名称会显得很奇怪，例如 `onmydomain__myevent` 。

### bubbles\:false 和 composed\:true

KWC 组件不使用此配置。

## 组件间消息中心（messageService）

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

## 访问组件的元素

父组件可通过获取子组件 DOM 实例，直接访问子组件的公共属性和方法（需子组件暴露公共接口）。

要使用组件中渲染的元素，使用 `this.template`或者 `this.querySelector()`。

如果需要在不使用选择器的情况下定位 DOM 元素的话，使用 `refs`。

**重要**

不要使用 `window` 或 `document`全局属性来查询 DOM 元素。

在 KWC 框架中，我们一般不建议使用 JavaScript 来操作 DOM。

### querySelector

访问 DOM 元素的标准方法是使用 `querySelector()`。

- 访问 Shadow DOM: `this.template.querySelector('div');`
- 访问正常节点: `this.querySelecotr('div');`

除了 `this`使用外，也可以通过 `{element}.template.querySelector`来访问

使用上述方法访问元素的话，有以下要点：

- 获取的元素顺序无法保证
- 未渲染的元素无法在 `querySelector`结果中返回
- 不要将 ID 选择器与 `querySelector`一起使用

```html
<!-- example.html -->
<template>
  <div>First <slot name="task1">Task 1</slot></div>
  <div>Second <slot name="task2">Task 2</slot></div>
</template>
```

```js
// example.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Example extends KingdeeElement {
  renderedCallback() {
    this.template.querySelector('div'); // <div>First</div>
    this.template.querySelector('span'); // null
    this.template.querySelectorAll('div'); // [<div>First</div>, <div>Second</div>]
  }
}
```

### Refs

Refs 可以定位没有选择器的 DOM 元素，并且只查询包含在指定模板中的元素：

```html
<template>
  <div kwc:ref="myDiv"></div>
</template>
```

```js
export default class extends KingdeeElement {
  renderedCallback() {
    console.log(this.refs.myDiv);
  }
}
```

需要注意的是，必须是在模板中定义了 `kwc:ref`指令之后才能调用 `this.refs`，直接调用的话，会返回 `undefined`。

如果模板中存在多个 `kwc:ref`定义，使用 `this.refs`将会引用到最后一个。

`this.refs`是个只读对象，不允许添加，修改或者删除属性。

`kwc:ref`指令不允许使用在 `<template>`和 `<slot>`标签上，也不能应用于 `for:each`或者 `iterator:*`的循环中。

### 父元素

要访问 KWC 父元素的话，可以在组件中调用 `hostElement`

## Shadow DOM

Shadow DOM 是一种封装 DOM 结构的标准。

封装 DOM 使组件能够被共享的同时防止被任意 HTML/CSS 和 JavaScript 修改。这种内部 DOM 结构我们称为 Shadow Tree。

### Shadow Tree

考虑如下结构：

```html
<x-todo-app>
  #shadow-root
  <div>
    <p>To Do List</p>
  </div>
  <x-todo-item>
    #shadow-root
    <div>
      <p>Shopping</p>
    </div>
  </x-todo-item>
</x-todo-app>
```

`#shadow-root` 定义了普通 DOM 节点和 Shadow Tree 之间的边界。

使用 Shadow Tree 时，有以下要点：

- 父组件中定义的 CSS 不会传递到子组件。例如，todoApp.css 中定义的 p 标签的样式，不会影响到组件 `x-todo-item`中的 p 标签
- 为了防止暴露组件内部的细节，如果事件冒泡并跨越了 shadow 边界，属性值会发生变化以匹配监听器的作用域
- Shadow Tree 中的元素无法通过传统的 DOM 方法访问。

### Shadow DOM 的 polyfill

在 kwc 框架中，我们使用合成 shadow 的方式来模拟原生 Shadow DOM 的行为，以便支持旧版浏览器

### 合成 shadow 的组件渲染

在使用合成 shadow 渲染组件时，KWC 会添加一个属性来模拟原生组件的行为

假设你有一个 `kd-button`组件，在浏览器中渲染结果如下：

```html
<kd-button
  kwc-190pm5at4mo
  kwc-nfvqqei982-host
  style="
    /* display: flex; */
    /* height: 40px; */
  "
>
  <button
    kwc-nfvqqei982
    class="kdds-button kdds-button-variant-primary kdds-button-shape-radius kdds-button-size-medium"
  >
    <div class="kdds-button-label" kwc-nfvqqei982>保存</div>
    <slot kwc-nfvqqei982>...</slot>
  </button>
</kd-button>
```

KWC 会在组件上生成混淆字符串作为 `kwc-190pm5at4mo`属性，用于限定 CSS 在组件内部的作用域，从而模拟原生 Shadow DOM 的行为。如果你为 `kd-button`提供样式的话，那么 CSS 作用域标记会在运行时添加到元素上。

## 插槽（Slot）

往组件的 HTML 文件添加一个插槽，以便父组件可以将其他内容传递到该组件中。一个组件可以有 0 个或多个插槽。

Slot 核心是解决「子组件模板的个性化占位与内容填充」问题，它传递的是「DOM 内容 / 子组件实例」，而非像属性绑定、自定义事件那样传递业务数据或触发逻辑，这也是它区别于传统组件通信的点，但从层级关系上，始终限定在直接父子组件之间。

即使子组件内部包含多层嵌套的子组件（孙子组件），父组件通过 Slot 传递的内容，也只能被直接子组件接收，无法直接穿透到孙子组件中（若需传递给孙子组件，需由直接子组件再次通过 Slot 转发，本质仍是多层父子关系的逐级传递，而非跨级直接分发）。

`<slot>`是父组件传递到组件的标签。

### 未命名插槽

此示例包含一个未命名插槽。使用 `<slot>`元素作为占位符，展示父组件传入的任何内容

```html
<template>
  <h1>未命名插槽</h1>
  <div>
    <slot></slot>
  </div>
</template>
```

父组件使用示例

```html
<template>
  <x-slot-demo>
    <p>父组件的内容</p>
  </x-slot-demo>
</template>
```

当 `<x-slot-demo>`被渲染时，未命名的占位符会被替换为父组件传入的 `children`元素，即最终的输出是:

```html
<h1>未命名插槽</h1>
<div>
  <p>父组件的内容</p>
</div>
```

如果组件有多个未命名插槽，那么传入的子元素会被插入到所有未命名插槽中。但是一般情况下，组件只有 0 个或者 1 个插槽。

### 命名插槽

下面的示例有两个命名插槽和一个未命名插槽

```html
<!-- 父组件 -->
<template>
  <p>First Name: <slot name="firstname">Default first name</slot></p>
  <p>Last Name: <slot name="lastname">Default last name</slot></p>
  <p>Description: <slot>Default description</slot></p>
</template>
```

&#x20;你可以为 `<slot>`属性设置动态值，比方说 `<span slot={dynamicName}></span>`.

传入的动态值会被强制转换为字符串。例如将数字 6 传递给该属性的话，会被转换为字符串"6"。如果传入的内容无法转换为字符串，如 `Symbol()`，那么会抛出 TypeError 错误。

在使用时我们可以给 `slot`标签添加属性名，以指明应用于哪个插槽

```html
<!-- 子组件 -->
<template>
  <x-slot-demo>
    <span slot="firstname">John</span>
    <span slot="lastname">Smith</span>
    <span>Developer</span>
  </x-slot-demo>
</template>
```

### 访问通过插槽传递的元素

`<slot></slot>`是 shadow dom 的一部分。为了访问其中的元素，可以使用 `querySelector()`和 `querySelectorAll()`。

然而，传递给插槽的 DOM 元素并不属于组件的 shadow tree。要访问通过插槽传递的元素，组件会调用 `this.querySelector()` 和 `this.querySelectorAll()` 。

此示例展示了如何将 DOM 元素从子组件的上下文传递给子组件。请为 `this.querySelector()` 和 `this.querySelectorAll()` 提供选择器名称，例如元素。

```js
// namedSlots.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class NamedSlots extends KingdeeElement {
  renderedCallback() {
    this.querySelector('span'); // <span>push the green button.</span>
    this.querySelectorAll('span'); // [<span>push the green button</span>, <span>push the red button</span>]
  }
}
```

在这个例子中， `querySelector` 接受元素 `span` 。

注意：不要将 `id` 传递给类似 `querySelector` 的查询方法。当 HTML 模板渲染时， `id` 值会被转换为全局唯一值。如果在 JavaScript 中使用 `id` 选择器，它将无法匹配转换后的 `id` 。

### 根据条件渲染插槽

要根据条件渲染插槽的话，可以将 `<slot>`嵌套在 `<template>`当中，通过 `kwc:if`等条件语句来控制显隐

```html
<template>
  <template kwc:if="{expression}">
    <div class="my-class">
      <slot></slot>
    </div>
  </template>
  <template kwc:else>
    <slot></slot>
  </template>
</template>
```

### slotchange 事件

所有的 `<slot>`元素都支持 `slotchange`事件。该事件在插槽的元素发生变更时被调用。比方说，元素被添加到插槽或者被移除时。需要注意的是，插槽元素的子元素发生变更时并不会触发，当且仅当插槽元素的外层发生变更时才会触发。

```html
<template>
  <slot onslotchange="{handleslotchange}"></slot>
</template>
```

```js
handleSlotChange(e) {
    console.log("插槽内容发生变化");
}
```

将组件 `c-child` 传递到插槽中。

```html
<c-container>
  <c-child></c-child>
  <template kwc:if="{addOneMore}">
    <c-child></c-child>
  </template>
</c-container>
```

如果将 `addOneMore` 标志设置为 True，则控制台会在组件首次渲染时打印信息。

```html
<!-- child.html -->
<template>
  <button onclick="{handleClick}">Toggle Footer</button>
  <template kwc:if="{showFooter}">
    <footer>Footer content</footer>
  </template>
</template>
```

The `slotchange` event is not triggered even if `showFooter` is true and the footer element is appended. 即使 `showFooter` 为 true 并且添加了页脚元素， `slotchange` 事件也不会触发。

## 插槽与数据

### 使用插槽与数据

在创建包含其他组件的组件时，请考虑使用带有插槽的声明式方法或者子组件对其父级数据更改会做出反应的数据驱动的组件的生命周期。

声明式构建组件的常见模式如下：

```html
<x-parent>
  <x-custom-child></x-custom-child>
  <x-custom-child></x-custom-child>
</x-parent>
```

该示例中有一个使用 `slot`元素的 `x-parent`组件。虽然消费者能够方便使用，但是你必须管理通过 `slot`元素传递的内容的生命周期。

- 使用 `slotchange`事件。`slotchange`会通过 DOM 向上冒泡，但不会超出 shadow 边界。
- 使用自定义事件将子组件的更改通知到父组件。

### 示例：slotchange 与 slot

通过 `slotchange`与插槽，你可以管理父子组件之间的 `slot`内容的生命周期。

```html
<kd-button-group>
  <kd-button label="刷新"></kd-button>
  <kd-button label="编辑"></kd-button>
  <kd-button label="保存"></kd-button>
</kd-button-group>
```

`kd-button-group`组件包含有一个 `onslotchange`事件，用于管理传入内容的生命周期

```html
<!-- buttonGroup.html -->
<template>
  <slot onslotchange="{handleSlotChange}"></slot>
</template>
```

当插槽内容发生变化时，`slotchange`会处理插槽元素的更新。在本例子中根据子组件的出现的位置进行 css 样式设置

```js
    // buttonGroup.js
    handleSlotChange (event) {
      const slot = event.target;
      const children = slot.assignedElements() || [];

      this.updateGroupOrder(children);
    }
```

```html
<!-- button.html -->
<template>
  <button class="{computedButtonClass}" ...>{label}</button>
</template>
```

```js
    // button.js
    get computedButtonClass () {
      return classSet('kdds-button')
        .add({
          'button_first': this._order === 'first',
          'button_middle': this._order === 'middle',
          'button_last': this._order === 'last'
        })
        .toString();
    }

    setOrder (order) {
      this._order = order;
    }

    connectedCallback() {
      this._connected = true;
      // 注册触发事件
      const privateButtonRegister = new CustomEvent('privatebuttonregister', {
        bubbles: true,
        detail: {
          callbacks: {
            setOrder: this.setOrder.bind(this),
            setDeRegistrationCallback: (deRegistrationCallback) => {
              this._deRegistrationCallback = deRegistrationCallback;
            }
          }
        }
      });

      this.dispatchEvent(privateButtonRegister);
    }

    disconnectedCallback() {
      this._connected = false;
      if (this.__deRegistrationCallback) {
        this._deRegistrationCallback();
      }
    }
```

### 数据驱动

除了插槽以外，亦可通过数据驱动的方法来进行更新组件

```html
<template>
  <div class="parent">
    <template for:each="{itemsData}" for:item="itemData">
      <x-child
        onclick="{onItemSelect}"
        id="{itemData.id}"
        key="{itemData.id}"
      ></x-child>
    </template>
  </div>
</template>
```

</br>

```js
itemsData = [
  {
    label: 'custom label 1',
    id: 'custom01',
  },
  {
    label: 'custom label 2',
    id: 'custom02',
  },
];
```
