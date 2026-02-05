---
toc: content
title: '组件封装'
order: '6'
glossary: Shadow DOM | Web Components | Shadow Tree | 作用域 | 插槽系统 | Slot
---

# 组件封装

组件封装是「KWC」组件体系的核心支柱，封装机制使每个组件成为自包含的功能单元，将组件的内部结构、样式和逻辑与外部环境隔离，确保了组件的独立性、可复用性和可维护性。

本章节将详细介绍「KWC」的封装机制：Shadow DOM（结构与样式隔离）和插槽系统（内容注入与分发），帮助你构建健壮且可复用的组件。

## Shadow DOM

「KWC」支持 Web Components 标准的 Shadow DOM 封装，使组件在被共享的同时防止被任意 HTML/CSS 和 JavaScript 修改。这种内部 DOM 结构我们称为 Shadow Tree。

### 理解 Shadow Tree

组件实例化后，其内部结构会形成一个 Shadow Tree（影子树），通过 `#shadow-root` 与外部 DOM 隔离：

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

**封装特性：**

- 独立性：组件内部样式不会泄漏到外部，外部样式也无法穿透到组件内部；
- 隔离性：Shadow Tree 中的元素对外不可见，无法通过常规 DOM API 直接访问；
- 复用性：组件可在不同上下文中重复使用而保持样式一致。

### 合成 Shadow 的组件渲染

为兼容不支持原生 Shadow DOM 的浏览器，「KWC」采用合成 Shadow 技术模拟相同行为。渲染时会为组件添加唯一标识属性，限定 CSS 作用域：

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

**示例解析：**
「KWC」会在组件上生成混淆字符串作为 `kwc-190pm5at4mo`属性，用于限定 CSS 在组件内部的作用域，从而模拟原生 Shadow DOM 的行为。如果你为 `kd-button`提供样式的话，那么 CSS 作用域标记会在运行时添加到元素上。

### 默认样式隔离

以下示例展示 Shadow DOM 最核心的样式隔离特性：父组件样式完全不影响子组件内部结构。<br>
假设有 `x-parent`和 `x-child`两个组件，它们都包含 `<h1>` 标签。

**父组件**：

```html
<!-- parent.html -->
<template>
  <h1>To Do List</h1>
  <kd-child></kd-child>
</template>
```

</br>

```css
/* parent.css */
h1 {
  color: red;
}
```

**子组件**：

```html
<!-- child.html -->
<template>
  <h1>To Do Item</h1>
</template>
```

**隔离效果**：parent.css 将 `h1`的样式定义为 `red`，但该样式仅适用于 parent.html 中的 `<h1> `标签，子组件的 `<h1>` 完全不受影响。

<img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a147a8dbb07544436c9d5" style="max-width: 100%; width: 60%;" alt="隔离效果">

### 父组件设置子组件样式

尽管 Shadow DOM 隔离了组件内部，但父组件仍然可以像操作普通 HTML 元素一样设置子组件宿主元素的样式。<br>
在上面的示例中，我们可以在 `parent.css`中添加一个 `x-child`选择器，该选择器定义子组件周围的边框。

**父组件**：

```css
/* parent.css */
h1 {
  color: red;
}

x-child {
  display: block;
  border: 2px solid blue;
}
```

然而，对于组件内部结构的样式（如子组件内 `<h1>` 的颜色），父组件不应也无法直接干预。<br>

<img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a149107ad417580a82b79" style="max-width: 100%; width: 60%;" alt="父组件设置子组件">

### 子组件控制自身样式

为了更好地控制组件自身的外部表现，推荐使用 `:host` 选择器。

```css
/* parent.css */
h1 {
  color: red;
}

/* child.css */
:host {
  display: block;
  background: green;
}
```

通过 `:host` 选择器，子组件重新获得了对其宿主元素的完全控制权。无论父组件如何设置，子组件都能保持其预定义的外观，确保了封装性和一致性。<br>

<img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a14ae07ad417580a82b85" style="max-width: 100%; width: 60%;" alt="子组件控制">

### 子组件响应父组件

有时，父组件需要向子组件传递状态信息。`:host()` 选择器提供了在保持封装性的前提下，实现父组件与子组件样式通信的方式。

**父组件通过类名传递状态**：

```css
/* parent.css */
h1 {
  color: red;
}
```

