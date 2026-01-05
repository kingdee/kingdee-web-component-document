---
toc: 'content'
title: 'Todo List 待办事项'
---

# Todo List 待办事项

本教程将引导你逐步实现一个简单的代办事项清单（ Todo List ）， 在这个过程中，你将学习如何利用 KWC 提供的**基础组件**（如输入框、按钮），像搭积木一样封装出属于你自己的**业务组件**，并让它们协同工作。

### 你将学到什么？

通过这个案例，你将掌握以下内容：

1. **组件组合与封装**： 不需要重复造轮子，学习如何基于 KWC 的基础组件（`kd-input`, `kd-button`）进行二次封装，构建出 `CreateForm` 等自定义业务组件；
2. **组件间通信**： 理解 “单向数据流” ——父组件通过 Props 向下传递数据，子组件通过 Events 向上发送指令；

### 实现的是什么程序？

本教程将使用 KWC 实现一个交互式的代办事项清单，以下是功能点与效果预览：

1. **添加任务**：输入文字按回车或点“添加”，列表即刻更新。
2. **状态切换**：勾选任务后，文字自动出现删除线效果。
3. **编辑功能**：点击“编辑”按钮进入编辑模式，且输入框预填了原有内容。
4. **删除任务**：点击删除，对应条目平滑移除。

<!-- 这是一张图片，ocr 内容为：最终效果预览预览图 -->

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a30e09c0db14c9eaac6e1)

---

### 环境配置

在开始编辑本教程代码前，需要提前配置好开发环境，如果你还没有配置，可以参考“快速入门-安装部署”中的步骤安装相关依赖：

1. 安装 Node.js 与 git
2. 在 VSCode 中输入 `Ctrl + `呼出终端，输入`npm install -g yarn` 或 `npm install pnpm -g` 安装包管理器
3. 使用`npm install -g @kdcloudjs/kd-custom-control-cli` 安装脚手架
4. 使用` kd-custom-control-cli create <自定义控件方案>` 如`kd-custom-control-cli create mycontrol`创建一个 名为` mycontrol` 的自定义控件项目
5. 使用 `npm install` 安装依赖
6. 使用 `npm start` 启动本地服务，按照提示在浏览器中查看运行效果

---

### 组件结构设计概览

项目运行起来后，你会发现在 src 中有 app 这个文件夹，包含了 app.css，app.html，app.js 这三个文件，组成了本项目的根容器，负责拼装各个组件和页面的整体布局设计；

如果将本项目的所有代码都写在 app 中，这会让 app 组件变得非常庞大，难以维护与复用，这样也会失去使用 KWC 的意义，所以最好的方法是将不同功能封装成组件，最后再把他们结合起来。本教程会自定义以下四个组件来支撑待办事项的搭建：

- **todoWrapper (总指挥)**: 持有所有数据，处理增删改逻辑。
- **createForm (输入框)**: 负责收集用户输入，告诉总指挥“加新任务”。
- **todo (列表项)**: 负责展示单条任务。
- **editForm (编辑框)**: 仅在编辑模式下出现，负责修改任务。

其中组件的文件夹及其文件必须遵循以下命名规则：

- 必须以小写字母开头
- 只能包含字母数字或下划线字符
- 在命名空间中必须是唯一的
- 不能包含空格
- 不能以下划线结尾
- 不能包含两个连续的下划线
- 不能包含连字符（-）

**注意：每个组件需要直接保存在 src/modoules 下，不能在一个组件文件夹中嵌套另一个组件；**

---

### 背景与标题

新增自定义组件：在 app 目录下新建组件文件夹 todoWrapper，并在该文件夹下新建 todoWrapper.css，todoWrapper.html，todoWrapper.js 三个文件，最终文件结构目录如下：

```bash
src/
  └── modules/mycontrol
      └── ├── app/
          │   ├── app.css
          │   ├── app.html
          │   └── app.js
          └── todoWrapper/
              ├── todoWrapper.css
              ├── todoWrapper.html
              └── todoWrapper.js
```

