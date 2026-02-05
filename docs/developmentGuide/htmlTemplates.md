---
toc: content
title: '使用 HTML 模板'
order: '3'
glossary: 命名空间 | 嵌套模板 | 迭代器
---

# 使用 HTML 模板

HTML 模板通过声明式语法定义组件视图结构，配合数据绑定与渲染指令，可构建动态交互界面，数据变化时视图自动更新。

本章将介绍如何在「KWC」组件中创建、嵌套与渲染 HTML 模板。

## 创建模板

### 基本模板

每个 UI 组件都需要一个 HTML 模板文件（如 `myComponent.html`）。文件必须以 `<template>` 标签作为根元素，组件结构需编写在根标签内，例如：

```html
<template>
  <div>Hello World</div>
</template>
```

在组件渲染时，`<template>`会被替换为 `<namespace-component-name>`。例如，在浏览器控制台中，具有模板 `app.html` 的组件呈现为 `<x-app>`，其中 `x` 是命名空间。<br>
<img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a13f7bffe264705f970ff" style="max-width: 100%; width: 60%;" alt="命名空间-01">

  <img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a140b07ad417580a82b5e" style="max-width: 100%; width: 60%;" alt="命名空间-02">

### 嵌套模板

在根标签 `<template>` 内，你可以嵌套使用 `<template>` 标签配合渲染指令（如 `kwc:if`、`for:each`），以实现条件渲染或列表渲染。例如：

```html
<template>
  <div>
    <!-- 这个嵌套模板仅在条件满足时渲染内容 -->
    <template kwc:if="{isVisible}">
      <p>这段内容根据条件显示</p>
    </template>
  </div>
</template>
```

嵌套的 `<template>` 必须满足以下要求：

- 必须携带指定指令之一：`for:each`、`iterator:iteratorname`、`kwc:if`、`kwc:else`、`kwc:elseif`、`if:true|false`；
- 不能添加 `class`、`id` 等普通 HTML 属性，避免与指令逻辑冲突。

---

## 绑定数据

「KWC」支持将连接组件 JavaScript 类（数据层）绑定至 HTML 模板（视图层），可实现“数据驱动视图”，即数据变化时，界面自动同步更新，无需手动操作 DOM。该功能通过 `{property}` 插值语法进行绑定。

### 绑定表达式

- 插值语法：使用不带空格的大括号 `{property}` 绑定 JavaScript 类中的属性。
- 属性来源：
  - 基础类型：直接使用类属性（如 `name`）。
  - 对象访问：仅支持点语法访问（如 `person.firstName`）。
  - 计算属性：需在类中使用 `get property() {}` 定义。
- 约束限制：
  - 禁止复杂表达式：不支持方括号或多层级复杂索引（如 `person[2].name['John']`）。
  - 原始值要求：除 `for:each` 或迭代器外，模板属性应包含原始数据类型。

### 基础数据绑定

**示例 1：基础属性绑定**

如下示例，将模板中 `greeting`属性绑定到 JavaScript 中的 `greeting`属性。</br>

```html
<!-- hello.html -->
<template>
  <div>Hello, {greeting}!</div>
</template>
```

</br>

```js
// hello.js
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Hello extends KingdeeElement {
  greeting = 'World';
}
```

:::info

- 使用 `{ }` 将 JavaScript 中的属性绑定到视图;
- `{ }` 内应为合法的 JavaScript 变量或成员表达式，例如 `{data}`和 `{data.name}`;
- 不要在括号内添加多余空格。
  :::

**示例 2：属性与事件绑定**

接下来，我们修改该组件，添加一个输入字段，并且将输入的内容作为打招呼的对象的名称。<br>
`kd-input`字段使用 `onchange`来监听值的改变。当输入框中内容发生变化时，JavaScript 文件中的 `handleChange`函数会执行。

:::info
要将 `handleChange`函数绑定到模板，我们需要使用相同的语法 `{handleChange}`。
:::

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

:::info
当组件重新渲染时，模板中使用的表达式将被重新计算。
:::

### 计算属性值

