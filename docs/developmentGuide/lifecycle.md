---
toc: content
title: '组件生命周期'
order: '10'
---

## constructor

`constructor()`构造器函数会在创建组件实例时触发。在构造函数中，不要向宿主元素添加属性。

构造函数会在父组件中执行，但是这个时候还无法访问到子元素，因为子元素还未被创建，属性也无法传递。在组件构造完成后，`connectedCallback()`被调用之前，属性会被传递到组件当中。

### 构造函数的规范

- 第一条语句必须是不带参数的 `super()`调用。该调用会建立原型链和 `this`的值。在修改 `this`之前，必须要先调用 `super()`
- 不要在构造函数体中使用 `return`语句。
- 不要使用 `document.write()`或者 `document.open()`
- 不要检查元素属性和子元素
- 不要检查元素的公共属性

## connectedCallback()

`connectedCallback()`生命周期在组件插入 DOM 树时触发。`disconnectedCallback()`在组件中 DOM 中移除或者隐藏时触发。这两个构造函数都是遵循父组件到子组件的流程。当需要访问宿主元素时，使用 `this`。要访问模板的话使用 `this.template`。要检查组件是否连接到 DOM，可以使用 `this.isConnected`.

在 `connectedCallback()`函数中，我们可以：

- 与当前文档或容器建立通信
- 执行初始化任务，例如获取数据，设置缓存或者监听事件
- 订阅和取消订阅
- 导入第三方组件

在移除元素，然后将其插入到另一个位置时，该钩子函数可能会触发多次。如果希望其代码只运行一次的话，需要通过代码来进行阻止。

## disconnectedCallback()

`disconnectedCallback()`则与 `connectedCallback()`相反。我们可以使用该钩子函数来完成清理 `connectedCallback()`中添加的缓存或者监听器事件。

## renderCallback

`renderCallback()`会在组件完成渲染后执行。此钩子会从**子组件传递到父组件。**

- 不要在此钩子函数中更新适配器配置对象的属性
- 不要在此钩子函数中更新公共属性

### 组件的重渲染

组件连接并渲染完成后，其状态的任何更改都会触发重渲染：

1.  组件标记为“脏”状态
2.  组件重新渲染的微任务被加入队列

### hasRendered

组件在整个页面的生命周期内会被渲染多次。要使用此钩子执行一次性操作的话，可以使用类似 `hasRendered`的属性来跟踪该钩子函数是否已经执行过。

## render

可以显式调用 `render()`来更新 UI，我们可以在 `connectedCallback()`之前或者之后调用它。

一般情况下，`render()`函数是用于根据条件渲染哪个 HTML 模板文件。

## errorCallback

实现 `errorCallback` 可以创建一个错误边界组件，该组件会捕获其组件树中所有**子**组件的错误。类似于 JavaScript 的 \` `catch{}` 代码块， `errorCallback()` 会捕获生命周期钩子或 HTML 模板中声明的事件处理程序中发生的错误。您可以编写错误边界组件的代码，使其记录堆栈信息，并渲染一个替代视图，告知用户发生了什么以及下一步该怎么做。
