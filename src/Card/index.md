---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: Card 卡片 # 组件的标题，会在菜单侧边栏展示
group:
  title: 基础
---

# Card 卡片

通用卡片容器。

## 基本用法

卡片的基本用法

```jsx
import { Card } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Card extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: '<kd-card>Card Content</kd-card>',
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => (
  <Card.Default codeInfo={codeInfo} />
);
```

## 带标题的卡片

卡片可以设置标题

```jsx
import { Card } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Card extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: '<kd-card title="Card Title">Card Content with Title</kd-card>',
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => (
  <Card.WithTitle codeInfo={codeInfo} />
);
```

## 带图标的卡片

卡片标题前可以设置图标

```jsx
import { Card } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Card extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: '<kd-card title="Card with Icon" icon-name="kdfont-GPT4">Card Content with Icon</kd-card>',
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => (
  <Card.WithIcon codeInfo={codeInfo} />
);
```

## 无头部卡片

可以隐藏卡片的头部

```jsx
import { Card } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Card extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: '<kd-card hide-header>Card Content without Header</kd-card>',
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => (
  <Card.WithoutHeader codeInfo={codeInfo} />
);
```

## 带操作按钮的卡片

卡片可以添加操作按钮

```jsx
import { Card } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Card extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<kd-card title="Card with Actions">
  <div>Card Content with Actions</div>
  <div slot="actions">
    <button type="button">Action 1</button>
    <button type="button">Action 2</button>
  </div>
</kd-card>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => (
  <Card.WithActions codeInfo={codeInfo} />
);
```

## 带页脚的卡片

卡片可以添加页脚

```jsx
import { Card } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Card extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<kd-card title="Card with Footer">
  <div>Card Content with Footer</div>
  <div slot="footer">Card Footer Content</div>
</kd-card>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => (
  <Card.WithFooter codeInfo={codeInfo} />
);
```

## 自定义标题卡片

可以自定义卡片的标题区域

```jsx
import { Card } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Card extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<kd-card>
  <div slot="title">
    <div style="display: flex; align-items: center; gap: 8px;">
      <span>Custom Title</span>
      <span style="color: red;">(Custom)</span>
    </div>
  </div>
  <div>Card Content with Custom Title</div>
</kd-card>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => (
  <Card.WithCustomTitle codeInfo={codeInfo} />
);
```

## API

| 属性        | 说明         | 类型   | 默认值 | 版本  |
| ----------- | ------------ | ------ | ------ | ----- |
| hide-header | 隐藏头部栏   |        | false  | 1.0.0 |
| icon-name   | 标题前的图标 | string | -      | 1.0.0 |
| title       | 标题         | string | -      | 1.0.0 |

## 插槽

| 名称    | 说明               | 版本  |
| ------- | ------------------ | ----- |
| title   | 自定义渲染标题区域 | 1.0.0 |
| actions | 自定义渲染操作区域 | 1.0.0 |
| footer  | 自定义渲染底部区域 | 1.0.0 |
| default | 自定义渲染内容区域 | 1.0.0 |

## 设计变量

| 类别       | Token名称                               | 说明                   | 默认值                           |
| ---------- | --------------------------------------- | ---------------------- | -------------------------------- |
| color      | --kdds-c-card-background                | 卡片背景色             | var(--kdds-g-color-surface-1)    |
| color      | --kdds-c-card-border                    | 卡片边框色             | var(--kdds-g-color-border-1)     |
| color      | --kdds-c-card-header-background         | 卡片头部区域背景色     | var(--kdds-g-color-surface-1)    |
| color      | --kdds-c-card-icon-color                | 卡片图标颜色           | var(--kdds-g-color-on-surface-3) |
| color      | --kdds-c-card-title-color               | 卡片标题文字颜色       | var(--kdds-g-color-on-surface-4) |
| color      | --kdds-c-card-text-color                | 卡片正文文字颜色       | var(--kdds-g-color-on-surface-4) |
| typography | --kdds-c-card-title-font-size           | 卡片标题文字大小       | var(--kdds-g-font-scale-4)       |
| typography | --kdds-c-card-title-font-weight         | 卡片标题字重           | var(--kdds-g-font-weight-6)      |
| typography | --kdds-c-card-title-line-height         | 卡片标题行高           | var(--kdds-g-font-lineheight-4)  |
| typography | --kdds-c-card-text-font-size            | 卡片正文文字大小       | var(--kdds-g-font-scale-3)       |
| typography | --kdds-c-card-text-font-weight          | 卡片正文字重           | var(--kdds-g-font-weight-5)      |
| typography | --kdds-c-card-text-line-height          | 卡片正文行高           | var(--kdds-g-font-lineheight-5)  |
| border     | --kdds-c-card-border-radius             | 卡片边框圆角           | 0%                               |
| border     | --kdds-c-card-border-width              | 卡片边框宽度           | var(--kdds-g-sizing-border-1)    |
| spacing    | --kdds-c-card-header-padding-horizontal | 卡片头部区域左右内边距 | var(--kdds-g-spacing-6)          |
| spacing    | --kdds-c-card-header-padding-vertical   | 卡片头部区域上下内边距 | var(--kdds-g-spacing-4)          |
| spacing    | --kdds-c-card-icon-margin-right         | 卡片图标右外边距       | var(--kdds-g-spacing-2)          |
| spacing    | --kdds-c-card-body-padding-horizontal   | 卡片主体区域左右内边距 | var(--kdds-g-spacing-6)          |
| spacing    | --kdds-c-card-body-padding-top          | 卡片主体区域上内边距   | var(--kdds-g-spacing-4)          |
| spacing    | --kdds-c-card-body-padding-bottom       | 卡片主体区域下内边距   | var(--kdds-g-spacing-6)          |
| spacing    | --kdds-c-card-footer-padding-horizontal | 卡片底部区域左右内边距 | var(--kdds-g-spacing-6)          |