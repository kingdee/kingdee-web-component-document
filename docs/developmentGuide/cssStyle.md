---
toc: content
title: 'CS 样式'
order: '4'
---

`kingdee-base-components`中提供的基础组件使用了 kingdee design system 的样式。如 `kd-button`,`kd-card`,`kd-toast`等组件。其中一些组件中提供了 `variant`属性可用于设置组件的变体。例如 `kd-button`的 `variant`属性取值可以是 `primary`,`ghost`,`secondary`和 `text`。你可以根据自己的需求以及组件文档来进行调整。

## Kingdee design system

### 基础组件的使用

要更改 kd 组件的样式，请首先查看该组件的文档，更改相应的属性来修改组件的外观，如对齐方式，填充，边距或者排版等。

### 应用自定义 css 类

要进一步自定义你的代码，请创建你自己的自定义的 css 类，而不是覆盖 KDDS 类。例如，不要去修改`.kdds-input`类

## CSS 样式表

一个组件的文件夹中只能有一个样式表。样式表使用标准的 CSS 语法，你可以使用大多数的选择器。

在 Shadow DOM 中，组件样式表定义的样式范围限定为组件。此规则允许你在不同的上下文中重复使用组件，而不会丢失其样式。还可以防止组件的样式覆盖页面其他部分的样式。

### Shadow DOM 的 CSS 封装

下面这个例子演示了父组件中定义的 CSS 样式如何独立于自组件。

假设我们有 `x-parent`和 `x-child`两个组件，它们当中都包含了一个 `<h1>`标签。parent.css 将 `h1`的样式定义为 `red`，运行代码时，该样式仅适用于 parent.html 中的 `<h1>`标签，`child`中的 `<h1>`并不会生效

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

</br>

```html
<!-- child.html -->
<template>
  <h1>To Do Item</h1>
</template>
```

![606c048852336ca5e97768e013a9f314__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a147a8dbb07544436c9d5)

父组件可以设置将子组件设置为单个元素的样式。在上面的示例中，我们可以在 `parent.css`中添加一个 `x-child`选择器，该选择器定义子组件周围的边框

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

![3931b2a5711f21821c5efc454f699816__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a149107ad417580a82b79)

当然，我们也可以从 `child.css`的样式表中设置 `x-child`的样式。从父组件中设置子组件的样式并不是一个好的做法。

我们可以先删除 `parent.css`中给 `x-child`设置的样式

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

![cd877579082919575b89702b496c9b60__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a14ae07ad417580a82b85)

相信你已经留意到，我们在 `child.css`中使用的是 `:host`选择器，而不是 `<x-child>`。`:host`选择器可以接受传入其他选择器参数，比方说 `:host(.active)`。如下例子：

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
  background-color: lightgreen;
}
```

![aba18dbd892f960d70e399a6acaecf9b__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a14e103b6d634b332bf11)

### CSS 级联和权重

CSS 级联是指应用于元素的不同样式表中的 CSS 规则组合在一起。具体来说，如果组件中有 `<div>`且具有相同属性的多个选择器，则浏览器将使用最新定义的属性，在下面的示例中是 `background: red;`

```css
div {
  background: green;
}

div {
  background: red;
}
```

要提高选择器的权重，以便应用 CSS 样式的话，请在 CSS 类或包含其子元素的选择器。不支持 ID 选择器，因为在运行时会被转换为全局唯一值。下面的例子中，我们通过对第一个 `div`添加 `kd-card`来提高其权重，使其生效绿色背景色

```css
kd-card div {
  background: green;
}

div {
  background: red;
}
```

再具体一些的话，使用 `.somecolor`这样的类选择器会更易读易理解

```css
.somecolor {
  background: blue;
}

kd-card div {
  background: green;
}

div {
  background: red;
}
```

### CSS 属性继承

如果未找到级联值，则适用于 CSS 继承。如颜色或者字体等属性值，会从父元素中继承。

`<div>Some <span>text</span></div>`这段代码中，如果将 `div`的颜色设置为红色，则其中的文字都会是以红色呈现，因为 `color`继承自父元素。

但是并非所有的属性都可以从父元素中继承，具体 CSS 属性的继承规则可以参考 MDN 文档。

### 将 CSS 样式表赋值给组件

要使用一个或者多个样式表，需要将静态属性 `stylesheets`添加到 `KingdeeElement`函数当中。该属性接受样式数组，其默认值为空数组。

    myComponent/
        ├── myComponent.js
        ├── myComponent.html
        ├── myComponent.css
        ├── header-styles.css
        └── button-styles.css

```js
// myComponent.js
import { KingdeeElement } from '@kdcloudjs/kwc';
import headerStyles from './header-styles.css';
import buttonStyles from './button-styles.css';

export default class MyComponent extends KingdeeElement {
  static stylesheets = [headerStyles, buttonStyles];
}
```

KWC 引擎注入的第一个样式表是 `myComponent.css`，因为它隐式与组件的模板相关联。然后，引擎会按照它们在数组中列出的顺序加载与 `stylesheets`属性关联的所有样式表。基于样式表的配置，`myComponent` 会按如下顺序加载:`myComponent.css` - `header-styles.css`- `button-styles.css`。

子组件不会自动从父组件中继承 `stylesheets`.如果要将该属性在子类中应用，需要手动合并 `super.stylesheets`

```js
// myComponent.js
import { KingdeeElement } from '@kdcloudjs/kwc';
import headerStyles from './header-styles.css';
import buttonStyles from './button-styles.css';
import subStyles from './subStyles.css';

export default class MyComponent extends KingdeeElement {
  static stylesheets = [headerStyles, buttonStyles];
}

class MySubComponent extends MyComponent {
  static stylesheets = [...super.headerStyes, subStyles];
}
```

## 为组件创建样式钩子

要公开自定义组件的样式钩子，建议使用 CSS 自定义属性。CSS 自定义属性使代码易于阅读和更新，消费者只需为样式钩子设置值，而无需关心组件内部是如何实现样式的。

要在组件中定义 CSS 自定义属性，请在属性前加载 `--`。要插入属性的值，请使用 `var()`

```css
:host {
  --error-color: red;
}

.error {
  color: var(--error-color);
}
```

## 共享 CSS

使用通用的 CSS 模块为你的组件创建一致的外观和风格。在 CSS 模块中定义样式，并将该模块导入到你想要共享的组件中。

```css
/* myComponent.css */
@import 'namespace/moduleName';
@import 'x/cssLibrary';
```
