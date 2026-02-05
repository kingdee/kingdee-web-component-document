---
toc: content
title: '组件组合'
order: '11'
glossary: Owner | 拥有者 | Container | 容器 | Attribute | 特性
---

# 组件组合

组件组合是「KWC」基于组件封装特性实现的核心能力，让你能够从简单的组件构建出复杂的组件。<br>
本章节将详细介绍「KWC」的组件组合核心规则与实操方法。

## 搭建组件关系

组件封装让每个组件成为自包含的独立单元，而组件组合则是在清晰责任边界下，让这些独立的组件实现组合与复用。「KWC」定义了 Owner（拥有者）、Container（容器）、父子组件三大核心概念，明确了不同角色组件的操作权限和责任划分；同时基于基础组件（如 `kd-button`、`kd-input`）进行上层组合开发，大幅提升组件开发效率和可维护性。

在大多数实际开发场景中，组件的直接父组件往往就是其 Owner，同时也是一个 Container。为简化叙述，本章后续内容将主要讨论 “父组件” （作为 Owner） 与 “子组件” 之间的交互规则。Container 的特殊权限（如仅可读取属性）可在特定架构设计中应用。

下文将以搭建 ToDoList 基础应用为例，结合实际代码进一步讲解 Owner 与 Container 的核心概念：

```html
<!-- todoApp.html -->
<template>
  <x-todo-wrapper>
    <x-todo-item item="牛奶"></x-todo-item>
    <x-todo-item item="面包"></x-todo-item>
  </x-todo-wrapper>
</template>
```

### owner 组件拥有者

owner 指的是拥有该模板的组件。在以上示例中，owner 是 `x-todo-app`组件。owner 控制该模板包含在内的所有组件，并且可以：

- 设置组件的公共属性
- 调用组件上的方法
- 监听组件触发的任何事件

### container 容器组件

容器包含其他组件，但其自身包含在 owner 组件中。在以上示例中，`x-todo-wrapper`就是一个容器，容器可以：

- 读取但不能更改组件中的公共属性
- 调用组件上的方法
- 监听其包含组件冒泡的一些事件

### 父子组件

当一个组件包含另一个组件时，我们的组件就有了层次结构。承载其他组件的组件我们称为父组件，被包含的组件我们称之为子组件：

```html
<!-- 父组件 -->
<template>
  <div>
    <child-component></child-component>
  </div>
</template>
```

---

## 设置子组件的属性

为实现父子组件的下行通信，只有 Owner 组件拥有子组件公共属性的设置权限（Container 仅可读取，不可修改）。<br>
「KWC」中，父组件在模板中为子组件设置的 HTML 特性（Attribute），会在编译时自动转换并赋值为子组件的 JavaScript 属性（Property）。父组件可为子组件设置原始值和非原始值，其中非原始值（数组 / 对象）为只读，需遵循特定规则修改。

### 在子组件上设置原始值

```html
<!-- todoApp.html  -->
<template>
  <x-todo-item item-name="牛奶"></x-todo-item>
  <x-todo-item item-name="面包"></x-todo-item>
</template>
```

<br/>

```js
// todoItem.js
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class TodoItem extends KingdeeElement {
  @api itemName;
}
```

从 `todoItem.js`中可以看出，我们通过 `@api`装饰器修饰了一个 `itemName`属性，该装饰器表明 `itemName`是一个公开的属性。为了设置公开的 `itemName`属性，`todoApp.html`在每个 `<x-todo-item>`组件中设置了 `item-name`属性。

### 在子组件上设置非原始值

传递给子组件的非原始值（数组、对象）会被「KWC」响应式代理处理为只读状态，目的是防止子组件擅自修改父组件数据，破坏数据流向的可控性。<br>
若子组件需要基于父组件传递的非原始值做修改，必须先对其进行浅拷贝，生成独立的本地数据后再操作，直接修改原始值会触发运行时报错。

在如下示例中，父组件将一个对象传递给子组件，然后让子组件更新该值：

```html
<!-- parent.html -->
<template>
  <div>Parent: {serializedObj}</div>
  <x-child obj="{obj}"></x-child>
</template>
```

```js
// parent.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Parent extends KingdeeElement {
  obj = {
    msg: 'Hello',
  };

  get serializedObj() {
    return JSON.stringify(this.obj);
  }
}
```

响应式对象 `obj`从父组件传递到子组件，子组件显示序列化的对象字符串，并有两个按钮可以通过更新原始对象或者是其浅拷贝来更新对象值：

```html
<!-- child.html -->
<template>
  <div>Child: {serializedObj}</div>

  <kd-button label="更新原始值" onclick="{updateOriginal}"></kd-button>
  <kd-button label="更新浅拷贝值" onclick="{updateShadow}"></kd-button>
</template>
```

