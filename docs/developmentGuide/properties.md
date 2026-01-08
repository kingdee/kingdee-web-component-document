---
toc: content
title: '属性（Properties）'
order: '7'
---

这是最基础的自上而下通信方式，在组件的 JavaScript 类中声明属性，在组件模板中引用它们以动态更新内容。父组件通过 HTML 标签属性传递数据，子组件接收并响应属性变化。

组件开发在类中声明属性，通过 `@api`装饰器修饰的属性表明其公开的对象属性被外部使用。同时，KWC 会观测字段和属性值的变化。

属性（property）和特性（attribute）几乎相等。一般来说，在 HTML 中，称为特性，在 JavaScript 中称为属性。

**核心要点：**

- 属性声明：子组件需要显式声明可接收的属性
- 类型校验：支持字符串、数字、对象、数组等类型
- 响应式更新：父组件数据变化，子组件自动更新
- 单向数据流：子组件不能直接修改 Props（原则）

## 响应式

响应式是 KWC 框架的核心系统。该框架会观察属性值的变化。当观察到变化时，会重新根据模板中使用的表达式来重新渲染组件，显示新值。

组件模板中的公共属性是响应式的。在组件的 JavaScript 类中，如果某个属性值发生变化，并且该字段在模板中或者是被其他 getter 依赖时，组件会重新渲染并显示新值。如果该属性是个对象或者数组，那么框架则会观察其内部的变化。

## 公共属性（Public Properties）

使用 `@api`修饰的属性被视为公开的公共属性。在模板中使用公共属性时，该属性就有了响应性。

当组件被重新渲染时，模板中使用的表达式会被重新计算，并且 `renderedCallback()`这个生命周期会被执行。

属性可以是你的自定义属性，也可以是从 `HTMLElement`中继承的属性。

_提示：装饰器，如`@api`，`@track`是 JavaScript 的一个功能。一个属性声明只能有一个装饰器。_

### 自定义属性

从 `@kdcloudjs/kwc`中导入 `@api`装饰器。将 `itemName`设置为公开的公共属性。

```js
// todoItem.js
import { KingdeeElement, api } from '@kdcloudjs/kwc';
export default class extends KingdeeElement {
  @api itemName = 'Item';
}
```

`itemName`显示在模板中

```html
<!-- todoItem.html -->
<template>
  <div>
    <label>{itemName}</label>
  </div>
</template>
```

### DOM 属性

在标签中使用组件的 owner 组件可以通过 DOM 属性来访问组件的公共属性。DOM 属性是在类中声明的公共字段。它们可以通过 DOM 元素使用 `.`语法进行访问。

```js
myItem = this.template.querySelector('x-todo-item').itemName;
```

## 私有属性（Private Properties）

### 原始类型和复杂类型的响应性

诸如布尔值，数值和字符串等原始类型的属性时响应式的。KWC 以浅层方式跟踪属性值的变化。当为属性赋值时，通过使用 `===`来检测变化。

而如数组或对象这些复杂类型时，必须创建一个新对象并将其分配给属性来检测更改。

```js
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

如果要深入跟踪复杂对象内部发生的变化，建议使用 `@track`装饰器。

### 跟踪数组和对象的内部变化

当属性使用 `@track`修饰时，KWC 会跟踪内部的变化：

- 使用 `{}`创建的普通对象
- 使用 `[]`创建的数组

该框架以递归方式观察对对象和数组的修改，包括嵌套对象，嵌套数组以及对象和数组的混合。此外，它还能处理循环引用。

但是框架不会观察复杂对象的变异操作，例如 `Date`等。

### 观察对象的属性

我们稍微修改下代码，声明一个 `fullName`属性：

```js
fullName = { firstName: '', lastName: '' };

// 下面这句代码为fullName赋值，因此组件重新渲染
this.fullName = { firstName: 'Bob', lastName: 'Doe' };
```

但是我们如果通过修改对象的属性，那么 KWC 框架将无法响应该变化。

要避免上述问题，我们需要使用 `@track`装饰器来修饰 `fullName`属性。

### 使用新属性重新渲染对象

不管该属性是否在 `@track`所修饰， 仅当上一个渲染周期中访问的属性被更新时，组件才会重新渲染。这样可以避免组件过度渲染。

```js
@track obj = { value1: 'hello' }

