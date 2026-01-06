---
toc: content
title: 'KWC开发指南'
---

# KWC 开发指南

## KWC 介绍

### KWC 是什么

KWC（Kingdee Web Components）是一个具有自己 API 的可重用的自定义 HTML 元素，是金蝶 AI 苍穹平台基于现代 Web Components 标准构建的企业级前端组件解决方案。它继承并扩展了原生 Web Components 技术，为金蝶生态系统的前端开发提供了一套标准化、可复用、高性能的组件开发范式。我们可以使用 KWC 框架在苍穹平台上构建自定义用户界面、Web 和移动应用程序。

### KWC 优势

**Web Component** 作为浏览器原生支持的组件化标准，其「框架无关、独立封装、原生兼容」的核心特性，为跨项目、跨技术栈的组件复用提供了天然优势。

KWC 基于 Web Component 标准，完整继承了这些特性：每个 KWC 组件都具备独立的 DOM 结构、隔离的样式空间与专属 API，可脱离 Vue、React 等具体前端框架独立运行，既能彻底解决多项目间组件重复开发的冗余问题，又能有效规避不同技术栈带来的组件兼容、样式冲突等痛点，真正实现「一次开发、多端复用、跨栈集成」的开发目标。

与此同时，KWC 并非对 Web Component 原生能力的简单复用，而是结合金蝶 AI 苍穹平台的企业级业务场景与开发需求，进行了全方位的定制化增强：

- 通过简化的语法设计、统一的开发规范，屏蔽了 Web Component 原生 API 的繁琐细节，大幅降低开发者的学习门槛与开发成本，让开发者更专注于业务逻辑实现；
- 深度适配金蝶 AI 苍穹平台的技术体系，与平台现有工具链、系统架构无缝衔接，确保组件在复杂企业级项目中能够高效落地、稳定运行，满足平台对组件性能、安全性、可维护性的严苛要求。

KWC 的优势还可简单总结如下：

**学习成本低**

开发者编写的大部分代码都是标准的 JavaScript 和 HTML，通过 API 与后端通信，快速上手，无需额外学习其他框架。

**业务驱动的灵活前端开发**

可根据业务场景自由开发界面，实现个性化布局与交互。

**多端支持与体验提升**

一套组件跨 PC、移动等多端运行，统一交互标准，利用浏览器原生渲染能力，显著提升性能与用户体验。

**智能助力**

借助应用开发智能体，实现组件自动生成与智能优化，提升开发效率与创新空间。

**生态价值**

业务产品线及开发者可以自定义并沉淀自己的组件库，结合社区资源与平台扩展机制，逐步形成可复用、可共享、可演进的前端生态。

KWC 适合解决以下三大场景：

1.  要求跨端能力与体验一致性
2.  复杂交互页面
3.  追求极致的性能与稳定性

### 开发准备

在进行 KWC 组件开发前，需完成环境配置、工具选型与基础搭建，确保开发流程顺畅高效。

1.  首先需要安装 node.js，并确保 node 版本是 18 或以上。

