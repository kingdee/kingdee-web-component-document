---
toc: content
title: '自定义事件（Events）'
order: '8'
---

自下而上通信的核心方式，子组件主动触发自定义事件并携带数据，父组件监听该事件并接收数据。

KWC 会分发标准的 DOM 事件。组件还可以创建和分发自定义事件。使用事件可以向上层组件进行通信。例如，子组件 `c-todo-item` 会分发一个事件来通知其父组件 `c-todo-app` ，用户已选中该组件。

KWC 中的事件是基于 [DOM 事件](https://dom.spec.whatwg.org/#events)构建的，DOM 事件是每个浏览器中都可用的 API 和对象的集合。

DOM 事件系统是一种包含这些元素的编程设计模式。

- 事件名称，称为类型
- 用于初始化事件的配置
- 一个会发出事件的 JavaScript 对象

实现逻辑：

1.  子组件通过 `new CustomEvent()` 创建自定义事件，可通过 `detail` 属性携带需要传递的业务数据；
2.  子组件通过 `this.dispatchEvent()` 派发该自定义事件；
3.  父组件在使用子组件时，通过 `addEventListener()` 监听该自定义事件，或直接在 HTML 标签上绑定 `onxxx` 事件，从事件对象中获取 `detail` 中的数据。

- 关键注意：自定义事件默认不会冒泡，若需跨层级传递，可在创建事件时配置 `bubbles: true` 和 `composed: true`。

在 KWC 中，要创建事件，我们强烈建议使用 `CustomEvent` 接口， `CustomEvent` 可在各种浏览器上提供更一致的体验。它无需任何设置或样板代码，并且允许您通过 `detail` 属性传递任何类型的数据，因此非常灵活。KWC 实现了 `EventTarget` 接口，这使得它们能够分发事件、监听事件和处理事件。

## 创建和分发事件

在组件的 JavaScript 类中创建和分发事件。要创建事件，请使用 `CustomEvent()` 构造函数。要分发事件，请调用 `EventTarget.dispatchEvent()` 方法。

`CustomEvent()` 构造函数有一个必需参数，即一个指示事件类型的字符串。作为组件作者，您需要在创建事件时指定事件类型。您可以使用任何字符串作为事件类型。但是，我们建议您遵循 DOM 事件标准。

- 不使用大写字母
- 没有空格
- 用下划线分隔单词

不要在事件名称前加上字符串 `on` ，因为内联事件处理程序名称必须以字符串 `on` 开头。例如，如果你的事件名为 `onmessage` ，则标记应为 `<c-my-component ononmessage={handleMessage}>` 。注意重复出现的 `onon` ，这容易造成混淆。

以下是一个事件分发和处理的示例。

`c-paginator` 组件包含 **“上一页”** 和 **“下一页”** 按钮。当用户点击这些按钮时，组件会创建并触发 `previous` 和 `next` 事件。您可以将 `paginator` 组件添加到任何需要 **“上一页”** 和 **“下一页”** 按钮的组件中。父组件会监听并处理这些事件。

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

当用户点击按钮时， `previousHandler` 或 `nextHandler` 函数会执行。这些函数会创建并分发 `previous` 和 `next` 事件。

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

这些事件只是简单的“发生了某事”事件。它们不会将数据有效负载传递到 DOM 树的上层，它们只是简单地表明用户点击了一个按钮。

让我们把 `paginator` 放到一个名为 `c-event-simple` 的组件中，该组件监听并处理 `previous` 和 `next` 事件。

要监听事件，请使用语法为 `oneventtype` HTML 属性。由于我们的事件类型是 `previous` 和 `next` ，因此监听器分别为 `onprevious` 和 `onnext` 。

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

## 在事件中传递数据

在 KWC 组件通信中，事件传递数据的核心载体是 Web Component 原生的 `CustomEvent`（自定义事件），所有需要携带数据的组件事件，都通过该对象封装数据，再通过派发事件传递给监听方，以下是具体实现流程、示例及注意事项。

**核心原理**

1.  数据存储：将需要传递的数据存入 `CustomEvent` 的 `detail` 属性（这是 `CustomEvent` 专门用于携带自定义数据的字段，原生规范约定，无兼容性问题）；
2.  事件派发：子组件通过 `this.dispatchEvent()` 派发封装好数据的自定义事件；
3.  数据接收：父组件 / 监听方在事件回调中，通过 `event.detail` 提取传递的数据。

注意：`detail` 是唯一推荐的事件传参字段，可携带任意类型数据（字符串、对象、数组等），避免通过事件名称、DOM 属性等间接传递，保证规范性和可维护性。

### **步骤一：子组件封装数据并派发自定义事件**

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
    // 第一个参数：事件名称（自定义，建议带 kwc 前缀避免冲突）
    // 第二个参数：配置项，detail 存储数据，bubbles/composed 控制事件冒泡（可选）
    const customEvent = new CustomEvent('kwc-btn-click', {
      detail: buttonData, // 核心：存放需要传递的数据
    });

    // 3. 派发自定义事件，传递给监听方
    this.dispatchEvent(customEvent);
  }
}
```

### **步骤二：父组件 / 监听方接收事件数据**

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

## 事件处理

### 绑定单个事件监听器

在父组件的模板（在本例中为 `c-parent` 的标记中声明监听器。

```html
    <!-- parent.html -->
    <template>
      <c-parent onnotification={handleNotification}></c-child>
    </template>
