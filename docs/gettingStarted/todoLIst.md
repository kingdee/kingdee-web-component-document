---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 综合实践 # 组件的标题，会在菜单侧边栏展示
order: 2
glossary: Property | 属性 | 事件 | Events
---

# 综合实践

本章节将引导你构建一个功能完整的待办事项清单（Todo List）。通过这个综合案例，你将掌握如何组合多个「KWC」组件，并实现它们之间的数据通信。</br>

<!-- 这是一张图片，ocr 内容为：最终效果预览预览图 -->
<img src="https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a30e09c0db14c9eaac6e1" style="max-width: 100%; width: 60%;" alt="待办事项">

## 视频教程

---

## 开始之前

请确保你已完成 [开发准备](https://dev.kingdee.com/kwc/getting-started/) 中的所有步骤，并已成功启动「KWC」组件项目。

## 关于待办事项组件

在上一章节 [Hello World](https://dev.kingdee.com/kwc/getting-started/hellow-world) 的案例中，主要讲解「KWC」的基础组件功能。</br>
而针对待办事项这一类复杂应用，需要通过配置多个组件来实现，这样更便于组件的维护和管理：

- **组件组合封装**：通过对「KWC」的基础组件（`kd-input`, `kd-button`）进行二次封装，构建出 `CreateForm` 等自定义业务组件；
- **组件间通信**：通过创建父组件，采用 **Property 属性** 向下传递数据，子组件通过 **Events 事件** 向上发送指令，实现复杂的组件应用。

你需要完成以下几步来实现待办事项的功能：

1. 创建待办事项功能所需的组件文件夹及对应文件；
2. 为组件创建标题“待办事项”和背景颜色；
3. 使待办事项组件实现新增 todo 任务的功能；
4. 新增并展示 todo 任务项次及列表；
5. 为新增的 todo 任务添加交互功能。

---

## 第一步：创建组件文件库

如需完成待办事项组件开发，需要创建四个组件文件夹，分别为：

| 组件          | 职责     | 说明                                                         |
| :------------ | :------- | :----------------------------------------------------------- |
| `todoWrapper` | 容器组件 | 持有所有任务数据，处理核心业务逻辑（增、删、改、切换状态）。 |
| `createForm`  | 表单组件 | 负责接收用户输入，提交新任务。                               |
| `todo`        | 展示组件 | 负责展示单条任务，提供操作入口（完成、编辑、删除）。         |
| `editForm`    | 编辑组件 | 负责在编辑模式下修改任务内容。                               |

:::info
所有组件文件夹必须直接放在 `src/modules/` 目录下，遵循小写字母开头、仅包含字母数字或下划线的命名规则，且不能相互嵌套。
:::

根据以下步骤完成上述四个自定义组件的文件夹及文件创建，下面描述以创建 `todoWrapper` 组件为例：

1. 在 VSCode 左侧展开文件路径 `src/modules/mycontrol`。
2. 在该目录下，新建 _todoWrapper_ 文件夹。
3. 在该文件夹下，创建以下三个文件：_todoWrapper.html_，_todoWrapper.css_，_todoWrapper.js_。

完成 `todoWrapper` 组件创建之后，参照同样的操作方式，完成 `createForm` ， `todo` ， `editForm` 的文件夹及文件创建，最终文件结构目录如下：

```bash
src/
  └── modules/mycontrol
      └── ├── app/
          │   ├── app.css
          │   ├── app.html
          │   └── app.js
          └── todoWrapper/
          │   ├── todoWrapper.css
          │   ├── todoWrapper.html
          │   └── todoWrapper.js
          ├── createForm/
          │   ├── createForm.css
          │   ├── createForm.html
          │   └── createForm.js
          ├── todo/
          │   ├── todo.css
          │   ├── todo.html
          │   └── todo.js
          ├── editForm/
          │   ├── editForm.css
          │   ├── editForm.html
          │   └── editForm.js
```

---

## 第二步：添加标题和背景

根据以下步骤，修改新增的容器组件 `todoWrapper` 文件夹，为组件添加标题和背景：

1. 在 VSCode 左侧选择资源管理器，打开 _todoWrapper/todoWrapper.html_ 文件，新增如下代码，将组件标题命名为“待办事项”。

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
  </div>
</template>
```

2. 打开 _todoWrapper.css_ 文件，新增如下代码，为待办事项组件设置背景颜色等样式：

```css
.wrapper {
  width: 450px;
  padding: 30px;
  background-color: #1a1a40;
  border-radius: 5px;
  text-align: center;
}
```

3. 打开 _todoWrapper.js_ 文件，新增如下代码，预先继承`KingdeeElement` 基类，声明一个空的 Javascript 类，为后续添加数据状态和业务逻辑方法打下基础：

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {}
```

4. 将 `todoWrapper` 组件封装到根组件 `app` 中，打开 _app/app.html_ 文件，替换如下代码以导入 `todoWrapper` 组件：

```html
<template>
  <div class="page-container">
    <mycontrol-todo-wrapper></mycontrol-todo-wrapper>
  </div>
</template>
```

5. 打开 _app/app.css_ 文件，替换如下代码以整个页面的样式：

```css
.page-container {
  background-color: #3b36cc;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: sans-serif;
  min-height: 100vh;
  width: 100%;
  padding-top: 20px;
}
```

6. 打开 _app/app.js_ 文件，替换如下代码以预先继承 `KingdeeElement` 基类:

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {}
```

7. 使用快捷键（Ctrl + `）打开 VSCode 内置终端。
8. 输入 `npm start` 启动「KWC」组件，复制并访问链接 http://localhost:8000/ 。
9. 查看标题和背景效果：<br>
   <img src="https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a313784aa6b1f690b2a4e" style="max-width: 100%; width: 60%;" alt="待办事项 标题和背景">

---

## 第三步：实现新增 todo 的功能

根据以下步骤，修改新增的表单组件 `createForm` 文件夹，为待办事项组件实现新增 todo 任务的功能：

1. 在 VSCode 左侧选择资源管理器，打开 _createForm_ 文件夹，分别修改对应的 html，css 和 js 文件：

_createForm.html_:
通过将「KWC」的基础组件 `kd-input` 和 `kd-button` 组合在 `form` 容器中，为用户提供一个直观的任务录入界面。  
因为输入框是需要显示内容的，因此我们还要通过`value={content}`将输入的资料内容传给输入框，同时监听输入变化， 通过执行函数将用户最新的输入存回变量，用来更改内容。

```html
<template>
  <form class="create-form">
    <kd-input
      type="text"
      class="input-field"
      placeholder="请输入待办事项"
      value="{content}"
      onchange="{handleInputChange}"
    ></kd-input>
    <kd-button type="submit" class="submit-btn">添加</kd-button>
  </form>
</template>
```

_createForm.css_:
对 `kd-input` 和 `kd-button` 的样式变量进行覆盖，去除了原生边框并统一了配色，使基础组件能够完美融入自定义的业务场景中。

```css
.create-form {
  height: 40px;
  width: 100%;
  margin: 25px 0px;
  border: 1px solid #3b36cc;
  display: flex;
}
.input-field {
  width: 100%;
  --kdds-c-input-background: none;
  --kdds-c-input-value-color: white;
  --kdds-c-input-border: transparent;
  --kdds-c-input-padding-vertical-medium: 8px;
}
.submit-btn {
  --kdds-c-button-padding-vertical-medium: 8px;
  --kdds-c-button-primary-background: #3b36cc;
  --kdds-c-button-primary-border: #3b36cc;
}
```

_createForm.js_:
继承`KingdeeElement` 基类，在这我们需要定义一个初始为空字符串的变量 content，用来存在用户在输入框中打出的每一个字，并通过`handleInputChange(event)`事件处理函数来捕获输入并更新。

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  content = '';

  handleInputChange(event) {
    this.content = event.target.value;
  }
}
```

2. 通过修改 `todoWrapper` 容器组件的 _todoWrapper.html_ 文件，引入 `createForm` 组件，实现组件的嵌套与功能集成：

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
    <mycontrol-create-form></mycontrol-create-form>
  </div>
</template>
```

3. 使用快捷键（Ctrl + `）打开 VSCode 内置终端。
4. 输入 `npm start` 启动「KWC」组件，复制并访问链接 http://localhost:8000/ 。
5. 查看当前的运行效果：<br>
   <img src="https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a314d9c0db14c9eaac6fd" style="max-width: 100%; width: 60%;" alt="待办事项 新增todo">

---

## 第四步：展示 todo 任务列表

目前，我们已经可以在输入框中输入待办事项内容，接下来通过修改新增的展示组件 `todo` 文件，可以展示用户添加的待办事项 todo 的任务列表：

1. 在 VSCode 左侧选择资源管理器，打开 _todo_ 文件夹，分别修改对应的 html，css 和 js 文件：

_todo.html_:
通过`todo.content`可以获取并展示 content 中的内容。

```html
<template>
  <div class="{containerClass}">
    <p>{todo.content}</p>
  </div>
</template>
```

_todo.css_:

```css
.todo {
  background-color: #3b36cc;
  height: 40px;
  padding: 0 10px;
  margin-top: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
```

_todo.js_:
通过 `@api todo` 从外部接收数据，并通过 `get containerClass()` 返回用于控制样式的“类名字符串”。

```javascript
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @api todo;

  get containerClass() {
    return `todo ${this.todo.isCompleted ? 'completed' : ''}`;
  }
}
```

2. 上述步骤完成了 `to do` 组件的定义，接下来还需要将他引入 `todoWrapper` 容器组件。该步骤需通过修改 `todoWrapper` 容器组件的 _todoWrapper.html_ 和 _todoWrapper.js_ 文件完成。

_todoWrapper.html_:
利用 `for:each` 循环 `todos` 数组动态渲染`mycontrol-todo` 子组件（`key` 属性确保数据变动时高效增量更新）；给 `mycontrol-create-form` 绑定 `onaddtodo={handleAddTodo}` 事件，实现子父组件数据更新与分发。

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
    <mycontrol-create-form onaddtodo="{handleAddTodo}"></mycontrol-create-form>
    <template for:each="{todos}" for:item="todo">
      <mycontrol-todo key="{todo.id}" todo="{todo}"> </mycontrol-todo>
    </template>
  </div>
</template>
```

_todoWrapper.js_:
先用 `@track` 定义响应式数组作为初始数据源，确保视图随数据实时刷新；`handleAddTodo` 函数通过 `event.detail` 接收子组件的新任务文字，为其生成时间戳唯一 ID，最后用展开运算符创建新数组副本并赋值给 `this.todos`。

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @track todos = [
    {
      content: '打扫厕所',
      id: 1,
      isCompleted: false,
    },
    {
      content: '写作业',
      id: 2,
      isCompleted: true,
    },
  ];

  handleAddTodo(event) {
    const content = event.detail;
    if (!content) {
      return;
    }

    const newTodo = {
      content: content,
      id: Date.now(), // 使用时间戳代替 Math.random() 避免 key 冲突
      isCompleted: false,
    };
    this.todos = [...this.todos, newTodo];
  }
}
```

3. 完成 `todo` 组件的内容展示之后，还需通过修改 `createForm` 组件的 _createForm.html_ 和 _createForm.js_ 文件，解决 `createForm` 组件中传出 `todo` 内容的能力。

_createForm.html_:

```html
<template>
  <form class="create-form" onsubmit="{handleSubmit}">
    <kd-input
      type="text"
      class="input-field"
      placeholder="请输入待办事项"
      value="{content}"
      onchange="{handleInputChange}"
    ></kd-input>
    <kd-button type="submit" class="submit-btn" onclick="{handleSubmit}"
      >添加</kd-button
    >
  </form>
