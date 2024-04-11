
# 前言

> 日常工作中，我们只会用到npm的install、init、publish等功能，但是其中有很多好用的技巧是我们不了解的，因此我整理了一些实用技巧来学习。

## npm run xxx 配置自定义命令
在package.json文件中，会发现默认情况下npm只支持`npm start`和`npm test`命令,大部分场景无法应付。比如做自定义的脚本执行、测试代码覆盖率时会用到的cov命令
，默认npm中是没有的，需要自己在package.json的scripts中手动配置，然后通过`npm run xxx`命令来运行。
```json
"scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "pm2:start": "pm2 start ecosystem.config.js --name=nodeService"
  }
```
例如可以通过`npm run test:cov`命令测试代码覆盖率。

**面试题**
> npm run xxx 都干了什么？

- 首先npm run xxx的时候，首先会去项目的package.json文件中查找scripts里找对应的xxx，然后执行xxx的命令，例如xxx为`vue-cli-service`，
执行`npm run serve`，实际上运行的是`vue-cli-service serve`
```json
{
  "name": "axle",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve"
   }
}
```
> 那么你肯定会问：为什么不直接执行`vue-cli-service serve`而要执行`npm run serve`,是因为简洁比较好些？

- 不是。因为直接执行`vue-cli-service serve`会报错，因为操作系统系统中没有存在`vue-cli-service serve`这个指令。

> 那接着你又可能会问：那既然`vue-cli-service serve`这个指令不存在操作系统中，为什么执行`npm run serve`的时候，也就相当于执行`vue-cli-service serve`,
为什么它就可以成功，而且不报指令的错误呢？

- 我们在安装依赖的时候，是通过npm install xxx来执行的，例如`npm i @vue/cli-service`, npm 在 安装这个依赖的时候，
就会node_modules/.bin/ 目录中创建 好`vue-cli-service` 为名的几个可执行文件。
并且`.bin`目录不是任何一个npm包。目录下的文件，表示这是一个一个的软链接，打开文件可以看到顶部写着`#!/bin/sh`表示这是一个脚本。
- 由此我们可以知道，当使用 `npm run serve `执行 `vue-cli-service serve` 时，虽然没有安装 `vue-cli-service`的全局命令，
但是 npm 会到` ./node_modules/.bin `中找到 `vue-cli-service` 文件作为  脚本来执行，则相当于执行了 `./node_modules/.bin/vue-cli-service serve`（最后的 serve 作为参数传入）

> 那么.bin目录下的文件表示软链接，那这个bin目录下的那些软连接文件是哪里来的呢？它又是怎么知道这条软连接是执行哪里的呢？

- 这个软链接的地址可以从 package-lock.json 中得知，当我们npm i 整个新建的vue项目的时候，npm 将 bin/vue-cli-service.js 作为 bin 声明了。
  所以在 npm install 时，npm 读到该配置后，就将该文件软链接到 ./node_modules/.bin 目录下，而 npm 还会自动把node_modules/.bin加入$PATH，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了。
  也就是说，npm i 的时候，npm 就帮我们把这种软连接配置好了，其实这种软连接相当于一种映射，执行npm run xxx 的时候，就会到 node_modules/bin中找对应的映射文件，然后再找到相应的js文件来执行。


## npm link
在项目的前期开发工作中，通常都会将一些可复用的代码抽离成公共组件，方便管理和维护。或者是将一些非业务性的、而且公用率很高的发布成npm包，
作为项目的依赖去安装使用。但是在开发调试中需要频繁的打包发布，然后项目中再安装依赖，这种重复的操作非常的繁琐和不便，为了解决这一系列重复的操作，
可以使用npm-link指令将模块链接到项目中。

**建立链接🔗**

假设项目名称为axle，和一个公共组件common模块。现在需要在项目中使用common，且common是作为npm打包成项目依赖。

第一步，使用`npm link`将common模块创建成本地依赖包，在common模块目录下执行命令：
> npm link

然后进入axle项目目录中，为和本地common模块建立链接。然后执行命令：
> npm link common // 这个common为common的package.json中的name的属性值

现在在axle中的node_modules里就会添加一个common模块的软链接。就说明项目链接模块成功了。之后修改common中的内容就会实时更新，不用打包发布在安装依赖了。

**解除链接🔗**

解除项目的依赖直接在项目目录输入命令：
> npm unlink common

这样项目里就解除了common模块的软链接，然后可以输入`npm install common`安装发布的更新好的common模块包

要解除本地common包，在common目录下输入命令：
> npm unlink common

这样本地的common包模块就解除了，其他项目的软链接也就失效了。

**总结**

使用npm link能够避免重复且繁琐的打包发布操作，给开发调试带来便捷，而且使用方法简单。





