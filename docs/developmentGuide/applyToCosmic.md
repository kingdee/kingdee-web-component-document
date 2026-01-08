---
toc: content
title: '应用到苍穹平台'
order: '20'
---

## 组件元数据

### 自定义控件元数据

组件元数据是对组件及组件部署的描述。下面是自定义控件 KWC 框架的组件元数据：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<KingdeeComponentBundle
    xmlns="http://dev.kingdee.com/2025/10/metadata">
    <version></version>
    <name>myComponent</name>
    <masterLabel>${SOLUTION_NAME}</masterLabel>
    <description></description>
    <isv>${ISV_ID}</isv>
    <moduleid>${MODULE_ID}</moduleid>
    <acceptParent>MobFilterPanelAp,MobAdvFilterPanelAp</acceptParent>
    <targets>
        <target>BaseFormModel</target>
        <target>BillFormModel</target>
        <target>DynamicFormModel</target>
        <target>MobileBillFormModel</target>
        <target>MobileFormModel</target>
    </targets>
    <targetConfigs>
        <targetConfig>
          <targets>BaseFormModel,BillFormModel,DynamicFormModel,MobileBillFormModel,MobileFormModel
            </targets>
        </targetConfig>
    </targetConfigs>
</KingdeeComponentBundle>
```

当在 KWC 组件项目根目录下，执行`kd-custom-control-cli deploy`命令上传组件元数据时，会提示输入方案名称、领域标识和开发商标识，命令执行后将会填充相应字段。

#### 顶层结构

```xml
    <KingdeeComponentBundle xmlns="http://dev.kingdee.com/2025/10/metadata">
        <!-- 基础信息 -->
        <version>...</version>
        <name>...</name>
        <masterLabel>...</masterLabel>
        <isv>...</isv>
        <moduleid>...</moduleid>
        <icon>...</icon>

        <!-- 支持的页面/表单类型 -->
        <targets>
            <target>...</target>
            ...
        </targets>

        <!-- 目标配置：定义不同页面类型下的属性列表 -->
        <targetConfigs>
            <targetConfig>
                <targets>...</targets>
                <property ...>...</property>
                ...
            </targetConfig>
            ...
        </targetConfigs>
    </KingdeeComponentBundle>
```

#### 基础信息说明

| 标签名        | 描述                                                | 示例值            | 是否必填 |
| :------------ | :-------------------------------------------------- | :---------------- | :------- |
| `version`     | 组件版本号，更新必填，新增非必填，会默认 1.0 版本号 | `2.0`             | 否       |
| `name`        | 英文唯一标识符                                      | `MyKWCAp`         | 是       |
| `masterLabel` | 显示名称（显示在左侧拖拽区域）                      | `XXXX组件`        | 是       |
| `icon`        | 组件图标，输入金蝶图标库中图标名称                  | `kdfont-标准单据` | 否       |
| `isv`         | 开发商标识                                          | `kingdee`         | 是       |
| `moduleid`    | 领域 ID                                             | `mykwc`           | 是       |

#### 页面类型定义（targets）

组件支持哪些页面类型，可配置多个，至少填入一个

| 页面类型            | 说明                                                |
| :------------------ | :-------------------------------------------------- |
| BaseFormModel       | 基础资料                                            |
| BillFormModel       | 单据页面                                            |
| DynamicFormModel    | 动态表单                                            |
| MobileBillFormModel | 移动单据，会自动包含 BaseFormModel 与 BillFormModel |
| MobileFormModel     | 移动表单                                            |

示例：

```xml
    <targets>
        <target>BaseFormModel</target>
        <target>BillFormModel</target>
        <target>DynamicFormModel</target>
        <target>MobileBillFormModel</target>
        <target>MobileFormModel</target>
    </targets>
