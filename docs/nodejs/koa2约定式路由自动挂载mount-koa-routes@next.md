---
# koa2约定式路由自动挂载mount-koa-routes@next

## 前言

> 我们都知道经典的路由都是`声明式（配置式）`的，比如koa-router和Express内置的路由都是这样的，但随着项目的迭代，这部分代码就会变的十分冗余。
>  
> 按照`约定大于配置`的思想，如何实现一种路由自动加载机制，以取代手动编写冗余的路由代码。经过查阅资料在`《狼书》卷3`，发现`mount-koa-routes@next`这个模块可以帮我实现这个想法。


## 使用

- 第一步：(前提是已经通过koa-generator模版生成koa2项目)
```shell
npm install --save mount-koa-routes@next
```

- 第二步：
> 在app.js文件里修改两处
> 1）、第一处，先移除
> 2）、然后使用mount-koa-routes替换
> 3)、第二处，将加载路由移除
> 4)、使用mount方法替换路由
>  

```javascript
const index = require('./routes/index')  
const users = require('./routes/users')
```
```javascript
const mount = require('mount-koa-routes')
```
```javascript
app.use(index.routes(), index.allowedMethods())  
app.use(users.routes(), users.allowedMethods())
```
```javascript
mount(app, __dirname + '/routes', true) // 第三个参数：是否打印路由到控制台（true， false）
```

这样就可以将当前目录的routes子目录下的所有`.js`后缀文件作为路由并实现自动加载。

- app: Koa的app实例对象。
- __dirname + '/routes': 要加载的路由目录
- true： 表示打印日志

修改完后，`npm start`启动服务器，测试修改效果
在浏览器直接访问`127.0.0.1:3000/string`即可验证
## 自动加载约定

- 文件内的路由和正常路由是一样的，写法不变，所有的get/post等都在方法中定义。
- index.js文件会转换为根目录`/`。
- 非index.js文件会直接将文件名作为路由路径，比如users.js的路由就是/users。

这样做即有好处也有坏处，好处在于减少了代码，坏处是灵活性略差。总体来讲，好处事大于坏处的。