get words() {
    return Object.entries(this.obj).map(([key, value]) => ({key, value});
}
```

在第一个渲染周期，框架会记下 `obj.value1`被访问过。任何对 `obj`的修改，只要不涉及 `value1`的，都会被忽略，因为它并不会影响页面渲染的内容。只有当对 `value1`进行修改时才会触发重新渲染。

另外，对 `obj`新增属性，或者更改其他属性，都不会触发渲染。

### 观察数组的元素

`@track`的另一个用途是告诉框架观察数组元素的变化。如果不使用装饰器的话，框架仅会观察数组重新赋值时的变化，为数组添加新值和更新内部元素不会引起组件渲染。

使用 `@track`修饰数组的话，数组会被转换为代理对象。

### 观察复杂对象

如 `Date`,`Set`等复杂对象的元素发生变更时，框架无法对其作为响应。如果需要确保复杂对象更新时，页面会重新渲染，那么我们需要给复杂对象重新赋值才行。

## 属性名

JavaScript 中属性名称采用驼峰式命名，而 HTML 属性名称则是采用连字符连接。

例如，名为 `itemName`的 JavaScript 属性映射名为 `item-name`的 HTML 属性。

### JavaScript 属性名称

不要使用这些字符开头的属性名：

- `on`
- `aria`
- `data`

不要将这些保留字作为属性名：

- `slot`
- `part`
- `is`

### HTML 属性名称

模板中的 HTML 属性不能包含大写字符，允许以小写字母，下划线和美元符号，连字符+字母来作为属性名称的开头。

属性名称可以包含 `__`和 `_-`。

如果连字符不是属性名称的第一个字符，则允许使用 `-_`作为开头。例如:

- `_myattribute`
- `$myattribute`
- `my_-attribute`

如果你有一个以大写字母开头的 JavaScript 属性，并且需要通过 HTML 属性进行设置，则必须使用特殊语法。属性名称的大写字符为小写，并以连字符 `-upper`为前缀。比方说，JavaScript 中属性 `@api Upper`对应于 HTML 属性 `-upper`.。

### 在 JavaScript 中访问 HTML 通用属性

不建议使用 HTML 的通用属性，即所有 HTML 元素通用的 `class`和 `title`等属性。

某些 HTML 属性不会遵循我们的命名约定。如果需要在 JavaScript 中使用这些属性的 getter 或 setter，请使用下面列表的大小写

| HTML 属性       | JavaScript 属性 |
| :-------------- | :-------------- |
| accesskey       | accessKey       |
| bgcolor         | bgColor         |
| colspan         | colSpan         |
| contenteditable | contentEditable |
| crossorigin     | crossOrigin     |
| datetime        | dateTime        |
| for             | htmlFor         |
| formaction      | formAction      |
| ismap           | isMap           |
| maxlength       | maxLength       |
| minlength       | minLength       |
| novalidate\`    | noValidate      |
| readonly        | readOnly        |
| rowspan         | rowSpan         |
| tabindex        | tabIndex        |
| usemap          | useMap          |

## 类属性

### KingdeeElement 类属性

- `contructor`: KingdeeElement 的构造函数
- `hostElement`: 访问 shadow DOM 组件中的 HTMLElement
- 模板访问：

  - `template`: 组件的模板，使用 `this.tempalte`来访问
  - `refs`: 访问指定模板中的 DOM 元素

- 生命周期:

  - `connectedCallback`
  - `disconnectedCallback`
  - `render`
  - `renderedCallback`
  - `errorCallback`

### 继承的属性和方法

- `accessKey`
- `addEventListener`
- `attachInternals`
- `chilldren`
- `childNodes`
- `classList`
- `dir`
- `disaptchEvent`
- `draggable`
- `firstChild`
- `firstElementChild`
- `getAttribute`
- `getAttributeNS`
- `getBoundingClientRect`
- `getElementsByClassName`
- `getElementsByTagName`
- `hasAttribute`
- `hasAttributeNS`
- `hidden`
- `id`
- `isConnected`
- `lang`
- `lastChild`
- `lastElementChild`
- `ownerDocument`
- `querySelector`
- `querySelectorAll`
- `removeAttribute`
- `removeAttributeNS`
- `removeEventListener`
- `setAttribute`
- `setAttributeNS`
- `shadowRoot`
- `spellcheck`
- `style`
- `tabIndex`
- `tagName`
- `tempalte`
- `title`

## Web API 属性

### 元素

KWC 组件中，可以访问`Element` 元素的以下属性：

`children`,`classList`,`className`,\``children`, `classList`, `className`, `firstElementChild`, `getAttribute`, `getAttributeNS`, `getBoundingClientRect`, `getElementsByClassName`, `getElementsByTagName`, `hasAttribute`, `id`, `lastElementChild`, `querySelector`, `querySelectorAll`, `removeAttribute`, `removeAttributeNS`, `setAttributeNS`, `setAttribute`, `shadowRoot`, `slot`

### 事件

KWC 组件中，可以访问`EventTarget`接口中以下属性：`addEventListener`, `dispatchEvent`, `removeEventListener`

### HTMLElement

KWC 组件中，可以访问`HTMLElement` 元素的以下属性：`accessKeyLabel`, `contentEditable`, `dataset`, `dir`, `hidden`, `isContentEditable`, `lang`, `offsetHeight`, `offsetLeft`, `offsetParent`, `offsetTop`, `offsetWidth`, `title`

### Node

KWC 组件中，可以访问 Node 元素的以下属性：`childNodes`, `firstChild`, `isConnected`, `lastChild`

## Getter 和 Setter

要在公共属性每次被赋值时执行逻辑，需要编写自定义的 setter。

如果为公共属性编写了 setter 方法，那么必须同时实现 getter 方法。

可以使用 `@api`来修饰 getter 或 setter，但是不能同时修饰两者。

下面的示例将字符串转换为大写

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

## 布尔属性

标准 HTML 的布尔属性通过向元素添加属性值来设置为 `true`。如果缺少该属性则默认为 `false`

## JavaScript 属性映射到 HTML 属性

默认情况下，所有 HTML 属性都是响应式的。当组件 HTML 中某个属性值发生变化时，组件会重新渲染。

如果你需要将值作为属性传递给渲染的 HTML 时，请为该属性定一个 getter 和 setter，并调用 `setAttribute()`方法

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

## 在 Getter 中管理依赖关系

在 KWC 组件中，通过 HTML 属性传递的值，最终赋值给 JavaScript 属性时，顺序是不确定的。

举个例子，我们有一个表格组件，上面有两个彼此依赖的属性 `rows`和 `selectedRows`

```html
<template>
    <x-table selected-rows="1,2" rows="1,2,3,4"></x-name>
</template>
```

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