</template>
```

_createForm.js_:
封装并派发任务指令，通过`event.preventDefault()`阻止表单默认刷新行为， 将用户输入的内容作为“包裹”派发给父组件，随后清空输入框以备下次录入。

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class CreateForm extends KingdeeElement {
  content = '';

  handleInputChange(event) {
    this.content = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    // 向上派发事件，将输入的内容传给父组件
    this.dispatchEvent(new CustomEvent('addtodo', { detail: this.content }));
    this.content = ''; // 清空输入框
  }
}
```

4. 使用快捷键（Ctrl + `）打开 VSCode 内置终端。
5. 输入 `npm start` 启动「KWC」组件，复制并访问链接 http://localhost:8000/ 。
6. 查看当前的运行效果，并且可以尝试添加待办事项：<br>
   <img src="https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a316507ad417580a830d8" style="max-width: 100%; width: 60%;" alt="待办事项 展示todo">

---

## 第五步：为 todo 任务添加交互功能

根据上述步骤完成了为待办事项添加 todo 任务和展示的功能，接下来我们将要解决待办事项的删除、编辑与完成状态的切换。根据以下步骤，修改展示组件 `todo` 文件夹，为 todo 任务列表添加对应的交互功能。

### 为 todo 任务添加删除按钮

1. 在 VSCode 左侧选择资源管理器，打开 _todo_ 文件夹，分别修改对应的 html，css 和 js 文件：

_todo.html_:
通过`onclick={handleToggleComplete}`给待办事项文本添加点击事件，这样后续可以通过点击文本将待办事项切换为“已完成”或“未完成”。
在`actions`容器中添加“编辑”和“删除”按钮，我们先为“删除”按钮添加点击事件。

```html
<template>
  <div class="{containerClass}">
    <p onclick="{handleToggleComplete}">{todo.content}</p>
    <div class="actions">
      <span class="icon" title="Edit">✎</span>
      <span class="icon delete-icon" onclick="{handleDelete}" title="Delete"
        >🗑</span
      >
    </div>
  </div>
