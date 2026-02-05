---
toc: content
title: '部署至苍穹'
order: '13'
glossary: XML | 元数据 | API
---

# 部署至苍穹

将「KWC」（Kingdee Web Components）组件部署至「苍穹」平台，是实现组件在「苍穹」生态中落地使用的核心环节。

本章节将详细介绍在完成「KWC」的开发和调试之后，如何部署至「金蝶 AI 苍穹」平台。

## 开始之前

在开始部署之前，请确保：

1. 你的「KWC」组件已在本地开发、调试完毕，功能正常。
2. 你拥有目标「金蝶 AI 苍穹」环境的部署权限。
3. 已明确组件的使用场景（如用于哪种业务表单），以便正确配置元数据。

## 核心步骤

整个部署与集成流程核心围绕元数据配置、后端接口通信、「苍穹」平台指令交互三大关键步骤展开：

1. 配置组件元数据：通过 XML 文件定义组件的基础信息、支持的页面类型、自定义属性等，是组件在「苍穹」平台被识别和渲染的基础；
2. 实现与后端通信：基于「KWC」官方工具库 `@kdcloudjs/kwc-shared-utils` 的 API 模块，对接「苍穹」后端接口，完成数据交互；
3. 完成平台集成交互：通过平台专属指令实现「KWC」组件与「苍穹」平台的联动（如打开苍穹表单），适配「苍穹」生态的操作场景。

组件元数据可通过 `kd-custom-control-cli deploy` 命令快速部署至「苍穹」环境，无需手动打包上传，提升开发效率。

---

## 配置组件元数据

组件元数据是描述「KWC」组件信息及部署规则的 XML 文件，是「苍穹」平台识别、加载、渲染「KWC」 组件的核心配置，主要包含组件基础信息、支持的「苍穹」页面类型、不同页面下的自定义属性配置等内容。执行部署命令时，元数据中的动态变量会被自动填充，无需手动修改。

### 元数据基础模板

「KWC」组件的元数据为标准 XML 格式，顶层根节点为 `KingdeeComponentBundle`，基础模板如下（可直接复用并根据业务需求扩展）：

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

:::info
执行 `kd-custom-control-cli deploy` 命令时，CLI 工具会交互式地提示你输入以下信息，并自动填入 XML 模板的对应位置：

- `${SOLUTION_NAME}` (方案名称)：在「苍穹」平台中标识此组件的显示名称。
- `${MODULE_ID}` (领域标识)：通常对应你的业务模块或项目标识。
- `${ISV_ID}` (开发商标识)：「金蝶」为开发者或供应商分配的唯一标识。
  :::

### 元数据顶层结构

元数据采用层级化结构设计，核心分为基础信息、页面类型定义、属性配置三大模块，结构清晰且可扩展：

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

#### 基础信息配置

基础信息用于定义组件的唯一标识、展示名称、版本等核心信息，部分字段为必填项，需严格按规范配置，配置说明如下：

| 标签名        | 描述                                                | 示例值            | 是否必填 |
| :------------ | :-------------------------------------------------- | :---------------- | :------- |
| `version`     | 组件版本号，更新必填，新增非必填，会默认 1.0 版本号 | `2.0`             | 否       |
| `name`        | 英文唯一标识符                                      | `MyKWCAp`         | 是       |
| `masterLabel` | 显示名称（显示在左侧拖拽区域）                      | `XXXX组件`        | 是       |
| `icon`        | 组件图标，输入金蝶图标库中图标名称                  | `kdfont-标准单据` | 否       |
| `isv`         | 开发商标识                                          | `kingdee`         | 是       |
| `moduleid`    | 领域 ID                                             | `mykwc`           | 是       |

#### 页面类型定义（targets）

`targets` 节点用于配置组件支持的「苍穹」平台页面 / 表单类型，可配置多个，至少需填写一个，配置后组件仅能在指定类型的页面中使用，各页面类型说明如下：

| 页面类型            | 说明                                                                             |
| :------------------ | :------------------------------------------------------------------------------- |
| BaseFormModel       | 基础资料                                                                         |
| BillFormModel       | 单据页面                                                                         |
| DynamicFormModel    | 动态表单                                                                         |
| MobileBillFormModel | 移动单据，选择此项，组件将同时可用于 BaseFormModel 和 BillFormModel 类型的页面。 |
| MobileFormModel     | 移动表单                                                                         |

**示例：**

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

`targetConfigs` 是组件属性的核心配置节点，支持根据不同页面类型配置差异化的组件属性，让组件在不同「苍穹」页面中具备个性化的配置项。每个`targetConfig` 包含两个核心子节点：

