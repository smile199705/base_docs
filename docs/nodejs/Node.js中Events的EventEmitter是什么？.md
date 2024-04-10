# Nodejs中events的EventEmitter是什么？
## 前言

为什么写这篇文章？

- 经常看到市面上有很多面试文章关于node的事件循环，谈谈理解和看法。然而答案千篇一律，难道真的如他们的所说的那样嘛？
- node的核心模块Events怎么使用的，都应用在那些场景下？


通过本文可以学到什么
- 了解EventEmitter是什么？一些基础的api的使用
- 如何实现一个自定义的EventEmitter事件？
- 许多成功的开源Node模块都是基于EventEmitter的，知道在什么地方使用EventEmitter。并知道怎么利用它。
- 有那些是EventEmitter不能处理的问题，需要第三方模块及扩展。

## Events模块的EventEmitter是什么？
它是Nodej.js中一个很重要的模块叫事件触发器，也称为发布/订阅模式，Node.js中绝大多数模块都依赖于此，例如net、http、fs、Stream等，除了这些模块之外，还有Express、Koa框架中都可以看到EventEmitter的踪迹。

## 如何使用它？
主要用到以下两个API，触发、注册一个监听函数。
- emit： 触发一个监听函数
- on： 注册一个监听函数
```javascript
// eat.js
const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

emitter.on("吃饭", function(item) {
    console.log(`我饿了，要吃${item}`)
});

emitter.emit("吃饭", "面条");
```
运行程序之后效果如下展示
> 我饿了，要吃面条

除了上面使用的emit、on方法外还有once（添加一个一次性监听器）、removeListener（从事件中删除事件监听器）、removeAllListeners(删除事件的所有侦听器）、newListener（追踪监听器何时添加）等。

## 自定义EventEmitter类

```javascript
const util = require('util')
const events = require('events')
function InitEventEmitter() {
    events.EventEmitter.call(this);
}

util.inherits(InitEventEmitter, events.EventEmitter)

const init = new InitEventEmitter()

init.on('start', (option) => {
    console.log('start=====', option)
})

init.emit('start', '这是一个开始')
```

上方自定义util.inherits(InitEventEmitter, events.EventEmitter)函数，就`InitEventEmitter对象继承了EventEmitter在原型中定义的函数`


## 系统模块自定义EventEmitter类的实现

在Net模块中的使用
```javascript
const EventEmitter = require('events');
const util = require('util');

function Server(options, connectionListener) {
    if (!(this instanceof Server))
        return new Server(options, connectionListener);

    EventEmitter.call(this);

...
}
util.inherits(Server, EventEmitter);
```
在Stream模块中的使用
```javascript
const EE = require('events');
const util = require('util');

function Stream() {
  EE.call(this);
}
util.inherits(Stream, EE);
```

观察上面两个 Node.js 模块的自定义 EventEmitter 实现，都有一个共同点使用了 util.inherits(constructor, superConstructor) 方法，这个是 Node.js 中的工具类，在 JavaScript 权威指南（第 6 章 122 页）中的一个方法 function inherit(p)，意思为通过原型继承创建一个新对象，而 util.inherits 是通过原型复制来实现的对象间的继承。

## EventEmitter在三方模块中的实践

在redis模块中服用EventEmitter

```javascript
const redis = require('redis')
const client = redis.createClient()

client.on('error', function(err) {
    console.error('Error:', err)
})

client.on('monitor', function(timestamp, args) {
    console.log('Time:', timestamp, 'arguments:', args)
})

client.on('ready', function() {
    // Start app here
})
```
这个monitor的事件是通过redis模块颁布的，用于追踪内部是否有活动发生。

## 组织事件名称
- 在日常项目开发中会遇到事件太多的情况，担心写错一个事件造成难以检查的bug，我们该怎么解决呢？
> 针对项目中存在太多事件的问题，我们在项目中创建一个统一存放事件的地方：事件对象

```javascript
const util = require('util')
const enets = require('events')

function InitTest() {
    events.EventEmitter.call(this)
    this.on(initTest, this.play.bind(this))
}

const e = InitTest.events = {
    play: 'play',
    stop: 'stop',
    delete: 'delete',
    pass: 'pass',
        ...
}

util.inherits(initTest, events.EventEmitter)

initTest.prototype.play = function () {}
this.play = true

const initTest = new InitTest()

initTest.on(e.play, function() {
    console.log('new playing')
})

initTest.emit(e.play)
```
1、用一个对象储存事件名称，可以向这样罗列清晰
2、当添加新的事件的时候，类的用户可以引用对象中的事件的列表而不是用字符串硬编码事件名称
## EventEmitter的替代方案

EventEmitter本质上是一个观察者模式的实现。这种模式是一种可以帮助扩展Node在多进程或者网络中运行的模式。

### 问题
当尝试解决一个EventEmitter不能很好处理的问题时我们都采用什么技术呢？
### 解决方案
这取决于我们试图解决的问题的确切性质，有几种EventEmitter的替代方案：`发布/订阅`、`AMQP`和`js-signals`,是Node一些很好支持的流行的替代品。
### 讨论
该EventEmitter类是观察者模式的实现。一个类似的模式是`发布/订阅`。发布者在这里发送消息而不需要知道订阅者具体是如何实现的。

`发布/订阅`模式在需要水平扩展的情况下非常有用。如果我们需要在多个服务器上运行多个Node进程，像`AMQP`和`ZeroMQ`这样的技术可以帮我们实现这一点。他们专门设计来解决这一类问题，假如我们已经使用Redis，那可能没有像Redis的publish/subscribe那样方便。

如果我们需要水平扩展一个分布式的集群，那么一个AMQP比如RabbitMQ将非常好用。rabbitmq-nodejs-client模块有一个publish/subscribe的API
```javascript
const reabbitHub = require('rebbitmq-nodejs-client')
const subHub = rabbitHub.create({ task: 'sub', channel: 'myChannel' })
const pubHub = rabbitHub.create({ task: 'pub', channel: 'myChannel' })

subHub.on('connection', function(hub) {
    hub.on('message', function (msg) {
        console.log(msg)
    }).bind(this)
})

subHub.connect()

pubHub.on('connection', function(hub) {
    hub.send('hello world')
})
pubHub.connect()
```
接下来是是一个常用于Node和C++之间通讯的模块（也是我在某一个单位，应用过的技术）
```javascript
const zmq = require('zmq')
const push = zmq.socket('push')
const pull = zmq.socket('pull')

push.bindSync('tcp://127.0.0.1:3000')
pull.bindSync('tcp://127.0.0.1:3000')
consoe.log('port 3000')

setInterval(function(){
    console.log('sending work')
    push.send('some work')
}, 500)

pull.on('message', function (msg) {
    console.log('work: %s', msg.toString())
})
```