</template>
```

_todo.css_:
渲染已完成状态的事项样式、“编辑”与“删除”按钮的样式。

```css
.todo {
  background-color: #3b36cc;
  height: 40px;
  padding: 0 10px;
  margin-top: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.completed {
  opacity: 0.4;
  text-decoration: line-through 3px black;
  text-decoration-color: black;
  text-decoration-thickness: 3px;
}
.icon {
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 10px;
}
```

_todo.js_:
通过 `CustomEvent` 封装了切换状态（`togglecomplete`）和删除（`delete`）的指令，并将当前任务的 `id` 作为参数传递出去。

```javascript
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @api todo;

  get containerClass() {
    return `todo ${this.todo.isCompleted ? 'completed' : ''}`;
  }
  handleToggleComplete() {
    this.dispatchEvent(
      new CustomEvent('togglecomplete', { detail: this.todo.id }),
    );
  }
  handleDelete() {
    this.dispatchEvent(new CustomEvent('delete', { detail: this.todo.id }));
  }
}
```

2. 通过修改 `todoWrapper` 容器组件的 _todoWrapper.html_ 和 _todoWrapper.js_ 文件，引入 `todo` 组件，添加“删除”与“状态切换”事件：

_todoWrapper.html_:

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
    <mycontrol-create-form onaddtodo="{handleAddTodo}"></mycontrol-create-form>
    <template for:each="{todos}" for:item="todo">
      <mycontrol-todo
        key="{todo.id}"
        todo="{todo}"
        ondelete="{handleDelete}"
        ontogglecomplete="{handleToggleComplete}"
      >
      </mycontrol-todo>
    </template>
  </div>
</template>
```

