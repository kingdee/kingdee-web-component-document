---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 文本 Input # 组件的标题，会在菜单侧边栏展示
group:
  title: 基础
---

# 输入框 Input

用于文本输入的组件。

## 基本用法

输入框的基本用法

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: '<kd-input label="Label" placeholder="Basic usage"</kd-input>',
  },
];

export default () => (
  <Input.Default codeInfo={codeInfo} label="Label" placeholder="Basic usage" />
);
```

## 输入框状态

输入框可设置禁用、只读状态

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label="Label" placeholder='disabled' disabled></kd-input>
  <kd-input label="Label" value='disabled' disabled></kd-input>
  <kd-input label="Label" placeholder='read-only' read-only></kd-input>
  <kd-input label="Label" value='read-only' read-only></kd-input>
</template>`,
  },
];

export default () => <Input.Status codeInfo={codeInfo} />;
```

## 输入框尺寸

输入框定义了三种尺寸 small，medium，large，分别是 24px，32px，40px。

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label="Label" placeholder='Large' size='Large'></kd-input>
  <kd-input label="Label" placeholder='Medium' size='Medium'></kd-input>
  <kd-input label="Label" placeholder='Small' size='Small'></kd-input>
</template>`,
  },
];

export default () => <Input.Size codeInfo={codeInfo} />;
```

## 形态变体

输入框定义了三种形态 underlined，outlined，borderless。

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label="Label" placeholder='Underlined' variant='underlined'></kd-input>
  <kd-input label="Label" placeholder='Outlined' variant='outlined'></kd-input>
  <kd-input label="Label" placeholder='Borderless' variant='borderless'></kd-input>
</template>`,
  },
];

export default () => <Input.Variant codeInfo={codeInfo} />;
```

## 标题位置

可设置标题位置，可选值包括 vertical，inline，hidden。

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label="Label" placeholder='Vertical Label' label-position='underlined'></kd-input>
  <kd-input label="Label" placeholder='Inline Label' label-position='inline'></kd-input>
  <kd-input label="Label" placeholder='Hidden Label' label-position='hidden'></kd-input>
</template>`,
  },
];

export default () => <Input.LabelPosition codeInfo={codeInfo} />;
```

## 必录

可设置必录

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label="Label" placeholder='Required' required></kd-input>
</template>`,
  },
];

export default () => <Input.Required codeInfo={codeInfo} />;
```

## 带清除图标

带清除图标的输入框，点击图标删除所有内容。

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label="Label" placeholder='Input with clear icon' show-clear></kd-input>
  <kd-input type='textarea' label="Label" placeholder='Textarea with clear icon' show-clear></kd-input>
</template>`,
  },
];

export default () => <Input.WithClearIcon codeInfo={codeInfo} />;
```

## 反馈状态及提示语

可以设置成功和错误状态，并定义提示语。

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label="Label" placeholder='Success' state='success' message='请输入正确的格式'></kd-input>
  <kd-input label="Label" placeholder='Error' state='error' message='请输入正确的格式'></kd-input>
</template>`,
  },
];

export default () => <Input.FeedbackAndTip codeInfo={codeInfo} />;
```

## 字数限制

设置 min-length 限制最小字数， max-length 限制最大字数。

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label="Label" placeholder='Minlength is 2' min-length='2'></kd-input>
  <kd-input label="Label" placeholder='Maxlength is 10' max-length='10' ></kd-input>
</template>`,
  },
];

export default () => <Input.Limit codeInfo={codeInfo} />;
```

## 搜索框

带有搜索按钮的输入框，用于内容检索。

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label-position='hidden' type='search' placeholder='Search something'></kd-input>
</template>`,
  },
];

export default () => <Input.Search codeInfo={codeInfo} />;
```

## 密码输入框

用于密码输入。

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label='Label' type='password' placeholder='Input password'></kd-input>
  <kd-input label='Label' type='password' password-visible placeholder='Input password'></kd-input>
</template>`,
  },
];

export default () => <Input.Password codeInfo={codeInfo} />;
```

## 多行文本

用于多行输入，可通过 autosize 配置自适应内容高度。

```jsx
import { Input } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-input label='Label' type='textarea' ></kd-input>
  <kd-input label='Label' type='textarea' placeholder='Autosize height based on content lines'></kd-input>
  <kd-input label='Label' type='textarea' placeholder='Autosize height with minimun and maximum number of linesAutosize height with minimun and maximum number of linesAutosize height with minimun and maximum number of lines'></kd-input>
</template>`,
  },
];

export default () => <Input.Textarea codeInfo={codeInfo} />;
```

## API

