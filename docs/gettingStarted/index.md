---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 安装部署 # 组件的标题，会在菜单侧边栏展示
---

# 安装部署

为了简化工程搭建流程，我们提供了配套的脚手架工具。你无需再为繁琐的 Webpack 配置、目录结构或依赖管理头疼，只需简单的几行命令，即可一键生成标准化的 KWC 项目模板，让你直接进入核心业务代码的开发。
接下来，我们将介绍如何通过该工具快速安装环境并运行起你的第一个 KWC 项目。

## 视频教程
<iframe 
    src="//player.bilibili.com/player.html?isOutside=true&aid=115853085382820&bvid=BV1xWiCBpE38&cid=35242442876&p=1"
    width="800" 
    height="450" 
    scrolling="no" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true">
</iframe>

---

## 环境准备

### 代码编辑器

为了获得最佳的开发体验，你需要安装并打开 Visual Studio Code (VSCode)。

- **下载安装**：前往<a href="https://code.visualstudio.com/" target="_blank">VScode 官网</a> 下载并安装最新稳定版。
- **文件创建**：可以在 D 盘中创建项目存放文件夹 workspace
- **准备工作**：安装完成后请打开 VSCode，点击打开文件夹，选择打开刚刚我们创建的 workspace，打开后建议呼出内置终端（快捷键 Ctrl + `），后续的命令操作可以在这里直接完成。</br>

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-69534669c5602355134d81a2)

### Git 环境

需要安装 git，可以到<a href="https://git-scm.com/" target="_blank">git 官网</a>下载安装，安装成功后，可在 VSCode 内置终端中输入`git -v`检查是否安装成功：正常查看到版本即安装成功。</br>
安装成功后，在文件资源管理器中进入我们刚刚所创建的 workspace 文件夹，右键后选择“Open Git Bash here”,指定在该目录下执行 git 命令。

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695c7cd903b6d634b332e99c)

### Node.js 环境

需要安装 Node.js（版本需 18.0 或更高）</br>
到<a href="https://nodejs.org/zh-cn/download" target="_blank">node 官网</a>下载，或者使用 nvm 管理 node 版本，安装成功后，可在 VSCode 内置终端中输入`node -v`与`npm -v`检查是否安装成功：正常查看到版本即安装成功。</br>
![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695347454574214a3239b814)

### 包管理器

需要安装包管理工具，node 默认自带 npm，可以选择 yarn 或者 pnpm。</br>
**安装 yarn**：在 VSCode 内置终端中输入`npm install -g yarn`，安装后输入`yarn -v`检查是否安装成功；</br>
![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695347708dbb0754443684aa)</br>

**安装 pnpm**：在 VSCode 内置终端中输入`npm install pnpm -g`，安装后输入`pnpm -v`检查是否安装成功；</br>
![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-6953478429cd2a22227b25d2)

## 安装脚手架

环境就绪后，我们需要全局安装 kd-custom-control-cli 工具。在终端（Terminal）执行以下任一命令：  
**方式一**：使用 npm，在 VSCode 内置终端中输入`npm install -g @kdcloudjs/kd-custom-control-cli`；</br>
**方式二**：使用 yarn，在 VSCode 内置终端中输入`yarn global add @kdcloudjs/kd-custom-control-cli`；</br>

**验证安装**： 安装完成后，`kd-custom-control-cli -v` 输入验证是否成功：

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695348285776f60d2579cf1a)

---

## 创建你的第一个项目

使用`kd-custom-control-cli create <自定义控件方案>`创建一个新的自定义控件工程，注意方案名称输入格式只能包含小写字母和数字。

① 继续在 VSCode 内置终端中输入`kd-custom-control-cli create mycontrol`创建一个 名为 mycontrol 的自定义控件项目；</br>
② 命令运行后，CLI 会通过交互式问答引导你完成配置选择技术栈（按键盘上下键选择 KWC，回车确认）：

```bash
? 选择您需要的开发框架 »
  React
  Vue2
  Vue3
  jQuery
> KWC    (苍穹轻量化组件框架)
```

等待进度条跑完，当你看到 "自定义控件 mycontrol 创建成功" 的提示时，项目骨架已搭建完毕！ 这时候你可以看到左侧“资源管理器” workspace 下已经成功创建了 mycontrol 项目:

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695362aa5776f60d2579d0fe)

---

## 启动与调试

在 VSCode 内置终端中输入`cd mycontrol`进入项目目录 ，再输入`npm install`或`yarn install`安装依赖，最后输入`npm start`或`yarn start`启动本地服务；

```bash
# 1. 进入项目目录
cd mycontrol
# 2. 安装依赖 (根据你的包管理器选择)
npm install  # 或 yarn install / pnpm install
# 3. 启动服务
npm start    # 或 yarn start
```

启动成功后，终端将输出启动日志：</br>  
![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695363059c0db14c9eaa7f36)

#### **预览效果**

复制启动日志中的链接 http://localhost:8000/ 打开任意浏览器后访问该链接。</br>
如果你看到了带有 custom control template for KWC 的页面，说明你已经成功跑通了全流程！</br>  
![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-69536407df09ee077deb7f81)

---

## 下一步做什么？

你已经成功搭建了本地环境并启动了项目。但这仅仅是个开始！

在下一章中，我们将直接进入实战环节。通过一个经典的 "Hello World" 快速入门案例，我们将带你使用 KWC 基础组件（如文本、按钮、卡片等）编写你的第一个交互功能，让你亲身体验 KWC 开发的高效与便捷。
