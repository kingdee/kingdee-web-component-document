---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: Switch 开关 # 组件的标题，会在菜单侧边栏展示
group:
  title: 数据输入
---
# 开关

互斥性的操作控件，用户可打开或关闭某个功能。

## 基本用法

最基础的应用。

```jsx
import { Switch } from 'kwc';
const _Switch = Switch.Default;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BaseSwitch extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-switch></kd-switch>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Switch codeInfo={codeInfo} />;
```

## 禁用状态

通过 `disabled` 设置 `Switch` 为禁用状态。

```jsx
import { Switch } from 'kwc';
const _Switch = Switch.Disabled;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BaseSwitch extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-switch disabled></kd-switch>
        <kd-switch checked="true" disabled></kd-switch>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Switch codeInfo={codeInfo} />;
```
## 不同尺寸的开关

通过指定 `size` 可以得到不同尺寸的开关。

```jsx
import { Switch } from 'kwc';
const _Switch = Switch.Size;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BaseSwitch extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-switch size="small"></kd-switch>
        <kd-switch size="medium"></kd-switch>
        <kd-switch size="large"></kd-switch>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Switch codeInfo={codeInfo} />;
```

## 加载中

开关处于加载中状态，不可点击

```jsx
import { Switch } from 'kwc';
const _Switch = Switch.Loading;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BaseSwitch extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-switch loading />
        <kd-switch checked loading />
        <kd-switch loading size="small" />
        <kd-switch checked loading size="small"/>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Switch codeInfo={codeInfo} />;
```

## 标题

通过 `label` 属性可以设置开关的标题。

```jsx
import { Switch } from 'kwc';
const _Switch = Switch.Label;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BaseSwitch extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-switch label="Label"/>
        <kd-switch label="Switch Title" />
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Switch codeInfo={codeInfo} />;
```

## 标题位置

通过 `label-position` 属性可以设置开关的标题位置。

```jsx
import { Switch } from 'kwc';
const _Switch = Switch.LabelPosition;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BaseSwitch extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-switch {...props} label="Vertical Label" label-position="vertical"/>
        <kd-switch {...props} label="Inline" label-position="inline" />
        <kd-switch {...props} label="Hidden" label-position="hidden" />
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Switch codeInfo={codeInfo} />;
```

## API

| 属性            | 说明                                         | 类型    | 默认值   | 版本  |
| --------------- | -------------------------------------------- | ------- | -------- | ----- |
| label           | 标题                                         | string  | -        | 1.0.0 |
| label-position  | 标题位置，可选值包括vertical、inline、hidden | string  | vertical | 1.0.0 |
| size            | 开关的尺寸，可选值包括 large、medium、small  | string  | medium   | 1.0.0 |
| checked         | 当前选中状态，受控属性                       | boolean | false    | 1.0.0 |
| default-checked | 初始选中状态，用于非受控模式                 | boolean | false    | 1.0.0 |
| disabled        | 设置开关是否禁用                             | boolean | false    | 1.0.0 |
| loading         | 设置开关加载状态                             | boolean | false    | 1.0.0 |
| size            | 按钮的尺寸，可选值包括 large、medium、small  | string  | medium   | 1.0.0 |
| name            | 开关的名称                                   | string  | -        | 1.0.0 |
| onChange        | 值改变时触发                                 |         | -        | 1.0.0 |


## 设计变量