| 属性           | 说明                                                              | 类型    | 默认值   | 版本  |
| -------------- | ----------------------------------------------------------------- | ------- | -------- | ----- |
| label          | 标题                                                              |         | -        | 1.0.0 |
| name           | 数据提交标识                                                      | string  | -        | 1.0.0 |
| disabled       | 设置输入框禁用状态                                                | boolean | FALSE    | 1.0.0 |
| read-only      | 设置输入框只读状态                                                | boolean | FALSE    | 1.0.0 |
| required       | 设置输入框必录状态                                                | boolean | FALSE    | 1.0.0 |
| show-clear     | 是否展示清除按钮                                                  | boolean | FALSE    | 1.0.0 |
| value          | 输入框的值                                                        |         | -        | 1.0.0 |
| placeholder    | 输入框为空时的提示语                                              |         | -        | 1.0.0 |
| auto-complete  | 自动填充，可选值包括 off、on；当 type 为 password 时不支持        |         | off      | 1.0.0 |
| size           | 输入框的尺寸，可选值包括 large、medium、small                     |         | medium   | 1.0.0 |
| state          | 反馈状态，可选值包括 error、success                               |         | -        | 1.0.0 |
| message        | 反馈提示语，设置 state 时显示                                     |         | -        | 1.0.0 |
| label-position | 标题位置，可选值包括 vertical、inline、hidden                     |         | vertical | 1.0.0 |
| variant        | 输入框的视觉样式变体，可选值包括 underlined、outlined、borderless |         | outlined | 1.0.0 |
| min-length     | 允许输入最小字符数                                                | number  | -        | 1.0.0 |
| max-length     | 允许输入最大字符数；最大为 2000                                   | number  | 2000     | 1.0.0 |
| type           | 输入框的类型，可选值包括 text、password                           |         | text     | 1.0.0 |
| onfocus        | 获取焦点时触发                                                    |         | -        | 1.0.0 |
| onblur         | 失去焦点时触发                                                    |         | -        | 1.0.0 |
| onChange       | 值改变时触发                                                      |         | -        | 1.0.0 |

### input.password

同 Input 属性，外加：

| 属性             | 说明                                     | 类型    | 默认值 | 版本  |
| ---------------- | ---------------------------------------- | ------- | ------ | ----- |
| password-visible | 当 type 为 password 时，设置密码是否可见 | boolean | FALSE  | 1.0.0 |

## 设计变量

