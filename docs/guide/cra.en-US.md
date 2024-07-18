---
title: Create-React-App
group:
  title: Frontend Framework
  order: 54
nav:
  title: Documentation
  order: 0
---

## Integrating with Create React App

In the context of backend and administrative development, [Create React App](https://create-react-app.dev/) is an excellent choice. ProChat integrates very easily with Create React App. You can use it directly after installation.

```bash
npx create-react-app my-app
or
yarn create react-app my-app
pnpm create react-app my-app
```

### Dependency Installation

After creating the project and entering the directory, install ProChat dependencies:

```bash
npm install @ant-design/pro-chat --save
npm install antd-style --save

or
pnpm install @ant-design/pro-chat
pnpm install antd-style
```

### Usage

Create or edit a component file in the `src` directory, such as `App.js`, and add the following code to use ProChat:

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
      'Welcome to ProChat, I am your personal assistant. Here is our Github link: [ProChat](https://github.com/ant-design/pro-chat)'
    }
    request={async (messages) => {
      const mockedData = `This is a piece of mock conversation data. This session received ${messages.length} messages`;
      return new Response(mockedData);
    }}
  />
);

export default App;
```

### Resolving Webpack Compilation Issues

By this point, you have successfully integrated ProChat into your Create React App project. Start the project to see the effect:

```bash
npm start
or
yarn start
pnpm start
```

You may encounter some webpack errors:

```bash
ERROR in ./node_modules/html-tokenize/node_modules/readable-stream/lib/_stream_readable.js 41:13-30 Module not found: Error: Can't resolve 'stream' in '/Users/lijunjie/Webprojectg/test-webpack/node_modules/html-tokenize/node_modules/readable-stream/lib'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
	- add a fallback 'resolve.fallback: { "stream": require.resolve("stream-browserify") }'
	- install 'stream-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
	resolve.fallback: { "stream": false }
```

This happens because projects created by default using Create-React-App do not support direct configuration of webpack content when starting projects with `react-scripts`.

Therefore, we need to change the startup script from `react-scripts` to webpack.

Old version startup scripts:

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

New startup scripts:

```js
{
"scripts": {
    "serve": "webpack serve --mode development",
    "start": "webpack serve --mode development",
    "build": "webpack --mode production",
  }
}
```

Then create a webpack.config.js file in the root directory. Below is my configuration for reference only.

> Note that webpack requires some additional dependencies such as webpack-cli, webpack, webpack-dev-server, and some Babel-related packages like @babel/core, @babel/preset-env,@babel/preset-react,babel-loader,and css-loader.This will not be elaborated here; refer to commonly available configurations.

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"), // The bundle output path.
    filename: "bundle.js", // The name of the bundle.
  },
  plugins: [
     new HtmlWebpackPlugin({
       template:"src/index.html", // To import index.html file inside index.js.
     }),
   ],
   devServer:{
     port :3030,// You can change the port.
   },
   resolve:{
     fallback:{
       stream :require .resolve ("stream-browserify"),
       'leva/src/types':require.resolve('leva'),
     }
   },
   module:{
     rules:[
        {
          test:/\.(js|jsx)$/, //.js and .jsx files,
          exclude:/node_modules/,//excludingthe node_modules folder,
          use:{loader :"babel-loader"},
        },
        {
          test:/\.(sa|sc|c)ss$//stylesfiles,
          use:["style-loader","css-loader","sass-loader"],
        },
        {
         test:/\.(png|woff|woff2|eot|ttf|svg)$//to import imagesand fonts,
         loader :"url-loader",
         options:{limit:false},
       },
     ],
   },
};
```
