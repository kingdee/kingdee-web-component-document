---
toc: content # 导航在内容区才显示，在左侧导航栏不显示
title: Table Sl表格 # 组件的标题，会在菜单侧边栏展示
order: 1
group:
  order: 3
  title: 数据展示
---

# 表格

用于数据收集展示、分析整理、操作处理。

## 使用场景

- 当有大量的结构化的数据需要展现或对比时
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时

## 基本用法

指定表格的数据源`dataSource`和列的定义`columns`，二者均为一个数组。并且指定`rowKey`用于表格行`key`的取值字段。

```jsx
import React from 'react';
import { SlTable } from '@kdcloudjs/shoelace/dist/react';

export default () => {
  const style = {
    width: '70%',
    margin: '0 auto',
    padding: '20px',
  };
  const dataSource = [
    {
      id: '1',
      No: 1,
      order: 'AP-202009-00001',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '26,800.00',
      balance: '5,200.00',
    },
    {
      id: '2',
      No: 2,
      order: 'AP-202009-00001',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '236,800.00',
      balance: '1,500.00',
    },
    {
      id: '3',
      No: 3,
      order: 'AP-202009-00002',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '246,800.00',
      balance: '5,300.00',
    },
    {
      id: '4',
      No: 4,
      order: 'AP-202009-00003',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '216,800.00',
      balance: '5,400.00',
    },
    {
      id: '5',
      No: 5,
      order: 'AP-202009-00004',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '236,800.00',
      balance: '1,500.00',
    },
  ];
  const columns = [
    {
      dataIndex: 'No',
      title: '序号',
      width: 60,
      align: 'center',
    },
    {
      dataIndex: 'order',
      title: '单据号',
      width: 200,
    },
    {
      dataIndex: 'from',
      title: '来户',
      width: 200,
    },
    {
      dataIndex: 'to',
      title: '往户',
      width: 200,
    },
    {
      dataIndex: 'amount',
      title: '应付金额',
      align: 'right',
    },
    {
      dataIndex: 'balance',
      title: '应收余额',
      align: 'right',
    },
  ];
  return (
    <div style={style}>
      <SlTable rowKey="id" columns={columns} dataSource={dataSource}></SlTable>
    </div>
  );
};
```

## 带边框

添加表格边框线。

```jsx
import React from 'react';
import { SlTable } from '@kdcloudjs/shoelace/dist/react';

export default () => {
  const style = {
    width: '70%',
    margin: '0 auto',
    padding: '20px',
  };
  const dataSource = [
    {
      id: '1',
      No: 1,
      order: 'AP-202009-00001',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '26,800.00',
      balance: '5,200.00',
    },
    {
      id: '2',
      No: 2,
      order: 'AP-202009-00001',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '236,800.00',
      balance: '1,500.00',
    },
    {
      id: '3',
      No: 3,
      order: 'AP-202009-00002',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '246,800.00',
      balance: '5,300.00',
    },
    {
      id: '4',
      No: 4,
      order: 'AP-202009-00003',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '216,800.00',
      balance: '5,400.00',
    },
    {
      id: '5',
      No: 5,
      order: 'AP-202009-00004',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '236,800.00',
      balance: '1,500.00',
    },
  ];
  const columns = [
    {
      dataIndex: 'No',
      title: '序号',
      width: 60,
      align: 'center',
    },
    {
      dataIndex: 'order',
      title: '单据号',
      width: 200,
    },
    {
      dataIndex: 'from',
      title: '来户',
      width: 200,
    },
    {
      dataIndex: 'to',
      title: '往户',
      width: 200,
    },
    {
      dataIndex: 'amount',
      title: '应付金额',
      align: 'right',
    },
    {
      dataIndex: 'balance',
      title: '应收余额',
      align: 'right',
    },
  ];
  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        bordered
        columns={columns}
        dataSource={dataSource}
      ></SlTable>
    </div>
  );
};
```

## 行选择

