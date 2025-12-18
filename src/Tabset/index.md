---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 标签页 Tabset # 组件的标题，会在菜单侧边栏展示
group:
  title: 基础
---

# 标签页 Tabset

将内容组织同一视图中，一次可查看一个视图内容。查看其他内容可切换选项卡查看。

## 基本用法

最简单的使用。

```jsx
import { Tabset } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-tabset>
    <kd-tab label="标签1" value='1'>Tab 1 Content</kd-tab>
    <kd-tab label="标签2" value='2'>Tab 2 Content</kd-tab>
    <kd-tab label="标签3" value='3'>Tab 3 Content</kd-tab>
  </kd-tabset>
</template>`,
  },
];

export default () => <Tabset.Default codeInfo={codeInfo} />;
```

## 带图标的页签

通过配置 icon-name, 可以给页签加 icon。

```jsx
import { Tabset } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-tabset>
    <kd-tab label="标签1" value='1' icon-name='kdfont-riqixuanze'>Tab 1 Content</kd-tab>
    <kd-tab label="标签2" value='2' icon-name='kdfont-xiudingshijian'>Tab 2 Content</kd-tab>
    <kd-tab label="标签3" value='3' icon-name='kdfont-shezhixuanzhong'>Tab 3 Content</kd-tab>
  </kd-tabset>
</template>`,
  },
];

export default () => <Tabset.WithIcon codeInfo={codeInfo} />;
```

## 受控模式

通过 active-tab-value 开启受控模式。

```jsx
import { Tabset } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement, track } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {
  @track activeTabValue = '1';

  handleTabChange(event) {
    this.activeTabValue = event.detail.value;
  }
}`,
  },
  {
    language: 'html',
    content: `<template>
  <div>当前选中的tab index: {activeTabValue}</div> 
  <kd-tabset active-tab-value={activeTabValue} ontabchange={handleTabChange}>
    <kd-tab label="标签1" value='1' >Tab 1 Content</kd-tab>
    <kd-tab label="标签2" value='2' >Tab 2 Content</kd-tab>
    <kd-tab label="标签3" value='3' >Tab 3 Content</kd-tab>
  </kd-tabset>
</template>`,
  },
];

export default () => <Tabset.Controlled codeInfo={codeInfo} />;
```

## 嵌套使用

组件可以嵌套使用。

```jsx
import { Tabset } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-tabset>
    <kd-tab label="标签1" value='1' >
      <div style='padding: 20px'>
        <kd-tabset>
          <kd-tab label="标签1" value='4' >Tab 1 Content</kd-tab>
          <kd-tab label="标签2" value='5' >Tab 2 Content</kd-tab>
          <kd-tab label="标签3" value='6' >Tab 3 Content</kd-tab>
        </kd-tabset>
      </div> 
    </kd-tab>
    <kd-tab label="标签2" value='2' >Tab 2 Content</kd-tab>
  </kd-tabset>
</template>
`,
  },
];

export default () => <Tabset.Nesting codeInfo={codeInfo} />;
```

## 不同尺寸

使用 size 属性设置不同尺寸的页签。

```jsx
import { Tabset } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: `<template></template>`,
  },
];

export default () => <Tabset.Size codeInfo={codeInfo} />;
```

## 滚动

支持通过滚轮进行滚动操作。

```jsx
import { Tabset } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {}`,
  },
  {
    language: 'html',
    content: ``,
  },
];

export default () => <Tabset.Scroll codeInfo={codeInfo} />;
```