</br>

```html
<!-- parent.html -->
<template>
  <h1>To Do List</h1>
  <x-child>Buy Apples</x-child>
  <x-child>Cooking</x-child>
  <x-child class="active">Plan a party</x-child>
</template>
```

**子组件响应父组件的状态信号**：

```css
/* child.css */
h1 {
  color: green;
}
:host {
  display: block;
  background: lightgray;
}

:host(.active) {
  /* 仅当父组件为宿主元素添加了 active 类时生效 */
  background-color: lightgreen;
}
```

**通信机制**：

- 父组件通过为子组件添加特定类名（如 `class="active"`）来传递状态信号
- 子组件内部通过 `:host(.active)` 选择器捕获这个信号
- 子组件自主决定如何响应这个信号（如改变背景色）

这是一种"协商式"的样式交互：父组件只能"提议"（添加类名），而是否响应、如何响应完全由子组件内部决定。

<img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a14e103b6d634b332bf11" style="max-width: 100%; width: 60%;" alt="父子组件协商式">

---

## 插槽系统（Slot）

插槽（Slot）是「KWC」提供的标准化内容注入机制，允许父组件在不破坏子组件封装的前提下，将自定义内容投射到子组件的预留位置，实现 容器与内容分离的设计模式。

**核心特性：**

- 仅支持直接父子组件间的内容传递，无法跨级穿透（孙子组件需子组件通过插槽转发）；
- 插槽传递的是 DOM 内容 / 组件实例，而非业务数据，与属性 / 事件的通信方式互补；
- 子组件完全掌控插槽的位置、渲染时机和样式，父组件仅能提供内容，无法修改子组件布局。

### 未命名插槽（默认）

未命名插槽通过 `<slot></slot>` 定义，是子组件的默认内容注入点，父组件传入的所有无指定插槽的内容，都会投射到该位置，一个组件通常仅定义一个未命名插槽。<br>
以下示例包含一个未命名插槽。使用 `<slot>`元素作为占位符，展示父组件传入的任何内容：

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

命名插槽通过 `<slot name="xxx"></slot>` 定义，用于多位置的精准内容注入，父组件通过 `slot="xxx"` 为内容指定投射的插槽，解决多内容注入的场景。<br>
以下示例有两个命名插槽和一个未命名插槽：

```html
<!-- 父组件 -->
<template>
  <p>First Name: <slot name="firstname">Default first name</slot></p>
  <p>Last Name: <slot name="lastname">Default last name</slot></p>
  <p>Description: <slot>Default description</slot></p>
</template>
```

你可以为 `<slot>`属性设置动态值比如 `<span slot={dynamicName}></span>`。传入的动态值会被强制转换为字符串。例如将数字 6 传递给该属性的话，会被转换为字符串"6"。如果传入的内容无法转换为字符串，如 `Symbol()`，那么会抛出 TypeError 错误。<br>
在使用时我们可以给 `slot`标签添加属性名，以指明应用于哪个插槽：

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

### 访问插槽传递的元素

`<slot>` 本身属于组件的 Shadow Tree 范畴，但父组件传递到插槽中的 DOM 元素 / 子组件，并不会被纳入组件自身的 Shadow Tree，因此访问这类插槽内容时，需要使用专属的查询方式。<br>
组件内部访问插槽传递的外部内容，统一使用 `this.querySelector()` / `this.querySelectorAll()` 方法，与访问 Shadow Tree 内部元素的 `this.template.querySelector()` 做明确区分，二者的查询作用域相互独立。

**示例：**

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

:::warning
避免使用 ID 选择器（如 #myId）。因为「KWC」框架可能会在构建时处理 ID 以保证其唯一性，导致查询失败。推荐使用类选择器或数据属性。
:::

### 根据条件渲染插槽

要根据条件渲染插槽的话，可以将 `<slot>`嵌套在 `<template>`当中，通过 `kwc:if`等条件语句来控制显隐:

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

所有的 `<slot>`元素都支持 `slotchange`事件，该事件是监听插槽内容生命周期变化的标准方式，仅在插槽的顶层内容发生添加、移除、替换时触发，插槽内子元素的样式、属性、内容变更，不会触发该事件。

如下示例，在插槽元素上绑定 `onslotchange` 监听器：

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

将组件 `c-child` 传递到插槽中:

