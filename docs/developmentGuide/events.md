---
toc: content
title: '上行通信'
order: '9'
glossary: API | 事件 | Events | Web Components | DOM 树 | Shadow DOM
---

# 上行通信

上行通信是「KWC」框架中自下而上的数据传递方式，指子组件通过触发自定义事件向父组件传递数据。这种方式与下行通信配合，构成完整的父子组件间通信体系。<br>

本章节将详细介绍「KWC」的自下而上通信方式。

## 实现逻辑

在「KWC」中，事件基于 <a href="https://dom.spec.whatwg.org/#events" target="_blank"> DOM 事件 </a> 构建，后者是各浏览器均支持的 API。DOM 事件系统包含事件类型、初始化配置、触发事件的对象三个核心要素。

KWC 组件实现了 `EventTarget `接口，因此具备分发、监听和处理事件的能力。推荐使用 `CustomEvent` 接口创建事件，它在不同浏览器中表现一致，无需额外配置，并可通过 `detail` 属性传递任意数据。例如，子组件 `c-todo-item` 可分发事件，通知父组件 `c-todo-app` 用户已选中该项。

1. 子组件使用 `new CustomEvent()` 创建事件，通过 `detail` 属性携带数据；
2. 子组件调用 `this.dispatchEvent()` 派发事件；
3. 父组件通过 `addEventListener()` 或模板中的 `onxxx` 属性监听事件，并从 `event.detail` 中获取数据。

:::info
自定义事件默认不会冒泡，若需跨层级传递，可在创建事件时配置 `bubbles: true` 和 `composed: true`。
:::

---

## 创建和分发事件

在组件的 JavaScript 类中创建和分发事件，创建事件使用 `CustomEvent()` 构造函数，分发事件调用 `EventTarget.dispatchEvent()` 方法。

### 事件创建规范

- `CustomEvent()` 构造函数的必需参数为指示事件类型的字符串，组件作者可自定义事件类型，但建议遵循 DOM 事件标准：
  - 不使用大写字母、没有空格、用下划线分隔单词；
- 不要在事件名称前加字符串 `on`，因内联事件处理程序名称必须以 `on` 开头，易造成名称重复（如事件名 `onmessage` 会导致绑定 `ononmessage`），引发混淆。

### 事件分发与监听

在以下示例中，`c-paginator` 组件包含「上一页」和「下一页」按钮，用户点击时组件创建并触发 `previous` 和 `next` 事件，父组件监听并处理该事件以实现页码更新。

**步骤一**：子组件 `paginator` 分发事件

```html
<!-- paginator.html -->
<template>
  <kd-layout>
    <kd-layout-item>
      <kd-button
        label="Previous"
        icon-name="utility:chevronleft"
        onclick="{previousHandler}"
      ></kd-button>
    </kd-layout-item>
    <kd-layout-item flexibility="grow"></kd-layout-item>
    <kd-layout-item>
      <kd-button
        label="Next"
        icon-name="utility:chevronright"
        icon-position="right"
        onclick="{nextHandler}"
      ></kd-button>
    </kd-layout-item>
  </kd-layout>
</template>
```

当用户点击按钮时， `previousHandler` 或 `nextHandler` 函数会执行。这些函数会创建并分发 `previous` 和 `next` 事件，但分发的事件不携带额外数据，仅用于通知父组件用户的操作意向。

```js
// paginator.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Paginator extends KingdeeElement {
  previousHandler() {
    this.dispatchEvent(new CustomEvent('previous'));
  }

  nextHandler() {
    this.dispatchEvent(new CustomEvent('next'));
  }
}
```

**步骤二**：父组件 (c-event-simple) 监听与处理
把子组件 `paginator` 放在一个名为 `c-event-simple` 的父组件中，使用`oneventtype` 属性（本例中为 `onprevious` 和 `onnext`）来监听子组件的事件。

```html
<!-- eventSimple.html -->
<template>
  <kd-card title="EventSimple" icon-name="custom:custom9">
    <div class="kdds-m-around_medium">
      <p class="kdds-m-vertical_medium content">Page {page}</p>
      <c-paginator
        onprevious="{previousHandler}"
        onnext="{nextHandler}"
      ></c-paginator>
    </div>
  </kd-card>
</template>
```

当 `c-event-simple` 接收到 `previous` 和 `next` 事件时， `previousHandler` 和 `nextHandler` 分别增加和减少页码。

```js
// eventSimple.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class EventSimple extends KingdeeElement {
  page = 1;

  previousHandler() {
    if (this.page > 1) {
      this.page = this.page - 1;
    }
  }

  nextHandler() {
    this.page = this.page + 1;
  }
}
```

---

## 在事件中传递数据

