---
toc: content
title: '下行通信'
order: '8'
glossary: 属性 | Properties
---

# 下行通信

下行通信是「KWC」最基础的自上而下通信方式，指父组件通过属性（Properties/Attributes） 向子组件传递数据，子组件显式声明并接收属性，实现数据的响应式更新。

本章节将详细介绍「KWC」的自上而下通信方式。

## 核心特性

自上而下通信方式，严格遵循单向数据流原则：子组件仅可读取父组件传递的属性，不可直接修改，若需修改需通过上行通信通知父组件，由父组件统一更新数据后再向下传递。

- 显式声明：子组件需显式声明可接收的公共属性，明确组件对外接口；
- 类型兼容：支持字符串、数字、对象、数组等所有 JavaScript 数据类型；
- 深度响应：父组件数据变更时，子组件自动触发重新渲染，复杂类型可通过装饰器实现内部变更监听；
- 名约定向：JavaScript 驼峰式属性自动映射 HTML 连字符式特性，符合 Web 标准；
- 生命周期联动：属性变更触发组件 renderedCallback 生命周期，支持自定义渲染逻辑。

## 使用公共属性（Public Properties）

子组件通过 `@api` 装饰器修饰的属性为公共属性，是对外暴露的标准接口，父组件可通过 HTML 特性或 DOM 语法直接赋值和访问。公共属性若在模板中使用，将自动具备响应式能力，属性值变更时组件会重新计算模板表达式并渲染。

:::info
`@api` 是「KWC」从 `@kdcloudjs/kwc` 导出的装饰器，用于标记组件的公共属性，一个属性仅可使用一个装饰器（如不可同时使用 `@api` 和 `@track`）。
:::

以下示例，展示如何通过定义公共属性完成父组件向子组件传递数据。

### 步骤一：定义子组件属性

1. 在子组件的 JavaScript 类中，使用 `@api` 装饰器声明一个公共属性：

```js
// todoItem.js 子组件
import { KingdeeElement, api } from '@kdcloudjs/kwc';
export default class extends KingdeeElement {
  @api itemName = 'Item'; // 声明一个公共字符串属性
}
```

2. 将 `itemName` 显示在子组件的 HTML 模板中：

```html
<!-- todoItem.html 子组件模板 -->
<template>
  <div>
    <label>{itemName}</label>
  </div>
</template>
```

### 步骤二：父组件传递属性

在父组件的 HTML 模板中，通过属性绑定语法将数据传递给子组件:

```html
<!-- app.html 父组件模板 -->
<template>
  <!-- HTML 特性传递：连字符映射驼峰 -->
  <todo-item item-name="Item"></todo-item>
</template>
```

```javascript
// app.js 父组件
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  renderedCallback() {
    // 获取子组件 DOM 实例
    const myItem = this.template.querySelector('x-todo-item').itemName
}
```

---

## 使用私有属性（Private Properties）

私有属性是指组件内部使用的、不对外暴露的响应式状态。与使用 `@api` 装饰的公共属性不同，私有属性仅供组件内部使用，父组件无法直接访问或修改。<br>

私有属性主要用于：

- 存储组件内部状态和中间数据
- 管理用户交互产生的临时状态
- 缓存计算结果或派生数据

### 默认响应式机制

「KWC」对私有属性的默认响应式跟踪采用差异化策略，根据属性的类型执行不同的变化检测规则：<br>

- 原始类型的属性（如字符串、数字、布尔值、null 和 undefined 等），「KWC」采用浅层方式跟踪其属性值的变化。为属性赋值时，使用 `===`来检测变化；
- 复杂类型的属性（如对象、数组），「KWC」默认采用引用比较策略。只有为属性分配新的引用时，才会检测到变化。

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ReactivityExample extends KingdeeElement {
  bool = true;
  number = 43;
  obj = { name: 'John' };

  checkMutation() {
    this.bool = false; // 检测到变更

    this.number = 43; // 没有变化，因为前后两个值相等
    this.number = 4; // 检测到变更

    this.obj.name = 'Bob'; // 没有变化，因为 obj 这个属性没有被重新赋值
    this.obj = { name: 'John' }; // 发生变化，因为已经创建了一个新的对象
    this.obj = { ...this.obj, title: 'CEO' }; // 发生变化
  }
}
```

### 深度响应式跟踪

针对复杂类型（对象、数组），若需要跟踪其内部属性的变化（而非仅引用变化），需使用「KWC」提供的 `@track` 装饰器修饰私有属性。

例如，如下已经声明的 `fullName`属性，如果未添加修饰，KWC 框架将无法响应该变化：

```js
fullName = { firstName: '', lastName: '' };

// 下面这句代码为fullName赋值，因此组件重新渲染
this.fullName = { firstName: 'Bob', lastName: 'Doe' };
```

我们需要使用 `@track` 装饰器来修饰 `fullName` 属性，修饰后直接修改对象内部属性即可触发组件渲染：

```js
import { track } from '@kdcloudjs/kwc';

// 使用 @track 装饰器修饰对象属性
@track fullName = { firstName: '', lastName: '' };

