---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: Table 表格 # 组件的标题，会在菜单侧边栏展示
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
  data = ${JSON.stringify(data, null, 2)};
  columns = ${JSON.stringify(columns, null, 2)};
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
  data = ${JSON.stringify(data, null, 2)};
  columns = ${JSON.stringify(columns, null, 2)};
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

当内容过长，可以通过`expandable`设置展开行。自定义渲染模版中可以通过`rowData`对象拿到当前行的值。

```jsx
import { DataTable } from 'kwc';
import { data, columns } from './data.js';
import { useLayoutEffect, useRef } from 'react';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';
import customRowTemplate from './customRowTemplate.html'

export default class BasicDatatable extends KingdeeElement {
  data = ${JSON.stringify(data, null, 2)};
  columns = ${JSON.stringify(columns, null, 2)};
  expandable = {
    defaultExpandedRowKeys: [0],
    expandRowTemplate: customRowTemplate
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
  {
    language: 'html',
    tabName: 'customRowTemplate.html',
    content: `<template>This is No.{rowData.key} description.</template>`,
  },
];
const expandable = {
  defaultExpandedRowKeys: [0],
};

export default () => {
  const tableRef = useRef(null);

  useLayoutEffect(() => {
    if (!tableRef.current) return;
    const tbodyDom = tableRef.current
      .querySelector('table')
      .querySelector?.('tbody');
    // 插入 <p> 标签的方法
    const insertspan = (expandTr) => {
      const td = expandTr.querySelector('td');
      const index = expandTr.getAttribute('data-expand-row-key-value');
      if (!td) return;

      const customRow = td.querySelector('kd-primitive-custom-row');
      if (!customRow) return;

      // 避免重复插入
      if (customRow.querySelector('.my-inserted-span')) return;

      const span = document.createElement('span');
      span.textContent = `This is No.${Number(index + 1)} description.`;
      span.style.cssText = `;padding-left: 5px;`

      customRow.appendChild(span);
    };

    // MutationObserver 回调
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          // // 是否为动态插入的展开行
          if (node.matches('tr.kdds-table-expand-container')) {
            insertspan(node);
          }

          // 如果是批量插入，也可能在子节点中
          const expandTrs = node.querySelectorAll?.(
            'tr.kdds-table-expand-container',
          );
          expandTrs?.forEach((tr) => insertspan(tr));
        });
      });
    });

    // 监听 table 全部子树
    observer?.observe(tbodyDom, {
      childList: true,
      subtree: true,
    });

    return () => observer?.disconnect();
  }, []);
  return (
    <div ref={tableRef}>
      <DataTable
        codeInfo={codeInfo}
        columns={columns}
        data={data}
        expandable={expandable}
        hideCheckboxColumn={true}
      />
    </div>
  );
};
```

## 嵌套子表格

嵌套子表格的例子，点击展开按钮可以在展开区域展示子表格。

```jsx
import { DataTable } from 'kwc';
import { data, columns } from './data.js';
import { useLayoutEffect, useRef, useEffect } from 'react';

const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';
import customRowTemplate from './customRowTemplate.html'

export default class BasicDatatable extends KingdeeElement {
  data = ${JSON.stringify(data, null, 2)};
  columns = ${JSON.stringify(columns, null, 2)};
  expandable = {
    defaultExpandedRowKeys: [0],
    expandRowTemplate: customRowTemplate,
    expandRowExtraParams: {
      data: data,
      columns: columns
   }
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
  {
    language: 'html',
    tabName: 'customRowTemplate.html',
    content: `<template>
    <kd-datatable
      key-field="id" 
      data={expandRowExtraParams.data} 
      columns={expandRowExtraParams.columns}>
    </kd-datatable>
