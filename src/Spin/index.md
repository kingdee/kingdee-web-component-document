---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: Spin 加载中 # 组件的标题，会在菜单侧边栏展示
group:
  title: 基础
---

用于页面和区块的加载中状态。

## 基本用法

加载中状态的基本用法

```jsx
import { Spin } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Spin extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<kd-spin loading></kd-spin>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Spin.Default codeInfo={codeInfo} />;
```

## 不同尺寸

加载中状态的不同尺寸，可选值为 large、medium、small

```jsx
import { Spin } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Spin extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<div class="spin-demo-container"><div class="spin-demo-item"><h4>Large</h4>
  <kd-spin loading size="large"></kd-spin></div>
  <div class="spin-demo-item"><h4>Medium (默认)</h4>
  <kd-spin loading loading></kd-spin></div>
  <div class="spin-demo-item"><h4>Small</h4>
  <kd-spin loading size="small" loading></kd-spin></div></div>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Spin.Size codeInfo={codeInfo} />;
```

## 带文字描述

加载中状态的文字描述

```jsx
import { Spin } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Spin extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<div class="spin-demo-container"><kd-spin alternative-text="加载中..."></kd-spin>
  <kd-spin size="large" alternative-text="正在加载数据..." loading></kd-spin>
  <kd-spin size="small" alternative-text="加载中" loading></kd-spin></div>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Spin.WithText codeInfo={codeInfo} />;
```

## 加载状态控制

控制加载中状态的显示和隐藏

```jsx
import { Spin } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Spin extends KingdeeElement {
  loading1 = true;
  loading2 = false;
}`,
  },
  {
    language: 'html',
    content: `<div class="spin-demo-container"><div class="spin-demo-item">
  <h4>加载中状态</h4>
  <kd-spin loading={loading1} alternative-text="加载中"></kd-spin>
</div>
<div class="spin-demo-item">
  <h4>非加载中状态</h4>
  <kd-spin loading={loading2} alternative-text="未加载"></kd-spin>
</div></div>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Spin.LoadingControl codeInfo={codeInfo} />;
```

## 延迟加载

延迟显示加载效果，防止闪烁

```jsx
import { Spin } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Spin extends KingdeeElement {
  loading = true;
  handleClick = () => {
    this.loading = !this.loading;
  }
}`,
  },
  {
    language: 'html',
    content: `<div>
  <h4>延迟 3 秒显示加载效果</h4>
  <kd-button label="切换loading状态" onclick={handleClick}></kd-button>
  <kd-spin delay="3000" alternative-text="延迟加载中..." loading></kd-spin>
</div>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Spin.WithDelay codeInfo={codeInfo} />;
```

## 自定义加载图标

自定义加载图标

```jsx
import { Spin } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Spin extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<div>
      <h4>自定义加载图标</h4>
      <kd-spin {...props} loading indicator="kdfont-jiazai"></kd-spin>
    </div>`,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <Spin.CustomIndicator codeInfo={codeInfo} />;
```

## API

| 属性             | 说明                                | 类型          | 默认值 | 版本  |
| ---------------- | ----------------------------------- | ------------- | ------ | ----- |
| alternative-text | 描述文案                            | string        | -      | 1.0.0 |
| size             | 大小，可选值为 large、medium、small | string        | medium | 1.0.0 |
| indicator        | 自定义加载图标                      | string        | -      | 1.0.0 |
| delay            | 延迟显示加载效果的时间（防止闪烁）  | number (毫秒) | 200    | 1.0.0 |
| loading          | 是否为加载中状态                    | boolean       | true   | 1.0.0 |

## 设计变量

| 类别       | Token名称                                | 说明             | 默认值                                   |
| ---------- | ---------------------------------------- | ---------------- | ---------------------------------------- |
| sizing     | --kdds-c-spin-loading-icon-sizing        | 加载图标尺寸     | var(--kdds-g-icon-sizing-9,3rem)         |
| sizing     | --kdds-c-spin-loading-icon-sizing-large  | 大号加载图标尺寸 | 4.25rem                                  |
| sizing     | --kdds-c-spin-loading-icon-sizing-small  | 小号加载图标尺寸 | var(--kdds-g-icon-sizing-6,1.75rem)      |
| spacing    | --kdds-c-spin-loading-icon-margin-bottom | 加载图标下外边距 | var(--kdds-g-spacing-4;0.5rem)           |
| color      | --kdds-c-spin-loading-icon-color         | 加载图标颜色     | var(--kdds-g-color-accent-1;#5582F3)     |
| typography | --kdds-c-spin-text-font-size             | 文字大小         | var(--kdds-g-font-scale-3,0.875rem)      |
| typography | --kdds-c-spin-text-color                 | 文字颜色         | var(--kdds-g-color-on-surface-4,#212121) |
| typography | --kdds-c-spin-text-line-height           | 文字行高         | var(--kdds-g-font-lineheight-5,1.571)    |
| typography | --kdds-c-spin-text-font-weight           | 字重             | var(--kdds-g-font-weight-4,400)          |