// 直接修改对象内部属性，框架可检测到变化并触发组件重新渲染
this.fullName.firstName = 'Bob';
this.fullName.lastName = 'Doe';
```

**`@track`装饰器的特性**

- 支持跟踪普通对象（`{}` 创建）和数组（`[]` 创建）
- 递归跟踪嵌套对象和数组的修改
- 支持对象和数组的混合结构
- 能处理循环引用
- 不支持 `Date`、`Set`、`Map` 等复杂对象的内部变更检测，需要重新赋值

### 智能渲染

为了避免过度渲染，「KWC」拥有一种智能机制：只有当页面实际用到的属性发生变化时，才会触发重新渲染。
框架会在渲染周期内记录哪些属性被访问过（Dependency Tracking）。

在下面得得示例中，框架会记下 `obj.value1`被访问过。任何对 `obj`的修改，只要不涉及 `value1`的，都会被忽略，因为它并不会影响页面渲染的内容。只有当对 `value1`进行修改时才会触发重新渲染。另外，对 `obj`新增属性，或者更改其他属性，都不会触发渲染。

```js
@track obj = { value1: 'hello' }

get words() {
    return Object.entries(this.obj).map(([key, value]) => ({key, value});
}
```

---

## 使用 Getter 和 Setter

Getter 和 Setter 提供了对属性行为的增强控制能力，允许在属性读写时执行自定义逻辑。<br>
要在公共属性被赋值时执行自定义逻辑，需要编写自定义的 setter。如果为公共属性编写了 setter，必须同时实现 getter 方法。

:::info
可以使用 `@api` 修饰 getter 或 setter，但不能同时修饰两者。
:::

### 数据格式转换

在 setter 中对输入数据进行格式化或验证，确保数据的正确性。下面的的示例将字符串转换为大写。

```html
<template> {itemName} </template>
```

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class TodoItem extends KingdeeElement {
  _uppercaseItemName;

  @api get itemName() {
    return this._uppercaseItemName;
  }

  set itemName(value) {
    this._uppercaseItemName = value.toUpperCase();
  }
}
```

### 处理 HTML 布尔属性

标准 HTML 的布尔属性通过向元素添加属性值来设置为 `true`。如果缺少该属性则默认为 `false`。

```html
<!-- HTML 中使用布尔属性 -->
<my-component disabled></my-component>
```

在组件内部，可以通过 setter 处理布尔值属性的特殊逻辑：

```javascript
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class myComponent extends KingdeeElement {
  _internalDisabled = false;

  @api
  get disabled() {
    return this._internalDisabled;
  }

  set disabled(value) {
    // 将各种可能的真值转换为布尔类型
    this._internalDisabled = Boolean(value);

    // 根据布尔值设置对应的 CSS 类
    if (this._internalDisabled) {
      this.classList.add('disabled');
    } else {
      this.classList.remove('disabled');
    }
  }
}
```

### JavaScript 属性映射到 HTML 属性

默认情况下，通过 `@api` 暴露的属性，当其值变化时，会反映到组件的 HTML Attribute 上，并且会触发组件的重新渲染。如果你需要将值作为属性传递给渲染的 HTML 时，请为该属性定一个 getter 和 setter，并调用 `setAttribute()`方法。

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class MyComponent extends KingdeeElement {
    _privateTitle;

    @api get title() {
    return this._privateTitle;
    }

    set title(value) {
    this._privateTitle = value.toUpperCase();
    this.setAttribute('title, this._privateTitle);
    }
}
```

```html
<template>
  <x-my-component title="hello world"></x-my-component>
</template>
```

最终渲染出的结果是：

```html
<x-my-component title="HELLO WORLD"></x-my-component>
```

### 在 Getter 中管理依赖关系

在「KWC」组件中，通过 HTML 属性传递值时，JavaScript 属性的赋值顺序是不确定的。当多个属性存在依赖关系时，需要使用 getter/setter 来管理这种依赖。

**问题场景**：
一个表格组件有两个相互依赖的属性 `rows`和 `selectedRows`，`selectedRows` 的处理需要依赖 `rows` 的存在。

```html
<template>
    <x-table selected-rows="1,2" rows="1,2,3,4"></x-name>
</template>
```

**解决方案**：
在 JavaScript 中，这两个属性的赋值顺序，可能是 `rows`先，也可能是 `selectedRows`先。由于顺序的不确定性，所以我们可以使用 getter/setter 来管理依赖，在访问方法中主动进行检查和处理依赖

```js
export default class Datatable extends KingdeeElement {
  @track state = {};

  @api
  get rows() {
    return this.state.rows;
  }

  set rows(value) {
    this.state.rows = value;

    // Check to see if the rows have
    // been marked as selected.
    if (this.state.selectedRows && !this.selectedRowsSet) {
      this.markSelectedRows();
      this.selectedRowsSet = true;
    }
  }

  @api
  set selectedRows(value) {
    this.state.selectedRows = value;

    // If rows haven’t been set,
    // then we can't mark anything
    // as selected.
    if (!this.state.rows) {
      this.selectedRowsSet = false;
      return;
    }

    this.markSelectedRows();
  }

  get selectedRows() {
    return this.state.selectedRows;
  }

  markSelectedRows() {
    // Mark selected rows.
  }
}
```