```html
<c-container>
  <c-child></c-child>
  <template kwc:if="{addOneMore}">
    <c-child></c-child>
  </template>
</c-container>
```

如果将 `addOneMore` 标志设置为 True，则控制台会在组件首次渲染时打印信息:

```html
<!-- child.html -->
<template>
  <button onclick="{handleClick}">Toggle Footer</button>
  <template kwc:if="{showFooter}">
    <footer>Footer content</footer>
  </template>
</template>
```

即使子组件内部的 `showFooter` 状态变化导致 `<footer>` 元素渲染或移除，由于插槽的分配元素（`<c-child>`）本身没有变化，因此父组件的 `slotchange` 事件不会被触发。

### 使用插槽与数据

「KWC」提供了两种构建组件树的方式：声明式插槽模式和数据驱动模式。

#### 声明式插槽模式

声明式插槽模式的核心是父组件直接控制子组件的 DOM 结构，通过插槽将具体的 UI 元素或子组件实例传递给子组件。这种模式适用于需要高度定制化 UI 结构的场景。

**常见模式：**

```html
<x-parent>
  <x-custom-child></x-custom-child>
  <x-custom-child></x-custom-child>
</x-parent>
```

以上示例中，存在一个使用 `slot`元素的 `x-parent`组件，虽然使用方便，但是必须管理 `slot`元素传递的内容的生命周期。

**动态插槽管理：**
当通过插槽传递的内容需要被动态管理时，可使用 `slotchange` 事件配合自定义事件建立完整的生命周期管理机制。

```html
<kd-button-group>
  <kd-button label="刷新"></kd-button>
  <kd-button label="编辑"></kd-button>
  <kd-button label="保存"></kd-button>
</kd-button-group>
```

`kd-button-group`组件包含有一个 `onslotchange`事件，用于管理传入内容的生命周期:

```html
<!-- buttonGroup.html -->
<template>
  <slot onslotchange="{handleSlotChange}"></slot>
</template>
```

当插槽内容发生变化时，`slotchange`会处理插槽元素的更新。在本示例中根据子组件的出现的位置进行 css 样式设置：

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

#### 数据驱动

数据驱动模式的核心是父组件通过数据控制子组件的渲染，将业务数据传递给子组件，由子组件根据数据自主渲染。这种模式适用于数据密集型或列表类场景。

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

---

## DOM 操作与元素访问

组件封装的核心是内部细节隐藏，公共接口暴露，因此「KWC」对 DOM 操作和元素访问制定了严格的规范：禁止通过全局 DOM API 访问组件内部元素，提供标准化的内部和外部元素访问方式，同时保障封装性不被破坏。

**核心原则**

- 禁止使用 `window`、`document` 等全局对象查询 DOM 元素（如 `document.querySelector`）； -「KWC」推荐数据驱动视图，尽量减少直接的 DOM 操作；
- 父组件仅能访问子组件主动暴露的公共属性或方法，无法直接访问子组件内部元素；
- 组件内部访问元素，使用框架提供的 `this.template`、`this.querySelector`、`refs` 方式。

### `querySelector`标准访问

这是组件内部访问 Shadow Tree 元素的标准方式，区分内部 Shadow DOM 和外部插槽元素两种场景：

- 访问 Shadow Tree 内部元素：使用 `this.template.querySelector('div');`；
- 访问插槽传递的外部元素：使用 `this.querySelector('div');`。

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

**注意事项：**

- 未渲染的元素无法在 `querySelector`结果中返回；
- 禁止将 ID 选择器与 `querySelector`同时使用，会导致匹配失败；
- 获取的元素顺序不做严格保证。

### `refs`无选择器定位

当元素缺乏合适的选择器时，使用 `kwc:ref` 指令进行引用：

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

**注意事项：**

- `kwc:ref`指令定义之后才可调用 `this.refs`，否则返回 `undefined`
- `kwc:ref` 不能用于 `<template>`、`<slot>` 标签
- 不能用于 `for:each` 或 `iterator:*` 循环内部
- `this.refs` 是只读对象，无法修改
- 同一模板中多个相同 ref 将引用最后一个

### 访问父元素

如需访问「KWC」父元素，可在组件中调用 `hostElement`：

```javascript
// 获取组件的直接父元素
const parent = this.hostElement;
```
