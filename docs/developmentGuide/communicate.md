---
toc: content
title: '组件通信'
order: '7'
glossary: Web Components | 属性 | Properties | 事件 | Events
---

# 组件通信

「KWC」基于 Web Components 标准，提供清晰的组件间通信模式，支持从父子通信到跨级通信。

本章节将介绍「KWC」的组件通信体系，涵盖从基础的父子通信到复杂的跨级通信，帮助你构建松耦合、可维护的组件结构。

## 通信体系架构

「KWC」遵循**单向数据流**原则：数据主要从父组件流向子组件（通过属性 Properties），子组件通过触发事件（Events）通知父组件状态变化，由父组件（数据所有者）决定如何更新数据，并再次通过属性向下传递。

「KWC」支持以下核心通信模式：

```plaintext
「KWC」通信体系：
├── 父子组件通信
│   ├── 下行通信：属性（Attributes/Properties）
│   └── 上行通信：自定义事件（Custom Events）
└── 同级/跨级组件通信
    ├── 事件冒泡（Event Bubbling）
    └── 组件间消息中心（Message Service）

```
