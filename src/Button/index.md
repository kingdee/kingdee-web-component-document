---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: Button 按钮 # 组件的标题，会在菜单侧边栏展示
group:
  title: 基础
---
# 按钮

按钮是一种用于触发特定操作的组件。

## 基本用法
按钮分为主要按钮、次要按钮、幽灵按钮和文本按钮四种。
```jsx
import { Button } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ButtonBasic extends KingdeeElement {

}`,
  },
  {
    language: 'html',
    content: `<template>
      <kd-button label="Button" variant="primary"></kd-button>
      <kd-button label="Button" variant="secondary"></kd-button>
      <kd-button label="Button" variant="ghost"></kd-button>
      <kd-button label="Button" variant="text"></kd-button>
</template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Button codeInfo={codeInfo} label="Button" type="1" />;
```

## 图标按钮
Button 可以嵌入图标
```jsx
import { Button } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ButtonBasic extends KingdeeElement {

}`,
  },
  {
    language: 'html',
    content: `<template>
      <kd-button icon-name="kdfont-zengjia3" class="icon-button" ></kd-button>
      <kd-button label="Button" icon-name="kdfont-zengjia3" label='Button'></kd-button>
</template>`,
  },
  {
    language: 'css',
    content: `.icon-button {
     --kdds-c-button-prefixicon-margin-right: 0px,
     --kdds-c-button-sizing-min-width-medium: auto
     }`,
  },
];

export default () => <Button codeInfo={codeInfo} type="2" />;
```
## 按钮形状
Button 有多种形状，square - 长方形 (默认), circle - 圆形, round - 全圆角, 圆形按钮仅支持传入图标，传入文字不会渲染。
```jsx
import { Button } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ButtonBasic extends KingdeeElement {

}`,
  },
  {
    language: 'html',
    content: `<template>
        <kd-button icon-name="kdfont-zengjia3" shape='square' label="Button" ></kd-button>
        <kd-button icon-name="kdfont-zengjia3" shape='circle' label="Button" ></kd-button>
        <kd-button icon-name="kdfont-zengjia3" shape='round' label="Button" ></kd-button>
</template>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Button codeInfo={codeInfo} type="3" />;
```

## 按钮尺寸
按钮分为：迷你、小、中、大，四种尺寸。高度分别为：24px/28px/32px/36px。推荐及默认为尺寸「中」。可在不同场景及不同业务需求选择适合尺寸。
```jsx
import { Button } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ButtonBasic extends KingdeeElement {

}`,
  },
  {
    language: 'html',
    content: `<template>
        <kd-button size='small' label="Button" ></kd-button>
        <kd-button size='middle' label="Button" ></kd-button>
        <kd-button size='large' label="Button" ></kd-button>
</template>`,
  },
  {
    language: 'css',
    content: ``,
  },
];

export default () => <Button codeInfo={codeInfo} type="4" />;
```
## 禁用按钮
按钮的禁用状态。
```jsx
import { Button } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ButtonBasic extends KingdeeElement {
    clickedButtonLabel;
    handleClick(event) {
        this.clickedButtonLabel = event.target.label;
    }
}`,
  },
  {
    language: 'html',
    content: `<kd-button disabled label="Button"></kd-button>`,
  },
  {
    language: 'css',
    content: ``,
  },
];

export default () => <Button codeInfo={codeInfo} type="5" />;
```
## 加载中按钮
按钮的加载中状态。
```jsx
import { Button } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ButtonBasic extends KingdeeElement {

}`,
  },
  {
    language: 'html',
    content: `<kd-button loading label="Button"></kd-button>`,
  },
  {
    language: 'css',
    content: ``,
  },
];

export default () => <Button codeInfo={codeInfo} type="6" />;
```
## 长按钮
按钮宽度随着容器宽度进行适配。
```jsx
import { Button } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class ButtonBasic extends KingdeeElement {

}`,
  },
  {
    language: 'html',
    content: `<div style={{ display: 'flex', gap: '10px',alignItems: 'center', width: '300px' }}>
    <kd-button label="Button" stretch ></kd-button>
</div>`,
  },
  {
    language: 'css',
    content: ``,
  },
];