「KWC」组件事件传递数据的核心载体是 Web Components 原生的 `CustomEvent`（自定义事件），所有需携带的数据均通过该对象封装，再通过派发事件传递给监听方。

**核心原理**：

1. 数据存储：将需要传递的数据存入 `CustomEvent` 的 `detail` 属性，该字段是 `CustomEvent` 专门用于携带自定义数据的原生规范字段，无兼容性问题；
2. 事件派发：子组件通过 `this.dispatchEvent()` 派发封装好数据的自定义事件；
3. 数据接收：父组件 / 监听方在事件回调中，通过 `event.detail` 提取传递的数据。

:::info
`detail` 是唯一推荐的事件传参字段，可携带任意类型数据（字符串、对象、数组等），避免通过事件名称、DOM 属性等间接传递，保证规范性和可维护性。
:::
注意：

### 步骤一：子组件封装数据并派发自定义事件

```js
// 子组件：my-kwc-button.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class MyKwcButton extends KingdeeElement {
  // 按钮点击事件：封装数据并派发自定义事件
  handleClick(event) {
    event.preventDefault();

    // 1. 定义需要传递的业务数据（可任意类型）
    const buttonData = {
      btnId: 'submit-btn-001',
      btnText: '提交',
      clickTime: new Date().toLocaleString(),
    };

    // 2. 创建 CustomEvent，将数据存入 detail 属性
    // 第一个参数：事件名称（自定义，建议带「KWC」前缀避免冲突）
    // 第二个参数：配置项，detail 存储数据，bubbles/composed 控制事件冒泡（可选）
    const customEvent = new CustomEvent('kwc-btn-click', {
      detail: buttonData, // 核心：存放需要传递的数据
    });

    // 3. 派发自定义事件，传递给监听方
    this.dispatchEvent(customEvent);
  }
}
```

### 步骤二：父组件 / 监听方接收事件数据

html 模板文件：

```html
<!-- 父组件模板：index.html -->
<template>
  <my-kwc-button onkwc-btn-click="{handleBtnClick}"></my-kwc-button>
</template>
```

javascript 文件：

```js
// eventWithData.js
import { KingdeeElement, wire } from '@kdcloudjs/kwc';

export default class EventWithData extends KingdeeElement {
  handleBtnClick(event) {
    // 核心：通过 e.detail 提取子组件传递的数据
    const btnData = e.detail;
    console.log('接收按钮数据：', btnData);
    // 后续业务逻辑：如提交表单、更新状态等
  }
}
```

### 常见场景拓展

**场景 1：传递简单数据（字符串 / 数字）**

无需封装复杂对象，直接将简单数据存入 `detail` 即可：

```js
// 子组件派发
handleClick() {
    const btnId = 'submit-btn-001';
    this.dispatchEvent(new CustomEvent('kwc-btn-click', {
    detail: btnId // 直接传递字符串
    }));
}

// 父组件接收
handleBtnClick(e) {
    const btnId = e.detail;
    console.log('按钮ID：', btnId);
}
```

**场景 2：传递多个数据（封装为对象）**

这是最常用场景，将多个相关数据封装为一个对象，便于后续扩展和维护：

```js
// 子组件派发
handleInputChange(value) {
    const inputData = {
    field: 'username',
    value: value,
    isValid: /^[a-zA-Z0-9_]{6,16}$/.test(value)
    };
    this.dispatch('kwc-input-change', inputData);
}

// 父组件接收
handleInputChange(e) {
    const { field, value, isValid } = e.detail;
    console.log(`字段${field}的值为：${value}，是否有效：${isValid}`);
}
```

**场景 3：传递函数（实现双向通信 / 回调）**

`detail` 也可携带函数，子组件通过调用该函数实现「反向通知」父组件，或接收父组件的处理结果：

```js
    // 父组件：传递回调函数
    handleBtnClick(e) {
      // 接收子组件数据，并通过回调函数返回处理结果
      const { btnId, callback } = e.detail;
      const result = `按钮${btnId}处理成功`;
      callback(result); // 执行子组件传递的回调函数
    }

    // 子组件：派发事件并携带回调函数
    handleClick() {
      const buttonData = {
        btnId: 'submit-btn-001',
        callback: (result) => { // 回调函数，接收父组件处理结果
          console.log('父组件返回结果：', result);
        }
      };
      this.dispatch('kwc-btn-click', buttonData);
    }
```

---

## 事件处理

### 绑定单个事件监听器

在以下示例中，

1. 首先，通过 `onnotification` 语法为父组件的模板 `c-parent` 声明监听器；
2. 然后，在相应的 JavaScript 文件中定义处理函数 `handleNotification`。

```html
    <!-- parent.html -->
    <template>
      <c-parent onnotification={handleNotification}></c-child>
    </template>
```

