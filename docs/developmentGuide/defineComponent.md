---
toc: content
title: '创建组件'
order: '2'
glossary: HTML | CSS | JavaScript | Shadow DOM | 驼峰命名 | Pascal Case
---

# 创建组件

「KWC」组件基于 HTML 模板（视图）、CSS 样式（外观）与 JavaScript 逻辑（行为）三者组合实现，各司其职且紧密耦合，构成独立可复用的单元。

本章将指导你创建和组织组件，掌握标准结构、必备文件与命名规范，为开发工作奠定基础。

## 组件结构简介

一个「KWC」组件在文件系统中表现为一个**文件夹**，其中包含定义其视图、逻辑、样式和配置的多个文件。

最典型的组件由三个核心文件构成：

- **`componentName.html`**：定义组件的 HTML 视图结构。
- **`componentName.js`**：定义组件的 JavaScript 逻辑与类。
- **`componentName.css`**：定义组件的 CSS 样式（可选）。

这些文件必须直接放在 `src/modules/` 目录下的同名文件夹中。

## 创建组件文件夹

### 文件夹结构

**自动生成的文件夹及文件**
当你使用 `kd-custom-control-cli` 脚手架创建项目时，会自动生成标准的项目目录结构，完整的「KWC」项目目录如下：

    myComponent
      ├──build
          ├──webpack.common.js
          ├──webpack.dev.js
          ├──webpack.prod.js
      ├──server
          ├──config.js
          ├──index.js
      ├──src
          ├──modules
              ├──x
                  ├──app
                      ├──app.css
                      ├──app.html
                      ├──app.js
          ├──devIndex.js
          ├──index.js
          ├──myComponent.js-meta.kwc
      ├──static
      ├──.gitignore
      ├──eslint.config.js
      ├──jsconfig.json
      ├──kwc.config.json
      ├──package-lock.json
      ├──package.json
      ├──README.md

**用户自定义的文件夹及文件**
在上述 `src/modules/` 目录下，你可以创建自己的组件，组件文件夹与核心文件需同名（JavaScript 工具文件可例外，如 utils.js）。以 `myComponent` 组件为例，其文件夹内部结构如下：

    myComponent
      ├──myComponent.html
      ├──myComponent.js
      ├──myComponent.js-meta.kwc  # 自动生成的元数据文件
      ├──myComponent.css
      ├──utils.js                 # 可选的工具文件
      ├──__tests__                # 可选的测试目录
          ├──data
          ├──myComponent.test.js

一个组件文件夹可以包含这些文件

| 文件       | 必需 | 是否 cli 自动创建 | 描述                         |
| :--------- | :--- | :---------------- | :--------------------------- |
| HTML       | 否   | 是                | 为组件提供 UI 界面。         |
| JavaScript | 是   | 是                | 定义组件的逻辑。             |
| meta.kwc   | 是   | 是                | XML 格式，定义组件的元数据。 |
| CSS        | 否   | 是                | 为组件提供样式。             |
| Utilities  | 否   | 否                | 在组件之间共享代码。         |
| Test       | 否   | 否                | 为组件提供单元测试。         |

### 命名规则

组件文件夹及其文件命名必须严格遵守以下规则，以确保框架正确识别和编译：

- 必须以**小写字母**开头。
- 只能包含**字母、数字或下划线 (`_`)**。
- 在同一个命名空间内必须**唯一**。

:::warning
**命名禁止事项**：

- ❌ `my-component` (包含连字符)
- ❌ `1Component` (数字开头)
- ❌ `component_` (下划线结尾)
- ❌ `my__component` (连续下划线)
  :::

:::warning
每个组件都必须直接放在 `src/modules/` 目录下，禁止在组件文件夹内嵌套其他组件文件夹。
:::

**驼峰命名法**
组件文件夹不支持连字符命名，无法直接使用 `my-component` 这类命名形式；为同时兼容 HTML 标签的命名标准，可采用驼峰命名法实现。</br>
将组件文件夹命名为 `myComponent`（驼峰形式），该命名会在 HTML 标签中自动转换为连字符形式。例如，若需在 HTML 文件中引用 `modules/x/myComponent` 组件，对应的标签名称为 `x-my-component`：

```html
<!-- parent.html -->
<template>
  <x-my-component></x-my-component>
</template>
```

---

## 组件文件简介

### HTML 文件

- **作用**：定义组件的用户界面结构。
- **规范**：
  - UI 组件必须包含以 `<template>` 为根标签的 HTML，组件结构需编写在根标签内；
  - 文件名应与组件名一致，需遵循 `componentName.html` 规范，例如 `myComponent.html`。
- **示例**：

```html
<!-- myComponent.html -->
<template>
  <!-- 组件HTML -->
</template>
```

- **渲染**：组件渲染时，`<template>` 标签会被替换为组件对应的标签名。例如，存放于 `modules/x/app` 路径下的组件，运行时会被渲染为 `<x-app>`（其中 `x` 为命名空间）：<br>
  <img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a13f7bffe264705f970ff" style="max-width: 100%; width: 60%;" alt="命名空间-01">

  <img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a140b07ad417580a82b5e" style="max-width: 100%; width: 60%;" alt="命名空间-02">

### CSS 文件

