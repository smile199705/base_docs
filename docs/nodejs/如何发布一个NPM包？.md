# 如何发布一个NPM包？

## NPM注册登陆
注册
```
$ npm adduser

Username: your name

Password: you password

Email: (this IS public) your email
```
查看当前用户
> npm whomi

npm登陆
> npm login

## 私有模块
如果是公司团队或者个人项目的私有npm包，进行发布的时候需要注意，模块的名字要以`@`符号开始、`/`符号结束，中间部分为私有包的组织名。例如，`@common/logger`,common为组织的名称，logger为包名。

**package.json**
```json
{
  "name": "@may/logger"
}
``` 

## 发布NPM模块

进入项目根目录，输入命令。
> npm publish

## 常见问题
**Questions1**
```
no_perms Private mode enable, only admin can publish this module: coorddistance
```
这里注意的是因为国内网络问题，我们把 npm 的镜像代理到淘宝或者别的地方了，这里要设置回原来的镜像。

```npm config set registry=http://registry.npmjs.org```

**Questions2**
```
Unexpected end of input at 1:3637 npm ERR! egistry.npmjs.org/mkdirp/-/mkdirp-0.3.2.tgz"},"engines":{"node":"*"}
```
执行命令 npm cache clean --force

**Quesitons3**

Node项目部署 私有包报错404一般两种情况造成：

- 检查服务器是否登录npm账号
- 执行命令`npm config get registry`检查是否指向https，没有指向https执行命令 npm config set registry=https://registry.npmjs.org

