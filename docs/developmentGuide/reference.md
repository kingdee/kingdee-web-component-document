---
toc: content
title: '参考手册'
order: '17'
glossary: 驼峰命名
---

# 参考手册

本章节将详细介绍「KWC」框架组件开发的属性使用规范与可访问属性及方法参考，包含 JavaScript / HTML 属性命名映射规则、`KingdeeElement` 基类属性、原生 Web API 可访问属性三部分核心内容，是组件开发中属性定义、访问的统一参考标准。

## 属性命名规范

### 命名与映射规则

JavaScript 组件属性采用驼峰式命名，HTML 模板中对应的属性采用连字符（中划线）命名，框架自动完成两端映射。
示例：JavaScript 属性 `itemName` → HTML 属性 `item-name`。

### JavaScript 属性命名禁忌

定义 JS 组件属性时，需遵守以下禁用规则，避免与框架内置逻辑、原生属性冲突：

- 禁止以以下前缀开头：`on`、`aria`、`data`
- 禁止使用以下保留字作为属性名：`slot`、`part`、`is`

### HTML 属性命名规则

模板中书写的 HTML 属性，命名需符合以下规则:

- 禁止包含大写字符;
- 仅允许以小写字母、下划线（`_`）、美元符号（`$`）、连字符 + 字母（`-x`） 开头；
- 属性名中可包含组合符号：`__`、`_-`；
- 若连字符非首字符，允许以`-_`开头（示例：`_myattribute`、`$myattribute`、`my-_attribute`）。

### 特殊 JS 属性的 HTML 映射语法

若 JavaScript 中存在以大写字母开头的属性（如 `@api` 装饰的公共属性），需通过 HTML 属性设置时，采用特殊映射规则：

- 大写首字母转为小写；
- 前缀添加连字符-upper。
  示例：JS 公共属性 `@api upper` → HTML 属性 `-upper`

### HTML 通用属性的 JS 访问规则

不建议在组件中直接使用 HTML 通用属性（如 `class`和 `title`等通用属性）。<br>
部分 HTML 属性不遵循基础命名规则，若需在 JavaScript 中使用这些属性的 getter 或 setter，需按以下指定映射关系书写：

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
| novalidate      | noValidate      |
| readonly        | readOnly        |
| rowspan         | rowSpan         |
| tabindex        | tabIndex        |
| usemap          | useMap          |

---

## 类属性

「KWC」所有组件均继承自 `KingdeeElement` 基类，本部分包含基类专属属性及组件可直接继承使用的通用属性，均支持通过 `this` 直接访问。

### KingdeeElement 基类属性

- `constructor`: KingdeeElement 的构造函数
- `hostElement`: 访问 shadow DOM 组件中的 HTMLElement
- 模板访问：

  - `template`: 组件的模板，使用 `this.template`来访问
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
- `children`
- `childNodes`
- `classList`
- `dir`
- `dispatchEvent`
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
- `template`
- `title`

---

## Web API 属性

### 元素

「KWC」组件中，可以访问 `Element` 元素的以下属性：

`children`,`classList`,`className`, `children`, `classList`, `className`, `firstElementChild`, `getAttribute`, `getAttributeNS`, `getBoundingClientRect`, `getElementsByClassName`, `getElementsByTagName`, `hasAttribute`, `id`, `lastElementChild`, `querySelector`, `querySelectorAll`, `removeAttribute`, `removeAttributeNS`, `setAttributeNS`, `setAttribute`, `shadowRoot`, `slot`

### 事件

「KWC」组件中，可以访问`EventTarget`接口中以下属性：`addEventListener`, `dispatchEvent`, `removeEventListener`

### HTMLElement

「KWC」组件中，可以访问`HTMLElement` 元素的以下属性：`accessKeyLabel`, `contentEditable`, `dataset`, `dir`, `hidden`, `isContentEditable`, `lang`, `offsetHeight`, `offsetLeft`, `offsetParent`, `offsetTop`, `offsetWidth`, `title`

### Node

「KWC」组件中，可以访问 Node 元素的以下属性：`childNodes`, `firstChild`, `isConnected`, `lastChild`
