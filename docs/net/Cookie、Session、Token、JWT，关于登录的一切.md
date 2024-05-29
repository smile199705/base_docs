
[cookie、session、token 发展史与请求响应鉴权](https://www.bilibili.com/video/BV1b14y1J7Yv/?spm_id_from=333.999.0.0&vd_source=f919fd9746568e978bd15d1726c8767f)

[关于登录的一切](https://www.bilibili.com/video/BV1yW4y1s7eW/?spm_id_from=333.788.recommend_more_video.0&vd_source=f919fd9746568e978bd15d1726c8767f)

> cookie、session、token分别是什么，为什么会出现？

1、cookie是什么，为什么会出现？

- Cookie是一种用于在Web浏览器和服务器之间传递数据的小型文本文件。它可以存储有关用户的信息，如登录凭证、偏好设置等。Cookie的出现是为了解决HTTP协议的无状态性，实现用户的身份验证和会话管理等功能。


- Web浏览器通过`HTTP URL`访问服务端,服务端通过`set-cookie: key=value`返回给Web浏览器并设置成`cookie：key=value`，并在后续访问的时候即可携带上。


- cookie的使用会存在当浏览器禁用cookie的时候，导致cookie失效，使这个功能无法使用。  


2、session是什么，为什么会出现？

- Session是一种用于在Web应用程序中跟踪用户状态和存储用户数据的机制。它解决了HTTP协议无状态性和Cookie的一些限制，提供了安全的数据存储方式。


- Web浏览器通过`HTTP URL`访问服务端，服务端储存用户session，并设置`set-cookie： sessionId=###` 返回。给Web浏览器并设置成`cookie：sessionId=###`，并在后续访问的时候即可携带上。


- Session在分布式环境部署下，由于请求会打到不同服务器上，每个服务器都会独立地生成自己的Session。这就导致了在没有Session信息的服务器上无法获取之前存储的数据。

>为了实现在分布式环境下的Session数据共享，可以采用以下几种方式：
>
>1、Session复制：在分布式环境中，可以将Session数据复制到所有的服务器上，这样无论请求打到哪个服务器，都能够获取到相同的Session数据。但这种方式会增加网络传输和存储开销，并且可能导致数据一致性问题。
> 
>2、Session集中存储：将Session数据存储在一个集中的存储系统中，如数据库、缓存服务或分布式存储系统。所有的服务器都可以访问这个集中存储，从而实现Session数据的共享。这种方式可以解决数据一致性问题，但可能增加了存储系统的负担和网络通信开销。
> 
>3、使用共享存储：将Session数据存储在一个共享的存储介质中，如共享文件系统、网络文件系统（NFS）或分布式文件系统。所有的服务器都可以访问这个共享存储，从而实现Session数据的共享。这种方式可以较好地解决数据一致性问题，但需要确保共享存储的性能和可靠性。
> 
>4、使用分布式缓存系统：使用分布式缓存系统如Redis或Memcached来存储Session数据。这些缓存系统可以在分布式环境中提供高性能的数据读写，并且支持数据的自动过期和分布式部署。通过使用缓存系统，可以实现Session数据的共享和一致性。

需要注意的是，在分布式环境下实现Session数据共享需要考虑数据的一致性和并发访问的问题。

[]()
[]()
[]()
[]()