可到 [Node 官网](https://nodejs.cn/download/) 下载，或使用 nvm 管理 Node 版本。安装完成后运行 node -v` 查看版本以确认安装成功。

```bash
$ node -v
v20.17.0
$ npm -v
10.8.2
```

然后需要安装包管理工具，node 默认自带 npm，可以选择 yarn 或者 pnpm。

安装 yarn：

```bash
$ npm install -g yarn
$ yarn -v
1.22.21
```

安装 pnpm：

```bash
$ npm install pnpm -g
$ pnpm -v
9.7.1
```

安装脚手架。

```bash
$ npm install -g @kdcloudjs/kd-custom-control-cli
## OR
$ yarn global add @kdcloudjs/kd-custom-control-cli

$ kd-custom-control-cli -v
1.0.4
```

1.  还需要安装 git 工具，可到[git 官网](https://git-scm.com/install/windows)下载安装，在创建项目模板时，从代码仓库中下载模板文件。

2.  KWC 开发首选 VSCode 作为代码编辑器，其轻量性、高扩展性及对前端技术的友好支持，能大幅提升开发效率。

下载地址：[VSCode 官网](https://code.visualstudio.com/Download)，根据操作系统选择对应版本安装。

基础配置：建议开启「自动保存」（文件 → 自动保存）、「格式化 On 保存」（设置 → 搜索 Format On Save 勾选），减少手动操作成本。

**推荐插件：**

为适配 KWC 开发场景（HTML/CSS/JavaScript 原生开发、组件调试），推荐安装以下插件：

- ESLint：代码语法检查工具，配合 KWC 开发规范，自动识别语法错误、规范代码风格。
- Prettier：代码格式化工具，统一代码缩进、引号、换行等格式，提升代码可读性。
- Web Component DevTools：Web Component 专属调试插件，支持查看自定义元素、Shadow DOM 结构，方便组件调试。
- Path Intellisense：路径自动补全插件，快速关联组件的 HTML/CSS/JS 文件，减少路径编写错误。
- HTML CSS Support：增强 HTML 与 CSS 关联支持，提供样式类名补全、样式跳转等功能。

1.  创建 KWC 项目

使用 kd-custom-control-cli create \[自定义控件方案 id] 创建一个新的自定义控件工程，注意这里的自定义控件名称和设计器中**方案 id**保持一致，输入格式只能包含小写字母和数字。执行创建命令后，我们选择 KWC 框架。

```bash
$ kd-custom-control-cli create myComponent
? 选择您需要的开发框架 » - Use arrow-keys. Return to submit. - KWC
? 是否需要安装KDesign？ » 否 / 是 - 是
下载模板完毕
自定义控件 myComponent创建成功，执行下面命令启动项目
cd myComponent
npm install
npm start
模板生成耗时: 3.944s
```

参数选项说明

| 参数                 | 选项                               | 默认  | 说明                                            |
| :------------------- | :--------------------------------- | :---- | :---------------------------------------------- |
| 开发框架             | React / Vue2 / Vue3 / jQuery / KWC | React |                                                 |
| 是否安装默认 UI 框架 | 否 / 是                            | 是    | React 项目使用 kdesign，Vue 项目使用 element ui |

1.  启动项目

执行`npm/yarn install` ，然后再执行`npm/yarn start` 命令启动本地服务：

```bash
$ yarn start
Project is running at:
Loopback:  http://localhost:8000/, http://127.0.0.1:8000/
```

在浏览器里打开 http\://localhost:8000/，能看到模板样式，代表项目启动成功。

关于如何进行本地调试和远程调试，可参考调试和调试章节。

## 组件结构

一个 KWC 组件必须包含：

- 一个 HTML 文件
- 一个 JavaScript 文件

作为 API 模块（如公共函数，工具方法等）的组件，可以不需要 HTML 文件。但是为了确保 KWC 框架能将组件自动关联，需要将它们放在与组件名称相同的组件文件夹中。

除此之外，组件文件夹中还可以包含以下类型的文件：

- CSS 文件
- 其他 JavaScript 文件
- 单元测试文件

### 组件文件夹

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

### **名称命名规则**

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

### HTML 文件

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

### CSS 文件

组件可以包含 CSS 文件，在其中使用标准 CSS 语法设置 KWC 组件的样式。

要设置组件样式，请在组件文件夹中创建一个与组件同名的 CSS 样式文件。例如组件名称为 `myComponent`,则样式表的名称为 `myComponent.css`.

如果希望在组件之间共享 CSS 样式规则，请创建一个仅包含 CSS 文件的模块。将模块导入 KWC 组件的 CSS 文件。

### JavaScript 文件

每个组件都必须要有一个 JavaScript 文件。如果组件有其 UI 元素，那么 JavaScript 文件则定义了 HTML 元素相关的属性以及交互逻辑。如果组件只是 API 模块，那么 JavaScript 文件则负责导出功能，以便其他组件使用。

在 KWC 组件中，JavaScript 文件是 ES6 模块。默认情况下，模块中声明的所有内容都是本地的，其范围仅限于当前模块。

如果要导入模块中声明的类，函数或者变量，请使用 `import`语句。

如果允许其他代码使用模块中的类，函数或者变量，请使用 `export`语句。

#### UI 组件

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

#### API 模块组件

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

#### KWC 导入声明

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

#### 其他 JavaScript 文件

除了创建 HTML 元素的 JavaScript 文件外，组件的文件夹还可以包含其他 JavaScript 文件。使用这些 JavaScript 文件在 UI 组件中构建代码，并共享来自 API 模块的代码。

这些 JavaScript 文件必须是 ES6 模块的，并且必须在其所在的组件文件夹中命名唯一。

    myComponent
      ├──myComponent.html
      ├──myComponent.js
      ├──myComponent.css
      ├──someUtils.js
      ├──someMoreUtils.js

通过 `export`导出文件中的函数和变量，以便组件的主 JavaScript 文件可以导入，使用它们。

### 元数据文件

该 XML 文件用于定义一个自定义控件的元数据配置，用于描述基本信息、适用的页面类型、不同页面类型下的属性配置等。

目前在自定义控件中支持 KWC 框架，因此使用`@kdcloudjs/kd-custom-control-cli`命令创建 KWC 项目。

当使用 kd-custom-control-cli 命令创建 KWC 项目后，会自动生成与项目名对应的元数据文件：myComponent.js-meta.kwc。

### 命名空间

每个组件都是命名空间的一部分，它将相关组件组合在一起，并防止与来自另一个命名空间的组件发生命名冲突。

在 HTML 模板中，要引用 `kd`命名空间中的组件，请使用 `kd-component-name`。

在苍穹自定义控制 KWC 框架中，默认使用方案 ID 作为命名空间。

#### 示例：使用 kd 和业务命名空间中的组件

此组件使用 `kd-card`,这是 `kingdee-base-components`中提供的基础组件。`kd-card`组件中包含了一个自定义组件，假设业务命名空间是 `fi`，来自 `fi`的开发人员自行封装了组件用于展示标题，并将自定义组件命名为 `title`。

```html
<template>
  <kd-card title="示例">
    <fi-title label="业务组件标题"></fi-title>
  </kd-card>
</template>
```

## HTML 模板

KWC 组件使用虚拟 DOM 来智能高效地展示组件。最佳实践是使用 KWC 作为 DOM 来呈现你的页面，而非通过 JavaScript 来编写。

除了在 HTML 模板中使用 `<template>`根元素以外，允许嵌套 `<template>`来实现需求。

### 使用 HTML 模板

使用标准 HTML 和一些 KWC 组件来编写模板。

在组件渲染时，`<template>`会被替换为 `<namespace-component-name>`。

```html
<template>
  <div>Hello World</div>
</template>
```

例如，在浏览器控制台中，具有模板 app.html 的组件呈现为 `<x-app>`，其中 `x` 是命名空间。

![ea16dda0cfbdd9ed74033235bd7f4c2b__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a13f7bffe264705f970ff)

![3271f1b1a2ffb5847c624c12a6727229__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a140b07ad417580a82b5e)

HTML 模板会将数据呈现到 DOM。

#### 嵌套模板

HTML 模板可以包含带有指令的嵌套 `<template>`标签。

指令指的是特殊的 HTML 属性，例如 `kwc:if`和 `for:each`，它们可以在 HTML 元素标签中作为特殊的 DOM。

嵌套的 `<template>`标签必须包含以下指令之一: `for:each`,`iterator: iteratorname`, `kwc:if`,`kwc:else`,`kwc:elseif`,`if:true|false`

但是需要注意的是，嵌套的 `<template>`标签不能与其他指令或者 HTML 属性一块使用。例如，不要在嵌套的 `<template>`标记上使用 `class`属性。

### 在模板中绑定数据

可以使用组件模板中的属性将数据绑定到组件的 JavaScript 类中的属性。

在模板中，用不带空格的大括号将属性扩起来: `{property}`。要计算属性的值，需要在 JavaScript 类中使用 getter： `get property() {}`。在模板中，属性可以是 JavaScript 的基础类型(例如 `name`)，又或者是从对象中通过点语法访问到的内容(例如 `person.firstName`)。

KWC 不允许计算表达式，如 `person[2].name['John']`

模板中使用的属性应该包含原始值，除了在 `for:each` 或者是迭代器指令中使用。

#### 示例：将组件模板属性绑定到 JavaScript

如下代码，将模板中 `greeting`属性绑定到 JavaScript 中的 `greeting`属性。

```html
<!-- hello.html -->
<template>
  <div>Hello, {greeting}!</div>
</template>
```

</br>

```js
// hello.js
import { KingdeeComponent } from '@kdcloudjs/kwc';

export default class Hello extends KingdeeComponent {
  greeting = 'World';
}
```

`{ }`中的属性必须是有效的 JavaScript 变量或者成员表达式。例如：`{data}`和 `{data.name}`都是有效的属性。不要在属性周围添加空格，否则会被判定为非法属性。

接下来，我们修改下组件，添加一个输入字段，并且将输入的内容作为打招呼的对象的名称。

`kd-input`字段使用 `onchange`来监听值的改变。当输入框中内容发生变化时，JavaScript 文件中的 `handleChange`函数会执行。请注意，要将 `handleChange`函数绑定到模板，我们需要使用相同的语法 `{handleChange}`。

```html
<!-- hello.html  -->
<template>
  <div>Hello, {greeting}!</div>
  <kd-input label="名称" value="{greeting}" onchange="{handleChange}">
  </kd-input>
</template>
```

</br>

```js
// hello.js
import { KingdeeComponent } from '@kdcloudjs/kwc';

export default class Hello extends KingdeeComponent {
  greeting = 'World';

  handleChange(event) {
    this.greeting = event.target.value;
  }
}
```

**注意**

当组件重新渲染时，模板中使用的表达式将被重新计算。

#### 使用 getter 而非表达式

如果计算属性的值，建议是使用 `getter`而非表达式。例如，要计算某样商品的总价，在 JavaScript 中使用 getter 函数，而不是使用模板中的表达式。

getter 函数远比表达式要强大，并且还支持单元测试。

要定义一个计算 JavaScript 类中值的 getter，只需：

```js
get propertyName() { ... }
```

从 HTML 中访问 getter 的话，通过大括号+函数名即可：`{propertyName}`

下面的示例中，用户输入商品的单价和数量，然后通过 getter 函数计算了总额。

```html
<!-- priceCalculator.html  -->
<template>
  <div>
    <kd-input-number
      label="商品单价"
      name="unitPrice"
      onchange="{handleChange}"
    >
    </kd-input-number>
    <kd-input-number label="数量" name="quantity" onchange="{handleChange}">
    </kd-input-number>
    <p>总价：{totalPrice}</p>
  </div>
</template>
```

</br>

```js
// priceCalculator.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class PriceCalculator extends KingdeeElement {
  unitPrice = 0;
  quantity = 0;

  handleChange(event) {
    const field = event.target.name;
    if (field === 'unitPrice') {
      this.unitPrice = event.target.value;
    } else if (field === 'quantity') {
      this.quantity = event.target.value;
    }
  }

  get totalPrice() {
    return this.unitPrice * this.quantity;
  }
}
```

### 绑定 HTML class

使用`class` 属性来设置组件或者元素的 css 样式。在 kwc 组件开发中，你可以使用 `class`对象绑定而不是复杂的字符串来生成类名。

```html
<templates>
  <h1>class 对象绑定示例</h1>
  <div class="{computedClassNames}">应用 class 对象</div>
</templates>
```

</br>

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class extends KingdeeElement {
  position = 'left';
  fullWidth = true;
  hidden = false;

  get computedClassNames() {
    return [
      'div__block',
      this.position && `div_${this.position}`,
      {
        'div_full-width': this.fullWidth,
        hidden: this.hidden,
      },
    ];
  }
}
```

最终元素渲染时，其类结果为 `<div class="div__block div_left div_full-width">应用 class 对象</div>`

#### class 绑定注意事项

kwc 开发允许使用数组或者对象来绑定多个样式

- 传入数组的话，会基于各个项进行计算。例如，如果传入 `['highlight', 'yellow']`，最终元素则是 `class="highlight yellow"`
- 传入对象的话，KWC 会在编译时迭代对象上的可枚举的字符串属性，不包含原型链上的符号和属性，并且会应用具有真值关联的值。如传入 `{ highlight: true, hidden: false }`,最终结果是 `class="highlight"`

KWC 会忽略原始对象和复杂对象，即传入值的类型是布尔值，数字和函数的话，对应的值会被删除。要将布尔值或数值显示为字符串的话，需要使用 `String(value)`转换为字符串，如 `[String(isYellow), Stirng(num)]`会呈现为 `class="true 1"`(假设 `isYellow`为 `true`，`num`为 `1`)

#### class 绑定示例

| 类型     | 例子                                                   | 输出结果                     |
| :------- | :----------------------------------------------------- | :--------------------------- |
| String   | "note highlight"                                       | class="note highlight"       |
| Boolean  | FALSE                                                  | class=""                     |
| Number   | 10                                                     | class=""                     |
| Function | () => {}                                               | class=""                     |
| Array    | \["note", "highlight"]                                 | class="note highlight"       |
|          | \[false, "note", null]                                 | class="note"                 |
|          | \["block", { note: true }, \["highlight"]]             | class="block note highlight" |
| Object   | { block: true, hidden: false, 'note highlight': true } | class="block note highlight" |

### 绑定内联样式

使用元素或组件的 `style`在元素或组件上附加一个或多个类。

```html
<div class="block" style="{inlineStyle}"></div>
```

</br>

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class extends KingdeeElement {
  percent = 80;

  get inlineStyle() {
    return `width: ${this.percent}%; font-size: 20px`;
  }
}
```

在使用内联样式时。建议是首先考虑将 `class`属性与组件包中的样式表一起使用，以实现复用。但是，当你需要计算属性以根据条件生成不同的样式时，那么使用内联样式就比较合适

```js
get computedStyles() {
    if (this.iconName) {
    const color = getIconColor(this.iconName);
    if (color) {
        return `background-color: ${color}`;
    }
    }
    const fallbackColor = '#222';
    return `background-color: ${fallbackColor}`;
}
```

### 根据条件渲染 HTML

条件指令是特殊的 HTML 属性，可以用于操作 DOM。需要根据不同的条件显示不同的 HTML 内容时，请将条件指令添加到包含条件内容的标签中。

KWC 组件支持指令 `kwc:if={property}`,`kwc:elseif={property}`和 `kwc:else`。这几个指令会将 `{property}`绑定到模板，根据数据的 `true`或 `false`来删除或者插入 DOM 元素。

#### 用法和注意事项

条件指令经常用于嵌套的 `<template>`标签和 HTML 的标准标签(如 `<div>`等)，除此之外，也允许用于自定义组件和基础组件。

#### 示例：静态条件

```html
<template>
  <template kwc:if="{property1}">Statement 1</template>
  <template kwc:elseif="{property2}">Statement 2</template>
  <template kwc:else>Statement 3</template>
</template>
```

上面的代码中，有个 `property1`和 `property2`两个属性，三个语句中根据该属性进行渲染：

- `property1`为 `true`时，仅渲染 Statement 1
- `property2`为 `true`时，仅渲染 Statement 2
- `property1`和 `property2` 都为 `false` 时，仅渲染 Statement 3

#### 示例：交互条件

下面这个例子中，模板包含有一个输入框，输入值大于 10 时，`handleChange` 将设置 `areDetailsVisible`的值，为 `true`则显示嵌套模板

```html
<template>
  <kd-card>
    <div>
      <kd-input label="展示细节" onchange="{handleChange}"></kd-input>
      <template kwc:if="{areDetailsVisible}">
        <div>细节</div>
      </template>
    </div>
  </kd-card>
</template>
```

</br>

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class DetailRender extends KingdeeElement {
  areDetailsVisible = false;

  handleChange(event) {
    this.areDetailsVisible = event.target.value > 10;
  }
}
```

![d2b21fa024d871dea8221842cf9b475b__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a1741bffe264705f97188)

![10a27a80d1f60b2d89faa9df91539bf6__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a174c15bee62062d20ccb)

请注意，JavaScript 并不会操作 DOM，它只是更改了属性的值。

#### 示例：嵌套条件指令

你可以将条件语句作用在多个模板中，以创建复杂的自定义逻辑。比方说，检查用户是否已经登录，已经登录的用户是否有新的通知。

```html
<template>
  <template kwc:if="{isLoggedIn}">
    <p>欢迎您，{username}</p>
    <template kwc:if="{hasNewNotification}">
      <strong>您有一条新的消息！</strong>
    </template>
    <template kwc:else>
      <div>暂无消息</div>
    </template>
  </template>
  <template kwc:else>
    <p>请登录</p>
  </template>
</template>
```

**注意**

使用`<kwc:if>`,`<kwc:elseif>`和 `<kwc:else>`的元素必须连续，中间不能出现其他元素，否则会引发错误。

### 渲染列表

要渲染列表的话，需要使用 `for:each`或者迭代器指令来迭代数组。

迭代器指令具有 `first`和 `last`属性，允许我们快速访问第一个和最后一个项。

请记住，无论使用的是哪种指令，都必须使用 `key`来为每一个元素项分配唯一的 ID。在列表数据更改时，kwc 框架会根据 key 来判断哪些项需要修改。模板中的 `key`主要是用于性能优化，在运行时不会反映在 DOM 中。

#### for\:each

使用 `for:each`指令时，使用 `for:item="currentItem"`来访问当前项。

如下例子，迭代访问了一个名为 students 的数组：

```html
<template>
  <ul>
    <template for:each="{students}" for:item="student">
      <li key="{student.no}">{student.name}</li>
    </template>
  </ul>
</template>
```

</br>

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class StudentTemplate extends KingdeeElement {
  students = [
    {
      no: '001',
      name: '黎明',
    },
    {
      no: '002',
      name: '赵四',
    },
  ];
}
```

**重要**

列表中的每个项都必须有一个 key。当列表发生变更时，框架会使用 key 来标识每个项，以便它能重新渲染被更改的内容。

key 必须是字符串或者是数字，不能是对象。

不能将索引作为 key 的值。key 的值需要是唯一的，以便提升渲染上的性能。

#### 迭代器

如果需要对数组的第一项或者最后一项有特殊操作，那么建议使用迭代器指令 `iterator: iteratorname={array}`

使用 `iteratorname`可以访问以下属性：

- `value`- 数组中的值，使用此属性可以访问数组的属性，例如 `{iteratorname}.value.{propertyName}`
- `index`- 索引
- `first`- 布尔值，表明该项是否为第一项
- `last`- 布尔值，表明该项是否为最后一项

```html
<template>
  <ul>
    <template iterator:it="{students}">
      <li key="{it.value.no}">{it.value.name}</li>
    </template>
  </ul>
</template>
```

### 渲染多个模板

有些时候，你可能希望渲染具有多个外观和风格的组件，但又不想将 HTML 混合在一个文件当中。比方说，组件的一个版本是纯文本，而另一个版本则是显示图像和文本。那么这种场景的话，你可以导入多个 HTML 模板并编写不同的条件逻辑来进行展示。

在你的组件文件夹中创建多个 HTML 文件。将它们导入，并在 `render()` 方法中添加一个条件，以根据组件的状态返回正确的模板。`render()`方法的返回值必须是模板的引用。

```js
// multipleTemplates.js
import { KingdeeElement } from '@kdcloudjs/kwc';
import templateOne from './templateOne.html';
import templateTwo from './tempalteTwo.html';

export default class MultipleTemplates extends KingdeeElement {
  showTemplateOne = true;

  render() {
    return this.showTemplateOne ? templateOne : templateTwo;
  }

  switchTemplate() {
    this.showTemplateOne = !this.showTemplateOne;
  }
}
```

```html
<!-- templateOne.html -->
<template>
  <kd-card title="模板一">
    <div>模板一</div>
    <p>
      <kd-button label="模板切换" onclick="{switchTemplate}"></kd-button>
    </p>
  </kd-card>
</template>
```

</br>
```html
<!-- templateTwo.html -->
<template>
    <kd-card title="模板二">
    <div>模板二</div>
    <p>
        <kd-button label="模板切换" onclick={switchTemplate}></kd-button>
    </p>
    </kd-card>
</template>
```
要从额外的模板引用 css，css 的文件名必须与额外的文件名匹配。例如 templateTwo.html 只能从 templateTwo.css 引用 css。

    MultipleTemplate
      ├──multipleTemplate.html
      ├──multipleTemplate.js
      ├──templateOne.html
      ├──templateOne.css
      ├──templateTwo.html
      ├──templateTwo.css

## CSS 样式

`kingdee-base-components`中提供的基础组件使用了 kingdee design system 的样式。如 `kd-button`,`kd-card`,`kd-toast`等组件。其中一些组件中提供了 `variant`属性可用于设置组件的变体。例如 `kd-button`的 `variant`属性取值可以是 `primary`,`ghost`,`secondary`和 `text`。你可以根据自己的需求以及组件文档来进行调整。

### Kingdee design system

#### 基础组件的使用

要更改 kd 组件的样式，请首先查看该组件的文档，更改相应的属性来修改组件的外观，如对齐方式，填充，边距或者排版等。

#### 应用自定义 css 类

要进一步自定义你的代码，请创建你自己的自定义的 css 类，而不是覆盖 KDDS 类。例如，不要去修改`.kdds-input`类

### CSS 样式

一个组件的文件夹中只能有一个样式表。样式表使用标准的 CSS 语法，你可以使用大多数的选择器。

在 Shadow DOM 中，组件样式表定义的样式范围限定为组件。此规则允许你在不同的上下文中重复使用组件，而不会丢失其样式。还可以防止组件的样式覆盖页面其他部分的样式。

#### Shadow DOM 的 CSS 封装

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

#### CSS 级联和权重

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

#### CSS 属性继承

如果未找到级联值，则适用于 CSS 继承。如颜色或者字体等属性值，会从父元素中继承。

`<div>Some <span>text</span></div>`这段代码中，如果将 `div`的颜色设置为红色，则其中的文字都会是以红色呈现，因为 `color`继承自父元素。

但是并非所有的属性都可以从父元素中继承，具体 CSS 属性的继承规则可以参考 MDN 文档。

#### 将 CSS 样式表赋值给组件

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

### 为组件创建样式钩子

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

### 共享 CSS

使用通用的 CSS 模块为你的组件创建一致的外观和风格。在 CSS 模块中定义样式，并将该模块导入到你想要共享的组件中。

```css
/* myComponent.css */
@import 'namespace/moduleName';
@import 'x/cssLibrary';
```

## JavaScript 脚本

### 共享 JavaScript

组件之间要共享代码，需要在 API 模块组件中创建一个 ES6 模块，并使用标准的 JavaScript 语法导出要共享的变量或者函数。

KWC 支持两种共享方式：

- 在组件的文件夹中创建 JavaScript 文件。在组件内部使用相对路径导入代码。

```
    ───myComponent
        ├──myComponent.html
        ├──myComponent.js
        ├──myComponent.js-meta.xml
        ├──myFunction.js
        └──utils.js
```

```js
// myComponent.js
import { getAmount, calculateCost } from './utils';
import myFunction from './myFunction';
```

- 创建一个 API 模块组件库，其它组件可以使用 `x/componentName`语法导入这些代码、

```
lwc
  └───myComponent
    ├──myComponent.html
    ├──myComponent.js
    ├──myComponent.js-meta.xml
    ├──myFunction.js
    └──utils.js
```

```js
// myComponent.js
import { getTermOptions, calculateMonthlyPayment } from 'c/mortgageUtils';
```

**重要提示**

在 `import`语句中，请指定要导入的文件夹而不是文件

#### 导出默认函数和变量

在 JavaScript ES6 模块中导出默认函数和变量的话，可以使用 `export default`

```js
export default MyComponent;
// 或者
export { MyComponent as default };
```

#### 导出命名函数和变量

```js
const getTempOptions = () => {
  return [];
};

const name = 'Hello';

export { getTempOptions, name };
```

#### 入口文件解析

KWC 框架仅会将组件文件夹中的同名 JavaScript 文件或者 css 文件作为入口。如 `x/moduleName`中，入口文件是 `moduleName.js`，当该文件不存在时，会寻找 `moduleName.css`，如果两者都不存在的话，那么编译将会失败。

#### 导出内容

在一个组件文件夹中可能会存在多个 JavaScript 文件，你可能需要从不同文件导出函数等以供外面调用。

对于上述场景，我们可以在需要导出的内容的文件中，先 `export`到外部，再从入口文件利用 `export from`进行导出

```
├──utils
    ├── utils.js
    ├── moreUtils.js
```

```js
// moreUtils.js
const functionOne = () => {};
const functionTwo = (arg1) => {};

export { functionOne, functionTwo };
```

```js
// utils.js
export { functionOne, functionTwo } from './moreUtils';

// 或者可以使用通配符导出所有moreUtils中暴露的模块
export * from './moreUtils';
```

### 使用第三方库

KWC 框架中可以导入第三方 JavaScript 库来结合组件使用。例如可以使用 EChart 等图标库来降低代码复杂库。

要引入第三方库，我们需要使用 `@kdcloudjs/kwc-shared-utils`中提供的 `loadScript`方法。

```js
import { loadScript } from '@kdcloudjs/kwc-shared-utils'

loadScript('第三方库地址').then(() => { ... });
```

另外，如果你的第三方库需要接管操作 DOM 的话，比方说调用 `appendChild()`等方法，则需要添加 `kwc:dom="manual"`指令。

这个指令会告诉 KWC 引擎，组件的所有者会手动操作 DOM

```html
<template>
  <div kwc:dom="manual"></div>
</template>
```

## 组件通信

Web Component 的组件通信，是指不同自定义元素（组件）之间，通过属性绑定、自定义事件、公共方法调用或中间媒介（事件总线 / 全局状态），实现数据传递、逻辑触发或状态同步的过程。

组件通信是 KWC 开发的核心能力之一，KWC 作为基于 Web Component 封装的组件方案，其通信机制完全兼容并复用 Web Component 原生通信规范，以下进行简洁梳理，适配 KWC 开发场景落地。

```plaintext
Web Components 通信体系：
├── 父子组件通信
│   ├── 下行：属性（Attributes/Properties）
│   └── 上行：自定义事件（Custom Events）
├── 同级/跨级组件通信
│   ├── 事件冒泡（Event Bubbling）
│   ├── 发布订阅模式（Pub/Sub）
│   └── Context API（共享上下文）
└── 与外部组件通信
    ├── 查询选择器（Query Selector）
    ├── 方法调用（Public Methods）
    └── Slot 内容分发。（注：Slot 主要是单向的父→子）

```

KWC 组件封装并简化了组件内部、跨级和组件与组件间的通信，详细内容可参考相关章节：

- 属性（Properties)
- 自定义事件（Events)
- 跨级通信
  - 事件冒泡（bubbles 和 composed）
  - 发布订阅模式（Pub/Sub）：KWC 提供的 messaService 工具
  - 访问组件元素
  - Shadow DOM
  - 插槽（Slot）

## 属性（Properties）

这是最基础的自上而下通信方式，在组件的 JavaScript 类中声明属性，在组件模板中引用它们以动态更新内容。父组件通过 HTML 标签属性传递数据，子组件接收并响应属性变化。

组件开发在类中声明属性，通过 `@api`装饰器修饰的属性表明其公开的对象属性被外部使用。同时，KWC 会观测字段和属性值的变化。

属性（property）和特性（attribute）几乎相等。一般来说，在 HTML 中，称为特性，在 JavaScript 中称为属性。

- 核心要点：

  - 属性声明：子组件需要显式声明可接收的属性
  - 类型校验：支持字符串、数字、对象、数组等类型
  - 响应式更新：父组件数据变化，子组件自动更新
  - 单向数据流：子组件不能直接修改 Props（原则）

### 响应式

响应式是 KWC 框架的核心系统。该框架会观察属性值的变化。当观察到变化时，会重新根据模板中使用的表达式来重新渲染组件，显示新值。

组件模板中的公共属性是响应式的。在组件的 JavaScript 类中，如果某个属性值发生变化，并且该字段在模板中或者是被其他 getter 依赖时，组件会重新渲染并显示新值。如果该属性是个对象或者数组，那么框架则会观察其内部的变化。

### 公共属性（Public Properties）

使用 `@api`修饰的属性被视为公开的公共属性。在模板中使用公共属性时，该属性就有了响应性。

当组件被重新渲染时，模板中使用的表达式会被重新计算，并且 `renderedCallback()`这个生命周期会被执行。

属性可以是你的自定义属性，也可以是从 `HTMLElement`中继承的属性。

_提示：装饰器，如`@api`，`@track`是 JavaScript 的一个功能。一个属性声明只能有一个装饰器。_

#### 自定义属性

从 `@kdcloudjs/kwc`中导入 `@api`装饰器。将 `itemName`设置为公开的公共属性

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

#### DOM 属性

在标签中使用组件的 owner 组件可以通过 DOM 属性来访问组件的公共属性。DOM 属性是在类中声明的公共字段。它们可以通过 DOM 元素使用 `.`语法进行访问

```js
myItem = this.template.querySelector('x-todo-item').itemName;
```

### 私有属性（Private Properties）

#### 原始类型和复杂类型的响应性

诸如布尔值，数值和字符串等原始类型的属性时响应式的。KWC 以浅层方式跟踪属性值的变化。当为属性赋值时，通过使用 `===`来检测变化。

而如数组或对象这些复杂类型时，必须创建一个新对象并将其分配给属性来检测更改

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

#### 跟踪数组和对象的内部变化

当属性使用 `@track`修饰时，KWC 会跟踪内部的变化：

- 使用 `{}`创建的普通对象
- 使用 `[]`创建的数组

该框架以递归方式观察对对象和数组的修改，包括嵌套对象，嵌套数组以及对象和数组的混合。此外，它还能处理循环引用。

但是框架不会观察复杂对象的变异操作，例如 `Date`等。

#### 观察对象的属性

我们稍微修改下代码，声明一个 `fullName`属性

```js
fullName = { firstName: '', lastName: '' };

// 下面这句代码为fullName赋值，因此组件重新渲染
this.fullName = { firstName: 'Bob', lastName: 'Doe' };
```

但是我们如果通过修改对象的属性，那么 KWC 框架将无法响应该变化。

要避免上述问题，我们需要使用 `@track`装饰器来修饰 `fullName`属性。

#### 使用新属性重新渲染对象

不管该属性是否在 `@track`所修饰， 仅当上一个渲染周期中访问的属性被更新时，组件才会重新渲染。这样可以避免组件过度渲染。

```js
@track obj = { value1: 'hello' }

get words() {
    return Object.entries(this.obj).map(([key, value]) => ({key, value});
}
```

在第一个渲染周期，框架会记下 `obj.value1`被访问过。任何对 `obj`的修改，只要不涉及 `value1`的，都会被忽略，因为它并不会影响页面渲染的内容。只有当对 `value1`进行修改时才会触发重新渲染。

另外，对 `obj`新增属性，或者更改其他属性，都不会触发渲染。

#### 观察数组的元素

`@track`的另一个用途是告诉框架观察数组元素的变化。如果不使用装饰器的话，框架仅会观察数组重新赋值时的变化，为数组添加新值和更新内部元素不会引起组件渲染。

使用 `@track`修饰数组的话，数组会被转换为代理对象。

#### 观察复杂对象

如 `Date`,`Set`等复杂对象的元素发生变更时，框架无法对其作为响应。如果需要确保复杂对象更新时，页面会重新渲染，那么我们需要给复杂对象重新赋值才行。

### 属性名

JavaScript 中属性名称采用驼峰式命名，而 HTML 属性名称则是采用连字符连接。

例如，名为 `itemName`的 JavaScript 属性映射名为 `item-name`的 HTML 属性。

#### JavaScript 属性名称

不要使用这些字符开头的属性名

- `on`
- `aria`
- `data`

不要将这些保留字作为属性名

- `slot`
- `part`
- `is`

#### HTML 属性名称

模板中的 HTML 属性不能包含大写字符，允许以小写字母，下划线和美元符号，连字符+字母来作为属性名称的开头。

属性名称可以包含 `__`和 `_-`。

如果连字符不是属性名称的第一个字符，则允许使用 `-_`作为开头。例如:

- `_myattribute`
- `$myattribute`
- `my_-attribute`

如果你有一个以大写字母开头的 JavaScript 属性，并且需要通过 HTML 属性进行设置，则必须使用特殊语法。属性名称的大写字符为小写，并以连字符 `-upper`为前缀。比方说，JavaScript 中属性 `@api Upper`对应于 HTML 属性 `-upper`.。

#### 在 JavaScript 中访问 HTML 通用属性

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

### 类属性

#### KingdeeElement 类属性

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

#### 继承的属性和方法

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

### Web API 属性

#### 元素

KWC 组件中，可以访问`Element` 元素的以下属性：

`children`,`classList`,`className`,\``children`, `classList`, `className`, `firstElementChild`, `getAttribute`, `getAttributeNS`, `getBoundingClientRect`, `getElementsByClassName`, `getElementsByTagName`, `hasAttribute`, `id`, `lastElementChild`, `querySelector`, `querySelectorAll`, `removeAttribute`, `removeAttributeNS`, `setAttributeNS`, `setAttribute`, `shadowRoot`, `slot`

#### 事件

KWC 组件中，可以访问`EventTarget`接口中以下属性：`addEventListener`, `dispatchEvent`, `removeEventListener`

#### HTMLElement

KWC 组件中，可以访问`HTMLElement` 元素的以下属性：`accessKeyLabel`, `contentEditable`, `dataset`, `dir`, `hidden`, `isContentEditable`, `lang`, `offsetHeight`, `offsetLeft`, `offsetParent`, `offsetTop`, `offsetWidth`, `title`

#### Node

KWC 组件中，可以访问 Node 元素的以下属性：`childNodes`, `firstChild`, `isConnected`, `lastChild`

### Getter 和 Setter

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

### 布尔属性

标准 HTML 的布尔属性通过向元素添加属性值来设置为 `true`。如果缺少该属性则默认为 `false`

### JavaScript 属性映射到 HTML 属性

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

### 在 Getter 中管理依赖关系

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

## 自定义事件（Events）

自下而上通信的核心方式，子组件主动触发自定义事件并携带数据，父组件监听该事件并接收数据。

KWC 会分发标准的 DOM 事件。组件还可以创建和分发自定义事件。使用事件可以向上层组件进行通信。例如，子组件 `c-todo-item` 会分发一个事件来通知其父组件 `c-todo-app` ，用户已选中该组件。

KWC 中的事件是基于 [DOM 事件](https://dom.spec.whatwg.org/#events)构建的，DOM 事件是每个浏览器中都可用的 API 和对象的集合。

DOM 事件系统是一种包含这些元素的编程设计模式。

- 事件名称，称为类型
- 用于初始化事件的配置
- 一个会发出事件的 JavaScript 对象

实现逻辑：

1.  子组件通过 `new CustomEvent()` 创建自定义事件，可通过 `detail` 属性携带需要传递的业务数据；
2.  子组件通过 `this.dispatchEvent()` 派发该自定义事件；
3.  父组件在使用子组件时，通过 `addEventListener()` 监听该自定义事件，或直接在 HTML 标签上绑定 `onxxx` 事件，从事件对象中获取 `detail` 中的数据。

- 关键注意：自定义事件默认不会冒泡，若需跨层级传递，可在创建事件时配置 `bubbles: true` 和 `composed: true`。

在 KWC 中，要创建事件，我们强烈建议使用 `CustomEvent` 接口， `CustomEvent` 可在各种浏览器上提供更一致的体验。它无需任何设置或样板代码，并且允许您通过 `detail` 属性传递任何类型的数据，因此非常灵活。KWC 实现了 `EventTarget` 接口，这使得它们能够分发事件、监听事件和处理事件。

### 创建和分发事件

在组件的 JavaScript 类中创建和分发事件。要创建事件，请使用 `CustomEvent()` 构造函数。要分发事件，请调用 `EventTarget.dispatchEvent()` 方法。

`CustomEvent()` 构造函数有一个必需参数，即一个指示事件类型的字符串。作为组件作者，您需要在创建事件时指定事件类型。您可以使用任何字符串作为事件类型。但是，我们建议您遵循 DOM 事件标准。

- 不使用大写字母
- 没有空格
- 用下划线分隔单词

不要在事件名称前加上字符串 `on` ，因为内联事件处理程序名称必须以字符串 `on` 开头。例如，如果你的事件名为 `onmessage` ，则标记应为 `<c-my-component ononmessage={handleMessage}>` 。注意重复出现的 `onon` ，这容易造成混淆。

以下是一个事件分发和处理的示例。

`c-paginator` 组件包含 **“上一页”** 和 **“下一页”** 按钮。当用户点击这些按钮时，组件会创建并触发 `previous` 和 `next` 事件。您可以将 `paginator` 组件添加到任何需要 **“上一页”** 和 **“下一页”** 按钮的组件中。父组件会监听并处理这些事件。

```html
<!-- paginator.html -->
<template>
  <kd-layout>
    <kd-layout-item>
      <kd-button
        label="Previous"
        icon-name="utility:chevronleft"
        onclick="{previousHandler}"
      ></kd-button>
    </kd-layout-item>
    <kd-layout-item flexibility="grow"></kd-layout-item>
    <kd-layout-item>
      <kd-button
        label="Next"
        icon-name="utility:chevronright"
        icon-position="right"
        onclick="{nextHandler}"
      ></kd-button>
    </kd-layout-item>
  </kd-layout>
</template>
```

当用户点击按钮时， `previousHandler` 或 `nextHandler` 函数会执行。这些函数会创建并分发 `previous` 和 `next` 事件。

```js
// paginator.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Paginator extends KingdeeElement {
  previousHandler() {
    this.dispatchEvent(new CustomEvent('previous'));
  }

  nextHandler() {
    this.dispatchEvent(new CustomEvent('next'));
  }
}
```

这些事件只是简单的“发生了某事”事件。它们不会将数据有效负载传递到 DOM 树的上层，它们只是简单地表明用户点击了一个按钮。

让我们把 `paginator` 放到一个名为 `c-event-simple` 的组件中，该组件监听并处理 `previous` 和 `next` 事件。

要监听事件，请使用语法为 `oneventtype` HTML 属性。由于我们的事件类型是 `previous` 和 `next` ，因此监听器分别为 `onprevious` 和 `onnext` 。

```html
<!-- eventSimple.html -->
<template>
  <kd-card title="EventSimple" icon-name="custom:custom9">
    <div class="kdds-m-around_medium">
      <p class="kdds-m-vertical_medium content">Page {page}</p>
      <c-paginator
        onprevious="{previousHandler}"
        onnext="{nextHandler}"
      ></c-paginator>
    </div>
  </kd-card>