| 类别    | Token名称                                      | 说明                     | 默认值                                           |
| ------- | ---------------------------------------------- | ------------------------ | ------------------------------------------------ |
| border  | --kdds-c-switch-track-border-radius            | 底部轨道圆角             | 100px                                            |
| border  | --kdds-c-switch-dot-border-radius              | 白色圆点圆角             | 100px                                            |
| border  | --kdds-c-switch-on-track-border-width-active   | 开-激活状态轨道宽度      | var(--kdds-g-sizing-border-2,2px)                |
| border  | --kdds-c-switch-off-track-border-width-active  | 关-激活状态轨道宽度      | var(--kdds-g-sizing-border-2,2px)                |
| color   | --kdds-c-switch-dot-color                      | 圆点默认颜色             | var(--kdds-g-color-on-surface-inverse-1,#FFFFFF) |
| color   | --kdds-c-switch-on-track-border-active         | 开-激活状态轨道边框颜色  | var(--kdds-g-color-accent-1,#5582F34D)           |
| color   | --kdds-c-switch-off-track-border-active        | 关-激活状态轨道边框颜色  | var(--kdds-g-color-on-surface-1,#B2B2B24D)       |
| color   | --kdds-c-switch-on-track-color                 | 开-轨道默认颜色          | var(--kdds-g-color-accent-1, #5582F3)            |
| color   | --kdds-c-switch-on-track-color-hover           | 开-轨道悬停颜色          | var(--kdds- g-color-accent-2, #87A9FF)           |
| color   | --kdds-c-switch-on-track-color-focus           | 开-轨道点击颜色          | var(--kdds-g-color-on-surface-1,#B2B2B2)         |
| color   | --kdds-c-switch-on-track-color-disabled        | 开-轨道禁用颜色          | var(--kdds-g-color-accent-4, #B5CAFF)            |
| color   | --kdds-c-switch-off-track-color                | 关-轨道默认颜色          | var(--kdds-g-color-on-surface-1,#B2B2B2)         |
| color   | --kdds-c-switch-off-track-color-hover          | 关-轨道悬停颜色          | var(--kdds-g-color-on-surface-2, #999999)        |
| color   | --kdds-c-switch-off-track-color-focus          | 关-轨道点击颜色          | var(--kdds-g-color-on-surface-1,#B2B2B2)         |
| color   | --kdds-c-switch-off-track-color-disabled       | 关-轨道禁用颜色          | var(--kdds-g-color-border-disabled-1,#D9D9D9)    |
| color   | --kdds-c-switch-on-loading-icon-color          | 开-加载动画图标颜色      | var(--kdds-g-color-accent-1, #5582F3)            |
| color   | --kdds-c-switch-off-loading-icon-color         | 关-加载动画图标颜色      | var(--kdds-g-color-on-surface-1,#B2B2B2)         |
| sizing  | --kdds-c-switch-track-sizing-width-small       | 小尺寸轨道宽度           | 2rem                                             |
| sizing  | --kdds-c-switch-track-sizing-height-small      | 小尺寸轨道高度           | 1rem                                             |
| sizing  | --kdds-c-switch-track-sizing-width-medium      | 中尺寸轨道宽度           | 2.5rem                                           |
| sizing  | --kdds-c-switch-track-sizing-height-medium     | 中尺寸轨道高度           | 1.25rem                                          |
| sizing  | --kdds-c-switch-track-sizing-width-large       | 大尺寸轨道宽度           | 3rem                                             |
| sizing  | --kdds-c-switch-track-sizing-height-large      | 大尺寸轨道高度           | 1.5rem                                           |
| sizing  | --kdds-c-switch-dot-sizing-width-small         | 小尺寸圆点宽度           | 0.875rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-small        | 小尺寸圆点高度           | 0.875rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-medium        | 中尺寸圆点宽度           | 1.125rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-medium       | 中尺寸圆点高度           | 1.125rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-large         | 大尺寸圆点宽度           | 1.375rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-large        | 大尺寸圆点高度           | 1.375rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-small-focus   | 小尺寸点击状态圆点宽度   | 1.125rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-small-focus  | 小尺寸点击状态圆点高度   | 0.875rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-medium-focus  | 中尺寸点击状态圆点宽度   | 1.375rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-medium-focus | 中尺寸点击状态圆点高度   | 1.125rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-large-focus   | 大尺寸点击状态圆点宽度   | 1.625rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-large-focus  | 大尺寸点击状态圆点高度   | 1.375rem                                         |
| spacing | --kdds-c-switch-dot-padding-right-small        | 小尺寸圆点右间距         | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-small         | 小尺寸圆点左间距         | 1.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-medium       | 中尺寸圆点右间距         | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-medium        | 中尺寸圆点左间距         | 1.3125rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-large        | 大尺寸圆点右间距         | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-large         | 大尺寸圆点左间距         | 1.5625rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-small-focus  | 小尺寸点击状态圆点右间距 | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-small-focus   | 小尺寸点击状态圆点左间距 | 0.8125rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-medium-focus | 中尺寸点击状态圆点右间距 | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-medium-focus  | 中尺寸点击状态圆点左间距 | 1.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-large-focus  | 大尺寸点击状态圆点右间距 | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-large-focus   | 大尺寸点击状态圆点左间距 | 1.3125rem                                        |
