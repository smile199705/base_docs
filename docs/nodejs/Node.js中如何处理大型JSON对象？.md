
# Node.js中如何处理大型JSON文件

## 场景描述
问题一：假设现在有一个场景，有一个大的 JSON 文件，需要读取每一条数据经过处理之后输出到一个文件或生成报表数据，怎么能够流式的每次读取一条记录？

```javascript
[
  {"id": 1},
  {"id": 2},
  ...
]
```

问题二：同样一个大的 JSON 文件，我只读取其中的某一块数据，想只取 list 这个对象数组怎么办？

```javascript
{
    "list": [], 
    "otherList": []
}
```

在 Node.js 中我们可以基于以下两种方式读取数据，也是通常首先能够想到的：
- fs.readFile()：这个是一次性读取数据到内存，数据量大了都占用到内存也不是好办法，很容易造成内存溢出。
- fs.createReadStream()：创建一个可读流，能解决避免大量数据占用内存的问题，这是一个系统提供的基础 API 读取到的是一个个的数据块，因为我们的 JSON 对象是结构化的，也不能直接解决上面提的两个问题。
- 还有一个 require() 也可以加载 JSON 文件，但是稍微熟悉点 Node.js CommonJS 规范的应该知道 require 加载之后是会缓存的，会一直占用在服务的内存里。

## 解决方案
### 基于 SAX 的流式 JSON 解析器

SAX 是 Simple API for XML 的简称，目前没有一个标准的 SAX 参考标准，最早是在 Java 编程语言里被实现和流行开的，以 Java 对 SAX 的实现后来也被认为是一种规范。

实现了 SAX 的解析器拥有事件驱动那样的 API，像 Stream 的方式来工作，边读取边解析，用户可以定义回调函数获取数据，无论 XML 内容多大，内存占用始终都会很小。

### JSONStream 处理大文件

#### 问题1:
> 假设现在有一个场景，有一个大的 JSON 文件，需要读取每一条数据经过处理之后输出到一个文件或生成报表数据，怎么能够流式的每次读取一条记录？

对应数据如下：
```javascript
[
  { "id": 1 },
  { "id": 2 }
]
```
Node.js代码如下：
```javascript
const fs = require('fs');
const JSONStream = require('JSONStream');

(async () => {
  const readable = fs.createReadStream('./list.json', {
    encoding: 'utf8',
    highWaterMark: 10
  })
  const parser = JSONStream.parse('.');
  readable.pipe(parser);
  parser.on('data', console.log);
})()
```

- 第一次返回 { id: 1 }
- 第二次返回 { id: 2 }

重点是 JSONStream 的 parse 方法，我们传入了一个 '.'，这个 data 事件也是该模块自己处理过的，每次会为我们返回一个对象

#### 问题2:
> 同样一个大的 JSON 文件，我只读取其中的某一块数据，想只取 list 这个数组对象怎么办?

对应数据如下：
```javascript
{
  "list": [
    { "name": "1" },
    { "name": "2" }
  ],
  "other": [
    { "key": "val" }
  ]
}
```
Node.js代码如下：
```javascript
(async () => {
  const readable = fs.createReadStream('./list.json', {
    encoding: 'utf8',
    highWaterMark: 10
  })
  const parser = JSONStream.parse('list.*');
  readable.pipe(parser);
  parser.on('data', console.log);
})();
```

- 第一次返回 { name: '1' }
- 第二次返回 { name: '2' }

与第一个解决方案不同的是改变了 parse('list.*') 方法，现在只会返回 list 数组，other 是不会返回的，其实在 list 读取完成之后这个工作就结束了。

## 总结
当我们遇到类似的大文件需要处理时，尽可能避免将所有的数据存放于内存操作，应用服务的内存都是有限制的，这也不是最好的处理方式。​

例如可以同时 Stream 做到边读取边解析，还可以在生成 JSON 文件时做拆分，将一个大文件拆分为不同的小文件。