```

在 `c-parent` JavaScript 文件中定义处理函数，在本例中 `handleNotification` 。

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

要以声明方式绑定多个事件监听器，请使用`kwc:on` 指令。此外，如果您想要添加事件类型动态计算的事件监听器（例如，通过 `@api` 从所有者组件传递的事件类型），也可以使用此指令。

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

使用 `kwc:on` 添加的事件处理程序绑定到组件实例；处理程序内部的 `this` 引用组件，从而可以访问其属性和方法。

### 绑定动态事件监听器

要在子组件上动态添加事件监听器，请在所有者组件的 JavaScript 文件中定义一个包含事件类型和处理程序的对象。然后，在所有者组件的模板中使用 `kwc:on` 指令将这些处理程序绑定到子组件。

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

以上绑定事件监控器，都是声明式的，KWC 也支持显式（命令式）绑定事件监控器。

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

如果同一个监听器被重复添加到同一个元素，浏览器会忽略重复项。

如果事件监听器未被移除，您可以选择将 `handleNotification` 代码内联到 `addEventListener()` 调用中。

```js
this.template.addEventListener('notification', (evt) => {
  console.log('Notification event', evt);
});
```

注意 不要使用 `addEventListener(eventName, this.handle.bind(this))`这样的形式，因为 `bind()`会返回一个新函数，组件无法使用同一个函数实例来调用 `removeEventListener`。会造成内存泄漏。

### 添加事件监控器

添加事件监听器有两种语法。一种是将事件监听器添加到组件 shadow 边界内的元素，另一种是将事件监听器添加到模板不拥有的元素，例如，传递给插槽的元素。

要向 shadow 边界内的元素添加事件监听器，请使用 `template` 。

```js
this.template.addEventListener();
```

要向模板不拥有的元素添加事件监听器，请直接调用 `addEventListener` 。

```js
this.addEventListener();
```

### 事件重定向

当事件沿着 DOM 向上冒泡时，如果它跨越了 Shadow DOM 的边界， `Event.target` 的值会改变，以匹配监听器的作用域。这种改变称为“事件重定向”。事件重定向的目的是使监听器无法访问触发该事件的组件的 Shadow DOM。事件重定向保持了 Shadow DOM 的封装性。

我们来看一个简单的例子。

```html
<!-- myButton.html -->
<template>
  <button>{label}</button>
</template>
```

即使点击发生在 `button` 元素上 `<my-button>` 上的点击监听器也总是接收 `my-button` 作为目标。

假设 `c-todo-item` 组件中的一个 `div` 元素触发了一个事件。在组件的影子 DOM 中， `Event.target` 是 `div` 。但是对于包含 `c-todo-app` 组件的 `p` 元素上的监听器来说， `Event.target` 是 `c-todo-item` ，因为 `p` 元素无法访问 `c-todo-item` 影子 DOM。

值得注意的是，对于 `c-todo-item` 上的监听器， `Event.target` 是 `c-todo-item` ，而不是 `div` ，因为 `c-todo-item` 位于 shadow 边界之外。

> 注：要获取对触发事件的对象的引用，请使用 [`Event.target`](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) 属性，它是 DOM API 中事件的一部分。

### 监听输入字段的变化

要监听模板中接受输入的元素（例如文本字段（ `<input>` 或 `<kd-input>` ））的变化，请使用 `onchange` 事件。

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

在这个例子中，每当输入值发生变化时，都会调用 JavaScript 文件中的 `handleChange()` 方法。

`myValue` 属性表示输入元素的值。此*属性*值不会在每次更改时自动更新。

您可能需要对用户输入的值进行额外验证，以便在用户输入时自动纠错或限制某些值。为了使 `myValue` 与输入框的当前值保持同步，请在 `handleChange()` 方法中更新 `myValue` 。以下代码通过删除字符串开头和结尾的空格来自动纠错输入的值。使用 `evt.target.value` 获取输入字段的当前值。

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

此示例展示了如何将输入值属性重置为第 `evt.target.value = trimmedValue` 行中的修剪值。它还展示了如何在组件将来重新加载（加载新值）时，保持 `myValue` 属性与规范化值同步。

注意 _修改通过模板定义的元素的属性可能会对组件的其他部分产生意想不到的副作用。在我们的示例中，元素的输入值属性从模板中定义的值（由 `evt.target` 表示）发生了变化。该示例更改了模板中使用的值（\` `myValue` ），以保持组件元素的状态同步。否则，模板重新水合（template rehydration）在尝试将输入元素的状态与组件的状态进行匹配时，会检测到属性值不匹配。这种不匹配会生成运行时警告，您需要修改组件或 JavaScript 代码，以确保整个模板中的数据完整性。_

### 移除事件监听器

框架会在组件生命周期内负责管理和清理监听器。但是，如果您将监听器添加到其他对象（例如 `window` 对象、 `document` 对象等），则需要自行负责移除监听器。

要移除事件监听器，请使用 [`disconnectedCallback`](https://developer.salesforce.com/docs/platform/lwc/guide/create-lifecycle-hooks-dom.html) 生命周期钩子。

如果你使用 `kwc:on` 添加事件监听器，你也可以通过在传递给 `kwc:on` 对象中省略该属性来删除事件监听器。
