

# 什么是SSE（Server-Sent Events）？

- Server-Sent Events是轻量级的服务端推送方案，即 Server  -----> Client

![image-20231213204130015.png](..%2Fimage%2Fimage-20231213204130015.png)

在某些情况下，前端需要持续接受后端的数据更新，通常有两种方案：

1、客户端（前端）拉取：以一定时间间隔向服务器发送请求更新；例如：轮训，长轮训

2、服务端推送：服务端主动将更新数据推送给客户端（前端）；例如：WebSocket， SSE



众所周知，WebSocket是我们所了解的双向通讯领域中的王者🔱，它广泛应用于双向实时通信领域。然而在实时通讯领域中还有一种单向的服务端通讯技术，可以更加轻量级别的代替WebSocket在日常生活中的满足只服务端给客户端推送数据的需求，减少双向通讯带来的不必要的资源消耗。它就是SSE服务端推送技术，满足服务端给客户端推送数据，并且只通过HTTP建立连接。例如：股票📈k线的实时变化，彩票趋势走向，以及工业数据实时监控（受限于页面的数据获取范围面）和日志推送和CI/CD工作流进度的推送等相关单向推送需求的场景。



当前时下最火的`ChatGPT`（OpenAI）的交互效果也是给予SSE技术实现的。OpenAI基于大模型需要有一定时间进行算法分析，并不能像我们服务接口一样直接返回所有数据，故采用这种持续返回数据的方式，避免用户界面等待太久出现空白的现象。

# SSE的使用

SSE用于向浏览器客户端发送持续消息或者连续数据流， 并通过名为EventSource的javaScript的API来增强原声、跨浏览器的流式传输

针对现代浏览器，需要考虑兼容性问题。

原生客户端代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SSE Demo</title>
</head>
<body>
<h1>SSE Demo</h1>
<button onclick="connectSSE()">建立 SSE 连接</button>
<button onclick="closeSSE()">断开 SSE 连接</button>
<br />
<br />
<div id="message"></div>

<script>
    const messageElement = document.getElementById('message')

    let eventSource

    // 建立 SSE 连接
    const connectSSE = () => {
        eventSource = new EventSource('http://127.0.0.1:3005/xxx/stream')

        // 监听消息事件
        eventSource.addEventListener('message', (event) => {
            const data = JSON.parse(event.data)
            // 服务端推送的数据
            console.log(data, '######')
            messageElement.innerHTML += `${data.msg}` + '<br />'
        })

        eventSource.onopen = () => {
            messageElement.innerHTML += `SSE 连接成功，状态${eventSource.readyState}<br />`
        }

        eventSource.onerror = () => {
            messageElement.innerHTML += `SSE 连接错误，状态${eventSource.readyState}<br />`
        }
    }

    // 断开 SSE 连接
    const closeSSE = () => {
        eventSource.close()
        messageElement.innerHTML += `SSE 连接关闭，状态${eventSource.readyState}<br />`
    }
</script>
</body>
</html>
```



服务端代码：(采用的是nest.js框架的@Sse装饰器实现)

```tsx
@Sse('stream')
	stream() {
		return new Observable((observer) => {
			observer.next({ data: { msg: 'aaa'} });

			setInterval(() => {
				observer.next({ data: { msg: 'bbb'} });
			}, 2000);

			setInterval(() => {
				observer.next({ data: { msg: 'ccc'} });
			}, 5000);
		});
	}
```

以上的两个前端代码和后端代码可以进行sse推送演示



- sse还可以应用于很多实时更新的场所

  1、实时新闻更新

  2、股市行情

  3、地图上的位置跟踪

  4、社交媒体的站内信推送，关注、点赞和评论推送

  5、游戏的各种活动推送

  6、用户运营消息推送

不过很多企业现在都适用三方推送技术，例如：极光推送、个推和goEasy等。

# SSE使用的注意事项

1、首先，设置SSE相关的响应头（事件流、长连接、chunk传输-事件自带、禁用缓存）

2、其次，将数据封装为事件（event）按照一定格式发送给客户端

3、然后，设置适当的延迟和缓存控制发送时机（适用于动态生成内容和大数据传输）

4、最后再合适的时候断开客户端连接

# SSE的优缺点（特性和限制）

1、sse是单向传输的， 消息数据是从服务端到客户端

2、如果不使用HTTP/2会受到最大连接数限制，浏览器对每个域名限制的的http连接数为6，这是跨标签的。HTTP/2默认是100。并且该问题在Chrome和Firefox中标记为`无法修复`

# 参考

[一文读懂即时更新方案：SSE](https://juejin.cn/post/7221125237500330039#heading-9)

[Server-Sent Events服务器信息推送](https://juejin.cn/post/7074962899260669988)

[Server-Sent Events：轻量级的服务端推送方案](https://juejin.cn/post/7308277343243927604?from=search-suggest#heading-5)

[推送数据？也许你不需要 WebSocket](https://juejin.cn/post/7272564663116759074)

[Web 实时消息推送的 7 种实现方案](https://juejin.cn/post/7302348032543784972?from=search-suggest#heading-4)
