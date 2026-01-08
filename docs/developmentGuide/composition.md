---
toc: content
title: '组件组合'
order: '11'
---

你可以在一个组件中添加另一个组件。组件的组合使你能够从简单的组件构建出复杂的组件

## 组件搭建

使用一些较小的组件来组合应用和组件，可以提高代码的可复用性和维护性。`kd`命名空间中包含了许多基础组件，例如 `kd-button`,`kd-input`等，你可以使用它们来构建组件。

举个例子，我们来构建一个 ToDoList 的应用，顺带介绍下 owner 和 container 的概念

```html
<!-- todoApp.html -->
<template>
  <x-todo-wrapper>
    <x-todo-item item="牛奶"></x-todo-item>
    <x-todo-item item="面包"></x-todo-item>
  </x-todo-wrapper>
</template>
```

### owner

owner 指的是拥有该模板的组件。在这个例子中，owner 是 `x-todo-app`组件。owner 控制该模板包含在内的所有组件，并且可以：

- 设置组件的公共属性
- 调用组件上的方法
- 监听组件触发的任何事件

### container

容器包含其他组件，但其自身包含在 owner 组件中。在这个例子中，`x-todo-wrapper`就是一个容器，容器可以：

- 读取但不能更改组件中的公共属性
- 调用组件上的方法
- 监听其包含组件冒泡的一些事件

### 父子组件

当一个组件包含另一个组件时，我们的组件就有了层次结构。承载其他组件的组件我们称为父组件，被包含的组件我们称之为子组件

```html
<!-- 父组件 -->
<template>
  <div>
    <child-component></child-component>
  </div>
</template>
```

## 设置子组件的属性

为了在父子结构中向下通信，owner 可以在子组件上设置属性。HTML 中属性（Attribute）会转换为 JavaScript 中的属性进行赋值。

父组件可以在子组件上设置字符串或数值等原始值。但是，传递给组件的非原始值（数组或对象）是**只读**的，你必须进行浅拷贝后才能修改任何嵌套值。

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

从 `todoItem.js`中可以看出，我们通过 `@api`装饰器修饰了一个 `itemName`属性。该装饰器表明 `itemName`是一个公开的属性。

为了设置公开的 `itemName`属性，`todoApp.html`在每个 `<x-todo-item>`组件中设置了 `item-name`属性。

JavaScript 中属性名称采用的是驼峰命名法，而 HTML 属性名称采用的是短横线命名法。在使用过程中，编译时引擎会自动映射。

### 在子组件上设置非原始值

传递给组件的非原始值是只读的。要修改数据的话，必须先进行浅拷贝。

我们来看个例子，父组件将一个对象传递给子组件，然后让子组件更新该值。

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

响应式对象 `obj`从父组件传递到子组件。子组件显示序列化的对象字符串，并有两个按钮可以通过更新原始对象或者是其浅拷贝来更新对象值。

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

## 数据流

为了防止代码复杂性和意外的副作用，**数据应该是从父级流向子级的单向数据流动**。

当组件使用 `@api`修饰并将其公开为公共属性时，它应仅在初始化该字段时设置该值。初始化该字段后，只有其所属的组件才能设置该值。组件应将传递给它的值视为只读。

要触发 owner 组件所提供的属性的值变更，子组件可以向父组件发送事件。如果父组件拥有该数据，则可以更改属性值，该更改会通过单向数据绑定向下传递到子组件。

### 传递给组件的对象是只读的

传递给组件的非原始值是只读的。组件无法更改对象或者数组的内容。当你尝试去更改时，控制台会报错。

要修改数据的话，请对修改对象进行浅拷贝。

### 使用原始值作为公共属性

我们建议使用原始类型作为属性，而不是使用对象数据类型。将复杂的数据结构切片到更高级别的组件中，并将原始值传递给组件的后代。因为