```js
// parent.js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class Parent extends KingdeeElement {
  handleNotification() {
    // Code runs when event is received
  }
}
```

### 绑定多个事件监听器

当需要以声明方式绑定多个事件监听器，请使用`kwc:on` 指令。此外，如果您想要添加事件类型动态计算的事件监听器（例如，通过 `@api` 从所有者组件传递的事件类型），也可以使用此指令。

```html
<template>
  <kd-button kwc:on="{eventHandlers}" label="Click me"></kd-button>
</template>
```

向 `kwc:on` 传递一个对象，其中对象中的每个属性键指定一个事件类型，相应属性的值是事件处理函数。属性键必须是字符串，例如 `click` 、 `customEvent` 或 `'custom-event'` 。

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class EventHandlerExample extends KingdeeElement {
  eventHandlers = {
    click: this.handleClick,
    mouseover: this.handleMouseOver,
  };

  handleClick(event) {
    console.log('Button clicked');
  }

  handleMouseOver(event) {
    console.log('Mouse over button');
  }
}
```

通过 `kwc:on` 添加的事件处理程序绑定到组件实例；处理程序内部的 `this` 引用组件，从而可以访问其属性和方法。

### 绑定动态事件监听器

如果需要要在子组件上动态添加事件监听器：

1. 首先，在所有者组件的 JavaScript 文件中定义一个包含事件类型和处理程序的对象；
2. 然后，在所有者组件的模板中使用 `kwc:on` 指令将这些处理程序绑定到子组件。

```html
<!-- eventDynamic -->
<template>
  <c-event-dynamic-child kwc:on="{eventHandlers}"></c-event-dynamic-child>
  <p>Custom event received: {customEventDetail}</p>
  <kd-button onclick="{switchEventListener}" label="Switch Event Listener">
  </kd-button>
</template>
```

`eventDynamic` 组件会在 `customEvent` 和 `anotherCustomEvent` 这两个事件监听器之间动态切换。要切换事件监听器之间的消息，请单击 **“切换事件监听器”** 按钮，然后单击 **“更新消息”** 按钮。

```js
// eventDynamic.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class EventDynamic extends KingdeeElement {
  customEventDetail = '';
  eventHandlers = {
    customEvent: this.handleCustomEvent,
  };

  handleCustomEvent(event) {
    this.customEventDetail = `${event.detail}`;
  }

  switchEventListener() {
    this.eventHandlers = this.eventHandlers.customEvent
      ? { anotherCustomEvent: this.handleCustomEvent }
      : { customEvent: this.handleCustomEvent };
  }
}
```

`eventDynamicChild` 组件包含一个按钮，用于分发自定义事件。

```html
<!-- eventDynamicChild -->
<template>
  <div>Child Component</div>
  <kd-button onclick="{handleButtonClick}" label="Update Message"> </kd-button>
</template>
```

`eventDynamicChild` 组件在连接到 DOM 且按钮被点击时，会触发两个自定义事件： `customEvent` 和 `anotherCustomEvent` 组件使用 `kwc:on` 来绑定 `eventDynamic` 监听器。

```js
// eventDynamicChild.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class EventDynamicChild extends KingdeeElement {
  connectedCallback() {
    // Dispatch a custom event when this component is connected
    this.dispatchEvent(
      new CustomEvent('customEvent', {
        detail: 'customEvent from child component connectedCallback',
      }),
    );
    this.dispatchEvent(
      new CustomEvent('anotherCustomEvent', {
        detail: 'anotherCustomEvent from child component connectedCallback',
      }),
    );
  }

  handleButtonClick() {
    this.dispatchEvent(
      new CustomEvent('customEvent', {
        detail: 'Button clicked in child component for customEvent',
      }),
    );
    this.dispatchEvent(
      new CustomEvent('anotherCustomEvent', {
        detail: 'Button clicked in child component for anotherCustomEvent',
      }),
    );
  }
}
```

### 显式绑定事件监听器

以上绑定事件监控器，都是声明式的，「KWC」同时支持显式（命令式）绑定事件监控器，可在组件的 JavaScript 文件中通过 `addEventListener` 直接绑定，具体示例如下：

在 `c-parent` JavaScript 中定义监听器函数和处理函数。

```js
// parent.js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class Parent extends KingdeeElement {
  constructor() {
    super();
    this.template.addEventListener('notification', this.handleNotification);
  }
  handleNotification = () => {};
}
```

如果同一个监听器被重复添加到同一个元素，浏览器会忽略重复项。如果事件监听器未被移除，您可以选择将 `handleNotification` 代码内联到 `addEventListener()` 调用中。

```js
this.template.addEventListener('notification', (evt) => {
  console.log('Notification event', evt);
});
```

:::info
不要使用 `addEventListener(eventName, this.handle.bind(this))`这样的形式，因为 `bind()`会返回一个新函数，组件无法使用同一个函数实例来调用 `removeEventListener`。会造成内存泄漏。
:::

### 添加事件监控器

显式绑定事件监听器时，需根据目标元素的归属场景选择对应的调用方式，主要分为两种场景，对应不同的语法：

**第一种**： 将事件监听器添加到组件 shadow 边界内的元素：使用 `this.template.addEventListener()`；

```js
this.template.addEventListener();
```

**第二种**： 将事件监听器添加到模板不拥有的元素：使用 `this.addEventListener()`；

```js
this.addEventListener();
```

### 事件重定向

当事件沿 DOM 树向上冒泡时，若跨越了 Shadow DOM 的边界，`event.target` 的值会发生改变，以匹配当前监听器的作用域，这一行为被称为「事件重定向」。<br>
事件重定向的核心目的是保证 Shadow DOM 的封装性，使外部监听器无法访问触发事件的组件内部 Shadow DOM。<br>

在以下示例中，`<my-button>` 组件其内部已包含原生 button 元素，点击事件实际触发在 button 上，但 `<my-button>` 上的点击监听器获取的 `event.target` 始终是 `<my-button>`组件本身。

```html
<!-- myButton.html -->
<template>
  <button>{label}</button>