在 todoWrapper.html 中为该组件的容器赋予一个名为“wrapper”的 classname 并在容器中添加“待办事项”标题，todoWrapper.html 代码如下：

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
  </div>
</template>
```

在 todoWrapper.css 中添加该组件的的背景色等样式内容，todoWrapper.css 代码如下：

```css
.wrapper {
  width: 450px;
  padding: 30px;
  background-color: #1a1a40;
  border-radius: 5px;
  text-align: center;
}
```

在 todoWrapper.js 中预先继承`KingdeeElement` 基类，声明一个空的 Javascript 类，为后续添加数据状态和业务逻辑方法打下基础，todoWrapper.js 代码如下：

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {}
```

至此，我们已经初步完成了 todoWrapper 这个组件的封装，接下来就试试把他组装到 app 中吧 ！
同样的，我们在 app.html 中添加容器，并在容器中通过`<mycontrol-todo-wrapper></mycontrol-todo-wrapper>`导入我们已经封装好的组件，app.html 代码如下：

```html
<template>
  <div class="page-container">
    <mycontrol-todo-wrapper></mycontrol-todo-wrapper>
  </div>
</template>
```

为了界面美观，我们需要在 app.css 中定义整个页面的样式，app.css 代码如下：

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

同样的，我们需要在 app.js 中预先继承`KingdeeElement` 基类，app.js 代码如下：

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {}
```

目前我们已经完成了页面整体背景样式和标题内容的搭建，在 VSCode 中输入 `Ctrl + `呼出终端，使用`npm start`启动本地服务，按照提示在浏览器中输入网址即可查看运行效果：

<!-- 这是一张图片，ocr 内容为：预览标记与标题效果预览图 -->

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a313784aa6b1f690b2a4e)

---

### 定义 createForm 组件

新增 createForm 输入框组件：在 app 目录下新建组件文件夹 createForm，并在该文件夹下新建 createForm.css，createForm.html，createForm.js 三个文件，最终文件结构目录如下：

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


```

在 createForm.html 中， 通过将 KWC 的基础组件 `kd-input` 和 `kd-button` 组合在 `form` 容器中，为用户提供一个直观的任务录入界面。  
因为输入框是需要显示内容的，因此我们还要通过`value={content}`将输入的资料内容传给输入框，同时监听输入变化， 通过执行函数将用户最新的输入存回变量，用来更改内容，createForm.html 代码如下：

```html
<template>
  <form class="create-form">
    <kd-input
      type="text"
      class="input-field"
      placeholder="请输入待办事项"
      value={content}
      onchange={handleInputChange}
    ></kd-input>
    <kd-button type="submit" class="submit-btn">添加</kd-button>
  </form>
</template>
```

接着在 createForm.css 中， 通过对 `kd-input` 和 `kd-button` 的样式变量进行覆盖，去除了原生边框并统一了配色，使基础组件能够完美融入自定义的业务场景中，createForm.css 代码如下。

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

在 createForm.js 中继承`KingdeeElement` 基类，在这我们需要定义一个初始为空字符串的变量 content，用来存在用户在输入框中打出的每一个字，并通过`handleInputChange(event)`事件处理函数来捕获输入并更新，createForm.js 代码如下：

```javascript
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  content = '';

  handleInputChange(event) {
    this.content = event.target.value;
  }
}
```

至此，我们也已经初步完成了 createForm 组件的定义，但是为了使得其生效，我们需要通过`<mycontrol-create-form></mycontrol-create-form>`把他引入到 todoWrapper 组件中， 实现组件的嵌套与功能集成，todoWrapper.html 代码如下：

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
    <mycontrol-create-form></mycontrol-create-form>
  </div>