第一列是联动的选择框，可以通过`rowSelection.type`属性指定选择类型，默认为 checkbox。</br>
详细配置项请参考 [Row Selection](#rowselection)。

```jsx
import React from 'react';
import {
  SlTable,
  SlRadioGroup,
  SlRadioButton,
} from '@kdcloudjs/shoelace/dist/react';

export default () => {
  const style = {
    width: '70%',
    margin: '0 auto',
    padding: '20px',
  };
  const dataSource = [
    {
      id: '1',
      No: 1,
      order: 'AP-202009-00001',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '26,800.00',
      balance: '5,200.00',
    },
    {
      id: '2',
      No: 2,
      order: 'AP-202009-00001',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '236,800.00',
      balance: '1,500.00',
    },
    {
      id: '3',
      No: 3,
      order: 'AP-202009-00002',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '246,800.00',
      balance: '5,300.00',
    },
    {
      id: '4',
      No: 4,
      order: 'AP-202009-00003',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '216,800.00',
      balance: '5,400.00',
    },
    {
      id: '5',
      No: 5,
      order: 'AP-202009-00004',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '236,800.00',
      balance: '1,500.00',
    },
  ];
  const columns = [
    {
      dataIndex: 'No',
      title: '序号',
      width: 60,
      align: 'center',
    },
    {
      dataIndex: 'order',
      title: '单据号',
      width: 200,
    },
    {
      dataIndex: 'from',
      title: '来户',
      width: 200,
    },
    {
      dataIndex: 'to',
      title: '往户',
      width: 200,
    },
    {
      dataIndex: 'amount',
      title: '应付金额',
      align: 'right',
    },
    {
      dataIndex: 'balance',
      title: '应收余额',
      align: 'right',
    },
  ];

  const [rowSelection, setRowSelection] = React.useState({
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `onChange selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    onSelectAll: (selected, selectedRows) => {
      console.log(`select all rows: ${selected}`, selectedRows);
    },
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      console.log(
        `onSelect select row: ${selected}`,
        record,
        selectedRows,
        nativeEvent,
      );
    },
  });

  return (
    <div style={style}>
      <SlRadioGroup value={rowSelection.type} style={{ marginBottom: '20px' }}>
        <SlRadioButton
          value="checkbox"
          onClick={() => setRowSelection({ ...rowSelection, type: 'checkbox' })}
        >
          Checkbox
        </SlRadioButton>
        <SlRadioButton
          value="radio"
          onClick={() => setRowSelection({ ...rowSelection, type: 'radio' })}
        >
          Radio
        </SlRadioButton>
      </SlRadioGroup>
      <SlTable
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      ></SlTable>
    </div>
  );
};
```

## 行展开

当表格内容较多不能一次性完全展示时，可设置行展开来展示。</br>
详细配置项请参考 [ExpandProps](#expandprops)。

```jsx
import React from 'react';
import { SlTable } from '@kdcloudjs/shoelace/dist/react';

export default () => {
  const style = {
    width: '70%',
    margin: '0 auto',
    padding: '20px',
  };
  const dataSource = [
    {
      id: '1',
      No: 1,
      order: 'AP-202009-00001',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '26,800.00',
      balance: '5,200.00',
    },
    {
      id: '2',
      No: 2,
      order: 'AP-202009-00001',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '236,800.00',
      balance: '1,500.00',
    },
    {
      id: '3',
      No: 3,
      order: 'AP-202009-00002',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '246,800.00',
      balance: '5,300.00',
    },
    {
      id: '4',
      No: 4,
      order: 'AP-202009-00003',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '216,800.00',
      balance: '5,400.00',
    },
    {
      id: '5',
      No: 5,
      order: 'AP-202009-00004',
      from: '陕西环宇科技',
      to: '深圳环球科技',
      amount: '236,800.00',
      balance: '1,500.00',
    },
  ];
  const columns = [
    {
      dataIndex: 'No',
      title: '序号',
      width: 60,
      align: 'center',
    },
    {
      dataIndex: 'order',
      title: '单据号',
      width: 200,
    },
    {
      dataIndex: 'from',
      title: '来户',
      width: 200,
    },
    {
      dataIndex: 'to',
      title: '往户',
      width: 200,
    },
    {
      dataIndex: 'amount',
      title: '应付金额',
      align: 'right',
    },
    {
      dataIndex: 'balance',
      title: '应收余额',
      align: 'right',
    },
  ];

  const [expandProps, setExpandProps] = React.useState({
    defaultExpandedRowKeys: ['1', '2'],
    defaultExpandedRowKeys:['1'],
    expendableRowKeys: ['1', '3'],
    rowExpandable: true,
    expandRowByClick: true
  });

  return (
    <div style={style}>
      <SlTable
        rowKey="id"
        expandProps={expandProps}
        columns={columns}
        dataSource={dataSource}
      ></SlTable>
    </div>
  );
};
```

### RowSelection

### ExpandProps
