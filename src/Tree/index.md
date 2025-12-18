---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 树 Tree # 组件的标题，会在菜单侧边栏展示
group:
  title: 基础
---

# 树 Tree

将内容组织同一视图中，一次可查看一个视图内容。查看其他内容可切换选项卡查看。

## 基本用法

对于文件夹、分类目录、组织架构等层级较多的内容，树可以清楚显示他们的层级关系，并具有展开、收起、选择等交互功能。

```jsx
import { Tree } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {
  const items = [
      {
        label: 'CTO',
        name: 'CTO',
        expanded: true,
        items: [
          {
            label: 'Director',
            name: 'CTO-DIR',
            expanded: true,
            items: [
              {
                label: 'Manager 1',
                name: 'CTO-MGR-1',
                expanded: true,
                items: [
                  {
                    label: 'Assistant Manager 1',
                    name: 'CTO-ASM-1',
                    expanded: true,
                    items: [
                      {
                        label: 'Supervisor 1',
                        name: 'CTO-MGR-1-ASM-1-SUP-1',
                        expanded: true,
                        items: [
                          {
                            label: 'Staff 1',
                            name: 'CTO-MGR-1-ASM-1-SUP-1-STA-1',
                            disabled: true,
                          },
                          {
                            label: 'Staff 2',
                            name: 'CTO-MGR-1-ASM-1-SUP-1-STA-2',
                            disabled: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Assistant Manager 2',
                    name: 'CTO-ASM-2',
                    expanded: true,
                    items: [
                      {
                        label: 'Supervisor 1',
                        name: 'CTO-MGR-1-ASM-2-SUP-1',
                        expanded: true,
                        items: [
                          {
                            label: 'Staff 1',
                            name: 'CTO-MGR-1-ASM-2-SUP-1-STA-1',
                          },
                          {
                            label: 'Staff 2',
                            name: 'CTO-MGR-1-ASM-2-SUP-1-STA-2',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Manager 2',
                name: 'CTO-MGR-2',
                expanded: true,
                items: [],
              },
            ],
          },
        ],
      },
      {
        label: 'CFO',
        name: 'CFO',
        expanded: true,
        items: [
          {
            label: 'Director',
            name: 'CFO-DIR',
            expanded: true,
            items: [
              {
                label: 'Manager 1',
                name: 'CFO-MGR-1',
                expanded: true,
                items: [
                  {
                    label: 'Assistant Manager 1',
                    name: 'CFO-ASM-1',
                  },
                ],
              },
              {
                label: 'Manager 2',
                name: 'CFO-MGR-2',
              },
            ],
          },
        ],
      },
    ] 
  }
  `,
  },
  {
    language: 'html',
    content: `<template>
  <kd-tree items={items}></kd-tree>
</template>`,
  },
];

export default () => <Tree.Default codeInfo={codeInfo} />;
```

## 定制节点图标

只需为 TreeNode 指定 iconName 属性的值即可为任意节点指定任意图标。

```jsx
import { Tree } from 'kwc';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class Input extends KingdeeElement {
  const items = [
    {
      label: 'CTO',
      name: 'CTO',
      expanded: true,
      iconName: 'kdfont-shoucang',
      items: [
        {
          label: 'Director',
          name: 'CTO-DIR',
          expanded: true,
          iconName: 'kdfont-shoucang',
          items: [
            {
              label: 'Manager 1',
              name: 'CTO-MGR-1',
              iconName: 'kdfont-shoucang',
            },
            {
              label: 'Manager 2',
              name: 'CTO-MGR-2',
              expanded: true,
              items: [],
            },
          ],
        },
      ],
    },
    {
      label: 'CFO',
      name: 'CFO',
      expanded: true,
      items: [
        {
          label: 'Director',
          name: 'CFO-DIR',
          expanded: true,
          items: [
            {
              label: 'Manager 1',
              name: 'CFO-MGR-1',
              expanded: true,
              items: [
                {
                  label: 'Assistant Manager 1',
                  name: 'CFO-ASM-1',
                },
              ],
            },
            {
              label: 'Manager 2',
              name: 'CFO-MGR-2',
            },
          ],
        },
      ],
    },
  ]
}`,
  },
  {
    language: 'html',
    content: `<template>
  <kd-tree items={items}></kd-tree>
</template>`,
  },
];

export default () => <Tree.Icon codeInfo={codeInfo} />;
```
