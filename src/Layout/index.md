---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: layout 布局 # 组件的标题，会在菜单侧边栏展示
group:
  title: 基础
---

# 布局 Layout

协助进行页面级整体布局

布局是一种结构模板，通过定义视觉网格、间距和区域，确保应用程序之间的一致性。内容应放置于 layout-item内，只有 layout-item 可以作为 layout 的直接元素。

## 基本用法

布局的基本用法

```jsx
import { Layout } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Layout extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<kd-layout>
  <kd-layout-item size="8">Item 1</kd-layout-item>
  <kd-layout-item size="8">Item 2</kd-layout-item>
  <kd-layout-item size="8">Item 3</kd-layout-item>
</kd-layout>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Layout.Default codeInfo={codeInfo} />;
```

## 水平对齐方式

布局的水平对齐方式，可选值包括start、center、space、spread、end

```jsx
import { Layout } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Layout extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <h4>Start (默认)</h4>
  <kd-layout horizontal-align="start">
    <kd-layout-item size="6">Item 1</kd-layout-item>
    <kd-layout-item size="6">Item 2</kd-layout-item>
  </kd-layout>
  
  <h4>Center</h4>
  <kd-layout horizontal-align="center">
    <kd-layout-item size="6">Item 1</kd-layout-item>
    <kd-layout-item size="6">Item 2</kd-layout-item>
  </kd-layout>
  
  <h4>Space</h4>
  <kd-layout horizontal-align="space">
    <kd-layout-item size="6">Item 1</kd-layout-item>
    <kd-layout-item size="6">Item 2</kd-layout-item>
  </kd-layout>
  
  <h4>Spread</h4>
  <kd-layout horizontal-align="spread">
    <kd-layout-item size="6">Item 1</kd-layout-item>
    <kd-layout-item size="6">Item 2</kd-layout-item>
  </kd-layout>
  
  <h4>End</h4>
  <kd-layout horizontal-align="end">
    <kd-layout-item size="6">Item 1</kd-layout-item>
    <kd-layout-item size="6">Item 2</kd-layout-item>
  </kd-layout>
</template>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Layout.HorizontalAlign codeInfo={codeInfo} />;
```

## 垂直对齐方式

布局的垂直对齐方式，可选值包括start、center、end、stretch

```jsx
import { Layout } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Layout extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <h4>Start (默认)</h4>
  <kd-layout style="height: 150px; background-color: #fafafa;">
    <kd-layout-item size="8">Item 1</kd-layout-item>
    <kd-layout-item size="8">Item 2</kd-layout-item>
  </kd-layout>
  
  <h4>Center</h4>
  <kd-layout vertical-align="center" style="height: 150px; background-color: #fafafa;">
    <kd-layout-item size="8">Item 1</kd-layout-item>
    <kd-layout-item size="8">Item 2</kd-layout-item>
  </kd-layout>
  
  <h4>End</h4>
  <kd-layout vertical-align="end" style="height: 150px; background-color: #fafafa;">
    <kd-layout-item size="8">Item 1</kd-layout-item>
    <kd-layout-item size="8">Item 2</kd-layout-item>
  </kd-layout>
  
  <h4>Stretch</h4>
  <kd-layout vertical-align="stretch" style="height: 150px; background-color: #fafafa;">
    <kd-layout-item size="8">Item 1</kd-layout-item>
    <kd-layout-item size="8">Item 2</kd-layout-item>
  </kd-layout>
</template>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Layout.VerticalAlign codeInfo={codeInfo} />;
```

## 允许换行

设置multiple-rows属性控制是否允许布局项换行

```jsx
import { Layout } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Layout extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <h4>允许换行</h4>
  <kd-layout multiple-rows="true">
    <kd-layout-item size="6">Item 1</kd-layout-item>
    <kd-layout-item size="6">Item 2</kd-layout-item>
    <kd-layout-item size="6">Item 3</kd-layout-item>
    <kd-layout-item size="6">Item 4</kd-layout-item>
    <kd-layout-item size="6">Item 5</kd-layout-item>
  </kd-layout>
  
  <h4>不允许换行 (默认)</h4>
  <kd-layout>
    <kd-layout-item size="6">Item 1</kd-layout-item>
    <kd-layout-item size="6">Item 2</kd-layout-item>
    <kd-layout-item size="6">Item 3</kd-layout-item>
    <kd-layout-item size="6">Item 4</kd-layout-item>
    <kd-layout-item size="6">Item 5</kd-layout-item>
  </kd-layout>
</template>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Layout.MultipleRows codeInfo={codeInfo} />;
```

## 左右负间距贴边

设置pull-to-boundary属性控制左右负间距贴边，可选值包括small、medium、large

