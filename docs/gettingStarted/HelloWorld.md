---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: Hello World # 组件的标题，会在菜单侧边栏展示
order: 1
---

# Hello World

本章节将通过一个计数器组件，带你快速上手 KWC 的交互式组件开发流程。</br>  

<!-- 这是一张图片，ocr 内容为：最终效果预览预览图 -->
![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695364f703b6d634b3327d18)


## 视频教程

<iframe 
    src="//player.bilibili.com/player.html?isOutside=true&aid=115852900831535&bvid=BV1KNiyBsEhY&cid=35241330374&p=1" 
    width="800" 
    height="450" 
    scrolling="no" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true">
</iframe>

---

## 开始之前

请确保你已完成 <a href="https://dev.kingdee.com/kwc/getting-started/" target="_blank"> 开发准备 </a> 中的所有步骤，并已成功启动 KWC 组件项目。

### 认识KWC组件结构

一个标准的 KWC 组件通常由三个必需文件构成，它们共同定义了一个组件的完整形态，这些文件必须位于相同命名的组件文件夹内（例如 `mycontrol/app.html`）。</br>
通过 KWC 配套脚手架生成的组件项目，会自动生成上述文件，这些文件存放于 *__src/modules/__* 目录下。

| 文件 | 必需 | 说明 |
| :--- | :--- | :--- |
| *__app.html__* | 是 | 定义组件的 HTML 视图结构。 |
| *__app.js__* | 是 | 定义组件的 JavaScript 逻辑与行为。 |
| *__app.css__* | 否 | 定义组件的 CSS 样式。 |

:::注意
关于组件结构、命名空间和元数据文件的完整说明，请参阅《开发指南》中的 <a href="https://dev.kingdee.com/kwc/development-guide/define-component" target="_blank"> 创建组件 </a>。
:::

---

## 第一步：构建HTML视图

根据以下步骤完成 KWC 基础组件的 HTML 视图构建：
1. 在 VSCode 左侧展开文件路径 *__workspace/mycontrol/src/modules/app__* 。
2. 选择并打开 *__app.css__* 文件。
3. 替换如下的代码内容：
   ```html
   <template>
     <div class="page-container">
       <kd-card class="card-style">
         <div class="card-content">
           <h1>Hello World</h1>
           <div class="button-group">
             <kd-button label="{firstButtonLabel}" onclick="{handleFirstClick}">
             </kd-button>
             <kd-button label="{secondButtonLabel}" onclick="{handleSecondClick}">
             </kd-button>
           </div>
         </div>
       </kd-card>
     </div>
   </template>
   ```
</br>

### 代码解析

- `<kd-card>` 和 `<kd-button>` ：直接使用 KWC 内置的基础组件，快速构建 UI。
- `{firstButtonLabel}` ：使用 { } 语法进行数据绑定，按钮文本将由 JavaScript 动态提供。
- `onclick="{handleFirstClick}"` ：绑定事件处理函数到按钮的点击事件。

---

## 第二步：添加CSS样式

接下来，我们为组件添加样式。打开 *__app.css__* 文件，替换其内容如下：
```css
/* 1. 页面整体布局  */
.page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 顶端对齐 */
  padding-top: 5vh; /* 保持卡片在视窗 5% 处 */
  height: 100vh;
  background-color: #f3f3f3;
}
/* 2. 卡片容器样式 */
.card-style {
  display: block;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
}
/* 3. 卡片内部内容布局 */
.card-content {
  padding: 2px 30px 24px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 显式声明宽度，确保居中计算准确 */
  box-sizing: border-box; /* 防止 padding 撑大盒子 */
}
/* 4. 按钮组容器 */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
```

### 代码解析

- `flex` : 使用 Flexbox 实现了卡片的居中和内部元素的对齐。
- 通过阴影（`box-shadow`）、圆角（`border-radius`）和间距（`gap`/`padding`），让界面看起来精致且有层次感。

---

## 第三步：编写JavaScript逻辑

最后，在 JavaScript 中定义组件的状态与行为。打开 *__app.js__* 文件，替换其内容如下：
```javascript
import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class App extends KingdeeElement {
  // 定义追踪变量用于计数
  @track count1 = 0;
  @track count2 = 0;
  // Getter: 动态返回第一个按钮的标签文本
  get firstButtonLabel() {
    return `点击了 ${this.count1} 次`;
  }
  // Getter: 动态返回第二个按钮的标签文本
  get secondButtonLabel() {
    return `点击了 ${this.count2} 次`;
  }
  // 处理第一个按钮点击
  handleFirstClick() {
    this.count1++;
  }
  // 处理第二个按钮点击
  handleSecondClick() {
    this.count2++;
  }
}
```

### 逻辑解析


- **响应式状态**：使用 `@track` 装饰器声明 `count1` 和 `count2`。当其值改变时，KWC 就会自动重新渲染页面。
- **计算属性**：通过 `getter` 函数 `firstButtonLabel` 动态生成按钮文本，将逻辑与视图分离。
- **事件处理**：编写了 `handleFirstClick` 方法，通过简单的 `this.count1++` 来响应用户的点击操作。

---


## 第四步：运行测试

保存所有文件，根据下面步骤运行你通过 KWC 开发的计数器组件：
1. 使用快捷键（Ctrl + `）打开 VSCode 内置终端。
2. 输入 `npm start` 启动 KWC 组件。
3. 复制启动日志中的链接 http://localhost:8000/ 。
4. 打开任意浏览器，访问该网址。</br>

🎉 恭喜你！当你看到以下运行效果页面时，说明你已经成功构建了一个完整的 KWC 计数器组件！

- 尝试点击第一个按钮，观察其计数独立增加。
- 尝试点击第二个按钮，它的计数也独立变化。

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695368c39c0db14c9eaa7fc5)


---

## 下一步

你已经成功创建了第一个交互式 KWC 组件！

在下一章中，请在 <a href="https://dev.kingdee.com/kwc/getting-started/todo-list/" target="_blank"> 综合实践 </a> 案例，探索如何使用多个 KWC 组件构建一个功能完整的待办事项应用。