如果计算属性的值，建议是使用 `getter`而非表达式。例如，要计算某样商品的总价，在 JavaScript 中使用 `getter` 函数，而不是使用模板中的表达式。 `getter` 函数远比表达式要强大，并且还支持单元测试。

**语法规则**：

- 使用如下方式定义一个计算 JavaScript 类中值的 `getter`：

```js
get propertyName() { ... }
```

- 从 HTML 中访问 getter 的话，通过大括号+函数名即可：`{propertyName}`。

下面的示例中，用户输入商品的单价和数量，然后通过 `getter` 函数计算了总额。计算属性 (getter) 会缓存其结果，只有当其依赖的响应式属性（如 `unitPrice`, `quantity`）发生变化时才会重新计算，这有助于提升性能。同时，它让模板更简洁，将复杂逻辑移入 JavaScript，便于测试。

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

---

## 条件渲染

当需要根据数据状态动态显示或隐藏界面元素时，「KWC」框架提供了条件指令来实现 DOM 的自动管理。

### 语法规则

条件渲染使用以下指令：

- `kwc:if={property}` - 当表达式为真时渲染元素
- `kwc:elseif={property}` - 前一个条件为假时，判断此条件
- `kwc:else` - 所有条件均为假时的默认渲染

**注意事项**：

- 指令会将 `{property}`与数据绑定，根据布尔值决定是否插入 DOM
- 可用于嵌套 `<template>`、HTML 标签、自定义组件和基础组件
- 条件指令必须连续书写，中间不能插入其他元素
- 框架会自动响应属性变化更新 DOM，无需手动操作

### 示例 1：静态条件渲染

```html
<template>
  <template kwc:if="{property1}">Statement 1</template>
  <template kwc:elseif="{property2}">Statement 2</template>
  <template kwc:else>Statement 3</template>
</template>
```

以上代码示例中，渲染的逻辑如下：

- `property1`为 `true`时，仅渲染 Statement 1
- `property2`为 `true`时，仅渲染 Statement 2
- `property1`和 `property2` 都为 `false` 时，仅渲染 Statement 3

### 示例 2：交互条件渲染

以下示例中，模板已包含一个输入框，当输入值大于 10 时，`handleChange` 将设置 `areDetailsVisible`的值，为 `true`则显示嵌套模板。

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

<img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a1741bffe264705f97188" style="max-width: 100%; width: 60%;" alt="交互条件渲染-01">

<img src="https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a174c15bee62062d20ccb" style="max-width: 100%; width: 60%;" alt="交互条件渲染-01">

:::info
JavaScript 并不会操作 DOM，只是更改了属性的值。
:::

### 示例 3：嵌套条件指令

可在多个模板中运用条件语句，构建复杂的自定义逻辑。例如，校验用户的登录状态，以及已登录用户是否存在新通知。

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

---

## 列表渲染

当需要循环渲染数组数据（如列表、表格）时，使用 `for:each` 或 `iterator` 指令，两种指令均需配合 `key` 属性实现高效渲染。

### 语法规则

**指令选择**：

- `for:each`：适用于基础循环，仅需访问当前项数据。
- `iterator` (迭代器)：适用于需要获取状态的场景，提供 `first` 和 `last` 布尔属性，方便处理边界逻辑。

**`key` 约束**：

- 每一项必须分配唯一的 `key` 属性，作为框架 `Diff` 算法的标识。
- `key` 必须是 字符串 或 数字，禁止使用对象。
- 严禁将数组索引（`Index`）作为 `key` 值，必须使用业务数据中的唯一标识（如 id、code）。
- `key` 仅用于开发框架优化性能，不会出现在最终生成的真实 DOM 结构中。
- 通过 `key` 标识，框架能精确识别被更改的项，实现按需渲染而非全量更新，避免错序渲染问题。

### for\:each 指令

使用 `for:each`指令时，使用 `for:item="currentItem"`来访问当前项。

如下示例，迭代访问了一个名为 students 的数组：

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

### iterator 指令

当需要知道列表项的索引、是否为第一项或最后一项时，使用 `iterator` 指令，语法：`iterator: iteratorname={array}`。

使用 `iteratorname`可以访问以下属性：

