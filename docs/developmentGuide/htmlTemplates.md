---
toc: content
title: 'HTML 模板'
order: '3'
---

KWC 组件使用虚拟 DOM 来智能高效地展示组件。最佳实践是使用 KWC 作为 DOM 来呈现你的页面，而非通过 JavaScript 来编写。

除了在 HTML 模板中使用 `<template>`根元素以外，允许嵌套 `<template>`来实现需求。

## 使用 HTML 模板

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

### 嵌套模板

HTML 模板可以包含带有指令的嵌套 `<template>`标签。

指令指的是特殊的 HTML 属性，例如 `kwc:if`和 `for:each`，它们可以在 HTML 元素标签中作为特殊的 DOM。

嵌套的 `<template>`标签必须包含以下指令之一: `for:each`,`iterator: iteratorname`, `kwc:if`,`kwc:else`,`kwc:elseif`,`if:true|false`

但是需要注意的是，嵌套的 `<template>`标签不能与其他指令或者 HTML 属性一块使用。例如，不要在嵌套的 `<template>`标记上使用 `class`属性。

## 在模板中绑定数据

可以使用组件模板中的属性将数据绑定到组件的 JavaScript 类中的属性。

在模板中，用不带空格的大括号将属性扩起来: `{property}`。要计算属性的值，需要在 JavaScript 类中使用 getter： `get property() {}`。在模板中，属性可以是 JavaScript 的基础类型(例如 `name`)，又或者是从对象中通过点语法访问到的内容(例如 `person.firstName`)。

KWC 不允许计算表达式，如 `person[2].name['John']`

模板中使用的属性应该包含原始值，除了在 `for:each` 或者是迭代器指令中使用。

### 示例：将组件模板属性绑定到 JavaScript

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

### 使用 getter 而非表达式

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

## 绑定 HTML class

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

### class 绑定注意事项

kwc 开发允许使用数组或者对象来绑定多个样式

- 传入数组的话，会基于各个项进行计算。例如，如果传入 `['highlight', 'yellow']`，最终元素则是 `class="highlight yellow"`
- 传入对象的话，KWC 会在编译时迭代对象上的可枚举的字符串属性，不包含原型链上的符号和属性，并且会应用具有真值关联的值。如传入 `{ highlight: true, hidden: false }`,最终结果是 `class="highlight"`

KWC 会忽略原始对象和复杂对象，即传入值的类型是布尔值，数字和函数的话，对应的值会被删除。要将布尔值或数值显示为字符串的话，需要使用 `String(value)`转换为字符串，如 `[String(isYellow), Stirng(num)]`会呈现为 `class="true 1"`(假设 `isYellow`为 `true`，`num`为 `1`)

### class 绑定示例

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

## 绑定内联样式

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

## 根据条件渲染 HTML

条件指令是特殊的 HTML 属性，可以用于操作 DOM。需要根据不同的条件显示不同的 HTML 内容时，请将条件指令添加到包含条件内容的标签中。

KWC 组件支持指令 `kwc:if={property}`,`kwc:elseif={property}`和 `kwc:else`。这几个指令会将 `{property}`绑定到模板，根据数据的 `true`或 `false`来删除或者插入 DOM 元素。

### 用法和注意事项

条件指令经常用于嵌套的 `<template>`标签和 HTML 的标准标签(如 `<div>`等)，除此之外，也允许用于自定义组件和基础组件。

### 示例：静态条件

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

### 示例：交互条件

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

### 示例：嵌套条件指令

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

## 渲染列表

要渲染列表的话，需要使用 `for:each`或者迭代器指令来迭代数组。

迭代器指令具有 `first`和 `last`属性，允许我们快速访问第一个和最后一个项。

请记住，无论使用的是哪种指令，都必须使用 `key`来为每一个元素项分配唯一的 ID。在列表数据更改时，kwc 框架会根据 key 来判断哪些项需要修改。模板中的 `key`主要是用于性能优化，在运行时不会反映在 DOM 中。

### for\:each

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

### 迭代器

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

## 渲染多个模板

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
