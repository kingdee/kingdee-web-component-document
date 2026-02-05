---
toc: content
title: '编辑 CSS 样式'
order: '4'
glossary: CSS 级联 | CSS 权重 | 样式钩子 | 选择器
---

# 编辑 CSS 样式

CSS 负责组件外观，借助 Shadow DOM 可实现样式封装，确保组件独立且不污染全局样式。

本章将介绍如何在「KWC」组件中编写、管理与复用 CSS 样式。

## 样式作用域与封装

「KWC」组件的样式默认受益于组件化的封装思想。虽然实现方式可能有所不同，但其核心目标是确保组件样式不会意外泄漏到外部，同时外部样式也不会轻易干扰组件内部。

- 组件内样式：在组件 _myComponent.css_ 文件中编写的样式，通常默认作用于该组件模板内部。
- 样式穿透：在需要从外部控制组件内部样式（如主题定制）时，应使用「KWC」提供的标准方式（如 CSS 自定义属性，即“样式钩子”），而非强制穿透样式边界，以保证组件的可维护性。

## 使用 KDDS

「KWC」内置了基于「KDDS」(Kingdee Design System) 设计的基础组件库 `kingdee-base-components`（如 `kd-button`,`kd-card`,`kd-toast`等组件），这些组件提供了一套完整的视觉设计语言。

### 定制 KDDS 组件样式

KDDS 的基础组件中，部分组件提供了 `variant` 属性用于快速切换组件变体。例如，`kd-button` 的 `variant` 属性支持 `primary`、`ghost`、`secondary` 和 `text` 等值。建议优先查阅组件文档，通过调整属性（如对齐方式、填充、边距等）来满足基础样式需求。

### 创建自定义 CSS

若需进一步定制样式，请创建自定义 CSS 类，避免直接覆盖「KDDS」的默认类（如 `.kdds-input`）。这有助于保持代码的可维护性，避免因系统组件库升级导致的样式冲突。

---

## CSS 级联和权重

### 级联规则

CSS 级联指多个样式表的规则组合作用于元素，若同一元素的同一属性被多次定义，浏览器会优先使用后定义的规则。<br>
如下示例中，`<div>` 有两个相同属性的选择器，浏览器默认选择后定义的 `background: red`。

```css
div {
  background: green;
}

div {
  background: red;
}
```

### 提高选择器权重

如需要覆盖以上默认的级联规则，可通过增加选择器的具体性（权重）来实现。「KWC」不支持使用 ID 选择器（因为 ID 在运行时会被转换为全局唯一值），建议使用类选择器或包含父元素的选择器。

**示例 1**：
对第一个 `div`添加 `kd-card`来提高其权重，使浏览器选择前定义的 `background: green`。

```css
kd-card div {
  background: green;
}

div {
  background: red;
}
```

**示例 2**：
更推荐的做法是使用更易读易理解的语义类选择器。如下示例，`<div>` 有三个相同属性的选择器，使用 `.somecolor` 类选择器提高权重，使浏览器选择 `background: blue`。

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

如果该元素得 CSS 属性未找到对应的级联值，会继承父元素的该属性值。例如，

```css
<div style="color: red">Some <span>text</span></div>
```

以上示例中，`div`的颜色设置为红色，则其中的文字都会是以红色呈现，因为 `color`继承自父元素。

:::info
并非所有 CSS 属性都支持继承，具体继承规则可参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Cascade/Inheritance" target="_blank"> MDN 文档 </a>。
:::

---

## 引入与继承样式表

### 引入样式表

如需为组件引入一个或多个样式表，需在组件类中添加静态属性 `stylesheets`（继承自 `KingdeeElement`），该属性接收样式数组，默认值为空数组。

**组件文件结构示例**：

    myComponent/
        ├── myComponent.js
        ├── myComponent.html
        ├── myComponent.css
        ├── header-styles.css
        └── button-styles.css

**引入多个样式**：

```js
// myComponent.js
import { KingdeeElement } from '@kdcloudjs/kwc';
import headerStyles from './header-styles.css';
import buttonStyles from './button-styles.css';

export default class MyComponent extends KingdeeElement {
  static stylesheets = [headerStyles, buttonStyles];
}
```

样式表加载顺序如下：

1. 「KWC」引擎会先自动注入与组件模板同名的样式表（如 `myComponent.css`）；
2. 再按 `stylesheets` 数组中定义的顺序，依次加载其他样式表。

上述示例中，加载顺序为：`myComponent.css` → `header-styles.css` → `button-styles.css`。

### 继承样式表

子组件不会自动继承父组件的 `stylesheets`，如需复用父组件样式，需手动合并 `super.stylesheets`。

**示例**：

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
  static stylesheets = [...super.stylesheets, subStyles];
}
```

---

## 高级样式技巧

### 创建样式钩子

如需公开组件的样式自定义入口，推荐使用 CSS 自定义属性（以 `--` 开头），便于使用者快速定制样式，无需关注组件内部实现。<br>
**使用方式**：在属性前加载 `--`，通过 `var()` 引用属性值。

**示例**：

```css
:host {
  --error-color: red;
}

.error {
  color: var(--error-color);
}
```

### 共享 CSS 样式

可通过 CSS 模块实现样式共享，统一组件外观风格。在组件样式表中，使用 `@import` 导入通用 CSS 模块即可。

**示例**：

```css
/* myComponent.css */
@import 'namespace/moduleName';
@import 'x/cssLibrary';
```
