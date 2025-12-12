---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: 表格 Table # 组件的标题，会在菜单侧边栏展示
group:
  title: 数据展示
---

# 表格

用于数据收集展示、分析整理、操作处理。

## 基本用法

最基础的用法。

```jsx
import { DataTable } from 'kwc';
import { data, columns } from './data.js';
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BasicDatatable extends KingdeeElement {
  this.data = ${JSON.stringify(data, null, 2)};
  this.columns = ${JSON.stringify(columns, null, 2)};
}`,
  },
  {
    language: 'html',
    content: `<template>
    <kd-datatable key-field='id' data={data} columns={columns}></kd-datatable>
</template>`,
  },
];

export default () => (
  <DataTable codeInfo={codeInfo} columns={columns} data={data} />
);
```

## 单选模式

通过配置`max-row-selection`来实现单选模式，当该值为`1`时为单选模式。

```jsx
import { DataTable } from 'kwc';
import { data, columns } from './data.js';
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BasicDatatable extends KingdeeElement {
  this.data = ${JSON.stringify(data, null, 2)};
  this.columns = ${JSON.stringify(columns, null, 2)};
}`,
  },
  {
    language: 'html',
    content: `<template>
    <kd-datatable
      key-field='id'
      data={data}
      columns={columns}
      max-row-selection={1}>
    </kd-datatable>
</template>`,
  },
];

export default () => (
  <DataTable
    codeInfo={codeInfo}
    columns={columns}
    data={data}
    max-row-selection={1}
  />
);
```

## 展开行

当内容过长，可以通过`expandable`设置展开行。

```jsx
import { DataTable } from 'kwc';
import { data, columns } from './data.js';
import { useEffect, useRef } from 'react';
// import expandRow from './expandRowTemplate.html'
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BasicDatatable extends KingdeeElement {
  this.data = ${JSON.stringify(data, null, 2)};
  this.columns = ${JSON.stringify(columns, null, 2)};
  this.expandable = {
  
  }
}`,
  },
  {
    language: 'html',
    content: `<template>
    <kd-datatable
      key-field='id'
      data={data}
      columns={columns}
      expandable={expandable}>
    </kd-datatable>
</template>`,
  },
];
const expandable = {};

export default () => {
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref);
  }, []);
  return (
    <div ref={ref}>
      <DataTable
        codeInfo={codeInfo}
        columns={columns}
        data={data}
        expandable={expandable}
      />
    </div>
  );
};
```

## API

| 属性                     | 说明                                             | 类型      | 默认值   |
|------------------------|---------------------------------------------------|---------|-------|
| columns                | 用于定义数据类型的列对象数组。必须包含 `label`、`fieldName` 和 `type`。 | array   | -     |
| data                   | 要显示的数组数据。                                         | array   | -     |
| hide-checkbox-column   | 隐藏行选择的复选框或单选框列。                                   | boolean | `false` |
| loading                | 显示加载动画                                            | boolean | `false` |
| key-field              | 用于关联每行唯一标识的字段，区分大小写，必须与数据数组中的值匹配。                 | string  | -     |
| max-row-selection      | 最大可选行数，值为正整数。默认为复选框选择，值为`1`时为单选。                  | number  | -     |
| selected-rows          | 通过`key-field`值列表实现程序化行选择。                         | array   | -     |
| show-row-number-column | 设置是否在第一列显示行号。                                     | boolean | `false` |

