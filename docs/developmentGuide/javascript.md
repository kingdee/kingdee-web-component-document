---
toc: content
title: 'JavaScript 脚本'
order: '5'
---

## 共享 JavaScript

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

### 导出默认函数和变量

在 JavaScript ES6 模块中导出默认函数和变量的话，可以使用 `export default`

```js
export default MyComponent;
// 或者
export { MyComponent as default };
```

### 导出命名函数和变量

```js
const getTempOptions = () => {
  return [];
};

const name = 'Hello';

export { getTempOptions, name };
```

### 入口文件解析

KWC 框架仅会将组件文件夹中的同名 JavaScript 文件或者 css 文件作为入口。如 `x/moduleName`中，入口文件是 `moduleName.js`，当该文件不存在时，会寻找 `moduleName.css`，如果两者都不存在的话，那么编译将会失败。

### 导出内容

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

## 使用第三方库

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