</template>`,
  },
];
const expandable = {
  defaultExpandedRowKeys: [0],
};

export default () => {
  const tableRef = useRef(null);
  const childTableRef = useRef(null);

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    if (!tableRef.current) return;
    const tbodyDom = tableRef.current
      .querySelector('table')
      .querySelector?.('tbody');
    const insertTable = (expandTr) => {
      const td = expandTr.querySelector('td');
      if (!td) return;

      const customRow = td.querySelector('kd-primitive-custom-row');
      if (!customRow) return;

      // 避免重复插入
      if (customRow.querySelector('.my-inserted-span')) return;
      const tableDom = childTableRef.current.cloneNode(true);
      tableDom['data'] = data;
      tableDom['columns'] = columns.map((m) => ({
        ...m,
        initialWidth: m?.initialWidth + 4,
      }));
      tableDom.style.cssText += ';display: block;';
      customRow.appendChild(tableDom);
    };

    // MutationObserver 回调
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          // // 是否为动态插入的展开行
          if (node.matches('tr.kdds-table-expand-container')) {
            insertTable(node);
          }

          // 如果是批量插入，也可能在子节点中
          const expandTrs = node.querySelectorAll?.(
            'tr.kdds-table-expand-container',
          );

          expandTrs?.forEach((tr) => insertTable(tr));
        });
      });
    });

    // 监听 table 全部子树
    observer?.observe(tbodyDom, {
      childList: true,
      subtree: true,
    });

    return () => observer?.disconnect();
  }, []);
  return (
    <>
      <div ref={tableRef}>
        <DataTable
          codeInfo={codeInfo}
          columns={columns}
          data={data}
          expandable={expandable}
          hideCheckboxColumn={true}
        />
      </div>
      <kdcq-datatable
        ref={childTableRef}
        columns={columns}
        key-field="id"
        style={{ display: 'none' }}
        hide-checkbox-column={true}
      ></kdcq-datatable>
    </>
  );
};
```

## 框选

框选。

```jsx
import { DataTable } from 'kwc';
import { data, columns } from './data.js';
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BasicDatatable extends KingdeeElement {
  data = ${JSON.stringify(data, null, 2)};
  columns = ${JSON.stringify(columns, null, 2)};
  rangeSelection = {
    rangeSelectedChange: this.rangeSelectedChange
  }

  rangeSelectedChange (args) {
    console.log('rangeSelectedChange', args);
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
      range-selection={rangeSelection}>
    </kd-datatable>
</template>`,
  },
];

const rangeSelectedChange = (args) => {
  console.log('rangeSelectedChange', args);
};
const rangeSelection = {
  rangeSelectedChange: rangeSelectedChange,
};

export default () => (
  <DataTable
    codeInfo={codeInfo}
    columns={columns}
    data={data}
    rangeSelection={rangeSelection}
  />
);
```

## 表格属性

在这里，你可以方便的打开或关闭表格的属性，来看一下吧。

```jsx
import { DataTable } from 'kwc';
import { data, columns } from './data.js';
import { useState, useRef, useEffect } from 'react';
const codeInfo = [
  {
    language: 'javascript',
    content: `import { KingdeeElement } from '@kdcloudjs/kwc';

export default class BasicDatatable extends KingdeeElement {
  noDataSwitch = false;
  loadingSwitch = false;
  checkboxSwitch = true;
  rowNumberSwitch = false;

  toggleNoDataSwitch() {
    this.noDataSwitch = !this.noDataSwitch;
  }

  toggleLoadingSwitch() {
    this.loadingSwitch = !this.loadingSwitch;
  }

  toggleCheckBoxSwitch() {
    this.checkboxSwitch = !this.checkboxSwitch;
  }

  toggleRowNumberSwitch() {
    this.rowNumberSwitch = !this.rowNumberSwitch;
  }

  get getCheckboxSwitched() {
    return !this.checkboxSwitch;
  }

  get tableData() {
    return this.noDataSwitch ? [] : this.data;
  }

  data = ${JSON.stringify(data, null, 2)};
  columns = ${JSON.stringify(columns, null, 2)};
}`,
  },
  {
    language: 'html',
    content: ` <div class="kwc-common-container">
    <kd-switch checked={noDataSwitch} label="No Data" onclick={toggleNoDataSwitch}></kd-switch>
    <kd-switch checked={loadingSwitch} label="Loading" onclick={toggleLoadingSwitch}></kd-switch>
    <kd-switch checked={checkboxSwitch} label="Checkbox" onclick={toggleCheckBoxSwitch}></kd-switch>
    <kd-switch checked={rowNumberSwitch} label="Row Number" onclick={toggleRowNumberSwitch}></kd-switch>
  </div>
  <kd-datatable
    key-field="id"
    data={tableData}
    columns={columns}
    loading={loadingSwitch}
    show-row-number-column={rowNumberSwitch}
    hide-checkbox-column={getCheckboxSwitched}
  ></kd-datatable>`,
  },
  {
    language: 'css',
    content: `.kwc-common-container {
  display: flex;
  gap: 48px;
  margin-bottom: 20px;
}
`
  }
];