- 原始值需要特定的 `@api`属性来明确定义数据类型。接受对象或数组时，需要提供文档来表明其类型。并且对象发生变化的话，消费者也无法使用。
- 标准 HTML 元素仅接受属性的原始值

## 调用子组件的方法

要公开公共方法，请使用 `@api`来修饰。公共方法是组件 API 的一部分。为了向下通信，owner 组件和父组件可以调用子组件上的 JavaScript 方法。

向上通信的话，需要在子组件中触发事件，并在 owner 或者容器组件中处理该事件。

### 定义方法

下面示例向 `x-video-player`添加 `@api`装饰器，公开了 `isPlaying`属性的 getter 以及 `play()`和 `pause()`方法。包含了 `x-video-player`的父组件可以读取该属性并调用相应的方法。

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

`videoUrl`是一个公共属性。`@api`装饰器可用于在组件上定义公共属性和方法。

为了访问当前组件模板拥有的元素，我们可以使用 `this.template`来进行元素查找。

`videoPlayer.html`的代码如下：

```html
<template>
  <div class="fancy-border">
    <video autoplay>
      <source src="{videoUrl}" type="{videoType}" />
    </video>
  </div>
</template>
```

### 调用方法

`x-method-caller`组件包含 `x-video-player`，并有两个按钮来调用 `play()`和 `pause()`方法。

```html
<!-- methodCaller.html -->
<template>
  <div>
    <x-video-player video-url="{video}"></x-video-player>
    <button onclick="{handlePlay}">播放</button>
    <button onclick="{handlePause}">暂停</button>
  </div>
</template>
```

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

要从 JavaScript 方法中返回值，请使用 `return`语句。如

```js
@api get isPlaying() {
    const player = this.template.querySelector('video');
    return player !== null && player.paused === false;
}
```

### 方法参数

要将数据传递给 JavaScript 方法，需要为该方法定义一个或多个参数。如

```js
    @api play(speed) { ... }
```

### 查询选择器

`querySelector()`是标准的 DOM API，它返回与选择器匹配的第一个元素。

如果你所查询的元素可能存在多个，请考虑向元素添加其他的属性，如 `class`或者 `data-*`以做区分。

`querySelectorAll()`返回一个 DOM 元素数组。

**注意**

不要将 `id`传递给 `querySelector`之类的查询方法。渲染 HTML 模板时，`id`值可能会转换为全局唯一值。在实际运行时可能会与设置的不匹配。

## 在子组件上展开属性

使用 `kwc:spread`指令将对象中的属性传递给子组件。该指令还允许元素接受在运行时绑定为属性的对象。

```html
<template>
  <x-child kwc:spread="{childProps}"></x-child>
</template>
```

`childProps`是个对象，实际内容为：`{ name: '李明', country: '中国' }`

在子组件的模板中，可以直接使用 `childProps`的 key

```html
<!-- child.html -->
<template>
  <div>
    <p>名称: {name}</p>
    <p>国家: {country}</p>
  </div>
</template>
```

使用 `@api`装饰器将属性公开给父组件

```js
// child.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Child extends KingdeeElement {
  @api name;
  @api country;
}
```

`kwc:spread`始终是最后应用，因此它会覆盖模板中直接声明的任何属性。

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

上面代码中，虽然父组件显式传入了 `name`属性是 `kwc`，但是最终子组件采用的是 `kwc:spread`传入的对象属性，即名称是 `Kingdee Web Components`

一个标签中只能使用一个 `kwc:spread`。

### 一起使用 `kwc:spread`与事件处理器

`kwc:spread`会展开你所传入的对象。那么就意味着，当你的对象中包含 `onclick`等事件处理器时，该函数也会一并传递给子组件

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
    this.chldProps.name = 'Hello';
  }
}
```

### 在子组件中映射 HTML 属性

大多数 HTML 属性（atrribute）都会 映射为 JavaScript 的属性（property)。比方说 `class`需要是 `className`