</template>
```

使用 `npm start`启动本地服务，按照提示在浏览器中输入网址即可查看当前的运行效果：

<!-- 这是一张图片，ocr 内容为：预览定义createForm效果预览图 -->

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a314d9c0db14c9eaac6fd)

---

### 定义 todo 组件

目前，我们已经可以在输入框中输入待办事项内容，接下来当用户点击加入按钮的时候我们要把他展示在下面，这里我们可以把下面的 Todo 都写成一个单独的组件，获取到输入的代办事项并展示出来。

新增 todo 输入框组件：在 app 目录下新建组件文件夹 todo，并在该文件夹下新建 todo.css，todo.html，todo.js 三个文件。
在 todo.html 中，通过`todo.content`可以获取并展示 content 中的内容，todo.html 代码如下：

```html
<template>
  <div class={containerClass}>
    <p>{todo.content}</p>
  </div>
</template>
```

在 todo.js 中， 通过 `@api todo` 从外部接收数据，并通过 `get containerClass()` 返回用于控制样式的“类名字符串”，todo.js 代码如下：

```javascript
import { KingdeeElement, api } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @api todo;

  get containerClass() {
    return `todo ${this.todo.isCompleted ? 'completed' : ''}`;
  }
}
```

最后在 todo.css 中补充 todo 组件的样式，todo.css 代码如下：

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

至此，我们已经初步完成了了 todo 组件的定义，但是为了使得其生效，我们需要把他引入到 todoWrapper 组件。

接着我们需要修改 todoWrapper.html，通过`<template for:each={todos} for:item="todo">`循环指令实现了待办列表的动态生成。它通过遍历 `todos` 数组，为每一个任务自动创建并渲染一个 `mycontrol-todo` 子组件。其中，`key` 属性为每条数据提供了唯一标识，确保了框架在数据变动时能进行高效的增量更新。

最后为`<mycontrol-create-form ></mycontrol-create-form>`添加`onaddtodo={handleAddTodo}`的事件监听， 实现子组件通知父组件更新数据，完成了从“大脑”到“工人”的数据分发，todoWrapper.html 代码如下：

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
    <mycontrol-create-form onaddtodo={handleAddTodo}></mycontrol-create-form>
    <template for:each={todos} for:item="todo">
      <mycontrol-todo key={todo.id} todo={todo}> </mycontrol-todo>
    </template>
  </div>
</template>
```

同步我们需要修改 todoWrapper.js， 首先通过 `@track` 定义了一个响应式数组作为初始数据源，确保视图能随数据的变动实时刷新。

在处理"添加"的逻辑时，`handleAddTodo` 函数通过 `event.detail` 接收子组件传来的新任务文字，并为其生成一个基于时间戳的唯一 ID。最后，利用 JavaScript 的展开运算符构建一个新的数组副本并重新赋值给 `this.todos`，todoWrapper.js 代码如下：

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @track todos = [
    {
      content: '打扫厕所',
      id: 1,
      isCompleted: false
    },
    {
      content: '写作业',
      id: 2,
      isCompleted: true
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
      isCompleted: false
    };
    this.todos = [...this.todos, newTodo];
  }
}
```

我们搞定了的 todo 组件接收并展示内容的能力后，还需要解决 createForm 中传出内容的能力，因此我们还需要到 createForm.html 中修改，添加点击事件，createForm.html 代码如下：

```html
<template>
  <form class="create-form" onsubmit={handleSubmit}>
    <kd-input
      type="text"
      class="input-field"
      placeholder="请输入待办事项"
      value={content}
      onchange={handleInputChange}
    ></kd-input>
    <kd-button type="submit" class="submit-btn" onclick={handleSubmit}>添加</kd-button>
  </form>
