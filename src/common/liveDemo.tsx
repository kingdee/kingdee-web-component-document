import { Tooltip } from '@kdcloudjs/kdesign';
import sdk from '@stackblitz/sdk';
import React, { useEffect, useRef } from 'react';
import { Info } from './withComponent';

interface LiveDemoProps {
  isEnglish: boolean;
  codeInfo: Info[];
}

const stackblitzPackage = `{
  "name": "kwc-playground",
  "scripts": {
    "start": "webpack serve --config build/webpack.dev.js",
    "dev": "webpack serve --config build/webpack.dev.js"
  },
  "devDependencies": {
    "@kdcloudjs/auto-inject-css-webpack-plugin": "^1.0.0",
    "@kdcloudjs/eslint-config-kwc": "^1.0.2",
    "@kdcloudjs/eslint-plugin-kwc": "^1.0.2",
    "@kdcloudjs/kwc": "1.0.0",
    "copy-webpack-plugin": "^12.0.2",
    "css-minimizer-webpack-plugin": "^7.0.2",
    "express": "^4.17.1",
    "fs-extra": "^11.2.0",
    "html-webpack-plugin": "5.6.0",
    "tslib": "^2.8.1",
    "webpack": "5.89.0",
    "webpack-cli": "5.1.4",
    "webpack-dev-server": "4.15.1",
    "webpack-merge": "^6.0.1",
    "webpackbar": "^6.0.1"
  },
  "nx": {
    "targets": {
      "build": {
        "outputs": ["{projectRoot}/dist"]
      }
    }
  },
  "dependencies": {
    "@kdcloudjs/kingdee-base-components": "^0.0.2",
    "@kdcloudjs/kwc-webpack-plugin": "^1.0.0"
  }
}`;
const webpackCommonContent = `
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const AutoInjectCssWebpackPlugin = require("@kdcloudjs/auto-inject-css-webpack-plugin");
const KwcWebpackPlugin = require("@kdcloudjs/kwc-webpack-plugin");

const injectCssFiles = [
  path.resolve(
    __dirname,
    "../node_modules/@kdcloudjs/kingdee-base-components/dist/index.css"
  ),
];

const existingInjectCssFiles = injectCssFiles.filter((file) =>
  fs.existsSync(file)
);

module.exports = {
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js",
    clean: true,
    chunkFilename: "js/[name].[contenthash].js",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      kingdee: "@kdcloudjs/kwc-shared-utils",
    },
  },

  plugins: [
    ...(existingInjectCssFiles.length > 0
      ? [new AutoInjectCssWebpackPlugin({ files: existingInjectCssFiles })]
      : []),

    new KwcWebpackPlugin(),

    new webpack.NormalModuleReplacementPlugin(/^kd\\/(.*)$/, (resource) => {
      const match = resource.request.match(/^kd\\/(.*)$/);

      if (match) {
        resource.request = path.resolve(
          __dirname,
          \`../node_modules/@kdcloudjs/kingdee-base-components/dist/esm/kd/\${match[1]}.js\`
        );
      }
    }),
  ],
};
`;
const wepackDevContent = `const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = merge(common, {
  entry: path.resolve(__dirname, "../src/index.js"),
  mode: "development",
  devtool: "eval-source-map",

  devServer: {
    port: 8000,
    host: "localhost",
    hot: true,
    compress: false,
    open: false,
    static: { directory: "../dist" },
    allowedHosts: "all",
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new HtmlWebpackPlugin({}),
  ],
});
`;

const kwcConfigContent = `{
    "modules": [
      {
        "dir": "src/modules"
      }
    ]
  }
  `;

const appJS = `import { KingdeeElement } from "@kdcloudjs/kwc";
export default class App extends KingdeeElement {}`;

const appHtml = `<template>
    <kd-button label="按钮"></kd-button>
</template>`;

const srcIndex = `
import { createElement } from "@kdcloudjs/kwc";
import App from "x/app";
const elm = createElement("kd-app", { is: App });
document.body.appendChild(elm);`;

const files = {
  'package.json': stackblitzPackage,
  'kwc.config.json': kwcConfigContent,
  'build/webpack.common.js': webpackCommonContent,
  'build/webpack.dev.js': wepackDevContent,
  'src/index.js': srcIndex,
  'src/modules/x/app/app.css': '',
  'src/modules/x/app/app.html': appHtml,
  'src/modules/x/app/app.js': appJS,
  'pnpm-lock.yaml': '',
  '.npmrc': 'registry=https://registry.npmmirror.com/',
  '.stackblitzrc': `{  
  "installDependencies": false,
  "startCommand": "pnpm i & pnpm dev",
  "env": {
    "NODE_ENV": "development"
  }
}`,
};

export default function LiveDemo(props: LiveDemoProps) {
  const { isEnglish, codeInfo = [] } = props;

  const stackblitzFiles = useRef<any>({ ...files });

  const tip = isEnglish ? 'Open in stackblitz' : '在 stackblitz 中打开';

  useEffect(() => {
    codeInfo.forEach((info) => {
      if (info.language === 'javascript') {
        stackblitzFiles.current['src/modules/x/app/app.js'] = info.content;
      } else if (info.language === 'html') {
        stackblitzFiles.current['src/modules/x/app/app.html'] = info.content;
      } else if (info.language === 'css') {
        stackblitzFiles.current['src/modules/x/app/app.css'] = info.content;
      }
      if (info.tabName) {
        const filePath = `src/modules/x/app/${info.tabName}`;
        stackblitzFiles.current[filePath] = info.content;
      }
    });
  }, []);

  const handleIconClick = () => {
    sdk.openProject(
      {
        title: ' KWC playground',
        description: 'kwc playground project',
        template: 'node',
        files: stackblitzFiles.current,
        settings: {
          compile: {
            trigger: 'auto',
            clearConsole: false,
          },
        },
      },
      {
        newWindow: true,
        openFile: ['src/index.js'],
      },
    );
  };
  return (
    <Tooltip tip={tip} placement="top">
      <div onClick={handleIconClick}>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="thunderbolt"
          width="1rem"
          height="1rem"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7zM378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211L378.2 732.5z"></path>
        </svg>
      </div>
    </Tooltip>
  );
}
