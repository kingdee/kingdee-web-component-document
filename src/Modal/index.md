---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: Modal 弹窗 # 组件的标题，会在菜单侧边栏展示
group:
  title: 反馈
---
# 弹窗

在当前页面打开一个浮层，承载相关操作。

## 基本用法

文本信息对话框

```jsx
import { Button, Modal } from 'kwc';
const _Modal = Modal.Default;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc'
    import BodyComponent from 'c/BodyComponent;

export default class BaseModal extends KingdeeElement {
  handleOpenModal() {
    
    Modal.open({
      label: 'Modal',
      bodyComponent: BodyComponent
    });
  }
}

// c/bodyComponent/bodyComponent.js
import { KingdeeElement } from '@kdcloudjs/kwc'

export default class BodyComponent extends KingdeeElement {
}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-button onclick={handleOpenModal}></kd-button>
      </template>

      // c/bodyComponent/bodyComponent.html
      <template>
        <div>Modal Body</div>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Modal codeInfo={codeInfo} />;
```
## 异步关闭

在对话框中使用表单时，如提交表单，点击确定后异步关闭对话框。

```jsx
import { Button, Modal } from 'kwc';
const _Modal = Modal.Async;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc'
    import BodyComponent from 'c/BodyComponent;

export default class BaseModal extends KingdeeElement {
  handleOpenModal() {
    Modal.open({
      label: 'Modal',
      bodyComponent: BodyComponent,
      confirm: () => {
        return new Promise(resolve => setTimeout(resolve, 1000));
      }
    });
  }
}

// c/bodyComponent/bodyComponent.js
import { KingdeeElement } from '@kdcloudjs/kwc'

export default class BodyComponent extends KingdeeElement {
}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-button onclick={handleOpenModal}></kd-button>
      </template>

      // c/bodyComponent/bodyComponent.html
      <template>
        <div>Modal Body</div>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Modal codeInfo={codeInfo} />;
```

## 自定义页头

通过传入 `headerComponent` 来自定义页头。`headerProps` 用于传递页头组件的属性。

```jsx
import { Button, Modal } from 'kwc';
const _Modal = Modal.CustomHeaderSlot;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc'
    import CustomHeader from 'c/CustomHeader;

export default class BaseModal extends KingdeeElement {
  handleOpenModal() {
    Modal.open({
      label: 'Modal',
      headerComponent: CustomHeader,
      headerProps: {
        title: 'My Header',
      }
    });
  }
}

// c/customHeader/customHeader.js
import { KingdeeElement, api } from '@kdcloudjs/kwc'

export default class CustomHeader extends KingdeeElement {
  @api props
  get title() {
    return this.props && this.props.title;
  }
}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-button onclick={handleOpenModal}></kd-button>
      </template>

      // c/customHeader/customHeader.html
      <template>
        <div>{title}</div>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Modal codeInfo={codeInfo} />;
```

## 自定义页体

通过传入 `bodyComponent` 来自定义页体。`bodyProps` 用于传递页体组件的属性。

```jsx
import { Button, Modal } from 'kwc';
const _Modal = Modal.CustomBodySlot;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc'
    import BodyComponent from 'c/BodyComponent;

export default class BaseModal extends KingdeeElement {
  handleOpenModal() {
    
    Modal.open({
      label: 'Modal',
      bodyComponent: BodyComponent,
      bodyProps: {
        message: 'My Body'
      }
    });
  }
}

// c/bodyComponent/bodyComponent.js
import { KingdeeElement, api } from '@kdcloudjs/kwc'

export default class BodyComponent extends KingdeeElement {
  @api props;

  get content() {
    return this.props && this.props.message;
  }
}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-button onclick={handleOpenModal}></kd-button>
      </template>

      // c/bodyComponent/bodyComponent.html
      <template>
        <div>{content}</div>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Modal codeInfo={codeInfo} />;
```

## 自定义页脚

通过传入 `footerComponent` 来自定义页脚。`footerProps` 用于传递页脚组件的属性。

```jsx
import { Button, Modal } from 'kwc';
const _Modal = Modal.CustomFooterSlot;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc'
    import CustomFooter from 'c/CustomFooter;

export default class BaseModal extends KingdeeElement {
  handleOpenModal() {
    
    const modal = Modal.open({
      label: 'Modal',
      footerComponent: CustomFooter,
      footerProps: {
        close: () => modal.close()
      }
    });
  }
}

// c/customFooter/customFooter.js
import { KingdeeElement, api } from '@kdcloudjs/kwc'

export default class CustomFooter extends KingdeeElement {
  @api props;

  get handleClick() {
    this.props && this.props.close();
  }
}`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-button onclick={handleOpenModal}></kd-button>
      </template>

      // c/customFooter/customFooter.html
      <template>
        <div onclick={handleClick}>Click me to close</div>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Modal codeInfo={codeInfo} />;
```

## 自定义标题

`label` 支持传入文字来展示自定义标题。

```jsx
import { Button, Modal } from 'kwc';
const _Modal = Modal.CustomModalTitle;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc'
    import BodyComponent from 'c/BodyComponent;

export default class BaseModal extends KingdeeElement {
  handleOpenModal() {
    
    Modal.open({
      label: 'This is modal title',
    });
  }
}
`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-button onclick={handleOpenModal}></kd-button>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Modal codeInfo={codeInfo} />;
```

## 展示页头关闭按钮

`showCloseButton` 是否展示头部右上角关闭按钮，不展示时，无法通过esc关闭弹窗。

