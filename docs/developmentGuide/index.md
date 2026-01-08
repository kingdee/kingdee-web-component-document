---
toc: content
title: 'KWC介绍'
order: '1'
---

## KWC 是什么

KWC（Kingdee Web Components）是一个具有自己 API 的可重用的自定义 HTML 元素，是金蝶 AI 苍穹平台基于现代 Web Components 标准构建的企业级前端组件解决方案。它继承并扩展了原生 Web Components 技术，为金蝶生态系统的前端开发提供了一套标准化、可复用、高性能的组件开发范式。我们可以使用 KWC 框架在苍穹平台上构建自定义用户界面、Web 和移动应用程序。

## KWC 优势

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

## 开发准备

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