</template>
```

当 `c-event-simple` 接收到 `previous` 和 `next` 事件时， `previousHandler` 和 `nextHandler` 分别增加和减少页码。

```js
// eventSimple.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class EventSimple extends KingdeeElement {
  page = 1;

  previousHandler() {
    if (this.page > 1) {
      this.page = this.page - 1;
    }
  }

  nextHandler() {
    this.page = this.page + 1;
  }
}
```

### 在事件中传递数据

在 KWC 组件通信中，事件传递数据的核心载体是 Web Component 原生的 `CustomEvent`（自定义事件），所有需要携带数据的组件事件，都通过该对象封装数据，再通过派发事件传递给监听方，以下是具体实现流程、示例及注意事项。

**核心原理**

1.  数据存储：将需要传递的数据存入 `CustomEvent` 的 `detail` 属性（这是 `CustomEvent` 专门用于携带自定义数据的字段，原生规范约定，无兼容性问题）；
2.  事件派发：子组件通过 `this.dispatchEvent()` 派发封装好数据的自定义事件；
3.  数据接收：父组件 / 监听方在事件回调中，通过 `event.detail` 提取传递的数据。

注意：`detail` 是唯一推荐的事件传参字段，可携带任意类型数据（字符串、对象、数组等），避免通过事件名称、DOM 属性等间接传递，保证规范性和可维护性。

#### **步骤一：子组件封装数据并派发自定义事件**

```js
// 子组件：my-kwc-button.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class MyKwcButton extends KingdeeElement {
  // 按钮点击事件：封装数据并派发自定义事件
  handleClick(event) {
    event.preventDefault();

    // 1. 定义需要传递的业务数据（可任意类型）
    const buttonData = {
      btnId: 'submit-btn-001',
      btnText: '提交',
      clickTime: new Date().toLocaleString(),
    };

    // 2. 创建 CustomEvent，将数据存入 detail 属性
    // 第一个参数：事件名称（自定义，建议带 kwc 前缀避免冲突）
    // 第二个参数：配置项，detail 存储数据，bubbles/composed 控制事件冒泡（可选）
    const customEvent = new CustomEvent('kwc-btn-click', {
      detail: buttonData, // 核心：存放需要传递的数据
    });

    // 3. 派发自定义事件，传递给监听方
    this.dispatchEvent(customEvent);
  }
}
```

#### **步骤二：父组件 / 监听方接收事件数据**

html 模板文件：

```html
<!-- 父组件模板：index.html -->
<template>
  <my-kwc-button onkwc-btn-click="{handleBtnClick}"></my-kwc-button>