```js
// child.js
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class Child extends KingdeeElement {
  @api obj;

  get serializedObj() {
    return JSON.stringify(this.obj);
  }

  updateOriginal() {
    this.obj.msg += '!!';
  }

  updateShadow() {
    this.obj = { ...this.obj, msg: this.obj.msg + '!' };
  }
}
```

运行后，点击“更新原始值”这个按钮时，会发现报错：

```js
Uncaught runtime errors:

ERROR
'set' on proxy: trap returned falsish for property 'msg'
TypeError: 'set' on proxy: trap returned falsish for property 'msg'
    at Child.updateOriginal (webpack-internal:///./src/components/Child/Child.js:18:19)
```

而点击另一个按钮，则会发现子组件上的显示更新了内容。需要注意的是，`updateShadow()`只会更新子组件上的 `{serializedObj}`值，与父组件无关。

---

## 数据流

为了避免组件间数据耦合导致的代码复杂性提升、意外副作用，「KWC」规定组件组合必须遵循单向数据流原则：**数据仅从父级流向子级**。<br>
当子组件通过 `@api` 将属性声明为公共属性后，仅可在组件初始化时设置默认值；初始化完成后，只有该属性的所属组件（Owner）有权修改，子组件需将接收到的属性值视为只读。若子组件需要修改父组件传递的属性值，需通过触发自定义事件的方式向上通知父组件，由父组件完成数据修改，修改后的值再通过单向数据绑定向下传递给子组件。

### 非原始值的只读限制

传递给组件的非原始值（对象、数组）会被「KWC」响应式代理设为只读，组件无法直接修改其内部嵌套值，尝试修改会触发控制台报错。<br>
若需要基于该数据做修改，必须先对其进行浅拷贝（嵌套较深的复杂数据可使用深拷贝），生成子组件本地的独立数据后再操作。

### 使用原始值作为公共属性

「KWC」官方建议优先使用原始类型（字符串、数字、布尔值） 作为组件的公共属性，而非对象或数组，将复杂数据结构拆分在高层级的 Owner 组件中，再将所需的原始值逐层传递给子组件，原因如下：

- 原始值的类型可通过 `@api`直接声明，语义清晰，无需额外文档说明；而接收对象或数组时，需单独标注其内部结构，且数据结构变更时易引发下游组件的兼容问题；
- 符合原生 HTML 元素的设计规范，原生 HTML 元素仅支持原始值作为特性，遵循该规则可让「KWC」组件的使用方式更贴近原生，降低学习和使用成本。

---

## 调用子组件的方法

除了属性传递，Owner 组件和 Container 组件可通过调用子组件的公共方法实现下行通信，完成指令式的组件交互（如触发播放、暂停、刷新等操作）。<br>
子组件需通过 `@api` 装饰器修饰方法，将其声明为公共方法（未加 `@api` 的方法为私有方法，外部无法调用）；若需实现向上通信，仍需通过子组件触发事件、父组件处理事件的方式完成。

### 定义公共方法

在以下示例中，向 `x-video-player`添加 `@api`装饰器，公开了 `isPlaying`属性的 getter 以及 `play()`和 `pause()`方法。包含了 `x-video-player`的父组件可以读取该属性并调用相应的方法。

```js
// videoPlayer.js
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class VideoPlayer extends KingdeeElement {
  @api videoUrl;

  @api
  get isPlaying() {
    const player = this.template.querySelector('video');
    return player !== null && player.paused === false;
  }

  @api
  play() {
    const player = this.template.querySelector('video');
    if (player) {
      player.play();
    }
  }

  @api
  pause() {
    const player = this.template.querySelector('video');
    if (player) {
      player.pause();
    }
  }

  // 私有计算属性的 getter
  get videoType() {
    return 'video/' + this.videoUrl.split('.').pop();
  }
}
```

`videoUrl`是一个公共属性。`@api`装饰器可用于在组件上定义公共属性和方法。为了访问当前组件模板拥有的元素，我们可以使用 `this.template`来进行元素查找。`videoPlayer.html`的代码如下：

```html
<template>
  <div class="fancy-border">
    <video autoplay>
      <source src="{videoUrl}" type="{videoType}" />
    </video>
  </div>
</template>
```

### 调用公共方法

父组件需先通过「KWC」规范的方式获取子组件实例，再调用其公共方法，推荐使用 `kwc:ref` 指令定位（无选择器依赖，更稳定），也可使用 `this.template.querySelector()` 查询（适用于简单场景）。

**通过 `kwc:ref`获取子组件**

通过 `kwc:ref` 为子组件设置唯一标识，再通过 `this.refs.标识名` 获取子组件实例，无需依赖选择器。<br>
如下示例中，`x-method-caller`组件包含 `x-video-player`，并有两个按钮来调用 `play()`和 `pause()`方法。