export default () => <Button codeInfo={codeInfo} type="7" />;
```
## API

| 属性          | 说明                                                         | 类型    | 默认值  | 版本  |
| ------------- | ------------------------------------------------------------ | ------- | ------- | ----- |
| label         | 按钮内显示的文本内容。                                       |         | -       | 1.0.0 |
| icon-name     | 按钮图标                                                     |         | -       | 1.0.0 |
| icon-position | 图标位置，可选值包括left、right                              |         | left    | 1.0.0 |
| disabled      | 设置按钮禁用状态                                             | boolean | false   | 1.0.0 |
| loading       | 设置按钮加载状态                                             | boolean | false   | 1.0.0 |
| stretch       | 开启该属性按钮将撑满父元素                                   | boolean | false   | 1.0.0 |
| shape         | 按钮的形状，可选值包括square、round、circle                  |         | square  | 1.0.0 |
| size          | 按钮的尺寸，可选值包括 large、medium、small                  |         | medium  | 1.0.0 |
| variant       | 按钮的视觉样式变体，可选值包括primary、ghost、secondary和text |         | primary | 1.0.0 |
| onclick       | 点击时触发                                                   |         | -       | 1.0.0 |

## 设计变量

| 类别       | Token名称                                     | 说明                     | 默认值                                   |
| ---------- | --------------------------------------------- | ------------------------ | ---------------------------------------- |
| color      | --kdds-c-button-primary-background            | 主要按钮背景颜色         | var(--kdds-g-color-accent-container-1)   |
| color      | --kdds-c-button-primary-color                 | 主要按钮文字颜色         | var(--kdds-g-color-accent-5)             |
| color      | --kdds-c-button-primary-border                | 主要按钮边框颜色         | var(--kdds-g-color-border-accent-1)      |
| color      | --kdds-c-button-primary-background-hover      | 主要按钮悬停时的背景颜色 | var(--kdds-g-color-accent-container-2)   |
| color      | --kdds-c-button-primary-border-hover          | 主要按钮悬停时的边框颜色 | var(--kdds-g-color-border-accent-2)      |
| color      | --kdds-c-button-primary-background-active     | 主要按钮激活时的背景颜色 | var(--kdds-g-color-accent-container-3)   |
| color      | --kdds-c-button-primary-border-active         | 主要按钮激活时的边框颜色 | var(--kdds-g-color-border-accent-3)      |
| color      | --kdds-c-button-primary-background-disabled   | 主要按钮禁用时的背景颜色 | var(--kdds-g-color-accent-container-4)   |
| color      | --kdds-c-button-primary-border-disabled       | 主要按钮禁用时的边框颜色 | var(--kdds-g-color-border-accent-4)      |
| color      | --kdds-c-button-primary-color-disabled        | 主要按钮禁用时文字颜色的 | var(--kdds-g-color-accent-4)             |
| color      | --kdds-c-button-primary-background-loading    | 主要按钮加载时的背景颜色 | var(--kdds-g-color-accent-container-1)   |
| color      | --kdds-c-button-primary-border-loading        | 主要按钮加载时的边框颜色 | var(--kdds-g-color-border-accent-1)      |
| color      | --kdds-c-button-primary-color-loading         | 主要按钮加载时的文字颜色 | var(--kdds-g-color-accent-4)             |
| color      | --kdds-c-button-primary-loading-icon-color    | 主要按钮加载图标颜色     | var(--kdds-g-color-on-surface-inverse-1) |
| color      | --kdds-c-button-ghost-border                  | 幽灵按钮边框颜色         | var(--kdds-g-color-border-accent-1)      |
| color      | --kdds-c-button-ghost-color                   | 幽灵按钮文字颜色         | var(--kdds-g-color-accent-1)             |
| color      | --kdds-c-button-ghost-border-hover            | 幽灵按钮悬停时的边框颜色 | var(--kdds-g-color-border-accent-2)      |
| color      | --kdds-c-button-ghost-color-hover             | 幽灵按钮悬停时的文字颜色 | var(--kdds-g-color-accent-2)             |
| color      | --kdds-c-button-ghost-border-active           | 幽灵按钮激活时的边框颜色 | var(--kdds-g-color-border-accent-3)      |
| color      | --kdds-c-button-ghost-color-active            | 幽灵按钮激活时的文字颜色 | var(--kdds-g-color-accent-3)             |
| color      | --kdds-c-button-ghost-border-disabled         | 幽灵按钮禁用时的边框颜色 | var(--kdds-g-color-border-2)             |
| color      | --kdds-c-button-ghost-color-disabled          | 幽灵按钮禁用时的文字颜色 | var(--kdds-g-color-on-surface-1)         |
| color      | --kdds-c-button-ghost-border-loading          | 幽灵按钮加载时的边框颜色 | var(--kdds-g-color-border-accent-1)      |
| color      | --kdds-c-button-ghost-color-loading           | 幽灵按钮加载时的文字颜色 | var(--kdds-g-color-accent-4)             |
| color      | --kdds-c-button-ghost-loading-icon-color      | 幽灵按钮加载图标颜色     | var(--kdds-g-color-accent-1)             |
| color      | --kdds-c-button-secondary-background          | 次要按钮背景颜色         | var(--kdds-g-color-surface-container-1)  |
| color      | --kdds-c-button-secondary-border              | 次要按钮边框颜色         | var(--kdds-g-color-border-2)             |
| color      | --kdds-c-button-secondary-color               | 次要按钮文字颜色         | var(--kdds-g-color-on-surface-4)         |
| color      | --kdds-c-button-secondary-border-hover        | 次要按钮悬停时的边框颜色 | var(--kdds-g-color-border-accent-1)      |
| color      | --kdds-c-button-secondary-color-hover         | 次要按钮悬停时的文字颜色 | var(--kdds-g-color-accent-1)             |
| color      | --kdds-c-button-secondary-border-active       | 次要按钮激活时的边框颜色 | var(--kdds-g-color-border-accent-3)      |
| color      | --kdds-c-button-secondary-color-active        | 次要按钮激活时的文字颜色 | var(--kdds-g-color-accent-3)             |
| color      | --kdds-c-button-secondary-background-disabled | 次要按钮禁用时的背景颜色 | var(--kdds-g-color-disabled-container-1) |
| color      | --kdds-c-button-secondary-border-disabled     | 次要按钮禁用时的边框颜色 | var(--kdds-g-color-border-disabled-1)    |
| color      | --kdds-c-button-secondary-color-disabled      | 次要按钮禁用时的文字颜色 | var(--kdds-g-color-disabled-1)           |
| color      | --kdds-c-button-secondary-border-loading      | 次要按钮加载时的边框颜色 | var(--kdds-g-color-border-2)             |
| color      | --kdds-c-button-secondary-color-loading       | 次要按钮加载时的文字颜色 | var(--kdds-g-color-on-surface-1)         |
| color      | --kdds-c-button-secondary-loading-icon-color  | 次要按钮加载图标颜色     | var(--kdds-g-color-accent-1)             |
| color      | --kdds-c-button-text-color-hover              | 文字按钮悬停时的颜色     | var(--kdds-g-color-accent-2)             |
| color      | --kdds-c-button-text-color-active             | 文字按钮激活时的颜色     | var(--kdds-g-color-accent-3)             |
| color      | --kdds-c-button-text-color-disabled           | 文字按钮禁用时的颜色     | var(--kdds-g-color-disabled-1)           |
| color      | --kdds-c-button-text-color-loading            | 文字按钮加载时的颜色     | var(--kdds-g-color-accent-4)             |
| color      | --kdds-c-button-text-loading-icon-color       | 文字按钮加载图标颜色     | var(--kdds-g-color-accent-1)             |
| color      | --kdds-c-button-text-color                    | 文字按钮的颜色           | var(--kdds-g-color-accent-1)             |
| typography | --kdds-c-button-font-size-small               | 小号按钮字体大小         | var(--kdds-g-font-scale-2)               |
| typography | --kdds-c-button-line-height-small             | 小号按钮行高             | var(--kdds-g-font-lineheight-4)          |
| typography | --kdds-c-button-font-size-medium              | 中号按钮字体大小         | var(--kdds-g-font-scale-3)               |
| typography | --kdds-c-button-line-height-medium            | 中号按钮行高             | var(--kdds-g-font-lineheight-5)          |
| typography | --kdds-c-button-font-size-large               | 大号按钮字体大小         | var(--kdds-g-font-scale-4)               |
| typography | --kdds-c-button-line-height-large             | 大号按钮行高             | var(--kdds-g-font-lineheight-4)          |
| typography | --kdds-c-button-icon-font-size                | 按钮里的图标尺寸大小     | var(--kdds-g-icon-sizing-3)              |
| spacing    | --kdds-c-button-padding-vertical-small        | 小号按钮上下内边距       | var(--kdds-g-spacing-1)                  |
| spacing    | --kdds-c-button-padding-horizontal-small      | 小号按钮左右内边距       | var(--kdds-g-spacing-4)                  |
| spacing    | --kdds-c-button-padding-vertical-medium       | 中号按钮上下内边距       | var(--kdds-g-spacing-2)                  |
| spacing    | --kdds-c-button-padding-horizontal-medium     | 中号按钮左右内边距       | var(--kdds-g-spacing-4)                  |
| spacing    | --kdds-c-button-padding-vertical-large        | 大号按钮上下内边距       | calc(var(--kdds-g-spacing-3) + 1px)      |
| spacing    | --kdds-c-button-padding-horizontal-large      | 大号按钮左右内边距       | var(--kdds-g-spacing-5)                  |
| spacing    | --kdds-c-button-prefixicon-margin-right       | 前缀图标右外边距         | var(--kdds-g-spacing-2)                  |
| spacing    | --kdds-c-button-suffixicon-margin-left        | 后缀图标左外边距         | var(--kdds-g-spacing-2)                  |
| sizing     | --kdds-c-button-sizing-min-width-small        | 小号按钮最小宽度         | 3.75rem                                  |
| sizing     | --kdds-c-button-sizing-max-width-small        | 小号按钮最大宽度         | 100%                                     |
| sizing     | --kdds-c-button-sizing-min-width-medium       | 中号按钮最小宽度         | 3.75rem                                  |
| sizing     | --kdds-c-button-sizing-max-width-medium       | 中号按钮最大宽度         | 100%                                     |
| sizing     | --kdds-c-button-sizing-min-width-large        | 大号按钮最小宽度         | 4.25rem                                  |
| sizing     | --kdds-c-button-sizing-max-width-large        | 大号按钮最大宽度         | 100%                                     |
| border     | --kdds-c-button-shape-square-border-radius    | 圆角方形按钮             | var(--kdds-g-radius-border-1)            |
| border     | --kdds-c-button-shape-round-border-radius     | 全圆角按钮               | var(--kdds-g-radius-border-circle1)      |
| border     | --kdds-c-button-border-width                  | 按钮边框宽度             | var(--kdds-g-sizing-border-1)            |
| opacity    | --kdds-c-button-ghost-background              | 幽灵按钮背景透明度       | var(--kdds-g-opacity-0)                  |
| opacity    | --kdds-c-button-custom-opacity-hover          | 自定义按钮悬停透明度     | var(--kdds-g-opacity-60)                 |
| opacity    | --kdds-c-button-custom-opacity-disabled       | 自定义按钮禁用透明度     | var(--kdds-g-opacity-20)                 |
| opacity    | --kdds-c-button-custom-loading-icon-color     | 自定义按钮加载图标透明度 | var(--kdds-g-opacity-40)                 |