</template>
```

javascript 文件：

```js
// eventWithData.js
import { KingdeeElement, wire } from '@kdcloudjs/kwc';

export default class EventWithData extends KingdeeElement {
  handleBtnClick(event) {
    // 核心：通过 e.detail 提取子组件传递的数据
    const btnData = e.detail;
    console.log('接收按钮数据：', btnData);
    // 后续业务逻辑：如提交表单、更新状态等
  }
}
```

#### 常见场景拓展

**场景 1：传递简单数据（字符串 / 数字）**

无需封装复杂对象，直接将简单数据存入 `detail` 即可：

```js
// 子组件派发
handleClick() {
    const btnId = 'submit-btn-001';
    this.dispatchEvent(new CustomEvent('kwc-btn-click', {
    detail: btnId // 直接传递字符串
    }));
}

// 父组件接收
handleBtnClick(e) {
    const btnId = e.detail;
    console.log('按钮ID：', btnId);
}
```

**场景 2：传递多个数据（封装为对象）**

这是最常用场景，将多个相关数据封装为一个对象，便于后续扩展和维护：

```js
// 子组件派发
handleInputChange(value) {
    const inputData = {
    field: 'username',
    value: value,
    isValid: /^[a-zA-Z0-9_]{6,16}$/.test(value)
    };
    this.dispatch('kwc-input-change', inputData);
}

// 父组件接收
handleInputChange(e) {
    const { field, value, isValid } = e.detail;
    console.log(`字段${field}的值为：${value}，是否有效：${isValid}`);
}
```

**场景 3：传递函数（实现双向通信 / 回调）**

`detail` 也可携带函数，子组件通过调用该函数实现「反向通知」父组件，或接收父组件的处理结果：

```js
    // 父组件：传递回调函数
    handleBtnClick(e) {
      // 接收子组件数据，并通过回调函数返回处理结果
      const { btnId, callback } = e.detail;
      const result = `按钮${btnId}处理成功`;
      callback(result); // 执行子组件传递的回调函数
    }

    // 子组件：派发事件并携带回调函数
    handleClick() {
      const buttonData = {
        btnId: 'submit-btn-001',
        callback: (result) => { // 回调函数，接收父组件处理结果
          console.log('父组件返回结果：', result);
        }
      };
      this.dispatch('kwc-btn-click', buttonData);
    }
```

### 事件处理

#### 绑定单个事件监听器

在父组件的模板（在本例中为 `c-parent` 的标记中声明监听器。

```html
    <!-- parent.html -->
    <template>
      <c-parent onnotification={handleNotification}></c-child>
    </template>
```

在 `c-parent` JavaScript 文件中定义处理函数，在本例中 `handleNotification` 。

```js
// parent.js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class Parent extends KingdeeElement {
  handleNotification() {
    // Code runs when event is received
  }
}
```

#### 绑定多个事件监听器

要以声明方式绑定多个事件监听器，请使用`kwc:on` 指令。此外，如果您想要添加事件类型动态计算的事件监听器（例如，通过 `@api` 从所有者组件传递的事件类型），也可以使用此指令。

```html
<template>
  <kd-button kwc:on="{eventHandlers}" label="Click me"></kd-button>
</template>
```

向 `kwc:on` 传递一个对象，其中对象中的每个属性键指定一个事件类型，相应属性的值是事件处理函数。属性键必须是字符串，例如 `click` 、 `customEvent` 或 `'custom-event'` 。

```js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class EventHandlerExample extends KingdeeElement {
  eventHandlers = {
    click: this.handleClick,
    mouseover: this.handleMouseOver,
  };

  handleClick(event) {
    console.log('Button clicked');
  }

  handleMouseOver(event) {
    console.log('Mouse over button');
  }
}
```

使用 `kwc:on` 添加的事件处理程序绑定到组件实例；处理程序内部的 `this` 引用组件，从而可以访问其属性和方法。

#### 绑定动态事件监听器

要在子组件上动态添加事件监听器，请在所有者组件的 JavaScript 文件中定义一个包含事件类型和处理程序的对象。然后，在所有者组件的模板中使用 `kwc:on` 指令将这些处理程序绑定到子组件。

```html
<!-- eventDynamic -->
<template>
  <c-event-dynamic-child kwc:on="{eventHandlers}"></c-event-dynamic-child>
  <p>Custom event received: {customEventDetail}</p>
  <kd-button onclick="{switchEventListener}" label="Switch Event Listener">
  </kd-button>
</template>
```

`eventDynamic` 组件会在 `customEvent` 和 `anotherCustomEvent` 这两个事件监听器之间动态切换。要切换事件监听器之间的消息，请单击 **“切换事件监听器”** 按钮，然后单击 **“更新消息”** 按钮。

```js
// eventDynamic.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class EventDynamic extends KingdeeElement {
  customEventDetail = '';
  eventHandlers = {
    customEvent: this.handleCustomEvent,
  };

  handleCustomEvent(event) {
    this.customEventDetail = `${event.detail}`;
  }

  switchEventListener() {
    this.eventHandlers = this.eventHandlers.customEvent
      ? { anotherCustomEvent: this.handleCustomEvent }
      : { customEvent: this.handleCustomEvent };
  }
}
```

`eventDynamicChild` 组件包含一个按钮，用于分发自定义事件。

```html
<!-- eventDynamicChild -->
<template>
  <div>Child Component</div>
  <kd-button onclick="{handleButtonClick}" label="Update Message"> </kd-button>
</template>
```

`eventDynamicChild` 组件在连接到 DOM 且按钮被点击时，会触发两个自定义事件： `customEvent` 和 `anotherCustomEvent` 组件使用 `kwc:on` 来绑定 `eventDynamic` 监听器。

```js
// eventDynamicChild.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class EventDynamicChild extends KingdeeElement {
  connectedCallback() {
    // Dispatch a custom event when this component is connected
    this.dispatchEvent(
      new CustomEvent('customEvent', {
        detail: 'customEvent from child component connectedCallback',
      }),
    );
    this.dispatchEvent(
      new CustomEvent('anotherCustomEvent', {
        detail: 'anotherCustomEvent from child component connectedCallback',
      }),
    );
  }

  handleButtonClick() {
    this.dispatchEvent(
      new CustomEvent('customEvent', {
        detail: 'Button clicked in child component for customEvent',
      }),
    );
    this.dispatchEvent(
      new CustomEvent('anotherCustomEvent', {
        detail: 'Button clicked in child component for anotherCustomEvent',
      }),
    );
  }
}
```

#### 显式绑定事件监听器

以上绑定事件监控器，都是声明式的，KWC 也支持显式（命令式）绑定事件监控器。

在 `c-parent` JavaScript 中定义监听器函数和处理函数。

```js
// parent.js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class Parent extends KingdeeElement {
  constructor() {
    super();
    this.template.addEventListener('notification', this.handleNotification);
  }
  handleNotification = () => {};
}
```

如果同一个监听器被重复添加到同一个元素，浏览器会忽略重复项。

如果事件监听器未被移除，您可以选择将 `handleNotification` 代码内联到 `addEventListener()` 调用中。

```js
this.template.addEventListener('notification', (evt) => {
  console.log('Notification event', evt);
});
```

注意 不要使用 `addEventListener(eventName, this.handle.bind(this))`这样的形式，因为 `bind()`会返回一个新函数，组件无法使用同一个函数实例来调用 `removeEventListener`。会造成内存泄漏。

#### 添加事件监控器

添加事件监听器有两种语法。一种是将事件监听器添加到组件 shadow 边界内的元素，另一种是将事件监听器添加到模板不拥有的元素，例如，传递给插槽的元素。

要向 shadow 边界内的元素添加事件监听器，请使用 `template` 。

```js
this.template.addEventListener();
```

要向模板不拥有的元素添加事件监听器，请直接调用 `addEventListener` 。

```js
this.addEventListener();
```

#### 事件重定向

当事件沿着 DOM 向上冒泡时，如果它跨越了 Shadow DOM 的边界， `Event.target` 的值会改变，以匹配监听器的作用域。这种改变称为“事件重定向”。事件重定向的目的是使监听器无法访问触发该事件的组件的 Shadow DOM。事件重定向保持了 Shadow DOM 的封装性。

我们来看一个简单的例子。

```html
<!-- myButton.html -->
<template>
  <button>{label}</button>
</template>
```

即使点击发生在 `button` 元素上 `<my-button>` 上的点击监听器也总是接收 `my-button` 作为目标。

假设 `c-todo-item` 组件中的一个 `div` 元素触发了一个事件。在组件的影子 DOM 中， `Event.target` 是 `div` 。但是对于包含 `c-todo-app` 组件的 `p` 元素上的监听器来说， `Event.target` 是 `c-todo-item` ，因为 `p` 元素无法访问 `c-todo-item` 影子 DOM。

值得注意的是，对于 `c-todo-item` 上的监听器， `Event.target` 是 `c-todo-item` ，而不是 `div` ，因为 `c-todo-item` 位于 shadow 边界之外。

> 注：要获取对触发事件的对象的引用，请使用 [`Event.target`](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) 属性，它是 DOM API 中事件的一部分。

#### 监听输入字段的变化

要监听模板中接受输入的元素（例如文本字段（ `<input>` 或 `<kd-input>` ））的变化，请使用 `onchange` 事件。

```html
<!-- form.html -->
<template>
  <input type="text" value="{myValue}" onchange="{handleChange}" />
</template>
```

```js
// form.js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class Form extends KingdeeElement {
  myValue = 'initial value';

  handleChange(evt) {
    console.log('Current value of the input: ' + evt.target.value);
  }
}
```

在这个例子中，每当输入值发生变化时，都会调用 JavaScript 文件中的 `handleChange()` 方法。

`myValue` 属性表示输入元素的值。此*属性*值不会在每次更改时自动更新。

您可能需要对用户输入的值进行额外验证，以便在用户输入时自动纠错或限制某些值。为了使 `myValue` 与输入框的当前值保持同步，请在 `handleChange()` 方法中更新 `myValue` 。以下代码通过删除字符串开头和结尾的空格来自动纠错输入的值。使用 `evt.target.value` 获取输入字段的当前值。

```js
// form.js
import { KingdeeElement } from '@kdcloudjs/kwc';
export default class Form extends KingdeeElement {
  myValue = 'initial value';

