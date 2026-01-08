---
toc: content
title: '调试和测试'
order: '21'
---

## 本地调试

当在本地自定义控件，KWC 项目目录中，执行`npm/yarn install` ，然后再执行`npm/yarn start` 命令启动本地服务，即可进行本地预览和调试。

本地启动的项目支持热更新调试。

本地预览，只是查看当前组件自身效果，如果希望看到与苍穹设计器表单中的效果，则需要进行远程调试。

## 远程调试

**上传元数据**

当本地调试时，可以通过 kd-custom-control-cli 命令将控件 xml 元数据文件部署到指定苍穹环境中，用于远程联调（即：远程苍穹环境与本地前端代码进行联调），这样可省去打包上传的操作，使开发调试更便捷。

上传控件元数据操作，在 myComponent 项目根目录下执行 kd-custom-control-cli deploy 命令，然后根据提示输入信息：

    $ kd-custom-control-cli deploy
    √ *请输入方案名称 ... 测试控件
    √ *请输入领域标识 ... hr
    √ *请输入开发商标识 ... kf00
    √ *请输入苍穹环境地址(格式为：[http/https]://[ip地址/域名]) ... http://172.2.1.1:8022/ierp
    √ 请选择数据中心 » default_datacentor
    √ *请输入OpenAPI第三方应用client_id ... test_id
    √ *请输入OpenAPI第三方应用client_secret ... *****
    √ *请输入OpenAPI第三方应用username ... testuser

参数选项说明

| 配置项        | 说明                                                      |
| :------------ | :-------------------------------------------------------- |
| 方案名称      | 自定义控件的方案名称                                      |
| 领域标识      | 自定义控件的领域标识                                      |
| 开发商标识    | 自定义控件的开发商标识                                    |
| 苍穹环境地址  | 用于远程联调的苍穹环境地址                                |
| 数据中心      | 用于远程联调的苍穹环境数据中心                            |
| client_id     | 在上述苍穹环境上创建的 OpenAPI 第三方应用的 client_id     |
| client_secret | 在上述苍穹环境上创建的 OpenAPI 第三方应用的 client_secret |
| username      | 在上述苍穹环境上创建的 OpenAPI 第三方应用的 username      |

注：输入 OpenAPI 第三方应用信息的目的是进行苍穹环境登录认证，以便将 xml 元数据文件部署到该环境，可参考文章：[OpenAPI 第三方应用注册流程](https://developer.kingdee.com/knowledge/525972550665201152?productLineId=29&isKnowledge=2&lang=zh-CN)。

**启动本地静态服务器**

本地启动一个静态服务器，供远程苍穹环境页面功能访问本地前端静态文件进行远程联调。

通过在项目根目录下执行 `node server` 以启动该服务器。

**开启本地动态构建服务**

通过启用该服务，本地前端代码文件更新后可以自动进行编译打包，然后将前端静态文件输出到上述静态服务器相关目录中，供远程苍穹环境访问使用。具体开启方法如下：

1、修改 \[项目根目录]/server/config.js 文件中的 localServer 属性值为 true

2、在项目根目录下执行 `npm run build` 启动本地动态构建服务。

**执行远程联调**

打开远程苍穹环境的对应表单预览页面，在该设计器页面或预览页 URL 地址后拼接上本地静态服务器地址`&kdcus_cdn=http://localhost:3001` 进行调试，也可预览效果。

![aed66904b798803cc8f347155074fa6e__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a17c9af380f3b56b02722)

![68057450a54a7b29d82746433f0abdf2__preview_type=16.png](https://tc-cdn.processon.com/po/5cd95fb0e4b06c0492ed0920-695a17d803b6d634b332bfae)

当更新了本地 KWC 代码时，则手动刷新该页面即可查看更新内容。

注意：若修改了 XML 元数据文件，则需要执行 kd-custom-control-cli deploy -f，将元数据文件重新部署到远程环境上。