</template>
```

再以 `c-todo-item` 和 `c-todo-app` 组件的嵌套关系为例：`c-todo-item` 组件内的 `div` 元素触发事件时，在其自身 Shadow DOM 中，`event.target` 为该 `div`；但对于外层 `c-todo-app` 组件上的监听器来说，`event.target` 会变为 `c-todo-item`，因为外部组件无法访问 `c-todo-item` 的 Shadow DOM。<br>
值得注意的是，直接绑定在 `c-todo-item` 上的监听器，获取的 `event.target` 也是 `c-todo-item` 而非内部的 `div`，原因是该监听器位于`c-todo-item` 的 shadow 边界之外。

:::info
要获取对触发事件的对象的引用，请使用 [event.target 属性](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)，它是 DOM API 中事件的一部分。
:::

### 监听输入字段的变化

要监听模板中输入类元素（如原生 `<input>`、「KWC」的 `<kd-input>`）的数值变化，可直接为元素绑定 `onchange` 事件，在事件处理函数中通过 `evt.target.value` 获取输入字段的当前值，基础实现示例如下：

```html
<!-- form.html -->
<template>
  <input type="text" value="{myValue}" onchange="{handleChange}" />
</template>
```

```js
// form.js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class Form extends KingdeeElement {
  myValue = 'initial value';

  handleChange(evt) {
    console.log('Current value of the input: ' + evt.target.value);
  }
}
```

上述示例中，输入值发生变化时会触发 `handleChange()` 方法，但组件的 `myValue` 属性不会随输入值自动更新，二者并非双向同步。<br>

实际开发中，常需要对用户输入进行验证、自动纠错或限制，同时让组件内部属性与输入框实际值保持同步，此时只需在 `handleChange()` 方法中更新`myValue` 即可。以下示例通过删除字符串开头和结尾的空格来自动纠错输入的值，使用 `evt.target.value` 获取输入字段的当前值，保证属性值与输入框值一致：

```js
// form.js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class Form extends KingdeeElement {
  myValue = 'initial value';

  handleChange(evt) {
    const typedValue = evt.target.value;
    const trimmedValue = typedValue.trim(); // trims the value entered by the user
    if (typedValue !== trimmedValue) {
      evt.target.value = trimmedValue;
    }
    this.myValue = trimmedValue; // updates the internal state
  }
}
```

该示例中，既通过 `evt.target.value = trimmedValue` 重置了输入框的实际值，也通过 `this.myValue = trimmedValue` 更新了组件内部属性，确保组件重新加载时，`myValue` 能与输入框的规范化值保持同步。

:::info
如果你修改了 DOM 元素（如输入框）的属性值，务必同步更新模板中绑定的组件属性。否则，当框架下次更新视图时，会发现绑定值与元素实际值不一致，可能导致意外行为。
:::

### 移除事件监听器

「KWC」框架会在组件的整个生命周期内，自动管理并清理组件内部的事件监听器，无需开发者手动操作。但如果将监听器添加到 `window`、`document` 等组件外部对象时，框架无法自动清理，需要开发者自行负责移除。

移除这类外部监听器，需在组件的 <a href="https://dev.kingdee.com/kwc/development-guide/lifecycle" target="_blank"> `disconnectedCallback` 生命周期钩子 </a> 中执行移除操作；若通过 `kwc:on` 指令添加的监听器需要移除，可直接在传递给`kwc:on` 的事件处理对象中，省略对应事件类型的属性即可。