  handleChange(evt) {
    const typedValue = evt.target.value;
    const trimmedValue = typedValue.trim(); // trims the value entered by the user
    if (typedValue !== trimmedValue) {
      evt.target.value = trimmedValue;
    }
    this.myValue = trimmedValue; // updates the internal state
  }
}
```

此示例展示了如何将输入值属性重置为第 `evt.target.value = trimmedValue` 行中的修剪值。它还展示了如何在组件将来重新加载（加载新值）时，保持 `myValue` 属性与规范化值同步。

注意 _修改通过模板定义的元素的属性可能会对组件的其他部分产生意想不到的副作用。在我们的示例中，元素的输入值属性从模板中定义的值（由 `evt.target` 表示）发生了变化。该示例更改了模板中使用的值（\` `myValue` ），以保持组件元素的状态同步。否则，模板重新水合（template rehydration）在尝试将输入元素的状态与组件的状态进行匹配时，会检测到属性值不匹配。这种不匹配会生成运行时警告，您需要修改组件或 JavaScript 代码，以确保整个模板中的数据完整性。_

#### 移除事件监听器

框架会在组件生命周期内负责管理和清理监听器。但是，如果您将监听器添加到其他对象（例如 `window` 对象、 `document` 对象等），则需要自行负责移除监听器。

要移除事件监听器，请使用 [`disconnectedCallback`](https://developer.salesforce.com/docs/platform/lwc/guide/create-lifecycle-hooks-dom.html) 生命周期钩子。

如果你使用 `kwc:on` 添加事件监听器，你也可以通过在传递给 `kwc:on` 对象中省略该属性来删除事件监听器。

## 跨级通信

### 事件冒泡（bubbles 和 composed）

创建事件时，使用事件上的两个属性 `bubbles` 和 `composed` 来定义事件传播行为。

- `Event.bubbles` 一个布尔值，指示事件是否会向上冒泡穿过 DOM。默认为 `false` 。
- `Event.composed`

&#x20;一个布尔值，指示事件是否可以穿过 shadow 边界。默认为 `false` 。

要获取有关事件的信息，请使用 [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) Web API 的这些属性和方法。

- `Event.target` 触发事件的元素。 每个组件的内部 DOM 都被封装在一个[影子 DOM](https://developer.salesforce.com/docs/platform/lwc/guide/create-dom.html) 中。影子边界是常规 DOM（也称为浅色 DOM）和影子 DOM 之间的分界线。如果事件冒泡并跨越影子边界，则 `Event.target` 的值会改变，以指向与监听器处于同一作用域的元素。事件重定向可以保持组件的封装性，并防止暴露组件的内部结构。 例如， `<my-button>` 上的点击监听器始终接收 `my-button` 作为目标，即使点击发生在 `button` 元素上。

```html
<!-- myButton.html -->
<template>
  <button>{label}</button>
</template>
```

- `Event.currentTarget` 当事件在 DOM 中传播时，此属性始终指向附加了事件处理程序的元素。
- `Event.composedPath()` 事件遍历 DOM 时，监听器会被调用的事件目标数组。

**重要说明**

1.  `bubbles` 和 `composed` 仅作用于「子传父」的事件传递（基于 CustomEvent 自定义事件），与「父传子」（属性绑定）无关；
2.  二者的核心价值是让「子传父」突破基础层级限制，实现「跨级通信」（也叫跨组件层级 / 跨 Shadow DOM 通信），本质是增强了子组件事件的传递范围，而非改变「子传父」的通信方向。

在 KWC 组件通信中，`bubbles` 和 `composed` 通常配合使用，对应不同的子传父场景，核心组合如下：

| 配置组合                                | 通信场景                         | 适用场景                               |
| :-------------------------------------- | :------------------------------- | :------------------------------------- |
| bubbles: false, composed: false（默认） | 仅子组件内部可监听，无法向外传递 | 组件内部私有事件，无需外部组件感知     |
| bubbles: true, composed: false          | 仅 Shadow DOM 内部跨级冒泡       | 组件内部包含多层子元素，需内部跨级通信 |
| bubbles: true, composed: true（常用）   | 突破 Shadow DOM，外部跨级子传父  | 子组件需向外部多层祖先组件传递数       |

#### 静态组合

静态组合不使用插槽。在这个简单的例子中， `c-app` 组合了 `c-parent` ，c-parent 又组合了 `c-child` 。

```html
<c-app onbuttonclick="{handleButtonClick}"></c-app>
```

应用程序中的父组件处理按钮点击事件。

```html
<!-- app.html -->
<template>
  <h2>My app</h2>
  <c-parent onbuttonclick="{handleButtonClick}"></c-parent>
</template>
```

父组件包含一个包装器，包装器中包含一个子组件，两者都监听按钮点击事件。

```html
<!-- parent.html -->
<template>
  <h3>I'm a parent component</h3>
  <div class="wrapper" onbuttonclick="{handleButtonClick}">
    <c-child onbuttonclick="{handleButtonClick}"></c-child>
  </div>
</template>
```

子组件包含带有 `onclick` 处理程序的按钮。

```html
<!-- child.html -->
<template>
  <h3>I'm a child component</h3>
  <button onclick="{handleClick}">click me</button>
</template>
```

```js
// child.js
handleClick() {
    const buttonclicked = new CustomEvent('buttonclick', {
        //event options
    });
    this.dispatchEvent(buttonclicked);
}
```

此示例在按钮被点击时，从 `c-child` 元素触发 `buttonclick` 事件。以下元素已附加自定义事件的事件监听器：

- `body`
- `c-app` host
- `c-parent`
- `div.wrapper`
- `c-child` host

展开来的树看起来是这样的：

```html
<body>
  <!-- Listening for buttonclick event -->
  <c-app>
    <!-- Listening for buttonclick event -->
    #shadow-root |
    <h2>My app</h2>
    |
    <c-parent>
      |
      <!-- Listening for buttonclick event -->
      | #shadow-root | |
      <h3>I'm a parent component</h3>
      | |
      <div class="wrapper">
        | |
        <!-- Listening for buttonclick event -->
        | |
        <c-child>
          | | #shadow-root | | |
          <!-- Listening for buttonclick event -->
          | | |
          <h3>I'm a child component</h3>
          | | | <button>click me</button> | |
        </c-child>
        | |
      </div>
      |
    </c-parent>
  </c-app>
</body>
```

#### bubbles\:false 和 composed\:false

默认配置。该事件不会向上冒泡穿过 DOM，也不会跨越 Shadow 边界。监听此事件的唯一方法是在触发该事件的组件上直接添加事件监听器。

建议采用这种配置，因为它对现有系统的干扰最小，并且能为您的组件提供最佳的封装。

该事件仅向上传递给 `c-child` 。

```html
<body>
  <c-app>
    #shadow-root |
    <c-parent>
      | #shadow-root | |
      <div class="wrapper">
        | |
        <c-child>
          | |
          <!-- Event bubbles up here -->
          | | #shadow-root | | |
          <h3>I'm a child component</h3>
          | | | <button>click me</button> | |
        </c-child>
        | |
      </div>
      |
    </c-parent>
  </c-app>
</body>
```

检查 `c-child` 处理程序会在事件中返回这些值。

- `event.currentTarget` = `c-child`
- `event.target` = `c-child`

#### bubbles\:true 和 composed\:false

事件会向上冒泡穿过 DOM，但不会越过 shadow 边界。因此， `c-child` 和 `div.wrapper` 都可以响应该事件。

```html
<body>
  <c-app>
    #shadow-root |
    <c-parent>
      | #shadow-root | |
      <div class="wrapper">
        | |
        <!-- Event bubbles up here -->
        | |
        <c-child>
          | |
          <!-- Event bubbles up here -->
          | | #shadow-root | | |
          <h3>I'm a child component</h3>
          | | | <button>click me</button> | |
        </c-child>
        | |
      </div>
      |
    </c-parent>
  </c-app>
</body>
```

事件处理程序返回以下内容：

**`c-child` 操作**

- `event.currentTarget` = `c-child`
- `event.target` = `c-child`

**`div.childWrapper` 操作**

- `event.currentTarget` = `div.childWrapper`
- `event.target` = `c-child`

此配置有两种使用场景：

- **创建内部活动**

要在组件模板内部冒泡事件，请在模板中的某个元素上分发该事件。事件只会向上冒泡到模板内该元素的祖先元素。当事件到达 shadow 边界时，它就会停止冒泡。

    // myComponent.js
    this.template.querySelector("div").dispatchEvent(new CustomEvent("notify", { bubbles: true }));

该事件必须在 `myComponent.js` 中处理。包含组件中的处理程序不会执行，因为该事件不会跨越影子边界。

```html
<!-- container.html -->
<template>
  <!-- handleNotify doesn’t execute -->
  <c-my-component onnotify="{handleNotify}"></c-my-component>
</template>
```

- **向组件的祖父组件发送事件**

如果将组件传递给插槽 ，并且您希望将该组件的事件冒泡到包含它的模板，请在宿主元素上分发该事件。该事件仅在包含该组件的模板中可见。

让我们来看下面示例代码。组件层级结构（从子组件到祖父组件）为 c-contact-list-item-bubbling -> kd-layout-item -> c-event-bubbling。

`c-contact-list-item-bubbling` 组件会分发一个名为 `contactselect` 自定义事件，其中 `bubbles: true` 。

事件监听器 `oncontactselect` 位于其父级 `kd-layout-item` 上，该事件在其祖父级 `c-event-bubbling` 中处理。

```html
<!-- eventBubbling.html -->
<template>
  <kd-card title="EventBubbling" icon-name="standard:logging">
    <template kwc:if="{contacts.data}">
      <kd-layout class="kdds-var-m-around_medium">
        <!-- c-contact-list-item-bubbling emits a bubbling event so a single listener on a containing element works -->
        <kd-layout-item class="wide" oncontactselect="{handleContactSelect}">
          <template for:each="{contacts.data}" for:item="contact">
            <c-contact-list-item-bubbling
              class="kdds-show slds-is-relative"
              key="{contact.Id}"
              contact="{contact}"
            ></c-contact-list-item-bubbling>
          </template>
        </kd-layout-item>
      </kd-layout>
    </template>
  </kd-card>
</template>
```

```js
// contactListItemBubbling.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ContactListItemBubbling extends KingdeeElement {
  @api contact;

  handleSelect(event) {
    // Prevent default behavior of anchor tag click which is to navigate to the href url
    event.preventDefault();
    const selectEvent = new CustomEvent('contactselect', {
      bubbles: true,
    });
    this.dispatchEvent(selectEvent);
  }
}
```

#### bubbles\:true 和 composed\:true

事件会向上冒泡穿过 DOM，越过 shadow 边界，并继续向上冒泡穿过 DOM 到达文档根目录。

**重要提示：** 如果事件使用此配置，则事件类型将成为组件公共 API 的一部分。它还会强制使用该事件的组件及其所有祖先组件在其 API 中包含该事件。

由于此配置会将事件一直冒泡到文档根目录，因此可能会导致名称冲突。名称冲突会导致触发错误的事件监听器。

```html
<body>
  <!-- Event bubbles up here -->
  <c-app>
    <!-- Event bubbles up here -->
    #shadow-root |
    <c-parent>
      |
      <!-- Event bubbles up here -->
      | #shadow-root | |
      <div class="wrapper">
        | |
        <!-- Event bubbles up here -->
        | |
        <c-child>
          | |
          <!-- Event bubbles up here -->
          | | #shadow-root | | |
          <h3>I'm a child component</h3>
          | | | <button>click me</button> | |
        </c-child>
        | |
      </div>
      |
    </c-parent>
  </c-app>
</body>
```

如果使用此配置，请在事件类型前加上命名空间，例如 `mydomain__myevent` 。否则，HTML 事件监听器的名称会显得很奇怪，例如 `onmydomain__myevent` 。

#### bubbles\:false 和 composed\:true

KWC 组件不使用此配置。

### 组件间消息中心（messageService）

KWC 框架中，提供了 messageService，messageService 可用于组件之间的通信，支持本地与跨页签广播。

```js
import { messageService } from '@kdcloudjs/kwc-shared-utils';

// 在组件上进行订阅（如组件的 connectedCallback 或者其它组件上的 init）
// component 一般传入 this
const off = messageService.subscribe(component, 'user:login', (payload) => {});

// 发布消息（默认同时本地触发并跨标签广播）
messageService.publish('user:login', { id: 'u001' });

// 仅本地触发
messageService.publish('user:login', { id: 'u001' }, { global: false });

// 在不需要使用时或者组件释放销毁时进行取消订阅
off();

// 整体取消某组件在某事件上的订阅
messageService.unsubscribe(component, 'user:login');
```

特性：

- 使用 `BroadcastChannel`（自动降级到 `postMessage`）实现跨标签页/iframe 通信
- 每个组件实例的订阅以 `WeakMap` 管理，自动清理泄漏
- 错误隔离，单个订阅错误不会影响其他订阅者

### 访问组件的元素

父组件可通过获取子组件 DOM 实例，直接访问子组件的公共属性和方法（需子组件暴露公共接口）。

要使用组件中渲染的元素，使用 `this.template`或者 `this.querySelector()`。

如果需要在不使用选择器的情况下定位 DOM 元素的话，使用 `refs`。

**重要**

不要使用 `window` 或 `document`全局属性来查询 DOM 元素。

在 KWC 框架中，我们一般不建议使用 JavaScript 来操作 DOM。

#### querySelector

访问 DOM 元素的标准方法是使用 `querySelector()`。

- 访问 Shadow DOM: `this.template.querySelector('div');`
- 访问正常节点: `this.querySelecotr('div');`

除了 `this`使用外，也可以通过 `{element}.template.querySelector`来访问

使用上述方法访问元素的话，有以下要点：

- 获取的元素顺序无法保证
- 未渲染的元素无法在 `querySelector`结果中返回
- 不要将 ID 选择器与 `querySelector`一起使用

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

#### Refs

Refs 可以定位没有选择器的 DOM 元素，并且只查询包含在指定模板中的元素：

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

需要注意的是，必须是在模板中定义了 `kwc:ref`指令之后才能调用 `this.refs`，直接调用的话，会返回 `undefined`。

如果模板中存在多个 `kwc:ref`定义，使用 `this.refs`将会引用到最后一个。

`this.refs`是个只读对象，不允许添加，修改或者删除属性。

`kwc:ref`指令不允许使用在 `<template>`和 `<slot>`标签上，也不能应用于 `for:each`或者 `iterator:*`的循环中。

#### 父元素

要访问 KWC 父元素的话，可以在组件中调用 `hostElement`

### Shadow DOM

Shadow DOM 是一种封装 DOM 结构的标准。

封装 DOM 使组件能够被共享的同时防止被任意 HTML/CSS 和 JavaScript 修改。这种内部 DOM 结构我们称为 Shadow Tree。

#### Shadow Tree

考虑如下结构：

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

`#shadow-root` 定义了普通 DOM 节点和 Shadow Tree 之间的边界。