</template>
```

对应的我们接着需要在 createForm.js 中封装并派发任务指令 ，通过`event.preventDefault()`阻止表单默认刷新行为， 将用户输入的内容作为“包裹”派发给父组件，随后清空输入框以备下次录入，createForm.js 代码如下：

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

使用`npm start`启动本地服务，按照提示在浏览器中输入网址即可查看当前的运行效果，并且可以尝试添加待办事项：

<!-- 这是一张图片，ocr 内容为：预览定义todo组件效果预览图 -->

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a316507ad417580a830d8)

---

### 删除与状态切换

当前虽然可以添加代办事项，但是还是无法对待办事项进行具体的操作，接下来我们将要解决代办事项的删除与完成状态的切换。

在 todo.html 中，通过`onclick={handleToggleComplete}`给待办事项文本添加点击事件，这样后续可以通过点击文本将待办事项切换为“已完成”或“未完成”。
在`actions`容器中添加“编辑”和“删除”按钮，我们先为“删除”按钮添加点击事件，todo.html 代码如下：

```html
<template>
  <div class={containerClass}>
    <p onclick={handleToggleComplete}>{todo.content}</p>
    <div class="actions">
      <span class="icon" title="Edit">✎</span>
      <span class="icon delete-icon" onclick={handleDelete} title="Delete">🗑</span>
    </div>
  </div>
</template>
```

接着到 todo.js 中捕捉用户动作并向上派发信号， 通过 `CustomEvent` 封装了切换状态（`togglecomplete`）和删除（`delete`）的指令，并将当前任务的 `id` 作为参数传递出去，todo.js 代码如下：

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

同时我们还需要在 todo.css 中渲染已完成状态的事项样式、“编辑”与“删除”按钮的样式，todo,css 代码如下：

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
  text-decoration: line-through 3px black; /* kWC 中可能需要简化 CSS 兼容性 */
  text-decoration-color: black;
  text-decoration-thickness: 3px;
}
.icon {
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 10px;
}
```

在 todoWrapper.html 中，我们需要在所引入的<mycontrol-todo></mycontrol-todo>中添加“删除”与“状态切换”事件，todoWrapper.html 代码如下：

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
    <mycontrol-create-form onaddtodo={handleAddTodo}></mycontrol-create-form>
    <template for:each={todos} for:item="todo">
      <mycontrol-todo
        key={todo.id}
        todo={todo}
        ondelete={handleDelete}
        ontogglecomplete={handleToggleComplete}>
      </mycontrol-todo>
    </template>
  </div>
</template>
```

最后对应的需要在 todoWrapper.js 中补充事件逻辑， 通过 `filter` 方法过滤掉指定 ID 的任务来实现删除功能，并利用 `map` 方法配合展开运算符精确修改特定任务的完成状态，通过对 `this.todos` 进行重新赋值，todoWrapper.js 代码如下：

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @track todos = [
    {
      content: '打扫厕所',
      id: 1,
      isCompleted: false
    },
    {
      content: '写作业',
      id: 2,
      isCompleted: true
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
      isCompleted: false
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

使用`npm start`启动本地服务，按照提示在浏览器中输入网址即可查看当前的运行效果，可以尝试删除事项、点击事项文本切换事项状态：

<!-- 这是一张图片，ocr 内容为：删除与状态切换效果预览图 -->

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a317dc5602355134dccc9)

---

### 定义 editForm 组件

至此我们的代办事项已基本完成，不过还有最后还有一项编辑的功能需要完成，虽然可以把编辑的功能也写在 todo 组件中，但是由于他们的 UI 以及功能完全不一样，所以把编辑表单的功能写在独立的 editForm 组件中会是比较好的做法。

新增 editForm 编辑组件：在 app 目录下新建组件文件夹 editForm，并在该文件夹下新建 editForm.css，editForm.html，editForm.js 三个文件。
editForm 组件与 createForm 组件都有输入框与按钮，可以参照 createForm.html 在 editForm.html 中引用基础组件 `kd-input` 和 `kd-button`，为用户提供一个编辑修改功能，editForm.html 代码如下：

```html
<template>
  <form class="create-form">
    <kd-input
      type="text"
      placeholder="编辑待办事项"
      value={content}
      onchange={handleInputChange}
      class="input-field"
    ></kd-input>
    <kd-button type="submit" class="submit-btn" onclick={handleSubmit}>完成</kd-button>
  </form>
