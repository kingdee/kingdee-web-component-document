---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 开发准备 # 组件的标题，会在菜单侧边栏展示
order: 0
---

# 开发准备

欢迎使用 KWC 进行前端组件开发！
在开始使用 KWC 之前，你需要配置相应的开发环境并创建组件项目，本文档将指导你完成。
为了让你快速建立整体印象，我们首先通过一段视频演示从环境配置到创建项目的操作流程。

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

## 环境配置

为了获得最佳的 KWC 开发体验，你需要准备好代码编辑器、Git 和 Node.js 运行环境。

### 代码编辑器

根据以下步骤完成代码编辑器准备，推荐使用 Visual Studio Code (VSCode)。

1. **下载安装**：前往<a href="https://code.visualstudio.com/" target="_blank"> VScode 官网 </a> 下载最新版并完成安装。
2. **创建项目文件夹**：选择合适磁盘创建项目文件夹，例如 **_workspace_**，下述示例基于该文件夹。

:::info
你可以自定义项目文件夹名称，需注意该名称只能包含小写字母和数字，不能包含空格和特殊字符。
:::

3. **打开终端**：打开 VSCode，选择 **_workspace_** 文件夹，使用快捷键（Ctrl + `）打开 VSCode 内置终端，用于完成下面的命令行操作。</br>

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-69534669c5602355134d81a2)

### Git 环境

根据以下步骤完成 Git 环境准备。

1. **下载安装**：前往<a href="https://git-scm.com/" target="_blank"> Git 官网 </a> 下载并完成安装。
2. **确认成功**：在 VSCode 内置终端，输入`git -v`命令，回车返回 Git 版本表示安装成功。
3. **执行 Git 命令**：打开文件资源管理器，进入 **_workspace_** 文件夹，右键选择 **Open Git Bash here** 即可在该目录下执行 Git 命令。</br>

![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695c7cd903b6d634b332e99c)

### Node.js 环境

根据以下步骤完成 Node.js 环境准备。

1. **下载安装**：前往<a href="https://nodejs.org/zh-cn/download" target="_blank"> Node 官网 </a> 下载并完成安装，版本需高于 18.0 。
2. **确认成功**：在 VSCode 内置终端，输入`node -v`命令，回车返回 node 版本表示安装成功。

:::success
你也可以使用 nvm 管理 node 版本，输入`npm -v`查看相应版本。
:::

## 安装包管理工具

在完成环境配置之后，需要安装包管理工具，你可选择如下几种包管理工具。

**第一种：node 自带包管理**</br>
在 node.js 的环境配置完成之后，已默认安装 npm 包管理，无需额外安装。
在 VSCode 内置终端，输入`npm -v`命令，回车可查看对应版本。</br>

**第二种：yarn 包管理**</br>

1. **安装**：在 VSCode 内置终端，输入`npm install -g yarn`命令，完成包管理安装。

:::info
在完成此步骤时，请确保你以管理员身份运行。如遇报错，在 VSCode 内置终端，输入`Get-ExecutionPolicy`命令查看权限，如果显示`Restricted`，则需要通过输入`Set-ExecutionPolicy RemoteSigned`（推荐方式，允许本地脚本运行，阻止远程未签名脚本）或`Set-ExecutionPolicy Unrestricted`（谨慎选择，允许所有脚本运行）命令修改权限，以确保 yarn 包管理安装成功。
:::

2. **确认成功**：输入`yarn -v`命令，回车返回版本表示安装成功。</br>

**第三种：pnpm 包管理**</br>

1. **安装**：在 VSCode 内置终端，输入`npm install pnpm -g`命令，完成包管理安装。
2. **确认成功**：输入`pnpm -v`命令，回车返回版本表示安装成功。</br>

## 安装脚手架

在完成环境配置和包管理工具安装之后，你可以通过 KWC 配套的脚手架工具，一键生成标准化的 KWC 项目模板，快速开始组件开发。</br>
根据以下步骤完成 KWC 脚手架安装：

1. **安装**：在 VSCode 内置终端，根据安装的包管理工具，输入对应命令，完成包管理安装。
   - **方式一：npm**：输入`npm install -g @kdcloudjs/kd-custom-control-cli`命令
   - **方式二：yarn**：输入`yarn global add @kdcloudjs/kd-custom-control-cli`命令
   - **方式三：pnpm**：输入`pnpm install -g @kdcloudjs/kd-custom-control-cli`命令
2. **确认成功**：输入`kd-custom-control-cli -v`命令，回车返回版本表示安装成功。</br>

---

## 创建你的第一个项目

在完成环境配置、包管理工具和脚手架安装之后，根据以下步骤创建你的第一个 KWC 组件项目：

1. **创建组件名称**：在 VSCode 内置终端，输入`kd-custom-control-cli create mycontrol`命令，创建一个名为 **_mycontrol_** 的 KWC 项目。

:::info
你可以自定义组件名称，需注意该名称必须以小写字母开头，仅包含字母、数字或下划线字符，在命名空间内唯一，且不能包含空格、连字符、两个连续的下划线，同时不能以下划线结尾。
:::

2. **选择 KWC**：上述命令运行后，终端界面会询问你选择技术栈，请按键盘上下键选择 **KWC**，回车确认。

```bash
? 选择你需要的开发框架 »
  React
  Vue2
  Vue3
  jQuery
> KWC    (苍穹轻量化组件框架)
```

3. **确认成功**：当终端界面提示如下信息时，表示组件项目 **_mycontrol_** 创建成功。此时 VSCode 左侧 **_workspace_** 成功创建 **_mycontrol_** 组件项目。

```
下载模版完毕
自定义控件 mycontrol 创建成功，执行下面命令启动项目
cd mycontrol
npm install
npm start
```

---

## 启动你的项目

在完成你的项目创建之后，在 VSCode 内置终端，根据以下步骤启动该项目：

```bash
# 1. 进入项目目录
cd mycontrol
# 2. 安装依赖 (根据你的包管理器选择)
npm install  # 或 yarn install 或 pnpm install
# 3. 启动服务
npm start    # 或 yarn start 或 pnpm start
```

启动成功之后， VSCode 终端将输出启动日志，返回`successfully`表示项目启动成功。</br>  
![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-695363059c0db14c9eaa7f36)

### KWC 页面预览

在确认项目启动成功之后，你可以在浏览器打开网页预览 KWC 页面效果。根据以下步骤完成预览：

1. 在 VSCode 内置终端，复制启动日志中的链接 http://localhost:8000/ 。
2. 打开任意浏览器，访问该网址。</br>

当页面显示下面的信息，说明你已经成功跑通了全流程！</br>  
![image.png](https://tc-cdn.processon.com/po/684fa7adbc9bf7627b3e562d-69536407df09ee077deb7f81)

---

## 下一步

你已经成功搭建了本地环境并启动了 KWC 组件项目！

在下一章中，我们将直接进入实战环节。通过一个经典的 <a href="https://dev.kingdee.com/kwc/getting-started/hellow-world" target="_blank"> Hello World </a> 快速入门案例，带你使用 KWC 基础组件编写你的第一个交互功能，让你亲身体验 KWC 开发的高效与便捷。