使用 Shadow Tree 时，有以下要点：

- 父组件中定义的 CSS 不会传递到子组件。例如，todoApp.css 中定义的 p 标签的样式，不会影响到组件 `x-todo-item`中的 p 标签
- 为了防止暴露组件内部的细节，如果事件冒泡并跨越了 shadow 边界，属性值会发生变化以匹配监听器的作用域
- Shadow Tree 中的元素无法通过传统的 DOM 方法访问。

#### Shadow DOM 的 polyfill

在 kwc 框架中，我们使用合成 shadow 的方式来模拟原生 Shadow DOM 的行为，以便支持旧版浏览器

#### 合成 shadow 的组件渲染

在使用合成 shadow 渲染组件时，KWC 会添加一个属性来模拟原生组件的行为

假设你有一个 `kd-button`组件，在浏览器中渲染结果如下：

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

KWC 会在组件上生成混淆字符串作为 `kwc-190pm5at4mo`属性，用于限定 CSS 在组件内部的作用域，从而模拟原生 Shadow DOM 的行为。如果你为 `kd-button`提供样式的话，那么 CSS 作用域标记会在运行时添加到元素上。

### 插槽（Slot）

往组件的 HTML 文件添加一个插槽，以便父组件可以将其他内容传递到该组件中。一个组件可以有 0 个或多个插槽。

Slot 核心是解决「子组件模板的个性化占位与内容填充」问题，它传递的是「DOM 内容 / 子组件实例」，而非像属性绑定、自定义事件那样传递业务数据或触发逻辑，这也是它区别于传统组件通信的点，但从层级关系上，始终限定在直接父子组件之间。

即使子组件内部包含多层嵌套的子组件（孙子组件），父组件通过 Slot 传递的内容，也只能被直接子组件接收，无法直接穿透到孙子组件中（若需传递给孙子组件，需由直接子组件再次通过 Slot 转发，本质仍是多层父子关系的逐级传递，而非跨级直接分发）。

`<slot>`是父组件传递到组件的标签。

#### 未命名插槽

此示例包含一个未命名插槽。使用 `<slot>`元素作为占位符，展示父组件传入的任何内容

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

#### 命名插槽

下面的示例有两个命名插槽和一个未命名插槽

```html
<!-- 父组件 -->
<template>
  <p>First Name: <slot name="firstname">Default first name</slot></p>
  <p>Last Name: <slot name="lastname">Default last name</slot></p>
  <p>Description: <slot>Default description</slot></p>
</template>
```

&#x20;你可以为 `<slot>`属性设置动态值，比方说 `<span slot={dynamicName}></span>`.

传入的动态值会被强制转换为字符串。例如将数字 6 传递给该属性的话，会被转换为字符串"6"。如果传入的内容无法转换为字符串，如 `Symbol()`，那么会抛出 TypeError 错误。

在使用时我们可以给 `slot`标签添加属性名，以指明应用于哪个插槽

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

#### 访问通过插槽传递的元素

`<slot></slot>`是 shadow dom 的一部分。为了访问其中的元素，可以使用 `querySelector()`和 `querySelectorAll()`。

然而，传递给插槽的 DOM 元素并不属于组件的 shadow tree。要访问通过插槽传递的元素，组件会调用 `this.querySelector()` 和 `this.querySelectorAll()` 。

此示例展示了如何将 DOM 元素从子组件的上下文传递给子组件。请为 `this.querySelector()` 和 `this.querySelectorAll()` 提供选择器名称，例如元素。

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

在这个例子中， `querySelector` 接受元素 `span` 。

注意：不要将 `id` 传递给类似 `querySelector` 的查询方法。当 HTML 模板渲染时， `id` 值会被转换为全局唯一值。如果在 JavaScript 中使用 `id` 选择器，它将无法匹配转换后的 `id` 。

#### 根据条件渲染插槽

要根据条件渲染插槽的话，可以将 `<slot>`嵌套在 `<template>`当中，通过 `kwc:if`等条件语句来控制显隐

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

#### slotchange 事件

所有的 `<slot>`元素都支持 `slotchange`事件。该事件在插槽的元素发生变更时被调用。比方说，元素被添加到插槽或者被移除时。需要注意的是，插槽元素的子元素发生变更时并不会触发，当且仅当插槽元素的外层发生变更时才会触发。

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

将组件 `c-child` 传递到插槽中。

```html
<c-container>
  <c-child></c-child>
  <template kwc:if="{addOneMore}">
    <c-child></c-child>
  </template>
</c-container>
```

如果将 `addOneMore` 标志设置为 True，则控制台会在组件首次渲染时打印信息。

```html
<!-- child.html -->
<template>
  <button onclick="{handleClick}">Toggle Footer</button>
  <template kwc:if="{showFooter}">
    <footer>Footer content</footer>
  </template>
</template>
```

The `slotchange` event is not triggered even if `showFooter` is true and the footer element is appended. 即使 `showFooter` 为 true 并且添加了页脚元素， `slotchange` 事件也不会触发。

### 插槽与数据

#### 使用插槽与数据

在创建包含其他组件的组件时，请考虑使用带有插槽的声明式方法或者子组件对其父级数据更改会做出反应的数据驱动的组件的生命周期。

声明式构建组件的常见模式如下：

```html
<x-parent>
  <x-custom-child></x-custom-child>
  <x-custom-child></x-custom-child>
</x-parent>
```

该示例中有一个使用 `slot`元素的 `x-parent`组件。虽然消费者能够方便使用，但是你必须管理通过 `slot`元素传递的内容的生命周期。

- 使用 `slotchange`事件。`slotchange`会通过 DOM 向上冒泡，但不会超出 shadow 边界。
- 使用自定义事件将子组件的更改通知到父组件。

#### 示例：slotchange 与 slot

通过 `slotchange`与插槽，你可以管理父子组件之间的 `slot`内容的生命周期。

```html
<kd-button-group>
  <kd-button label="刷新"></kd-button>
  <kd-button label="编辑"></kd-button>
  <kd-button label="保存"></kd-button>
</kd-button-group>
```

`kd-button-group`组件包含有一个 `onslotchange`事件，用于管理传入内容的生命周期

```html
<!-- buttonGroup.html -->
<template>
  <slot onslotchange="{handleSlotChange}"></slot>
</template>
```

当插槽内容发生变化时，`slotchange`会处理插槽元素的更新。在本例子中根据子组件的出现的位置进行 css 样式设置

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

除了插槽以外，亦可通过数据驱动的方法来进行更新组件

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

## 组件生命周期

### constructor

`constructor()`构造器函数会在创建组件实例时触发。在构造函数中，不要向宿主元素添加属性。

构造函数会在父组件中执行，但是这个时候还无法访问到子元素，因为子元素还未被创建，属性也无法传递。在组件构造完成后，`connectedCallback()`被调用之前，属性会被传递到组件当中。

#### 构造函数的规范

- 第一条语句必须是不带参数的 `super()`调用。该调用会建立原型链和 `this`的值。在修改 `this`之前，必须要先调用 `super()`
- 不要在构造函数体中使用 `return`语句。
- 不要使用 `document.write()`或者 `document.open()`
- 不要检查元素属性和子元素
- 不要检查元素的公共属性

### connectedCallback()

`connectedCallback()`生命周期在组件插入 DOM 树时触发。`disconnectedCallback()`在组件中 DOM 中移除或者隐藏时触发。这两个构造函数都是遵循父组件到子组件的流程。当需要访问宿主元素时，使用 `this`。要访问模板的话使用 `this.template`。要检查组件是否连接到 DOM，可以使用 `this.isConnected`.

在 `connectedCallback()`函数中，我们可以：

- 与当前文档或容器建立通信
- 执行初始化任务，例如获取数据，设置缓存或者监听事件
- 订阅和取消订阅
- 导入第三方组件

在移除元素，然后将其插入到另一个位置时，该钩子函数可能会触发多次。如果希望其代码只运行一次的话，需要通过代码来进行阻止。

### disconnectedCallback()

`disconnectedCallback()`则与 `connectedCallback()`相反。我们可以使用该钩子函数来完成清理 `connectedCallback()`中添加的缓存或者监听器事件。

### renderCallback

`renderCallback()`会在组件完成渲染后执行。此钩子会从**子组件传递到父组件。**

- 不要在此钩子函数中更新适配器配置对象的属性
- 不要在此钩子函数中更新公共属性

#### 组件的重渲染

组件连接并渲染完成后，其状态的任何更改都会触发重渲染：

1.  组件标记为“脏”状态
2.  组件重新渲染的微任务被加入队列

#### hasRendered

组件在整个页面的生命周期内会被渲染多次。要使用此钩子执行一次性操作的话，可以使用类似 `hasRendered`的属性来跟踪该钩子函数是否已经执行过。

### render

可以显式调用 `render()`来更新 UI，我们可以在 `connectedCallback()`之前或者之后调用它。

一般情况下，`render()`函数是用于根据条件渲染哪个 HTML 模板文件。

### errorCallback

实现 `errorCallback` 可以创建一个错误边界组件，该组件会捕获其组件树中所有**子**组件的错误。类似于 JavaScript 的 \` `catch{}` 代码块， `errorCallback()` 会捕获生命周期钩子或 HTML 模板中声明的事件处理程序中发生的错误。您可以编写错误边界组件的代码，使其记录堆栈信息，并渲染一个替代视图，告知用户发生了什么以及下一步该怎么做。

## 组件组合

你可以在一个组件中添加另一个组件。组件的组合使你能够从简单的组件构建出复杂的组件

### 组件搭建

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

#### owner

owner 指的是拥有该模板的组件。在这个例子中，owner 是 `x-todo-app`组件。owner 控制该模板包含在内的所有组件，并且可以：

- 设置组件的公共属性
- 调用组件上的方法
- 监听组件触发的任何事件

#### container

容器包含其他组件，但其自身包含在 owner 组件中。在这个例子中，`x-todo-wrapper`就是一个容器，容器可以：

- 读取但不能更改组件中的公共属性
- 调用组件上的方法
- 监听其包含组件冒泡的一些事件

#### 父子组件

当一个组件包含另一个组件时，我们的组件就有了层次结构。承载其他组件的组件我们称为父组件，被包含的组件我们称之为子组件

```html
<!-- 父组件 -->
<template>
  <div>
    <child-component></child-component>
  </div>
</template>
```

### 设置子组件的属性

为了在父子结构中向下通信，owner 可以在子组件上设置属性。HTML 中属性（Attribute）会转换为 JavaScript 中的属性进行赋值。

父组件可以在子组件上设置字符串或数值等原始值。但是，传递给组件的非原始值（数组或对象）是**只读**的，你必须进行浅拷贝后才能修改任何嵌套值。

#### 在子组件上设置原始值

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

#### 在子组件上设置非原始值

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

### 数据流

为了防止代码复杂性和意外的副作用，**数据应该是从父级流向子级的单向数据流动**。

当组件使用 `@api`修饰并将其公开为公共属性时，它应仅在初始化该字段时设置该值。初始化该字段后，只有其所属的组件才能设置该值。组件应将传递给它的值视为只读。

要触发 owner 组件所提供的属性的值变更，子组件可以向父组件发送事件。如果父组件拥有该数据，则可以更改属性值，该更改会通过单向数据绑定向下传递到子组件。

#### 传递给组件的对象是只读的

传递给组件的非原始值是只读的。组件无法更改对象或者数组的内容。当你尝试去更改时，控制台会报错。

要修改数据的话，请对修改对象进行浅拷贝。

#### 使用原始值作为公共属性

我们建议使用原始类型作为属性，而不是使用对象数据类型。将复杂的数据结构切片到更高级别的组件中，并将原始值传递给组件的后代。因为

- 原始值需要特定的 `@api`属性来明确定义数据类型。接受对象或数组时，需要提供文档来表明其类型。并且对象发生变化的话，消费者也无法使用。
- 标准 HTML 元素仅接受属性的原始值

### 调用子组件的方法

要公开公共方法，请使用 `@api`来修饰。公共方法是组件 API 的一部分。为了向下通信，owner 组件和父组件可以调用子组件上的 JavaScript 方法。

向上通信的话，需要在子组件中触发事件，并在 owner 或者容器组件中处理该事件。

#### 定义方法

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

#### 调用方法

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

#### 返回值

要从 JavaScript 方法中返回值，请使用 `return`语句。如

```js
@api get isPlaying() {
    const player = this.template.querySelector('video');
    return player !== null && player.paused === false;
}
```

#### 方法参数

要将数据传递给 JavaScript 方法，需要为该方法定义一个或多个参数。如

```js
    @api play(speed) { ... }
