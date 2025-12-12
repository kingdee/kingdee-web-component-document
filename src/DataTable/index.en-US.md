---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: Button # 组件的标题，会在菜单侧边栏展示
group:
  title: basis
---
# Button

A button is a component used to trigger a specific operation.

## Basic Usage
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
    content: '<kd-button label="Button"></kd-button>',
  },
  {
    language: 'css',
    content: 'body { color: red; }',
  },
];

export default () => <Button codeInfo={codeInfo} label="Button" />;
```
## API