- **作用**：为组件提供私有化的样式规则，借助 Shadow DOM 实现样式封装，避免全局污染。
- **规范**：文件名应与组件名一致，需遵循 `componentName.css` 规范，例如 `myComponent.css`。
- **共享样式**：若需在多个组件间复用样式，可创建一个仅包含 CSS 文件的模块，在其他组件的 CSS 文件中使用 `@import` 引入。

### JavaScript 文件

所有组件必须包含 JavaScript 文件作为主逻辑入口。

- **作用**：定义组件的逻辑结构。
- **规范**：
  - JavaScript 文件遵循 ES6 模块规范；
  - 文件名应与组件名一致，需遵循 `componentName.js` 规范，例如 `myComponent.js`；
  - 通过 `import` 语句导入其他模块的类、函数或变量，通过 `export` 语句向外暴露当前模块的类、函数或变量。

#### UI 组件

针对带 UI 的「KWC」组件，其 JavaScript 文件必须包含以下核心代码，

```js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class MyComponent extends KingdeeElement {}
```

**代码解析**：

- `kwc` 是「KWC」组件的核心模块，开发 UI 组件时需从该模块导入 `KingdeeElement`。
- 通过 `export default` 导出 `MyComponent` 类以供其他组件使用。该类必须是 UI 组件的默认导出，当前不支持导出其他变量或函数。
- 组件类名需遵循 Pascal Case 命名法（每个单词首字母大写），例如 `myComponent.js` 对应的类名为 `MyComponent`。
- 自定义组件需继承 `KingdeeElement`，示例如下：

```js
export default class MyComponent extends KingdeeElement {
  // 组件代码
}
```

UI 组件还包含以下 JavaScript 文件：

- 组件公共 API（公共属性、标注 `@api` 注释的方法）；
- 私有变量和函数；
- 事件处理逻辑；
- 其他无法对外共享的文件。

#### API 模块组件

- **作用**：用于创建无 UI 界面的纯逻辑模块，作为共享代码的服务组件（如工具函数库、业务服务类）。
- **结构**：与 UI 组件文件夹结构类似，但不包含 .html 文件。其 .js 文件通过 `export` 导出功能。
- **示例**：

```js
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @api todo;

  get containerClass() {
    return `todo ${this.todo.isCompleted ? 'completed' : ''}`;
  }
}
```

在 API 模块中，禁止重新导出 `kwc` 模块的核心内容（如 `KingdeeElement`）。

```js
// 禁止使用
export {} from '@kdcloudjs/kwc';
export * from '@kdcloudjs/kwc';
export { registerTemplate } from '@kdcloudjs/kwc';
```

#### 核心装饰器导入

「KWC」模块支持命名导入和默认导入。你可从 `@kdcloudjs/kwc`模块中导入以下模块

- `KingdeeElement`
- `api`
- `wire`
- `track`

**正确导入方式**

```js
import { KingdeeElement, api, wire, track } from '@kdcloudjs/kwc';
```

**错误导入方式**

```js
//  不允许使用的导入语句
import KWC from '@kdcloudjs/kwc';
import * as KWC from '@kdcloudjs/kwc';
import { registerTemplate } from '@kdcloudjs/kwc';
import '@kdcloudjs/kwc';
```

#### 其他 JavaScript 文件

- **作用**：组件文件夹中，除定义 HTML 元素逻辑的主 JavaScript 文件外，可新增其他 JavaScript 文件，用于构建 UI 组件内部代码、复用 API 模块的代码逻辑。
- **规范**：必须遵循 ES6 模块规范，且在所属组件文件夹内命名唯一，示例目录结构如下：

```bash
    myComponent
      ├──myComponent.html
      ├──myComponent.js
      ├──myComponent.css
      ├──someUtils.js
      ├──someMoreUtils.js
```

- **使用**：通过 `export` 语句导出文件内的函数和变量，供组件的主 JavaScript 文件导入并调用。

### 元数据文件

- **作用**：元数据文件为 XML 格式，用于定义自定义控件的元数据配置，涵盖控件基本信息、适用页面类型、不同页面类型下的属性配置等核心内容。
- **使用**：使用`@kdcloudjs/kd-custom-control-cli`命令创建「KWC」项目，会自动生成与项目名对应的元数据文件：`myComponent.js-meta.kwc`。

### 命名空间

在「KWC」项目中，命名空间通常由项目标识或配置文件决定。例如，一个名为 `finance` 的项目，其下所有组件的命名空间可能就是 `finance`。在模板中引用时，需使用 `<finance-component-name>` 的形式。

- **作用**：每个组件均归属某个命名空间，命名空间可整合相关组件，避免与其他命名空间的组件产生命名冲突。
- **规范**：在 HTML 模板中引用指定命名空间的组件时，需遵循 [命名空间]-[组件名] 格式，例如引用 `kd` 命名空间的组件需写为 `kd-component-name`。

- **示例**：

```html
<template>
  <kd-card title="示例">
    <fi-title label="业务组件标题"></fi-title>
  </kd-card>
</template>
```

以上示例中，组件引用了 `kingdee-base-components` 提供的基础组件 `kd-card`，并在该组件内嵌套了业务命名空间 `fi` 下的自定义组件 `fi-title`（由 `fi` 域开发人员封装，用于展示业务标题）。
