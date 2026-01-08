---
toc: content
title: '组件通信'
order: '6'
---

Web Component 的组件通信，是指不同自定义元素（组件）之间，通过属性绑定、自定义事件、公共方法调用或中间媒介（事件总线 / 全局状态），实现数据传递、逻辑触发或状态同步的过程。

组件通信是 KWC 开发的核心能力之一，KWC 作为基于 Web Component 封装的组件方案，其通信机制完全兼容并复用 Web Component 原生通信规范，以下进行简洁梳理，适配 KWC 开发场景落地。

```plaintext
Web Components 通信体系：
├── 父子组件通信
│   ├── 下行：属性（Attributes/Properties）
│   └── 上行：自定义事件（Custom Events）
├── 同级/跨级组件通信
│   ├── 事件冒泡（Event Bubbling）
│   ├── 发布订阅模式（Pub/Sub）
│   └── Context API（共享上下文）
└── 与外部组件通信
    ├── 查询选择器（Query Selector）
    ├── 方法调用（Public Methods）
    └── Slot 内容分发。（注：Slot 主要是单向的父→子）

```

KWC 组件封装并简化了组件内部、跨级和组件与组件间的通信，详细内容可参考相关章节：

- 属性（Properties)
- 自定义事件（Events)
- 跨级通信
  - 事件冒泡（bubbles 和 composed）
  - 发布订阅模式（Pub/Sub）：KWC 提供的 messaService 工具
  - 访问组件元素
  - Shadow DOM
  - 插槽（Slot）
