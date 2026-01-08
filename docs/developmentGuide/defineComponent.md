---
toc: content
title: '组件结构'
order: '2'
---

一个 KWC 组件必须包含：

- 一个 HTML 文件
- 一个 JavaScript 文件

作为 API 模块（如公共函数，工具方法等）的组件，可以不需要 HTML 文件。但是为了确保 KWC 框架能将组件自动关联，需要将它们放在与组件名称相同的组件文件夹中。

除此之外，组件文件夹中还可以包含以下类型的文件：

- CSS 文件
- 其他 JavaScript 文件
- 单元测试文件

## 组件文件夹

要定义一个组件，需要创建一个文件夹，将组件的文件直接放在 modules 文件夹下。如果你使用了 `@kdcloudjs/kd-custom-control-cli`命令行工具的话，在创建项目文件夹时，会自动为你创建。命令行工具构建的 KWC 项目结构如下所示：

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

文件夹及其文件必须具有相同的名称。但是 JavaScript 代码的工具文件可以有不同的名称，如 utils.js。

    myComponent
      ├──myComponent.html
      ├──myComponent.js
      ├──myComponent.js-meta.kwc
      ├──myComponent.css
      ├──utils.js
      ├──__tests__
          ├──data
          ├──myComponent.test.js

一个组件文件夹可以包含这些文件

| 文件       | 是否必需 | 是否使用 cli 工具自动创建 | 描述                         |
| :--------- | :------- | :------------------------ | :--------------------------- |
| HTML       |          | 是                        | 为组件提供 UI 界面。         |
| JavaScript | 是       | 是                        | 定义组件的逻辑。             |
| meta.kwc   | 是       | 是                        | xml 格式，定义组件的元数据。 |
| CSS        |          | 是                        | 为组件提供样式。             |
| Utilities  |          |                           | 在组件之间共享代码。         |
| Test       |          |                           | 为组件提供单元测试。         |

## **名称命名规则**

文件夹及其文件必须遵循以下命名规则：

- 必须以小写字母开头
- 只能包含字母数字或下划线字符
- 在命名空间中必须是唯一的
- 不能包含空格
- 不能以下划线结尾
- 不能包含两个连续的下划线
- 不能包含连字符(-)

**注意**

每个组件需要直接保存在 src/modules 下。不能在一个组件文件夹中嵌套另一个组件。

KWC 组件需要尽量匹配网页元素的 HTML 标准。而 HTML 标准要求自定义元素名称必须包含连字符。

在我们的工程项目中，`modules`文件夹下的文件夹都是一个单独的命名空间，如 `modules/x`, `modules/abc`中，`x`和 `abc`都是一个独立的命名空间。

由于文件夹不允许出现连字符，我们无法为组件命名为 `my-component`,但是我们又需要符合 HTML 标准的话，我们可以使用驼峰命名法来解决。

将组件文件夹命名为 `myComponent`。组件文件夹的驼峰命名会在 HTML 标签中被处理为连字符形式。例如，在 html 文件中，我们要使用 `modules/x/myComponent`这个组件，我们需要使用 `x-my-component`:

```html
<!-- parent.html -->
<template>
  <x-my-component></x-my-component>
</template>
```

## HTML 文件

每个 UI 组件都必须有一个以 `<template>`为根标签的 HTML 文件。API 模块组件则不需要。

HTML 文件遵循命名规范 `componentName.html`,如 `myComponent.html`

HTML 文件的实际内容需要在 `<template>`标签内创建组件的 HTML。即该模板元素包含了组件的 HTML。

```html
<!-- myComponent.html -->
<template>
  <!-- 组件HTML -->
</template>
```

当组件渲染时，`<template>`会被替换为组件的名称，`<namespace-component-name>`。例如，我们的组件在 `modules/x/app`中，实际运行时会被渲染成 `<x-app>`,其中 `x`是命名空间：

![ea16dda0cfbdd9ed74033235bd7f4c2b__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a13f7bffe264705f970ff)

![3271f1b1a2ffb5847c624c12a6727229__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a140b07ad417580a82b5e)

## CSS 文件

组件可以包含 CSS 文件，在其中使用标准 CSS 语法设置 KWC 组件的样式。

要设置组件样式，请在组件文件夹中创建一个与组件同名的 CSS 样式文件。例如组件名称为 `myComponent`,则样式表的名称为 `myComponent.css`.

如果希望在组件之间共享 CSS 样式规则，请创建一个仅包含 CSS 文件的模块。将模块导入 KWC 组件的 CSS 文件。

## JavaScript 文件

每个组件都必须要有一个 JavaScript 文件。如果组件有其 UI 元素，那么 JavaScript 文件则定义了 HTML 元素相关的属性以及交互逻辑。如果组件只是 API 模块，那么 JavaScript 文件则负责导出功能，以便其他组件使用。