_todoWrapper.js_:
通过 `filter` 方法过滤掉指定 ID 的任务来实现删除功能，并利用 `map` 方法配合展开运算符精确修改特定任务的完成状态，通过对 `this.todos` 进行重新赋值。

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @track todos = [
    {
      content: '打扫厕所',
      id: 1,
      isCompleted: false,
    },
    {
      content: '写作业',
      id: 2,
      isCompleted: true,
    },
  ];

  handleAddTodo(event) {
    const content = event.detail;
    if (!content) {
      return;
    }

    const newTodo = {
      content: content,
      id: Date.now(), // 使用时间戳代替 Math.random() 避免 key 冲突
      isCompleted: false,
    };
    this.todos = [...this.todos, newTodo];
  }
  handleDelete(event) {
    const id = event.detail;
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  handleToggleComplete(event) {
    const id = event.detail;
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    );
  }
}
```

3. 使用快捷键（Ctrl + `）打开 VSCode 内置终端。
4. 输入 `npm start` 启动「KWC」组件，复制并访问链接 http://localhost:8000/ 。
5. 查看当前的运行效果，可以尝试删除事项、点击事项文本切换事项状态：<br>
   <img src="https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a317dc5602355134dccc9" style="max-width: 100%; width: 60%;" alt="待办事项 添加按钮">