```

#### 属性配置区块（targetConfigs）

在 `targetConfigs` 中，可以根据不同页面类型为组件配置不同的属性。每个 `targetConfig` 包含以下：

- `<targets>`：配置适用的页面类型（可以多个，如果存在相同的，会自动合并）
- `<property>`：该页面类型下的具体属性，每个属性需定义名称、类型、显示标题等

##### `<property>` 属性字段说明

**支持的属性类型**

1.  **字符串类型属性 (`String`)**
2.  **整数类型属性 (`Integer`)**
3.  **布尔值属性 (`Boolean`)**
4.  **下拉列表属性 (`Combo`)** —— 包含若干 `<item>` 子项

##### 通用字段（所有类型通用）

| 字段名        | 描述                                                 | 示例值                 | 是否必填 | 适用类型 |
| :------------ | :--------------------------------------------------- | :--------------------- | :------- | :------- |
| `name`        | 属性英文唯一标识符（代码引用），同一页面类型必须唯一 | `StringValue`          | 是       | 所有     |
| `type`        | 属性类型，决定渲染样式和校验规则                     | `String`、`Integer` 等 | 是       | 所有     |
| `caption`     | 属性标题（界面展示名称）                             | `文本类型属性`         | 是       | 所有     |
| `description` | 属性说明（开发或配置时辅助理解）                     | `用于演示文本属性用法` | 是       | 所有     |
| `default`     | 默认值，在未显式设置时生效                           | `默认值`、`true`、`0`  | 否       | 所有     |

##### 文本类型（`String`）

| 字段名   | 描述             | 示例值 | 是否必填 | 适用类型 |
| :------- | :--------------- | :----- | :------- | :------- |
| `length` | 最大输入字符长度 | `25`   | 否       | String   |

##### 整型数值类型（`Integer`）

| 字段名 | 描述   | 示例值 | 是否必填 | 适用类型 |
| :----- | :----- | :----- | :------- | :------- |
| `min`  | 最小值 | `0`    | 否       | Integer  |
| `max`  | 最大值 | `100`  | 否       | Integer  |

##### 布尔类型（`Boolean`）

| 字段名    | 描述                        | 示例值 | 是否必填 | 适用类型 |
| :-------- | :-------------------------- | :----- | :------- | :------- |
| `default` | 默认值（`true` 或 `false`） | `true` | 否       | Boolean  |

##### 下拉枚举类型（`Combo`）

| 字段名    | 描述                                   | 示例值 | 是否必填 | 适用类型 |
| :-------- | :------------------------------------- | :----- | :------- | :------- |
| `default` | 默认项的 `id` 值                       | `1`    | 否       | Combo    |
| `items`   | 枚举子项集合，包含多个 `<item>` 子节点 |        | 是       | Combo    |

###### `<item>` 子项字段

| 字段名 | 描述                             | 是否必填 | 示例值  |
| :----- | :------------------------------- | :------- | :------ |
| `id`   | 枚举项标识，最好是数字或字母组成 | 是       | `1`     |
| `name` | 显示内容（中文）                 | 是       | `选项1` |

#### 示例：针对 BaseFormModel 和 BillFormModel 配置属性

```xml
    <targetConfig>
        <targets>BillFormModel, BaseFormModel</targets>

        <!-- 文本属性 -->
        <property
            name="StringValue"
            type="String"
            caption="文本类型属性"
            description="文本类型属性演示"
            length="25"
            default="默认值"
        />

        <!-- 数字属性 -->
        <property
            name="IntValue"
            type="Integer"
            caption="数值类型属性"
            description="数值类型属性演示"
            min="2"
            max="10"
            default="2"
        />

        <!-- 下拉选择 -->
        <property
            name="ComboValue"
            type="Combo"
            caption="下拉列表类型属性"
            description="下拉列表类型属性演示"
            default="0"
        >
            <items>
                <item id="0" name="默认" />
                <item id="1" name="选项1" />
                <item id="2" name="选项2" />
            </items>
        </property>

        <!-- 布尔属性 -->
        <property
            name="BooleanValue"
            type="Boolean"
            caption="布尔类型属性"
            description="布尔类型属性演示"
            default="true"
        />
    </targetConfig>
```

## 页面布局

自定义控件中，使用页面设计器，暂时不需要页面布局元数据文件。

后续纯 KWC 页面中，支持使用页面布局元数据文件。

## 与后端通信

KWC (Kingdee Web Components) 项目提供的共享工具库，`@kdcloudjs/kwc-shared-utils` ，包含客户端检测、API 请求、OpenAPI 适配器和平台资源加载等功能模块。

要与后端接口进行通信，可使用工具库中的 API 模块提供的方法，支持两种调用方式：

- 适配器方式（adapterApi）：适合在组件内复用实例、享受请求去重与缓存。
- Promise 方式（promiseApi）：适合一次性调用或实时搜索（只保留最新），内置取消。

**适配器方式（adapterApi）用法**

```js
const adapter = adapterApi.doGet(({ data, error }) => {
  if (error) {
    // 处理错误
    return;
  }
  // 使用 data
});

adapter.update({
  endpointConfig: { isv: 'kd', app: 'demo', source: 'search', version: 'v1' },
  params: { q: 'keyword' }, // GET → 查询串；非 GET → JSON body
  headers: { 'X-Custom': 'value' }, // 自定义请求头
});

// 不再需要时断开
adapter.disconnect();
```

**Promise 方式（promiseApi）**

```js
const p = promiseApi.doGetPromise({
  endpointConfig: { isv: 'kd', app: 'demo', source: 'search', version: 'v1' },
  params: { q: 'keyword' },
});

p.then(({ data }) => {
  // 使用数据
}).catch((err) => {
  if (err?.status === 'CANCELED') return; // 忽略取消错误
  // 处理其他错误
});

// 任意时刻取消（链式返回的 Promise 也会继承 cancel）
p.cancel();
```

更多用法，请参考工具库`@kdcloudjs/kwc-shared-utils`API 模块章节。

## 苍穹平台指令交互

在使用 kwc 开发时，存在场景是需要交互后打开苍穹表单。那么这个时候我们可以使用 `sendBosPlatformEvent` 来进行处理。

### showForm

`showForm` 指令用于展示另一个表单，调用示例如下:

```html
<template>
  <kd-button label="新页签打开新表单" onclick="{handleClick}"></kd-button>
</template>
```

```js
import { KingdeeElement } from '@kdcloudjs/kwc';
import { showForm } from 'kingdee/sendBosPlatformEvent';
export default class OpenForm extends KingdeeElement {
  handleClick() {
    const formConfig = {
      formId: 'klee_pro', // 需要打开的 formId
      parentPageId: '', // 传入当前页面的 pageId
      params: { openStyle: { showType: 10 } }, // 可传入所需的参数，此例子在这里传入的内容是告知后端需要打开表单的方式
    };
    // controller 中配置版本
    const config = {
      version: 'v1', // 接口版本
      isv: 'kd', // isv
      app: 'bos', // 应用
    };
    showForm(formConfig, config);
  }
}
```