export default () => {
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(true);
  const [rownumber, setRowNumber] = useState(false);
  const noDataRef = useRef(null);
  const loadingRef = useRef(null);
  const checkboxRef = useRef(null);
  const rowNumberRef = useRef(null);

  const handleClick = (e) => {
    const switchType = e?.target.getAttribute('data-switch-type');
    switch (switchType) {
      case 'nodata':
        setNoData(e?.detail.checked);
        break;
      case 'loading':
        setLoading(e?.detail.checked);
        break;
      case 'checkbox':
        setCheckbox(e?.detail.checked);
        break;
      case 'rownumber':
        setRowNumber(e?.detail.checked);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const noDataEle = noDataRef.current;
    const loadingEle = loadingRef.current;
    const checkboxEle = checkboxRef.current;
    const rowNumberEle = rowNumberRef.current;
    const domList = [noDataEle, loadingEle, checkboxEle, rowNumberEle];
    domList.forEach((dom) => {
      dom?.addEventListener('click', handleClick);
    });
    return () => {
      domList.forEach((dom) => {
        dom?.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <>
      <div className="kwcdoc-common-container" style={{ marginBottom: '20px' }}>
        <kdcq-switch
          data-switch-type="nodata"
          ref={noDataRef}
          label="No Data"
          checked={noData}
        />
        <kdcq-switch
          data-switch-type="loading"
          ref={loadingRef}
          label="Loading"
          checked={loading}
        />
        <kdcq-switch
          data-switch-type="checkbox"
          ref={checkboxRef}
          label="Checkbox"
          checked={checkbox}
        />
        <kdcq-switch
          data-switch-type="rownumber"
          ref={rowNumberRef}
          label="Row Number"
          checked={rownumber}
        />
      </div>
      <div>
        <DataTable
          codeInfo={codeInfo}
          columns={columns}
          data={noData ? [] : data}
          loading={loading}
          hideCheckboxColumn={!checkbox}
          showRowNumberColumn={rownumber}
        />
      </div>
    </>
  );
};
```

## API

**Table**

| 属性                   | 说明                                                                    | 类型    | 默认值  |
| ---------------------- | ----------------------------------------------------------------------- | ------- | ------- |
| columns                | 用于定义数据类型的列对象数组。必须包含 `label`、`fieldName` 和 `type`。 | array   | -       |
| data                   | 要显示的数组数据。                                                      | array   | -       |
| hide-checkbox-column   | 隐藏行选择的复选框或单选框列。                                          | boolean | `false` |
| loading                | 显示加载动画                                                            | boolean | `false` |
| key-field              | 用于关联每行唯一标识的字段，区分大小写，必须与数据数组中的值匹配。      | string  | -       |
| max-row-selection      | 最大可选行数，值为正整数。默认为复选框选择，值为`1`时为单选。           | number  | -       |
| selected-rows          | 通过`key-field`值列表实现程序化行选择。                                 | array   | -       |
| show-row-number-column | 设置是否在第一列显示行号。                                              | boolean | `false` |

**Columns**

| 属性           | 说明                                                                                                                                                                     | 类型    | 默认值  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------- |
| label          | 必填。列字段标题                                                                                                                                                         | string  | -       |
| fieldName      | 必填。将列属性绑定到相关数据的名称。每个列属性必须与数据数组中的某个项目相对应。                                                                                         | string  | -       |
| type           | 必填。数据类型。                                                                                                                                                         | string  | `text`  |
| cellAttributes | 使用 alignment 设置列对齐方式（right，center，left）， class 属性提供额外的自定义，除了 icon\*属性（例如用于向单元格添加图标）。有关更多信息，请参阅向列数据中添加图标。 | object  | -       |
| fixedWidth     | 指定列的像素宽度并使列不可调整大小。如果同时提供了 fixedWidth 和 initialWidth 的值，则忽略 initialWidth。                                                                | number  | -       |
| hideLabel      | 指定是否隐藏列上的标签。                                                                                                                                                 | boolean | `false` |
| initialWidth   | 初始化时列的宽度，必须在 min-column-width 和 max-column-width 值之间，或者在没有提供的情况下，在 50px 和 1000px 之间。                                                   | number  | -       |

**Expandable**

| 属性                   | 说明                   | 类型     | 默认值  |
| ---------------------- | ---------------------- | -------- | ------- |
| defaultExpandAllRows   | 默认展开所有行         | boolean  | `false` |
| defaultExpandedRowKeys | 默认展开行             | array    | -       |
| expandedRowClassName   | 配置行展开样式         | srting   | -       |
| onExpand               | 行展开回调函数         | function | -       |
| expandRowTemplate      | 自定义行展开渲染模板   | html     | -       |
| expandRowExtraParams   | 传递给行展开模板的参数 | object   | -       |

**RangeSelection**

| 属性                | 说明         | 类型     | 默认值 |
| ------------------- | ------------ | -------- | ------ |
| rangeSelectedChange | 框选回调函数 | function | -      |

## 设计变量

| 类别       | Token 名称                                      | 说明                     | 默认值                                   |
| ---------- | ----------------------------------------------- | ------------------------ | ---------------------------------------- |
| color      | --kdds-c-datatable-background                   | 表格整体背景色           | var(--kdds-g-color-surface-container-1)  |
| color      | --kdds-c-datatable-header-background            | 表头背景色               | var(--kdds-g-color-surface-container-3)  |
| color      | --kdds-c-datatable-cell-background              | 单元格背景色             | var(--kdds-g-color-surface-container-1)  |
| color      | --kdds-c-datatable-row-background-hover         | 行悬停状态背景色         | var(--kdds-g-color-surface-container-2)  |
| color      | --kdds-c-datatable-row-background-active        | 行选中状态背景色         | var(--kdds-g-color-accent-5)             |
| color      | --kdds-c-datatable-cell-edit-background-hover   | 可编辑单元格背景色       | var(--kdds-g-color-surface-container-1)  |
| color      | --kdds-c-datatable-expand-row-background        | 表格行展开背景色         | var(--kdds-g-color-neutral-base-92)      |
| color      | --kdds-c-datatable-icon-color-default           | 图标默认色               | var(--kdds-g-color-on-surface-3,#666666) |
| color      | --kdds-c-datatable-icon-color-hove              | 图标悬停色               | var(--kdds-g-color-accent-1,#5582F3)     |
| color      | --kdds-c-datatable-range-selection-background   | 表格框选背景色           | var(--kdds-g-color-info-base-95,#F2F9FF) |
| spacing    | --kdds-c-datatable-grid-padding-left            | 单元格内容左边距         | var(--kdds-g-spacing-2)                  |
| spacing    | --kdds-c-datatable-grid-padding-right           | 单元格内容右边距         | var(--kdds-g-spacing-2)                  |
| spacing    | --kdds-c-datatable-column-header-padding-left   | 表头内容左边距           | var(--kdds-g-spacing-5)                  |
| spacing    | --kdds-c-datatable-column-header-padding-right  | 表头内容右边距           | var(--kdds-g-spacing-5)                  |
| spacing    | --kdds-c-datatable-cell-padding                 | 单元格边距               | var(--kdds-g-spacing-2)                  |
| spacing    | --kdds-c-datatable-default-text-margin-vertical | 缺省文案上下外边距       | 0.875rem                                 |
| border     | --kdds-c-datatable-cell-border-width            | 单元格边框大小           | var(--kdds-g-sizing-border-1)            |
| color      | --kdds-c-datatable-cell-border                  | 单元格边框颜色           | var(--kdds-g-color-border-2)             |
| color      | --kdds-c-datatable-cell-border-focus            | 单元格聚焦边框色         | var(--kdds-g-color-accent-1)             |
| color      | --kdds-c-datatable-cell-edit-border             | 可编辑单元格默认边框色   | var(--kdds-g-color-border-2)             |
| color      | --kdds-c-datatable-cell-edit-border-hover       | 可编辑单元格悬停后边框色 | var(--kdds-g-color-border-accent-1)      |
| border     | --kdds-c-datatable-cell-edit-border-radius      | 可编辑单元格边框圆角     | var(--kdds-g-radius-border-1)            |
| border     | --kdds-c-datatable-cell-edit-border-width       | 可编辑单元格边框宽度     | var(--kdds-g-sizing-border-1)            |
| sizing     | --kdds-c-datatable-header-line-height           | 表头高度                 | 1.75rem                                  |
| sizing     | --kdds-c-datatable-drag-handle-width            | 列宽拖拽的热区宽度       | var(--kdds-g-icon-sizing-1,0.5rem)       |
| typography | --kdds-c-datatable-cell-color                   | 单元格文字颜色           | var(--kdds-g-color-on-surface-4)         |
| typography | --kdds-c-datatable-default-text-color           | 缺省文案颜色             | var(--kdds-g-color-on-surface-3,#666666) |
| shadow     | --kdds-c-datatable-fixed-shadow                 | 固定列投影               | color gradient (#000,100%～#000,15%)     |
| opacity    | --kdds-c-datatable-mask                         | 加载蒙层                 | rgba(255,255,255,0.65)                   |