### 为 todo 任务添加编辑功能

因编辑功能的 UI 和逻辑与 `todo` 组件差异较大，将编辑表单独立为 `editForm` 组件更合适。在 mycontrol 目录下新建 `editForm` 组件文件夹。
根据以下步骤，修改新增的组件 `editForm` 文件夹，为 todo 任务添加编辑功能：

1. 在 VSCode 左侧选择资源管理器，打开 _editForm_ 文件夹，分别修改对应的 html，css 和 js 文件：

_editForm.html_:

```html
<template>
  <form class="create-form">
    <kd-input
      type="text"
      placeholder="编辑待办事项"
      value="{content}"
      onchange="{handleInputChange}"
      class="input-field"
    ></kd-input>
    <kd-button type="submit" class="submit-btn" onclick="{handleSubmit}"
      >完成</kd-button
    >
  </form>
</template>
```

_editForm.css_:

```css
.create-form {
  height: 40px;
  width: 100%;
  margin-bottom: 20px; /* 为了适应 todo 列表的间距微调 */
  margin-top: 20px;
  border: 1px solid #3b36cc;
  display: flex;
}
.input-field {
  width: 100%;
  --kdds-c-input-background: none;
  --kdds-c-input-value-color: white;
  --kdds-c-input-border: transparent;
  --kdds-c-input-padding-vertical-medium: 8px;
}
.submit-btn {
  --kdds-c-button-padding-vertical-medium: 8px;
  --kdds-c-button-primary-background: #3b36cc;
  --kdds-c-button-primary-border: #3b36cc;
}
```

_editForm.js_:
通过生命周期钩子 `connectedCallback` 在组件挂载时自动回显旧任务内容，确保用户能在原文字基础上修改。提交时，它将任务的 `id` 与修改后的 `content` 封装成对象一同派发给父组件，从而实现精准的数据更新。

```javascript
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class EditForm extends KingdeeElement {
  @api todo;
  content;

  connectedCallback() {
    // 初始化时将 content 设置为 todo 的当前内容
    this.content = this.todo.content;
  }

  handleInputChange(event) {
    this.content = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    // 向上派发 update 事件，包含 id 和新内容
    this.dispatchEvent(
      new CustomEvent('submitedit', {
        detail: {
          id: this.todo.id,
          content: this.content,
        },
      }),
    );
  }
}
```

2. 通过修改 `todo` 组件的 _todo.html_ 和 _todo.js_ 文件，引入 `editForm` 组件，实现组件的交互：

_todo.html_:
在 `todo` 组件中引入 `<mycontrol-edit-form>`，通过状态判断控制其显示（编辑态显示组件，否则显示待办内容）；给 “编辑” 按钮绑定 `onclick={handleToggleEditing}` 点击事件。