</template>
```

在 editForm.js 中，我们需要实现编辑功能的逻辑封装， 通过生命周期钩子 `connectedCallback` 在组件挂载时自动回显旧任务内容，确保用户能在原文字基础上修改。提交时，它将任务的 `id` 与修改后的 `content` 封装成对象一同派发给父组件，从而实现精准的数据更新，editForm.js 代码如下：

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

最后，我们需要在 editForm.css 中渲染该组件的样式，该部分代码与 createForm.css 中的类似，但是我们需要注意编辑状态下事项的上下间距，editForm.css 代码如下：

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

至此，我们的 editForm 组件已经定义完成，但是还需要把他与其他组件拼装起来，并使得它与各个组件之间能沟通与交互。

因此，接下来我们要把 editForm 组件通过`<mycontrol-edit-form></mycontrol-edit-form>`引入到 todo 组件中，并添加状态逻辑判断，当 todo 是编辑状态时则显示 editForm 组件，否则 todo 就正常显示当前待办事项的内容。并且“编辑”按钮作为触发编辑的入口，我们需要为它添加一个`onclick={handleToggleEditing}`点击事件。todo.html 代码如下：

```html
<template>
  <template kwc:if={todo.isEditing}>
    <mycontrol-edit-form todo={todo} onsubmitedit={handleEditSubmit}>
    </mycontrol-edit-form>
  </template>

  <template kwc:else>
    <div class={containerClass}>
      <p onclick={handleToggleComplete}>{todo.content}</p>
      <div class="actions">
        <span class="icon" onclick={handleToggleEditing} title="Edit">✎</span>
        <span class="icon delete-icon" onclick={handleDelete} title="Delete">🗑</span>
      </div>
    </div>
  </template>
</template>
```

对应的我们需要再 todo,js 中补充 handleToggleEditing() 与 handleEditSubmit(event) 用户捕捉用户动作并向上派发信号，todo.js 代码如下：

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

在 todoWrapper.html 中，我们需要在所引入的<mycontrol-todo></mycontrol-todo>中添加“切换编辑”与“更新修改内容”事件，todoWrapper.html 代码如下：

```html
<template>
  <div class="wrapper">
    <h1>待办事项</h1>
    <mycontrol-create-form onaddtodo={handleAddTodo}></mycontrol-create-form>
    <template for:each={todos} for:item="todo">
      <mycontrol-todo
        key={todo.id}
        todo={todo}
        ondelete={handleDelete}
        ontogglecomplete={handleToggleComplete}
        ontoggleediting={handleToggleEditing}
        onedit={handleEditTodo}>
      </mycontrol-todo>
    </template>
  </div>
</template>
```

最后对应的需要在 todoWrapper.js 中补充事件逻辑：`handleToggleEditing` 通过取反 `isEditing` 属性，实现任务在“展示模式”与“编辑模式”之间的灵活切换。而 `handleEditTodo` 则在保存修改时，利用对象解构获取新内容并更新数组，同时强制将 `isEditing` 设为 `false` 以退出编辑状态。

对提前预制的数据通过`isEditing: false`默认设置为展示文字（非编辑模式），todoWrapper.js 代码如下：

```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  @track todos = [
    {
      content: '打扫厕所',
      id: 1,
      isCompleted: false,
      isEditing: false
    },
    {
      content: '写作业',
      id: 2,
      isCompleted: true,
      isEditing: false
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
      isEditing: false
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

使用`npm start`启动本地服务，按照提示在浏览器中输入网址即可查看当前的运行效果，可以尝试编辑待办事项内容：

<!-- 这是一张图片，ocr 内容为：待办事项最终效果预览图 -->

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695a319115bee62062d21158)

---

### 收尾

恭喜你！你已经成功自定义了一个功能完整的**响应式待办事项（Todo List）**。

你可以根据以下清单检查你的成果：

1. **添加任务**：输入文字按回车或点“添加”，列表即刻更新。
2. **状态切换**：勾选任务后，文字自动出现删除线效果。
3. **编辑功能**：点击“编辑”按钮进入编辑模式，且输入框预填了原有内容。
4. **删除任务**：点击删除，对应条目平滑移除。

如果你想进一步提升开发技能，或者在实际项目中应对更复杂的场景，欢迎访问我们的 **[开发指南]** 模块~