```jsx
import { Layout } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Layout extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <h4>Small</h4>
  <kd-layout pull-to-boundary="small">
    <kd-layout-item size="8">Item 1</kd-layout-item>
    <kd-layout-item size="8">Item 2</kd-layout-item>
  </kd-layout>
  
  <h4>Medium</h4>
  <kd-layout pull-to-boundary="medium">
    <kd-layout-item size="8">Item 1</kd-layout-item>
    <kd-layout-item size="8">Item 2</kd-layout-item>
  </kd-layout>
  
  <h4>Large</h4>
  <kd-layout pull-to-boundary="large">
    <kd-layout-item size="8">Item 1</kd-layout-item>
    <kd-layout-item size="8">Item 2</kd-layout-item>
  </kd-layout>
</template>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Layout.PullToBoundary codeInfo={codeInfo} />;
```

## 布局项尺寸

布局项的尺寸设置

```jsx
import { Layout } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Layout extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <h4>不同尺寸的布局项</h4>
  <kd-layout>
    <kd-layout-item size={12} xs={2} sm={4} md={6} lg={8} xl={10}>
      item1
    </kd-layout-item>
    <kd-layout-item size={12} xs={20} sm={16} md={12} lg={8} xl={4}>
      item2
    </kd-layout-item>
    <kd-layout-item size={12} xs={2} sm={4} md={6} lg={8} xl={10}>
      item3
    </kd-layout-item>
  </kd-layout>
</template>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Layout.LayoutItemSize codeInfo={codeInfo} />;
```

## 布局项内边距

布局项的内边距设置，可选值包括horizontal-small、horizontal-medium、horizontal-large、around-small、around-medium、around-large

```jsx
import { Layout } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Layout extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <h4>水平内边距 padding="horizontal-small"</h4>
  <div class="demo-container-bordered">
    <kd-layout>
      <kd-layout-item size={8} padding="horizontal-small">
        horizontal-small
      </kd-layout-item>
      <kd-layout-item size={8} padding="horizontal-small">
        horizontal-small
      </kd-layout-item>
      <kd-layout-item size={8} padding="horizontal-small">
        horizontal-small
      </kd-layout-item>
    </kd-layout>
  </div>
  
  <h4 className="section-title">周围内边距 padding="around-medium"</h4>
  <div className="demo-container-bordered">
    <kd-layout>
      <kd-layout-item size={8} padding="around-medium">
        around-medium
      </kd-layout-item>
      <kd-layout-item size={8} padding="around-medium">
        around-medium
      </kd-layout-item>
      <kd-layout-item size={8} padding="around-medium">
        around-medium
      </kd-layout-item>
    </kd-layout>
  </div>
</template>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Layout.LayoutItemPadding codeInfo={codeInfo} />;
```

## API

#### layout

| 属性             | 说明                                                      | 类型    | 默认值 | 版本  |
| ---------------- | --------------------------------------------------------- | ------- | ------ | ----- |
| horizontal-align | 水平对齐方式，可选值包括start、center、space、spread、end | String  | start  | 1.0.0 |
| multiple-rows    | 允许子项换行                                              | boolean | FALSE  | 1.0.0 |
| pull-to-boundary | 左右负间距贴边，可选值包括small、medium、large            | String  | -      | 1.0.0 |
| vertical-align   | 垂直对齐方式，可选值包括start、center、end、stretch       | String  | start  | 1.0.0 |

#### layout-item

| 属性           | 说明                                                         | 类型   | 默认值 | 版本  |
| -------------- | ------------------------------------------------------------ | ------ | ------ | ----- |
| alignment-bump | 对齐偏移到指定方向，可选值包括left、top、right、bottom       | string | -      | 1.0.0 |
| flexibility    | 伸缩策略，可选值包括auto、shrink、no-shrink、grow、no-grow、no-flex；可组合使用，例如 'auto, no-shrink' | string | -      | 1.0.0 |
| size           | 响应式栅格，所有设备下占栅格数（1–24）                       | number | -      | 1.0.0 |
| xs             | 屏幕 < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象  | number | -      | 1.0.0 |
| sm             | 屏幕 ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象  | number | -      | 1.0.0 |
| md             | 屏幕 ≥ 768px 响应式栅格，可为栅格数或一个包含其他属性的对象  | number | -      | 1.0.0 |
| lg             | 屏幕 ≥ 992px 响应式栅格，可为栅格数或一个包含其他属性的对象  | number | -      | 1.0.0 |
| xl             | 屏幕 ≥ 1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 | number | -      | 1.0.0 |
| xxl            | 屏幕 ≥ 1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 | number | -      | 1.0.0 |
| padding        | 内边距，可选值包括horizontal-small, horizontal-medium, horizontal-large, around-small, around-medium, around-large | string | -      | 1.0.0 |