| 类别       | Token 名称                                   | 说明                       | 默认值                                   |
| ---------- | -------------------------------------------- | -------------------------- | ---------------------------------------- |
| color      | --kdds-c-input-icon-color                    | 图标默认颜色               | var(--kdds-g-color-on-surface-3)         |
| color      | --kdds-c-input-icon-color-hover              | 图标悬停颜色               | var(--kdds-g-color-accent-1)             |
| color      | --kdds-c-input-icon-color-active             | 图标激活颜色               | var(--kdds-g-color-accent-3)             |
| color      | --kdds-c-input-border                        | 输入框默认边框颜色         | var(--kdds-g-color-border-2)             |
| color      | --kdds-c-input-border-hover                  | 输入框悬停边框颜色         | var(--kdds-g-color-border-accent-1)      |
| color      | --kdds-c-input-border-focus                  | 输入框聚焦边框颜色         | var(--kdds-g-color-border-accent-1)      |
| color      | --kdds-c-input-border-error                  | 输入框错误状态边框颜色     | var(--kdds-g-color-border-error-3)       |
| color      | --kdds-c-input-border-disabled               | 输入框禁用状态边框颜色     | var(--kdds-g-color-border-disabled-1)    |
| color      | --kdds-c-input-border-read-only              | 输入框只读状态边框颜色     | var(--kdds-g-color-border-disabled-1)    |
| color      | --kdds-c-input-background                    | 输入框默认背景颜色         | var(--kdds-g-color-surface-container-1)  |
| color      | --kdds-c-input-background-disabled           | 输入框禁用状态背景颜色     | var(--kdds-g-color-disabled-container-1) |
| color      | --kdds-c-input-background-read-only          | 输入框只读状态背景颜色     | var(--kdds-g-color-surface-container-1)  |
| color      | --kdds-c-input-value-color                   | 输入框文本默认颜色         | var(--kdds-g-color-on-surface-4)         |
| color      | --kdds-c-input-value-color-disabled          | 输入框禁用状态文本颜色     | var(--kdds-g-color-disabled-1)           |
| color      | --kdds-c-input-value-color-read-only         | 输入框只读状态文本颜色     | var(--kdds-g-color-on-surface-4)         |
| color      | --kdds-c-input-placeholder-color             | 输入框占位符文本颜色       | var(--kdds-g-color-on-surface-1)         |
| color      | --kdds-c-input-field-label-color             | 字段标签颜色               | var(--kdds-g-color-on-surface-4)         |
| color      | --kdds-c-input-required-indicator-color      | 必填指示器颜色             | var(--kdds-g-color-on-error-1)           |
| color      | --kdds-c-input-supporting-text-color-success | 辅助文本成功颜色           | var(--kdds-g-color-success-1)            |
| color      | --kdds-c-input-supporting-text-color-error   | 辅助文本错误颜色           | var(--kdds-g-color-error-1)              |
| typography | --kdds-c-input-value-font-size-small         | 输入框小尺寸文本字体大小   | var(--kdds-g-font-scale-2)               |
| typography | --kdds-c-input-value-line-height-small       | 输入框小尺寸文本行高       | var(--kdds-g-font-lineheight-4)          |
| typography | --kdds-c-input-value-font-size-medium        | 输入框中尺寸文本字体大小   | var(--kdds-g-font-scale-3)               |
| typography | --kdds-c-input-value-line-height-medium      | 输入框中尺寸文本行高       | var(--kdds-g-font-lineheight-5)          |
| typography | --kdds-c-input-value-font-size-large         | 输入框大尺寸文本字体大小   | var(--kdds-g-font-scale-4)               |
| typography | --kdds-c-input-value-line-height-large       | 输入框大尺寸文本行高       | var(--kdds-g-font-lineheight-4)          |
| typography | --kdds-c-input-icon-font-size                | 图标字体大小               | var(--kdds-g-icon-sizing-3)              |
| typography | --kdds-c-input-field-label-font-size         | 字段标签字体大小           | var(--kdds-g-font-scale-2)               |
| typography | --kdds-c-input-field-label-line-height       | 字段标签行高               | var(--kdds-g-font-lineheight-4)          |
| typography | --kdds-c-input-required-indicator-font-size  | 必填指示器字体大小         | var(--kdds-g-icon-sizing-1)              |
| typography | --kdds-c-input-supporting-text-font-size     | 辅助文本字体大小           | var(--kdds-g-font-scale-2)               |
| typography | --kdds-c-input-supporting-text-line-height   | 辅助文本行高               | var(--kdds-g-font-lineheight-4)          |
| border     | --kdds-c-input-border-radius                 | 输入框边框圆角             | var(--kdds-g-radius-border-1)            |
| border     | --kdds-c-input-border-width                  | 输入框边框宽度             | var(--kdds-g-sizing-border-1)            |
| spacing    | --kdds-c-input-padding-horizontal-small      | 输入框小尺寸水平方向内边距 | var(--kdds-g-spacing-4)                  |
| spacing    | --kdds-c-input-padding-vertical-small        | 输入框小尺寸垂直方向内边距 | var(--kdds-g-spacing-1)                  |
| spacing    | --kdds-c-input-padding-horizontal-medium     | 输入框中尺寸水平方向内边距 | var(--kdds-g-spacing-4)                  |
| spacing    | --kdds-c-input-padding-vertical-medium       | 输入框中尺寸垂直方向内边距 | var(--kdds-g-spacing-4)                  |
| spacing    | --kdds-c-input-padding-horizontal-large      | 输入框大尺寸水平方向内边距 | var(--kdds-g-spacing-4)                  |
| spacing    | --kdds-c-input-padding-vertical-large        | 输入框大尺寸垂直方向内边距 | calc(var(--kdds-g-spacing-3) + 1px)      |
| spacing    | --kdds-c-input-icon-margin-left              | 图标左间距                 | var(--kdds-g-spacing-4)                  |
| spacing    | --kdds-c-input-field-label-margin-bottom     | 字段标签底间距             | var(--kdds-g-spacing-2)                  |
| spacing    | --kdds-c-input-supporting-text-margin-top    | 辅助文本上间距             | var(--kdds-g-spacing-1)                  |
| spacing    | --kdds-c-input-field-label-margin-right      | 字段标签右间距             | var(--kdds-g-spacing-4)                  |
| animation  | --kdds-c-input-icon-pointer-events           | 图标指针事件控制           | auto                                     |
| animation  | --kdds-c-input-icon-cursor                   | 图标光标样式               | pointer                                  |
| animation  | --kdds-c-input-cursor                        | 输入框默认光标样式         | text                                     |
| animation  | --kdds-c-input-cursor-disabled               | 输入框禁用状态光标样式     | not-allowed                              |
| animation  | --kdds-c-input-cursor-read-only              | 输入框只读状态光标样式     | default                                  |
| animation  | --kdds-c-input-transition                    | 输入框过渡动效             | all 0.2s ease                            |