- `value`- 当前列表项的值，例如 `{iteratorname}.value.{propertyName}`
- `index`- 当前列表项的索引
- `first`- 布尔值，是否为第一项
- `last`- 布尔值，是否为最后一项

```html
<template>
  <ul>
    <template iterator:it="{students}">
      <li
        key="{it.value.no}"
        class="{ 'first-item': it.first, 'last-item': it.last }"
      >
        第 {it.index + 1} 名：{it.value.name}
      </li>
    </template>
  </ul>
</template>
```

---

## 样式绑定

「KWC」的 HTML 模板支持绑定 `class` 属性和内联 style，推荐使用动态绑定方式，实现样式的灵活控制。

### class 绑定

在「KWC」组件开发中，你可以使用 `class`对象绑定，「KWC」支持通过数组或对象进行动态样式绑定，替代繁琐的字符串拼接。

**语法规则**：

- 数组语法 `[]`：将数组项合并为类名。
  - 示例：如果传入 `['highlight', 'yellow']`，最终元素是 `class="highlight yellow"`
- 对象语法 `{}`：基于布尔值按需加载（仅应用真值关联的属性）。
  - 示例：如果传入 `{ highlight: true, hidden: false }`，最终元素是 `class="highlight"`
- 非字符过滤：「KWC」会自动忽略或删除类型为 Boolean、Number、Function 的原始值。
  - 示例：如`[String(isYellow), Stirng(num)]`会呈现为 `class="true 1"`(假设 `isYellow`为 `true`，`num`为 `1`)
- 强制转换：若需将布尔值或数字作为类名（如显示为 "true" 或 "1"），必须调用 `String(value)` 进行显式转换。
- 不支持复杂对象：绑定值应保持结构扁平，避免传入原始对象或复杂实例。

语法示例如下表所示：

| 类型     | 示例                                                   | 输出结果                     |
| :------- | :----------------------------------------------------- | :--------------------------- |
| String   | "note highlight"                                       | class="note highlight"       |
| Boolean  | FALSE                                                  | class=""                     |
| Number   | 10                                                     | class=""                     |
| Function | () => {}                                               | class=""                     |
| Array    | \["note", "highlight"]                                 | class="note highlight"       |
|          | \[false, "note", null]                                 | class="note"                 |
|          | \["block", { note: true }, \["highlight"]]             | class="block note highlight" |
| Object   | { block: true, hidden: false, 'note highlight': true } | class="block note highlight" |

**示例：动态 class 绑定**

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

### 内联样式绑定

考虑代码整洁和渲染性能，应首选`class` 绑定配合组件包中的 CSS 样式表，但是当样式依赖于运行的变量（如进度条宽度、动态主题色等）且无法通过预定义 `Class` 覆盖时，可使用 `style` 属性绑定。

**示例 1**:

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

**示例 2：条件逻辑计算**

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

---

## 多模板渲染

当组件需要展示多种不同界面（如切换视图、不同状态显示不同模板）时，可拆分多个 HTML 模板文件，在 JavaScript 类中通过 `render()` 方法动态切换。

### 步骤

1. 创建多个 HTML 模板文件（如 `templateOne.html`、`templateTwo.html`）；
2. 在 JavaScript 类中导入所有模板；
3. 定义 `render()` 方法，根据组件状态返回对应的模板引用。

### 示例

```js
// multipleTemplates.js
import { KingdeeElement } from '@kdcloudjs/kwc';
import templateOne from './templateOne.html';
import templateTwo from './templateTwo.html';

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

```html
<!-- templateTwo.html -->
<template>
  <kd-card title="模板二">
    <div>模板二</div>
    <p>
      <kd-button label="模板切换" onclick="{switchTemplate}"></kd-button>
    </p>
  </kd-card>
</template>
```

### 多模板样式规范

每个模板的样式文件需与模板文件名一致（如 `templateTwo.html` 对应 `templateTwo.css`），确保样式隔离，避免冲突。<br>
文件目录结构示例：

    MultipleTemplate
      ├──multipleTemplate.html
      ├──multipleTemplate.js
      ├──templateOne.html
      ├──templateOne.css
      ├──templateTwo.html
      ├──templateTwo.css