```jsx
import { Button, Modal } from 'kwc';
const _Modal = Modal.ModalCloseButton;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc'
    import BodyComponent from 'c/BodyComponent;

export default class BaseModal extends KingdeeElement {
  handleOpenModal() {
    
    Modal.open({
      label: 'ModalTitle',
      showCloseButton: true
    });
  }
}
`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-button onclick={handleOpenModal}></kd-button>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Modal codeInfo={codeInfo} />;
```

## 拉伸弹窗

`resizeGrip` 是否展示拉伸弹窗的手柄，不展示时，无法通过拉伸弹窗。

```jsx
import { Button, Modal } from 'kwc';
const _Modal = Modal.ResizeModal;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc'
    import BodyComponent from 'c/BodyComponent;

export default class BaseModal extends KingdeeElement {
  handleOpenModal() {
    
    Modal.open({
      label: 'ModalTitle',
      resizeGrip: true
    });
  }
}
`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-button onclick={handleOpenModal}></kd-button>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Modal codeInfo={codeInfo} />;
```

## 自定义宽高

`width` 和 `height` 用于自定义弹窗的宽度和高度。

```jsx
import { Button, Modal } from 'kwc';
const _Modal = Modal.RectModal;
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc'
    import BodyComponent from 'c/BodyComponent;

export default class BaseModal extends KingdeeElement {
  handleOpenModal() {
    
    Modal.open({
      label: 'ModalTitle',
      width: '800px',
      height: '600px',
    });
  }
}
`,
  },
  {
    language: 'html',
    content: `
      <template>
        <kd-button onclick={handleOpenModal}></kd-button>
      </template>
    `,
  },
  {
    language: 'css',
    content: '',
  },
];

export default () => <_Modal codeInfo={codeInfo} />;
```

## API

| 属性            | 说明                                         | 类型    | 默认值   | 版本  |
| --------------- | -------------------------------------------- | ------- | -------- | ----- |
| bodyComponent | 对话框内容区域组件 | | | 1.0.0 |
| bodyProps | 对话框内容区域组件属性 | Object | | 1.0.0 |
| cancel | 底部取消按钮事件 | Function | | 1.0.0 |
| confirm | 底部确认按钮事件 | Function | | 1.0.0 |
| footerComponent | 对话框底部区域组件 | | | 1.0.0 |
| footerProps | 对话框底部区域组件属性 | Object | | 1.0.0 |
| headerComponent | 对话框头部区域组件 | | | 1.0.0 |
| headerProps | 对话框头部区域组件属性 | Object | | 1.0.0 |
| height | 高度 | String | '300px' | 1.0.0 |
| label | 对话框标题 | String | | 1.0.0 |
| resizeGrip | 右下角拖拽调整弹窗尺寸 | boolean | FALSE | 1.0.0 |
| showCloseButton | 是否展示头部右上角关闭按钮，不展示时，无法通过esc关闭弹窗 | boolean | FALSE | 1.0.0 |
| width | 宽度 | String | '416px' | 1.0.0 |


## 设计变量

| 类别    | Token名称                                      | 说明                     | 默认值                                           |
| ------- | ---------------------------------------------- | ------------------------ | ------------------------------------------------ |
| color | --kdds-c-modal-background | 弹出窗背景色 | var(--kdds-g-color-surface-1,#FFFFFF) |
| shadow | --kdds-c-modal-shadow-top | 弹出窗阴影 | var(--kdds-g-shadow-4,#000000，0.1) |
| color | --kdds-c-modal-header-background | 标题区背景色 | transparent |
| color | --kdds-c-modal-footer-background | 操作区背景色 | transparent |
| color | --kdds-c-modal-border | 弹出窗中标题区和操作区分割线颜色 | var(--kdds-g-color-border-2,#D9D9D9) |
| color | --kdds-c-modal-icon-color | 图标默认颜色 | var(--kdds-g-color-on-surface-3,#666666) |
| color | --kdds-c-modal-icon-color-hover | 图标悬停颜色 | var(--kdds-g-color-accent-2,#87A9FF) |
| color | --kdds-c-modal-icon-color-focus | 图标点击颜色 | var(--kdds-g-color-accent-3,#3761CA) |
| color | --kdds-c-modal-mask-background | 蒙层颜色 | var(--kdds-g-opacity-black-30,rgba(0, 0, 0, 0.3)) |
| color | --kdds-c-modal-title-color | 标题颜色 | var(--kdds-g-color-on-surface-4,#212121) |
| typography | --kdds-c-modal-title-font-size | 标题字号 | var(--kdds-g-font-scale-4,1rem) |
| typography | --kdds-c-modal-title-font-weight | 标题字重 | var(--kdds-g-font-weight-6,600) |
| spacing | --kdds-c-modal-body-padding-horizontal | 内容区左右内边距 | var(--kdds-g-spacing-6,1rem) |
| spacing | --kdds-c-modal-header-padding-top | 标题区上侧内边距 | calc(var(--kdds-g-spacing-5) + 1px,0.75rem+1px) |
| spacing | --kdds-c-modal-header-padding-bottom | 标题区下侧内边距 | calc(var(--kdds-g-spacing-5) + 1px,0.75rem+1px) |
| border | --kdds-c-modal-header-border-width | 标题区分割线宽度 | 1px |
| border | --kdds-c-modal-footer-border-width | 操作区分割线宽度 | 1px |
| sizing | --kdds-c-modal-footer-sizing-height | 操作区高度 | 3.125rem |
