# 内网开发之pkg打包nodejs项目踩坑实践
最近新入职新公司，内网开发（🫥）。将现有nodejs服务打包成指定平台（国产麒麟系统V10，arm64架构）可执行文件交付，避免源代码泄露。在我完完全全掌握了他的原理后，我终于解决了我所遇到的坑，特此记录学习，参考 [https://github.com/smile199705/express-axle](https://github.com/smile199705/express-axle) (基于es6规范封装 Express + DM8 + WebSocket + PKG )

# 运行环境

`linux-x64架构， node14.17.0`

`win-x64架构， node14.17.0`

`linux-arm64架构， node14.17.0`

`macos-arm64架构， node14.17.0`

# pkg打包

1、安装

`npm install -g pkg`

2、配置

- 命令行直接打包

```shell
npx pkg . -t node14-linux-x64,node14-macos-x64,node14-win-x64,node14-linux-arm64,node14-macos-arm64 --output my-express-app
```

> -t  代表指定要构建那些平台， --output  指定文件输出名  . 代表当前目录下所有文件


执行程序会出现问题：

`Error! Property 'bin' does not exist in ...错误`

此时由于未在package.json中进行配置

```json
{
    "bin": "./app.js",  
    "pkg": {
        "scripts": "app.js",
        "assert": ["config.json", "public/**/*"]
    }
}
// bin字段指定了入口文件名为app.js, pkg.scripts字段指定了在打包后如何启动应用程序, pkg.assert指定那些文件不打包，例如静态文件等。并且配置打包的基础操作有很多种方法，参考官网：https://www.npmjs.com/package/pkg
```

优化上面的命令可采用，将命令行写进package.json中快捷执行。

## 问题1: 启动打包后，会fetch对应平台的二进制缓存文件,此时需要网络，内网无网络怎么办？

1.  首先在外网环境下，执行打包启动，会根据命令中设定的 pkg会根据node版本和当前系统架构平台去`remote fetch`所需要的二进制缓存，主动拉去放到本地全局`.pkg-cache`目录下，因此去此目录下寻找好当前版本适用的二进制缓存文件。 
2.  每个node版本对应fetched的二进制文件版本也不一样， 例如当前node版本为`v14.17.0`， pkg版本为`5.6.0`，它的linux的二进制缓存版本为`fetched-node14.19.1-linux-x64`。 
3.  将缓存文件放进到内网缓存目录(.pkg.cache文件)后，需要指定`PKG_CACHE_PATH`的路径，通过`export PKG_CACHE_PATH=./pkg.cache/`,从而打包过程中使用缓存文件完成应用程序代码和二进制文件的打包 

- 当设置了缓存，还读取不到缓存的时候，会有一下几种情况存在：

```
1、缓存文件版本不兼容
    即使指定了本地缓存路径， pkg版本不一致还是会尝试从远程缓存中获取依赖项，应参照对应node版本在第一次打包下载时控制台的日志，确定缓存版本
2、缓存文件损坏
    文件损坏导致不能用了，也会从远程获取缓存依赖项， 因此尝试清除缓存，外网重新安装
    npm cache clean --force
    rm -rf node_modules
    npm install
3、文件名字记得要改对，一般主动下载到缓存的文件名都为 node-node14.19.1-linux-x64 这种，需要改成fetched-node14.19.1-linux-x64才可以
```

## 问题2: 目前pkg支持稳定的CommonJS规范的代码，那么es6规范的，和TypeScript的代码怎么实现兼容从而使用pkg进行打包？

- 首先可以通过`Babel`将es6规范的语法转换成commonJS规范，因此需要安装Babel工具
`npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/plugin-transform-modules-commonjs`
- 创建Babel配置文件，在项目下创建一个`.babelrc`的文件，配置如下：

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-modules-commonjs"
  ]
}
```

修改入口文件的依赖项，将所有的import引入模块改为require()方法引入，控制台中使用`Babel`进行转换
`npx babel . --out-dir dist --copy-files
// dist为指定输出目录， --copy-file为复制不需要进行转换的文件， 通过了npx ，这个npm 5.2.0之后引入的命令（用于运行本地安装的npm包中的可执行文件）

- 那么TyprScript只需要转译成commonJS代码就可以
`

## 问题3：当打包成功后出现`Cannot mkdir in a snapshot. Try mountpoints instead. at mkdirFailSnapshot`是什么原因，怎么解决

1. 出现这个问题通常是由文件系统权限不足或者磁盘空间不足等原因造成的，表明在创建快照期间无法在其中一个目录中创建目录。

```
快照是一种虚拟文件系统，用于将应用程序和依赖项打包到耽搁二进制文件中，它使用写时复制（copy-on-write）技术来最小化磁盘占用量并提高性能
```

- 解决方案有： `如果要使用快照，则需要确保文件系统具有适当的权限（例如读取、写入、执行等）。如果在内网开发应该要考虑一下方案：` 
   - 第一种： 禁用快照机制。通过添加`--no-tmpdir`选项来禁止快照机制，以避免创建快照时出现权限问题
   - 第二种： 将快照机制替换为挂载点。如果系统文件不支持快照机制或者无法使用快照机制，就将其替换为挂载点（mountpoints），从而避免出现权限问题。可以在项目根目录下创建名为`.npmrc`的文件,并添加内容：`tmp='挂载地址' snapshot=false`

2. 如果按照上述操作了，还是同样的报错，建议进入报错对应的日志文件中检查报错信息，确定当前项目所使用的库是否存在创建文件目录操作，如果有则会影响打包后的执行，从而卸载这个模块，替换别的方案，即可成功

## 问题4: 当项目中使用了`child_process.fork()`这类创建进程的方法时，或者主服务中存在子服务，打包后执行会找不到文件，怎么办呢？

- 将子服务的对应文件最终迁移到当前打包完成的二进制文件目录下，即可解决，并修改项目中引用的路径:`process.cwd() + '/'`对应文件的引用方式

## 问题5: 如何实现项目打包后，配置文件的动态化？

1.首先如果所使用的配置文件为`.js`类型的话，就改成`.json`类型格式，其次使用

```javascript
JSON.parse（fs.readFileSync(path.join(process.cwd() + '/config.json'))）
```

然后获取到json配置文件内的内容，并且在使用pkg打包过程中，不会打包进二进制文件内，并通过将该配置文件放到与打包后的文件同等级目录下，然后就可以读到配置文件信息，例如数据库链接， 项目启动配置信息等。

- 例如需要修改数据库配置文件内容，直接修改同等级目录下的config.json文件保存就可以了， 并重启项目的二进制文件，就可以生效了。