```html
<template>
  <template kwc:if="{todo.isEditing}">
    <mycontrol-edit-form todo="{todo}" onsubmitedit="{handleEditSubmit}">
    </mycontrol-edit-form>
  </template>

  <template kwc:else>
    <div class="{containerClass}">
      <p onclick="{handleToggleComplete}">{todo.content}</p>
      <div class="actions">
        <span class="icon" onclick="{handleToggleEditing}" title="Edit">✎</span>
        <span class="icon delete-icon" onclick="{handleDelete}" title="Delete"
          >🗑</span
        >
      </div>
    </div>
  </template>
</template>
```

_todo.js_:
补充 `handleToggleEditing()` 与 `handleEditSubmit(event)` 用户捕捉用户动作并向上派发信号。

```javascript
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @api todo;

  get containerClass() {
    return `todo ${this.todo.isCompleted ? 'completed' : ''}`;
  }
  handleToggleComplete() {
    this.dispatchEvent(
      new CustomEvent('togglecomplete', { detail: this.todo.id }),
    );
  }
  handleToggleEditing() {
    this.dispatchEvent(
      new CustomEvent('toggleediting', { detail: this.todo.id }),
    );
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent('delete', { detail: this.todo.id }));
  }

  // 这里是转发 EditForm 发上来的事件到 TodoWrapper
  handleEditSubmit(event) {
    // 事件冒泡或者重新派发，这里选择重新派发以保持清晰
    this.dispatchEvent(new CustomEvent('edit', { detail: event.detail }));
  }
}
```

3. 通过修改 `todoWrapper` 组件的 _todoWrapper.html_ 和 _todoWrapper.js_ 文件，添加“切换编辑”与“更新修改内容”事件。

_todoWrapper.html_:

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
    <mycontrol-create-form onaddtodo="{handleAddTodo}"></mycontrol-create-form>
    <template for:each="{todos}" for:item="todo">
      <mycontrol-todo
        key="{todo.id}"
        todo="{todo}"
        ondelete="{handleDelete}"
        ontogglecomplete="{handleToggleComplete}"
        ontoggleediting="{handleToggleEditing}"
        onedit="{handleEditTodo}"
      >
      </mycontrol-todo>
    </template>
  </div>
</template>
```

_todoWrapper.js_:
补充编辑相关事件逻辑：`handleToggleEditing` 通过取反 `isEditing` 属性，实现任务在展示 / 编辑模式间切换；`handleEditTodo` 在保存修改时，通过对象解构获取新内容更新数组，并将 `isEditing` 设为 `false` 退出编辑状态；预制数据默认 `isEditing: false` ，保持任务为展示模式。

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @track todos = [
    {
      content: '打扫厕所',
      id: 1,
      isCompleted: false,
      isEditing: false,
    },
    {
      content: '写作业',
      id: 2,
      isCompleted: true,
      isEditing: false,
    },
  ];

  handleAddTodo(event) {
    const content = event.detail;
    if (!content) {
      return;
    }

    const newTodo = {
      content: content,
      id: Date.now(), // 使用时间戳代替 Math.random() 避免 key 冲突
      isCompleted: false,
      isEditing: false,
    };
    this.todos = [...this.todos, newTodo];
  }
  handleDelete(event) {
    const id = event.detail;
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  handleToggleComplete(event) {
    const id = event.detail;
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    );
  }
  handleToggleEditing(event) {
    const id = event.detail;
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
    );
  }

  handleEditTodo(event) {
    const { id, content } = event.detail;
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, content: content, isEditing: false } : todo,
    );
  }
}
```

4. 使用快捷键（Ctrl + `）打开 VSCode 内置终端。
5. 输入 `npm start` 启动「KWC」组件，复制并访问链接 http://localhost:8000/ 。
6. 查看当前的运行效果，可以尝试编辑待办事项内容：<br>
   <img src="https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a319115bee62062d21158" style="max-width: 100%; width: 60%;" alt="待办事项 编辑todo">

---

## 下一步

你已经成功构建了一个功能完整的「KWC」待办事项应用。

如果想深入了解「KWC」的组件通信、生命周期等高级特性，请继续学习 [开发指南](https://dev.kingdee.com/kwc/development-guide)，掌握更多「KWC」组件开发技巧。
