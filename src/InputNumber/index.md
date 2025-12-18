---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 数字输入框 InputNumber # 组件的标题，会在菜单侧边栏展示
group:
  title: 基础
---

# 数字输入框 InputNumber

仅允许输入数字格式的输入框。

## 基本用法

通过鼠标或者键盘输入范围内的标准数值。

```jsx
import { InputNumber } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<div style="display: flex, gap: 48px">
  <kd-input-number label="Label" placeholder="Basic usage" show-stepper value='2' />
  <kd-input-number label="Label" placeholder="Basic usage" disabled value='500' />
</div>`,
  },
];

export default () => (
  <InputNumber.Default
    codeInfo={codeInfo}
    label="Label"
    placeholder="Basic usage"
  />
);
```

## 数值精度

通过 precision 来设置数值精度。数值精度为 0 时，仅允许整数输入。

```jsx
import { InputNumber } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class InputNumber extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: ``,
  },
];

export default () => (
  <InputNumber.Precision codeInfo={codeInfo} label="Label" />
);
```

## 步进器及步长

通过 show-stepper 来设置是否显示步进器，通过 step 来设置步进器增减的步长值。当 precision 小于 step 的小数位时，精度取 step 的小数个数。

```jsx
import { InputNumber } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class InputNumber extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: ``,
  },
];

export default () => <InputNumber.Count codeInfo={codeInfo} label="Label" />;
```

## 三种尺寸

设置 size 可以使用四种尺寸（small, medium, large）的数字输入框。高度分别对应 24px、32px、40px。

```jsx
import { InputNumber } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class InputNumber extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<div style="display: flex, gap: 48px">
  <kd-input-number label='Label' placeholder='small' size='small' />
  <kd-input-number label='Label' placeholder='medium' />
  <kd-input-number label='Label' placeholder='Large' size='large'/>
</div>`,
  },
];

export default () => <InputNumber.Size codeInfo={codeInfo} label="Label" />;
```

## API

| 属性           | 说明                                                                               | 类型    | 默认值   | 版本  |
| -------------- | ---------------------------------------------------------------------------------- | ------- | -------- | ----- |
| label          | 标题                                                                               |         | -        | 1.0.0 |
| name           | 数据提交标识                                                                       | string  | -        | 1.0.0 |
| disabled       | 设置输入框禁用状态                                                                 | boolean | FALSE    | 1.0.0 |
| read-only      | 设置输入框只读状态                                                                 | boolean | FALSE    | 1.0.0 |
| required       | 设置是否必录                                                                       | boolean | FALSE    | 1.0.0 |
| show-clear     | 是否展示清除按钮                                                                   | boolean | FALSE    | 1.0.0 |
| value          | 输入框的值                                                                         |         | -        | 1.0.0 |
| placeholder    | 输入框为空时的提示语                                                               |         | -        | 1.0.0 |
| auto-complete  | 自动填充，可选值包括 off、on                                                       |         | off      | 1.0.0 |
| size           | 输入框的尺寸，可选值包括 large、medium、small                                      |         | medium   | 1.0.0 |
| state          | 反馈状态，可选值包括 error、success                                                |         | -        | 1.0.0 |
| message        | 反馈提示语，设置 state 时显示                                                      |         | -        | 1.0.0 |
| label-position | 标题位置，可选值包括 vertical、inline、hidden                                      |         | vertical | 1.0.0 |
| variant        | 输入框的视觉样式变体，可选值包括 underlined、outlined、borderless                  |         | outlined | 1.0.0 |
| min            | 允许输入的最小值                                                                   |         | -        | 1.0.0 |
| max            | 允许输入的最大值                                                                   |         | -        | 1.0.0 |
| precision      | 数值精度（小数点位数），0 表示仅允许输入整数                                       |         | 0        | 1.0.0 |
| show-stepper   | 是否显示步进器                                                                     |         | FALSE    | 1.0.0 |
| stepper-style  | 步进器样式，可选值包括 stepper、counter；设置为 counter 时 variant 始终为 outlined |         | stepper  | 1.0.0 |
| step           | 步进器增减的步长值                                                                 |         | 1        | 1.0.0 |
| onfocus        | 获取焦点时触发                                                                     |         | -        | 1.0.0 |
| onblur         | 失去焦点时触发                                                                     |         | -        | 1.0.0 |
| onchange       | 值改变时触发                                                                       |         | -        | 1.0.0 |

## 设计变量

设计变量与 input 一致。