在 KWC 组件中，JavaScript 文件是 ES6 模块。默认情况下，模块中声明的所有内容都是本地的，其范围仅限于当前模块。

如果要导入模块中声明的类，函数或者变量，请使用 `import`语句。

如果允许其他代码使用模块中的类，函数或者变量，请使用 `export`语句。

### UI 组件

JavaScript 文件遵循命名约定 `componentName.js`,比方说 `myButton.js`

每个 UI 组件都必须要包含一个有如下代码的 JavaScript 文件。

```js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class MyComponent extends KingdeeElement {}
```

KWC 组件中的核心模块是 `kwc`。在开发 UI 组件中都需要从 `kwc` 模块导入 `KingdeeElement`。`KingdeeElement`是标准 HTML 元素的自定义包装器。

创建属于你的组件，并扩展 `KingdeeElement`

```js
export default class MyComponent extends KingdeeElement {
  // 组件代码
}
```

`export default`关键字导出 `MyComponent`类以供其他组件使用。该类必须是 UI 组件的默认导出。**当前不支持导出 UI 组件中的其他变量或者函数。**

作为组件类名，约定是使用 Pascal Case，即每个单词的第一个字母都是大写。比方说 myComponent.js，其类名是 `MyComponent`

JavaScript 文件可以包含：

- 组件的公共 API，即公共属性以及用 `@api`注释的方法
- 私有变量和函数
- 事件处理逻辑

除了组件本声明的 js 文件之外，UI 组件的文件夹还可以包含其他 JavaScript 文件。但是这些文件中的代码仅供组件自己使用，无法对外共享。

### API 模块组件

没有 UI 的 KWC 组件可用作共享代码的 API 模块组件。API 模块组件有时称为服务组件。

要在组件之间共享代码，请创建一个 ES6 模块并导出要公开的变量或函数。

ES6 模块是一个显式导出其他模块可以使用的功能的文件。模块可以使你轻松构建代码，而不会污染全局范围。

API 模块组件遵循与 UI 组件相同的文件夹结构和命名约定。不同的地方只是没有 HTML 文件。

在使用 API 模块组件时，不允许使用 kwc 模块的这些导出语句

```js
// 禁止使用
export {} from '@kdcloudjs/kwc';
export * from '@kdcloudjs/kwc';
export { registerTemplate } from '@kdcloudjs/kwc';
```

### KWC 导入声明

KWC 模块可以使用命名导入和默认导入。你可从 `kwc`模块中导入以下模块

- `KingdeeElement`
- `api`
- `wire`
- `track`

```js
import { KingdeeElement, api, wire, track } from '@kdcloudjs/kwc';
```

不允许使用 `kwc`模块的这些导入语句

```js
//  不允许使用的导入语句
import kwc from '@kdcloudjs/kwc';
import * as kwc from '@kdcloudjs/kwc';
import { registerTemplate } from '@kdcloudjs/kwc';
import '@kdcloudjs/kwc';
```

### 其他 JavaScript 文件

除了创建 HTML 元素的 JavaScript 文件外，组件的文件夹还可以包含其他 JavaScript 文件。使用这些 JavaScript 文件在 UI 组件中构建代码，并共享来自 API 模块的代码。

这些 JavaScript 文件必须是 ES6 模块的，并且必须在其所在的组件文件夹中命名唯一。

    myComponent
      ├──myComponent.html
      ├──myComponent.js
      ├──myComponent.css
      ├──someUtils.js
      ├──someMoreUtils.js

通过 `export`导出文件中的函数和变量，以便组件的主 JavaScript 文件可以导入，使用它们。

## 元数据文件

该 XML 文件用于定义一个自定义控件的元数据配置，用于描述基本信息、适用的页面类型、不同页面类型下的属性配置等。

目前在自定义控件中支持 KWC 框架，因此使用`@kdcloudjs/kd-custom-control-cli`命令创建 KWC 项目。

当使用 kd-custom-control-cli 命令创建 KWC 项目后，会自动生成与项目名对应的元数据文件：myComponent.js-meta.kwc。

## 命名空间

每个组件都是命名空间的一部分，它将相关组件组合在一起，并防止与来自另一个命名空间的组件发生命名冲突。

在 HTML 模板中，要引用 `kd`命名空间中的组件，请使用 `kd-component-name`。

在苍穹自定义控制 KWC 框架中，默认使用方案 ID 作为命名空间。

### 示例：使用 kd 和业务命名空间中的组件

此组件使用 `kd-card`,这是 `kingdee-base-components`中提供的基础组件。`kd-card`组件中包含了一个自定义组件，假设业务命名空间是 `fi`，来自 `fi`的开发人员自行封装了组件用于展示标题，并将自定义组件命名为 `title`。

```html
<template>
  <kd-card title="示例">
    <fi-title label="业务组件标题"></fi-title>
  </kd-card>
</template>
```