1. `<targets>`：配置当前属性集适用的页面类型，多个类型用英文逗号分隔，重复类型会自动合并；
2. `<property>`：配置具体的组件属性，支持多种属性类型，每个属性需定义唯一标识、类型、展示标题等。

##### `<property>` 属性字段说明

`<property>` 组件属性支持 4 种常用类型，满足绝大部分配置需求，分别为：

- 字符串类型（`String`）：适用于文本输入类配置；
- 整数类型（`Integer`）：适用于数值输入类配置，支持范围限制；
- 布尔值类型（`Boolean`）：适用于开关 / 勾选类配置；
- 下拉列表类型（`Combo`）：适用于固定选项选择类配置，需配置枚举子项 `<item>`。

##### 通用属性字段

所有类型的属性均包含通用配置字段，为必填项，用于定义属性的标识、展示名称、说明等，配置说明如下：

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

##### 属性配置示例

以下示例为 BillFormModel 和 BaseFormModel 页面类型配置多类型属性，可直接复用参考：

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

### 页面布局元数据

当前在「苍穹」设计器中开发「KWC」 自定义控件时，暂无需配置页面布局元数据文件，直接通过设计器进行页面布局即可；后续纯「KWC」 页面开发场景中，将支持通过页面布局元数据文件定义页面结构。

---

## 与后端通信

「KWC」组件与「苍穹」后端的通信，统一使用官方共享工具库 `@kdcloudjs/kwc-shared-utils` 中的 API 模块，该模块封装了请求去重、缓存、手动取消等高频能力，无需手动处理底层请求逻辑。要与后端接口进行通信，可使用工具库中的 API 模块提供的方法，支持两种调用方式：适配器方式（adapterApi）和 Promise 方式（promiseApi）。

### 前置导入

使用前需先导入核心方法，否则会报变量未定义错误：

```javascript
import { adapterApi, promiseApi } from '@kdcloudjs/kwc-shared-utils';
```

### 适配器方式（adapterApi）

组件内重复调用同一接口、需要请求缓存和自动去重的场景（如列表数据查询、数据详情获取）。<br>
**核心特点**：复用请求实例、内置 5 分钟缓存、相同请求自动去重、最新请求优先执行，组件销毁时需手动断开实例避免内存泄漏。

**示例**

```js
const adapter = adapterApi.doGet(({ data, error }) => {
  if (error) {
    // 处理错误
    return;
  }
  // 使用 data
});

adapter.update({
  endpointConfig: {
    isv: 'kd', // 开发商标识，通常与元数据中的`<isv>`一致
    app: 'demo', // 后端应用名
    source: 'search', // API服务标识
    version: 'v1', // API版本
  },
  // 这些参数共同决定了最终请求的URL，请根据实际后端服务接口填写。
  params: { q: 'keyword' }, // GET → 查询串；非 GET → JSON body
  headers: { 'X-Custom': 'value' }, // 自定义请求头
});

// 不再需要时断开
adapter.disconnect();
```

### Promise 方式（promiseApi）

接口一次性调用、需要手动取消请求的场景（如实时搜索、弹窗内单次查询、按钮触发的临时请求）。

**核心特点**：每次调用新建实例、无缓存、返回带 `cancel` 方法的 Promise，可任意时刻取消请求，忽略主动取消的错误即可。

**示例**

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

:::info
更多用法，请参考章节 [工具库 API 模块](https://dev.kingdee.com/kwc/development-guide/tools-libraries#api-%E6%A8%A1%E5%9D%97)。
:::

---

## 集成交互

「KWC」组件与「苍穹」平台的集成交互，核心通过 `sendBosPlatformEvent` 提供的专属指令实现，目前最常用的是 `showForm` 指令，用于在「KWC」 组件中触发操作并打开「苍穹」平台的表单页面，适配业务单据跳转、基础资料查看等常见场景，调用方式简单且与苍穹平台指令规范完全兼容。

### 使用`showForm`指令

`showForm` 指令用于在「KWC」 组件中打开「苍穹」平台的指定表单，支持配置表单打开方式、传入参数等，需在组件中导入后使用，导入路径与「KWC」 工具库保持统一。<br>

调用示例如下:

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

配置说明：

- `formId`：为「苍穹」平台中目标表单的唯一 ID，需与「苍穹」表单配置保持一致，为必填项；
- `params.openStyle.showType`：用于配置表单打开方式，`10` 代表新页签打开，可根据业务需求调整；
- `config.app`：「苍穹」平台交互接口的应用名称，固定为 bos，不可修改；
- `config.isv/version`：与开发的组件元数据中的标识、接口版本保持一致。