```html
<!-- methodCaller.html -->
<template>
  <div>
    <!-- 为子组件设置唯一ref标识 -->
    <x-video-player kwc:ref="videoPlayer" video-url="{video}"></x-video-player>
    <button onclick="{handlePlay}">播放</button>
    <button onclick="{handlePause}">暂停</button>
  </div>
</template>
```

**通过`querySelector`获取子组件**

`this.template.querySelector()` 是「KWC」中组件内部查询模板元素的标准方式，返回与选择器匹配的第一个元素，适用于子组件无重复、选择器唯一的简单场景。

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class MethodCaller extends KingdeeElement {
  video = 'https://www.w3schools.com/tags/movie.mp4';

  handlePlay() {
    this.template.querySelector('x-video-player').play();
  }

  handlePause() {
    this.template.querySelector('x-video-player').pause();
  }
}
```

### 返回值

要从 JavaScript 方法中返回值，请使用 `return`语句:

```js
@api get isPlaying() {
    const player = this.template.querySelector('video');
    return player !== null && player.paused === false;
}
```

### 方法参数

要将数据传递给 JavaScript 方法，需要为该方法定义一个或多个参数:

```js
    @api play(speed) { ... }
```

### 查询选择器使用规范

- 组件内部查询元素，优先使用 `kwc:ref`，其次使用 `this.template.querySelector()`/`this.template.querySelectorAll()`，禁止使用 `window`、`document`等全局 DOM API；
- `querySelectorAll()`会返回匹配的 DOM 元素数组，可通过遍历实现批量操作；
- 若查询的元素存在多个，建议通过 `class`、`data-*`属性做区分，避免使用模糊的标签选择器；
- 禁止使用`id`选择器：「KWC」渲染 HTML 模板时，会将模板内的 id 转换为全局唯一值，运行时实际 id 与开发时设置的不一致，会导致查询失败。

---

## 在子组件上展开属性

当需要向子组件批量传递多个公共属性时，逐个设置会导致模板代码冗余，「KWC」提供 `kwc:spread`指令，可将对象中的属性传递给子组件。该指令还允许元素接受在运行时绑定为属性的对象。

### 使用 `kwc:spread` 指令

在下述示例中，`childProps`是个对象，其实际内容为：`{ name: '李明', country: '中国' }`。

```html
<template>
  <x-child kwc:spread="{childProps}"></x-child>
</template>
```

在子组件的模板中，可以直接使用 `childProps`的 key：

```html
<!-- child.html -->
<template>
  <div>
    <p>名称: {name}</p>
    <p>国家: {country}</p>
  </div>
</template>
```

接着，使用 `@api`装饰器将属性公开给父组件：

```js
// child.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Child extends KingdeeElement {
  @api name;
  @api country;
}
```

`kwc:spread`始终最后执行属性赋值，因此它会覆盖模板中直接声明的任何属性：

```html
<template>
  <x-child name="kwc" kwc:spread="{childProps}"></x-child>
</template>
```

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class extends KingdeeElement {
  childProps = { name: 'Kingdee Web Components' };
}
```

在上述代码中，虽然父组件显式传入了 `name`属性是 `kwc`，但是最终子组件采用的是 `kwc:spread`传入的对象属性，即名称是 `Kingdee Web Components`。

:::info
一个标签中只能使用一个 `kwc:spread`。
:::

### 与事件处理器同时使用

`kwc:spread` 不仅可以展开普通属性，还能展开事件处理器方法（如 `onclick`、`onchange`），实现事件回调的批量传递，传递时需通过 `bind(this)`绑定父组件的 `this` 指向，否则方法内部的 `this` 会指向子组件实例。

**示例：**

```html
<template>
  <x-child kwc:spread="{childProps}"></x-child>
</template>
```

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class extends KingdeeElement {
  childProps = {
    name: 'Kingdee Web Components',
    onclick: this.handleClick.bind(this),
  };

  handleClick() {
    this.childProps.name = 'Hello';
  }
}
```

### 在子组件中映射 HTML 属性

大多数 HTML 特性（Attribute）会自动映射为 JavaScript 的属性（Property），但部分特性的命名存在差异，「KWC」会自动完成这类特殊映射，开发时直接使用 JavaScript 属性名即可。

常见的映射案例：

| HTML 特性  | JavaScript 属性 |
| ---------- | --------------- |
| `class`    | `className`     |
| `for`      | `htmlFor`       |
| `readonly` | `readOnly`      |

```javascript
// 父组件展开对象使用JavaScript属性名
childProps = {
  className: 'custom-child', // 对应HTML的class="custom-child"
  htmlFor: 'input-1', // 对应HTML的for="input-1"
  name: 'kwc',
};
```