```

#### 查询选择器

`querySelector()`是标准的 DOM API，它返回与选择器匹配的第一个元素。

如果你所查询的元素可能存在多个，请考虑向元素添加其他的属性，如 `class`或者 `data-*`以做区分。

`querySelectorAll()`返回一个 DOM 元素数组。

**注意**

不要将 `id`传递给 `querySelector`之类的查询方法。渲染 HTML 模板时，`id`值可能会转换为全局唯一值。在实际运行时可能会与设置的不匹配。

### 在子组件上展开属性

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

#### 一起使用 `kwc:spread`与事件处理器

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

#### 在子组件中映射 HTML 属性

大多数 HTML 属性（atrribute）都会 映射为 JavaScript 的属性（property)。比方说 `class`需要是 `className`

## 应用到苍穹平台

### 组件元数据

#### 自定义控件元数据

组件元数据是对组件及组件部署的描述。下面是自定义控件 KWC 框架的组件元数据：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<KingdeeComponentBundle
    xmlns="http://dev.kingdee.com/2025/10/metadata">
    <version></version>
    <name>myComponent</name>
    <masterLabel>${SOLUTION_NAME}</masterLabel>
    <description></description>
    <isv>${ISV_ID}</isv>
    <moduleid>${MODULE_ID}</moduleid>
    <acceptParent>MobFilterPanelAp,MobAdvFilterPanelAp</acceptParent>
    <targets>
        <target>BaseFormModel</target>
        <target>BillFormModel</target>
        <target>DynamicFormModel</target>
        <target>MobileBillFormModel</target>
        <target>MobileFormModel</target>
    </targets>
    <targetConfigs>
        <targetConfig>
          <targets>BaseFormModel,BillFormModel,DynamicFormModel,MobileBillFormModel,MobileFormModel
            </targets>
        </targetConfig>
    </targetConfigs>
</KingdeeComponentBundle>
```

当在 KWC 组件项目根目录下，执行`kd-custom-control-cli deploy`命令上传组件元数据时，会提示输入方案名称、领域标识和开发商标识，命令执行后将会填充相应字段。

##### 顶层结构

```xml
    <KingdeeComponentBundle xmlns="http://dev.kingdee.com/2025/10/metadata">
        <!-- 基础信息 -->
        <version>...</version>
        <name>...</name>
        <masterLabel>...</masterLabel>
        <isv>...</isv>
        <moduleid>...</moduleid>
        <icon>...</icon>

        <!-- 支持的页面/表单类型 -->
        <targets>
            <target>...</target>
            ...
        </targets>

        <!-- 目标配置：定义不同页面类型下的属性列表 -->
        <targetConfigs>
            <targetConfig>
                <targets>...</targets>
                <property ...>...</property>
                ...
            </targetConfig>
            ...
        </targetConfigs>
    </KingdeeComponentBundle>
```

##### 基础信息说明

| 标签名        | 描述                                                | 示例值            | 是否必填 |
| :------------ | :-------------------------------------------------- | :---------------- | :------- |
| `version`     | 组件版本号，更新必填，新增非必填，会默认 1.0 版本号 | `2.0`             | 否       |
| `name`        | 英文唯一标识符                                      | `MyKWCAp`         | 是       |
| `masterLabel` | 显示名称（显示在左侧拖拽区域）                      | `XXXX组件`        | 是       |
| `icon`        | 组件图标，输入金蝶图标库中图标名称                  | `kdfont-标准单据` | 否       |
| `isv`         | 开发商标识                                          | `kingdee`         | 是       |
| `moduleid`    | 领域 ID                                             | `mykwc`           | 是       |

##### 页面类型定义（targets）

组件支持哪些页面类型，可配置多个，至少填入一个

| 页面类型            | 说明                                                |
| :------------------ | :-------------------------------------------------- |
| BaseFormModel       | 基础资料                                            |
| BillFormModel       | 单据页面                                            |
| DynamicFormModel    | 动态表单                                            |
| MobileBillFormModel | 移动单据，会自动包含 BaseFormModel 与 BillFormModel |
| MobileFormModel     | 移动表单                                            |

示例：

```xml
    <targets>
        <target>BaseFormModel</target>
        <target>BillFormModel</target>
        <target>DynamicFormModel</target>
        <target>MobileBillFormModel</target>
        <target>MobileFormModel</target>
    </targets>
```

##### 属性配置区块（targetConfigs）

在 `targetConfigs` 中，可以根据不同页面类型为组件配置不同的属性。每个 `targetConfig` 包含以下：

- `<targets>`：配置适用的页面类型（可以多个，如果存在相同的，会自动合并）
- `<property>`：该页面类型下的具体属性，每个属性需定义名称、类型、显示标题等

###### `<property>` 属性字段说明

**支持的属性类型**

1.  **字符串类型属性 (`String`)**
2.  **整数类型属性 (`Integer`)**
3.  **布尔值属性 (`Boolean`)**
4.  **下拉列表属性 (`Combo`)** —— 包含若干 `<item>` 子项

    1.

###### 通用字段（所有类型通用）

| 字段名        | 描述                                                 | 示例值                 | 是否必填 | 适用类型 |
| :------------ | :--------------------------------------------------- | :--------------------- | :------- | :------- |
| `name`        | 属性英文唯一标识符（代码引用），同一页面类型必须唯一 | `StringValue`          | 是       | 所有     |
| `type`        | 属性类型，决定渲染样式和校验规则                     | `String`、`Integer` 等 | 是       | 所有     |
| `caption`     | 属性标题（界面展示名称）                             | `文本类型属性`         | 是       | 所有     |
| `description` | 属性说明（开发或配置时辅助理解）                     | `用于演示文本属性用法` | 是       | 所有     |
| `default`     | 默认值，在未显式设置时生效                           | `默认值`、`true`、`0`  | 否       | 所有     |

---

###### 文本类型（`String`）

| 字段名   | 描述             | 示例值 | 是否必填 | 适用类型 |
| :------- | :--------------- | :----- | :------- | :------- |
| `length` | 最大输入字符长度 | `25`   | 否       | String   |

---

###### 整型数值类型（`Integer`）

| 字段名 | 描述   | 示例值 | 是否必填 | 适用类型 |
| :----- | :----- | :----- | :------- | :------- |
| `min`  | 最小值 | `0`    | 否       | Integer  |
| `max`  | 最大值 | `100`  | 否       | Integer  |

###### 布尔类型（`Boolean`）

| 字段名    | 描述                        | 示例值 | 是否必填 | 适用类型 |
| :-------- | :-------------------------- | :----- | :------- | :------- |
| `default` | 默认值（`true` 或 `false`） | `true` | 否       | Boolean  |

###### 下拉枚举类型（`Combo`）

| 字段名    | 描述                                   | 示例值 | 是否必填 | 适用类型 |
| :-------- | :------------------------------------- | :----- | :------- | :------- |
| `default` | 默认项的 `id` 值                       | `1`    | 否       | Combo    |
| `items`   | 枚举子项集合，包含多个 `<item>` 子节点 |        | 是       | Combo    |

####### `<item>` 子项字段

| 字段名 | 描述                             | 是否必填 | 示例值  |
| :----- | :------------------------------- | :------- | :------ |
| `id`   | 枚举项标识，最好是数字或字母组成 | 是       | `1`     |
| `name` | 显示内容（中文）                 | 是       | `选项1` |

##### 示例：针对 BaseFormModel 和 BillFormModel 配置属性

```xml
    <targetConfig>
        <targets>BillFormModel, BaseFormModel</targets>

        <!-- 文本属性 -->
        <property
            name="StringValue"
            type="String"
            caption="文本类型属性"
            description="文本类型属性演示"
            length="25"
            default="默认值"
        />

        <!-- 数字属性 -->
        <property
            name="IntValue"
            type="Integer"
            caption="数值类型属性"
            description="数值类型属性演示"
            min="2"
            max="10"
            default="2"
        />

        <!-- 下拉选择 -->
        <property
            name="ComboValue"
            type="Combo"
            caption="下拉列表类型属性"
            description="下拉列表类型属性演示"
            default="0"
        >
            <items>
                <item id="0" name="默认" />
                <item id="1" name="选项1" />
                <item id="2" name="选项2" />
            </items>
        </property>

        <!-- 布尔属性 -->
        <property
            name="BooleanValue"
            type="Boolean"
            caption="布尔类型属性"
            description="布尔类型属性演示"
            default="true"
        />
    </targetConfig>
```

### 页面布局

自定义控件中，使用页面设计器，暂时不需要页面布局元数据文件。

后续纯 KWC 页面中，支持使用页面布局元数据文件。

### 与后端通信

KWC (Kingdee Web Components) 项目提供的共享工具库，`@kdcloudjs/kwc-shared-utils` ，包含客户端检测、API 请求、OpenAPI 适配器和平台资源加载等功能模块。

#### API 模块

API 请求适配器需要搭配后端 Controller 请求方式进行使用。

支持两种调用方式：adapter & promise

支持两种调用方式：

- 适配器方式（adapterApi）：适合在组件内复用实例、享受请求去重与缓存。
- Promise 方式（promiseApi）：适合一次性调用或实时搜索（只保留最新），内置取消。

##### **导入**

```js
import { adapterApi, promiseApi } from 'kingdee/api';
```

##### **适配器方式（adapterApi）**

**用法**

```js
const adapter = adapterApi.doGet(({ data, error }) => {
  if (error) {
    // 处理错误
    return;
  }
  // 使用 data
});

adapter.update({
  endpointConfig: { isv: 'kd', app: 'demo', source: 'search', version: 'v1' },
  params: { q: 'keyword' }, // GET → 查询串；非 GET → JSON body
  headers: { 'X-Custom': 'value' }, // 自定义请求头
});

// 不再需要时断开
adapter.disconnect();
```

**行为特点**

- 请求队列与去重：相同 `requestKey` 的请求不会重复入队。
- 最新请求优先：在发起新的 `fetch` 前，会中止上一个进行中的 `fetch`（内部 `AbortController`），但不对外暴露取消 API。
- 适配器实例内带缓存（默认 5 分钟）。

##### **Promise 方式（promiseApi）**

```js
const p = promiseApi.doGetPromise({
  endpointConfig: { isv: 'kd', app: 'demo', source: 'search', version: 'v1' },
  params: { q: 'keyword' },
});

p.then(({ data }) => {
  // 使用数据
}).catch((err) => {
  if (err?.status === 'CANCELED') return; // 忽略取消错误
  // 处理其他错误
});

// 任意时刻取消（链式返回的 Promise 也会继承 cancel）
p.cancel();
```

**取消行为**

- `cancel()` 会调用内部 `AbortController.abort()` 并 `adapter.disconnect()`。
- 若 Promise 尚未决议，会立即以 `{ message: 'Request canceled', status: 'CANCELED' }` 拒绝。
- 由于每次调用都会新建适配器实例并在完成后断开，缓存对 Promise 方式不生效。

**实时搜索只保留最新**

```js
let last = null;

function onInput(term) {
  // 取消上一条（如果存在）
  if (last) last.cancel();

  const p = promiseApi.doGetPromise({
    endpointConfig: { isv: 'kd', app: 'demo', source: 'search', version: 'v1' },
    params: { q: term },
  });

  last = p;

  p.then(({ data }) => {
    // 渲染搜索结果
  }).catch((err) => {
    if (err?.status === 'CANCELED') return;
    // 处理其他错误
  });
}
```

##### **配置说明（通用）**

- `endpointConfig`：可为字符串或对象，内部自动拼接 `endpoint`

  - 字符串：直接用作 `endpoint`（例如：`'/api/search'`）。
  - 对象：

    - `endpointConfig.isv`: ISV 标识
    - `endpointConfig.app`: 应用名称
    - `endpointConfig.source`: 数据源
    - `endpointConfig.version`: API 版本（默认 v1）
    - `endpointConfig.sourceId`: 可选的源 ID
    - `endpointConfig.subSource`: 可选的子源
    - `endpointConfig.action`: 可选的操作

- `params`：请求参数

  - `GET`：转为查询字符串附加到 URL
  - 非 `GET`：作为 JSON body 发送

- `headers`：与默认头合并（包含 `Content-Type: application/json` 与 `access_token`）。

##### **回调与错误模型**

- 适配器回调：`({ data, error })`

  - 成功：`data` 为响应体，`error` 为 `null`
  - 失败：`data: null`，`error: { message, status, ... }`

    - 认证失败：`status: 'AUTH_FAILED'`
    - 网络或非 2xx：`status: 'NETWORK_ERROR'`（或 HTTP 文本）

- Promise 方式：

  - 成功：`resolve({ data, error: null })`
  - 失败：`reject({ message, status, ... })`
  - 取消：`reject({ message: 'Request canceled', status: 'CANCELED' })`

##### **选择建议**

- 需要复用实例与缓存 → 使用适配器方式。
- 需要“只保留最新请求”、方便取消 → 使用 Promise 方式。

##### **API 一览**

- `adapterApi`

  - `doGet(fn)`, `doPost(fn)`, `doDelete(fn)`, `doPut(fn)`, `doPatch(fn)` → 返回 `Adapter` 实例
  - `Adapter` 主要方法：`connect()`, `update(config)`, `disconnect()`

- `promiseApi`

  - `doGetPromise(config)`, `doPostPromise(config)`, `doDeletePromise(config)`, `doPutPromise(config)`, `doPatchPromise(config)` → 返回带 `cancel()` 的 Promise

#### OpenAPI Adapter 模块

专门用于 OpenAPI 规范的请求：

```js
import { openApiAdapter } from 'kingdee/openApiAdapter';

// 初始化认证
openApiAdapter.initializeAuth({
  endpoint: '', // 认证地址
  method: '', // 请求方法
  headers: '', // 请求头
  body: {}, // 请求体
  params: {}, // 查询参数
});

// 发送 OpenAPI 请求
const fetchData = openApiAdapter.doFetch({
  endpointConfig: {
    isv: 'kd',
    app: 'myapp',
    form: 'myform',
    serviceName: 'myservice',
    version: 'v2',
  },
  params: { query: 'test' },
});

fetchData.then((result) => {
  console.log('OpenAPI 请求结果:', result);
});

// 检查认证状态
if (openApiAdapter.isAuthenticated()) {
  console.log('已认证');
}
```

#### API & openAPI 模块高级用法

#### 使用适配器模式

API 和 OpenAPI 模块都支持适配器模式，可以创建可重用的数据适配器：

