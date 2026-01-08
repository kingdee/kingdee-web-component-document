---
toc: 'content'
title: 'Hello World 计数器'
---

# Hello World 计数器

在本教程中，我们将通过编写一个经典的 Hello World 计数器，带你快速熟悉 KWC 的核心开发模式。你将学会如何使用 KWC 基础组件构件交互页面，如何处理用户点击事件，以及如何让数据驱动界面更新。</br>  
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

## 准备工作

根据“快速入门-安装部署”中的步骤，目前在 KWC 项目目录（例如 mycontrol）下，已经有了 app.css，app.html，app.js 三个文件。
一个渲染 UI 的 KWC 组件必须包含

- 一个 HTML 文件
- 一个 JavaScript 文件

作为 API 模块（如公共函数，工具方法等）的组件，可以不需要 HTML 文件。但是为了确保 KWC 框架能将组件自动关联，需要将它们放在与组件名称相同的组件文件夹中。
除此之外，组件还可以可选地包括：

- CSS 文件
- 其他 JavaScript 文件
- 单元测试文件

## 第一步：构建视图

首先，我们需要把内容元素展示出来，打开 app.html，输入以下代码并保存：

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

**这一步我们做了什么？**

- 组件复用：使用了 KWC 内置的`<kd-card>`和`<kd-button>`的基础组件；
- 数据绑定：通过 { } 语法如 `{firstButtonLabel}`，将 JS 中的数据连接到了 HTML 上；

---

## 第二步：添加样式

接着，我们需要让页面看起来整洁美观，打开 app.css，输入以下代码并保存：

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

**这一步我们做了什么？**

- Flex 布局：使用 Flexbox 轻松实现了卡片的居中和内部元素的对齐。
- 细节调整：通过阴影（box-shadow）、圆角（border-radius）和间距（gap/padding），让界面看起来精致且有层次感。

---

## 第三步：编写逻辑

最后，我们需要定义组件的“大脑”。在 KWC 中，我们通过继承 KingdeeElement 类来为后续添加数据状态和业务逻辑方法打下基础。打开 app.js，输入以下代码并保存：

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

**这一步我们做了什么？**

- 状态管理：我们定义了 count1 和 count2 两个变量，并用 @track 标记。这意味着：只要你修改它们的值，KWC 就会自动重新渲染页面；
- 交互逻辑：编写了 handleClick 方法来响应用户的点击操作；

---

## 运行与测试

保存所有文件后，在 VSCode 中呼出内置终端（快捷键 Ctrl + `），输入 npm start 启动你的 KWC 项目。复制启动日志中的链接 http://localhost:8000/ ，打开任意浏览器后访问该链接。

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695368a684aa6b1f690ae330)

🎉 恭喜你！当你看到以下运行效果页面时，说明你已经成功构建了一个完整的 KWC 组件！

- 尝试点击第一个按钮，你会发现只有第一个按钮的数字在增加。
- 尝试点击第二个按钮，它会独立计数。

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695368c39c0db14c9eaa7fc5)
