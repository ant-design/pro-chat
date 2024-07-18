---
title: Create-React-App
group:
  title: 前端框架
  order: 54
nav:
  title: 文档
  order: 0
---

## 与 Create React App 集成

在中后台的研发场景， [Create React App](https://create-react-app.dev/) 是一个非常不错的选择。ProChat 与 Create React App 的集成非常容易。安装后直接使用即可。

```bash
npx create-react-app my-app
or
yarn create react-app my-app
pnpm create react-app my-app
```

### 依赖安装

创建好项目并进入目录后，安装 ProChat 依赖：

```bash
npm install @ant-design/pro-chat --save
npm install antd-style --save

or
pnpm install @ant-design/pro-chat
pnpm install antd-style
```

### 使用

在 `src` 目录下创建或编辑一个组件文件，例如 `App.js`，并添加以下代码来使用 ProChat：

```js
import React from 'react';
import { ProChat } from '@ant-design/pro-chat';

const App = () => (
  <ProChat
    style={{
      height: '100vh',
      width: '100vw',
    }}
    helloMessage={
      '欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)'
    }
    request={async (messages) => {
      const mockedData = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
      return new Response(mockedData);
    }}
  />
);

export default App;
```

### 解决 webpack 编译问题

至此，你已经成功将 ProChat 集成到 Create React App 项目中了。启动项目即可查看效果：

```bash
npm start
or
yarn start
pnpm start
```

你会发现有一些 webpack 的报错：

```bash
ERROR in ./node_modules/html-tokenize/node_modules/readable-stream/lib/_stream_readable.js 41:13-30
Module not found: Error: Can't resolve 'stream' in '/Users/lijunjie/Webprojectg/test-webpack/node_modules/html-tokenize/node_modules/readable-stream/lib'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
	- add a fallback 'resolve.fallback: { "stream": require.resolve("stream-browserify") }'
	- install 'stream-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
	resolve.fallback: { "stream": false }
```

这是因为默认使用 Create-React-App 脚手架创建的项目，在使用 `react-scripts` 进行启动项目的时候，有些 webpack 需要配置，但是 cra 脚手架并不支持直接配置 webpack 的内容。

所以我们需要将启动项目从 `react-scripts` 改成 webpack

旧版本的启动脚本

```js
{
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}

```

新的启动脚本

```js
{
"scripts": {
    "serve": "webpack serve --mode development",
    "start": "webpack serve --mode development",
    "build": "webpack --mode production",
  }
}
```

然后在根目录创建一个 webpack.config.js 文件，下面是我的配置文，仅供参考。

> 需要注意的是，webpack 自动需要安装一些额外的依赖，例如：webpack-cli、webpack、webpack-dev-server，以及一些用于转化的 babel：@babel/core、@babel/preset-env、@babel/preset-react、babel-loader、css-loader，这一部分不过多阐述，参考市面上通用的配置即可

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, '/dist'), // the bundle output path
    filename: 'bundle.js', // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', // to import index.html file inside index.js
    }),
  ],
  devServer: {
    port: 3030, // you can change the port
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      'leva/src/types': require.resolve('leva'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: 'url-loader',
        options: { limit: false },
      },
    ],
  },
};
```