```js
    import { KingdeeElement, wire } from '@kdcloudjs/kwc';
    import { openApiAdapter } from '@kdcloudjs/kwc-shared-utils';

    export default class Adapter from KingdeeElement {
        connectedCallback() {
            openApiAdapter.initializeAuth({...})
        }

        // 通过 wire 调用doFetch，后端 Controller 返回的响应在 result 中处理
        @wire (openApiAdapter.doFetch, {
            endpointConfig: {
                isv: '',
                //...
            }
        })
        data(result) {
        }
    }
```

#### 错误处理

```js
try {
  const result = await apiAdapter.doGet(config);
  console.log('成功:', result);
} catch (error) {
  console.error('请求失败:', error.message);
  console.error('状态:', error.status);
}
```

#### 注意事项

1.  **浏览器兼容性**: 该库依赖现代浏览器 API，如 `fetch`、`Promise` 等
2.  **认证管理**: OpenAPI 模块需要正确配置认证信息
3.  **错误处理**: 建议在生产环境中添加适当的错误处理逻辑
4.  **缓存机制**: 资源加载器和 API 适配器都内置了缓存机制，注意缓存策略

### 苍穹平台指令交互

在使用 kwc 开发时，存在场景是需要交互后打开苍穹表单。那么这个时候我们可以使用 `sendBosPlatformEvent` 来进行处理。

#### showForm

`showForm` 指令用于展示另一个表单，调用示例如下:

```html
<template>
  <kd-button label="新页签打开新表单" onclick="{handleClick}"></kd-button>
</template>
```

```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import { showForm } from 'kingdee/sendBosPlatformEvent';
export default class OpenForm extends KingdeeElement {
  handleClick() {
    const formConfig = {
      formId: 'klee_pro', // 需要打开的 formId
      parentPageId: '', // 传入当前页面的 pageId
      params: { openStyle: { showType: 10 } }, // 可传入所需的参数，此例子在这里传入的内容是告知后端需要打开表单的方式
    };
    // controller 中配置版本
    const config = {
      version: 'v1', // 接口版本
      isv: 'kd', // isv
      app: 'bos', // 应用
    };
    showForm(formConfig, config);
  }
}
```

## 调试和测试

### 本地调试

当在本地自定义控件，KWC 项目目录中，执行`npm/yarn install` ，然后再执行`npm/yarn start` 命令启动本地服务，即可进行本地预览和调试。

本地启动的项目支持热更新调试。

本地预览，只是查看当前组件自身效果，如果希望看到与苍穹设计器表单中的效果，则需要进行远程调试。

### 远程调试

**上传元数据**

当本地调试时，可以通过 kd-custom-control-cli 命令将控件 xml 元数据文件部署到指定苍穹环境中，用于远程联调（即：远程苍穹环境与本地前端代码进行联调），这样可省去打包上传的操作，使开发调试更便捷。

上传控件元数据操作，在 myComponent 项目根目录下执行 kd-custom-control-cli deploy 命令，然后根据提示输入信息：

    $ kd-custom-control-cli deploy
    √ *请输入方案名称 ... 测试控件
    √ *请输入领域标识 ... hr
    √ *请输入开发商标识 ... kf00
    √ *请输入苍穹环境地址(格式为：[http/https]://[ip地址/域名]) ... http://172.2.1.1:8022/ierp
    √ 请选择数据中心 » default_datacentor
    √ *请输入OpenAPI第三方应用client_id ... test_id
    √ *请输入OpenAPI第三方应用client_secret ... *****
    √ *请输入OpenAPI第三方应用username ... testuser

参数选项说明

| 配置项        | 说明                                                      |
| :------------ | :-------------------------------------------------------- |
| 方案名称      | 自定义控件的方案名称                                      |
| 领域标识      | 自定义控件的领域标识                                      |
| 开发商标识    | 自定义控件的开发商标识                                    |
| 苍穹环境地址  | 用于远程联调的苍穹环境地址                                |
| 数据中心      | 用于远程联调的苍穹环境数据中心                            |
| client_id     | 在上述苍穹环境上创建的 OpenAPI 第三方应用的 client_id     |
| client_secret | 在上述苍穹环境上创建的 OpenAPI 第三方应用的 client_secret |
| username      | 在上述苍穹环境上创建的 OpenAPI 第三方应用的 username      |

注：输入 OpenAPI 第三方应用信息的目的是进行苍穹环境登录认证，以便将 xml 元数据文件部署到该环境，可参考文章：[OpenAPI 第三方应用注册流程](https://developer.kingdee.com/knowledge/525972550665201152?productLineId=29&isKnowledge=2&lang=zh-CN)。

**启动本地静态服务器**

本地启动一个静态服务器，供远程苍穹环境页面功能访问本地前端静态文件进行远程联调。

通过在项目根目录下执行 `node server` 以启动该服务器。

**开启本地动态构建服务**

通过启用该服务，本地前端代码文件更新后可以自动进行编译打包，然后将前端静态文件输出到上述静态服务器相关目录中，供远程苍穹环境访问使用。具体开启方法如下：

1、修改 \[项目根目录]/server/config.js 文件中的 localServer 属性值为 true

2、在项目根目录下执行 `npm run build` 启动本地动态构建服务。

**执行远程联调**

打开远程苍穹环境的对应表单预览页面，在该设计器页面或预览页 URL 地址后拼接上本地静态服务器地址`&kdcus_cdn=http://localhost:3001` 进行调试，也可预览效果。

![aed66904b798803cc8f347155074fa6e__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a17c9af380f3b56b02722)

![68057450a54a7b29d82746433f0abdf2__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a17d803b6d634b332bfae)

当更新了本地 KWC 代码时，则手动刷新该页面即可查看更新内容。

注意：若修改了 XML 元数据文件，则需要执行 kd-custom-control-cli deploy -f，将元数据文件重新部署到远程环境上。

## **国际化（i18n）**

KWC 国际化服务库，为 KWC 应用提供完整的国际化解决方案。

### 功能特性

- 🌍 多语言支持
- 🔄 动态语言切换
- 📦 按需加载语言包
- 🎯 嵌套键值翻译
- 🔧 灵活的配置选项
- 📱 自动检测浏览器语言
- 🏢 集成 BOS 系统语言设置

### 安装

    npm install @kdcloudjs/kwc-i18n

### 基本使用

#### 导入和初始化

```js
import { t, loadLanguage, changeLocale } from '@kdcloudjs/kwc-i18n';

// 基本翻译
const message = t('alert.defaultLabel'); // "警告"

// 取不到对应词条时使用fallback值替代
const greeting = t('welcome.message', { fallback: 'Welcome' });
```

#### 完整 API 导入

```js
import {
  t, // 翻译函数
  tAsync, // 异步翻译函数
  lang, // 当前语言
  locale, // 当前语言环境
  loadLanguage, // 加载语言包
  addTranslation, // 添加单个翻译
  addTranslations, // 添加多个翻译
  clearTranslation, // 清除翻译缓存
  getAvailableLanguages, // 获取可用语言
  changeLocale, // 切换语言环境
  onLocaleChange, // 监听语言环境变化
  offLocaleChange, // 移除语言环境监听
} from '@kdcloudjs/kwc-i18n';
```

### 详细使用方法

#### 1. 基本翻译

```js
// 简单翻译
const label = t('buttonMenu.loading'); // "加载中..."

// 嵌套键值翻译
const color = t('colorPicker.blueAbbr'); // "蓝"
```

#### 2. 动态加载语言包

```js
// 加载英文语言包
await loadLanguage('en_US', '/path/to/en_US.json');

// 合并模式加载（保留已有翻译）
await loadLanguage('en_US', '/path/to/additional_en_US.json', true);
```

#### 3. 添加自定义翻译

```js
// 添加单个翻译
addTranslation('zh_CN', 'custom.message', '自定义消息');

// 添加多个翻译
addTranslations('zh_CN', {
  custom: {
    title: '自定义标题',
    description: '自定义描述',
  },
});
```

#### 4. 语言环境管理

```js
// 获取当前语言环境
console.log(locale); // 'zh_CN'

// 切换语言环境
changeLocale('en_US');

// 监听语言环境变化
const handleLocaleChange = (newLocale, oldLocale) => {
  console.log(`语言从 ${oldLocale} 切换到 ${newLocale}`);
};

onLocaleChange(handleLocaleChange);

// 移除监听器
offLocaleChange(handleLocaleChange);
```

#### 5. 异步翻译

```js
// 异步获取翻译（适用于需要动态加载的场景）
const asyncMessage = await tAsync('some.key');
const asyncGreeting = await tAsync('welcome.message', { fallback: 'Welcome' });
const asyncFallback = await tAsync('non.existent.key', {
  fallback: 'Fallback',
  path: 'path/to/en_US.json',
});
```

#### 6. 清除翻译缓存

```js
// 清除指定语言的翻译缓存
clearTranslation('en_US');
```

### 模块化使用

#### 单独使用 i18n 模块

```bash
import { t, loadLanguage } from '@kdcloudjs/kwc-i18n/i18n';
```

#### 单独使用 locale 模块

```bash
import { setLocale, addLocaleListener } from '@kdcloudjs/kwc-i18n/locale';
```

#### 单独使用 lang 模块

```bash
import lang from '@kdcloudjs/kwc-i18n/lang';
```

### 语言检测优先级

系统按以下优先级自动检测语言：

1.  URL 参数中的 `lang` 参数
2.  BOS 系统配置的语言设置
3.  浏览器语言设置
4.  BOS 系统默认语言

### 翻译文件格式

翻译文件应为 JSON 格式，支持嵌套结构：

```json
{
  "alert": {
    "defaultLabel": "警告"
  },
  "buttonMenu": {
    "loading": "加载中...",
    "showMenu": "展示菜单"
  },
  "colorPicker": {
    "cancelButton": "取消",
    "doneButton": "完成"
  }
}
```

### 构建和发布

```bash
## 构建项目
npm run build

## 发布前构建
npm run prepublish
```

### 项目结构

    src/
    ├── index.js              ## 主入口文件
    └── modules/
        ├── i18n/            ## 核心翻译功能
        ├── lang/            ## 语言管理
        ├── locale/          ## 语言环境管理
        └── locales/         ## 默认翻译文件
            └── zh_CN.json   ## 中文翻译

### 注意事项

- 库会自动初始化中文翻译
- 支持 CommonJS 和 ES Module 两种导入方式
- 翻译键支持点号分隔的嵌套访问
- 语言代码格式：`zh_CN`、`en_US` 等

### 许可证

请查看项目许可证文件。

## 工具库

### kwc-shared-utils

`@kdcloudjs/kwc-shared-utils` 是一个为 KWC (Kingdee Web Components) 项目提供的共享工具库，包含客户端检测、API 请求、OpenAPI 适配器和平台资源加载等功能模块。

#### 安装

```bash
npm install @kdcloudjs/kwc-shared-utils
```

#### 模块导入

该库支持 ES Module 和 CommonJS 两种导入方式：

```js
// ES Module 导入
import {
  client,
  apiAdapter,
  openApiAdapter,
  platformResourceLoader,
} from '@kdcloudjs/kwc-shared-utils';

// 或者按需导入
import { client } from '@kdcloudjs/kwc-shared-utils';
import { platformResourceLoader } from '@kdcloudjs/kwc-shared-utils';

// CommonJS 导入
const { client, apiAdapter } = require('@kdcloudjs/kwc-shared-utils');
```

#### 模块详细说明

#### Client 模块 - 客户端环境检测

##### 应用检测 (App Detection)

检测当前运行的应用环境：

```js
import { client } from 'kingdee/client';

// 获取当前应用名称
const appName = client.getAppName(); // 返回: 'yunzhijia', 'weixin', 'dingding' 等

// 检测具体应用
if (client.isYzj()) {
  console.log('运行在云之家移动端');
}

if (client.isYzjDesktop()) {
  console.log('运行在云之家桌面端');
}

if (client.isWX()) {
  console.log('运行在微信中');
}

if (client.isWxWork()) {
  console.log('运行在企业微信中');
}

if (client.isDD()) {
  console.log('运行在钉钉中');
}

if (client.isFeiShu()) {
  console.log('运行在飞书中');
}

if (client.isWeLink()) {
  console.log('运行在WeLink中');
}
```

##### 浏览器检测 (Browser Detection)

检测当前浏览器类型：

```js
// 获取浏览器名称
const browserName = client.getBrowserName(); // 返回: 'chrome', 'firefox', 'safari' 等

// 检测具体浏览器
if (client.isChrome()) {
  console.log('Chrome 浏览器');
}

if (client.isFirefox()) {
  console.log('Firefox 浏览器');
}

if (client.isSafari()) {
  console.log('Safari 浏览器');
}

if (client.isEdge()) {
  console.log('Edge 浏览器');
}

if (client.isIE()) {
  console.log('IE 浏览器');
}
```

##### 设备检测 (Device Detection)

检测设备类型：

```js
if (client.isMobile()) {
  console.log('移动设备');
}

if (client.isPC()) {
  console.log('PC 设备');
}
```

#### Platform Resource Loader 模块 - 资源加载器

动态加载外部脚本和样式文件：

```js
import { platformResourceLoader } from 'kingdee/platformResourceLoader';

// 加载外部脚本
platformResourceLoader
  .loadScript(document.head, 'https://example.com/script.js')
  .then((url) => {
    console.log('脚本加载成功:', url);
  })
  .catch((error) => {
    console.error('脚本加载失败:', error);
  });

// 加载外部样式表
platformResourceLoader
  .loadStyle(document.head, 'https://example.com/style.css')
  .then((url) => {
    console.log('样式表加载成功:', url);
  })
  .catch((error) => {
    console.error('样式表加载失败:', error);
  });

// 使用回调方式
platformResourceLoader.loadScript(
  document.head,
  'https://example.com/script.js',
  (error, url) => {
    if (error) {
      console.error('加载失败:', error);
    } else {
      console.log('加载成功:', url);
    }
  },
);
```

**特性：**

- 自动缓存已加载的资源，避免重复加载
- 支持 Promise 和回调两种方式
- 自动处理加载错误
