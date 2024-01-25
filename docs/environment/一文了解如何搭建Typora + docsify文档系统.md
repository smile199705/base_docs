# 一文了解如何搭建Typora + docsify文档系统



## docsify是干什么的？

​	docsify，一款神奇的文档网站生成器。docsify 可以快速帮你生成文档网站。不同于 GitBook、Hexo 的地方是，它不会生成静态的 .html 文件，所有转换工作都是在运行时。如果你想要开始使用它，只需要创建一个 index.html 就可以开始编写文档并直接部署在 GitHub Pages。

## docsify的使用

### 安装

```shell
// 全局安装docsify工具，方便创建本地预览生成的文档
npm install docsify-cli -g
```

### 初始化

```shell
// 初始化项目
docsify init
```

### 开始写文档

初始化成功后，可以看到目录下有3个文件

- `index.html `入口文件
- `README.md` 一般会作为主页内容渲染
- `.nojekyll` 用于阻止 GitHub Pages 忽略掉下划线开头的文件

直接编辑README.md就可以渲染文档

### 本地预览

通过运行`docsify serve`启动一个本地服务服务器，可以方便实时预览效果。默认访问地址<a href = 'http//localhost:3000' title = 'http//localhost:3000'>http//localhost:3000</a>

```shell
docsify serve
```

更多命令行工具用法，参考<a href = 'https://github.com/docsifyjs/docsify-cli'>docsify源码</a>， 具体实践文档参考<a href = 'https://docsify.js.org/#/zh-cn/quickstart'>docsify文档</a>

## 使用注意点



- 官方文档提供的`script`脚本依赖部分有bug，使用以下html中内容即可搭建常规文档页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>smile97的技术小屋</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="description" content="Description">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/vue.css">
<!--    <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css">-->
    <!-- 设置浏览器图标 -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
    <!--    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />-->
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?f5bd120e1d351a666dc307fbf05e38d2";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>
<body>
<div id="app">loading...</div>
<script>
    // console.log(window.Docsify.version, '=======')
    window.$docsify = {
        // 项目名称
        name: 'smile97的技术小屋🍀',
        // 仓库地址
        repo: 'https://github.com/smile199705/base_docs.git',
        // 侧边栏支持，默认加载项目根目录下的_sidebar.md
        loadSidebar: true,
        // 导航栏支持，默认加载根目录下的_navbar.md
        loadNavbar: true,
        // 封面支持，默认加载的是项目根目录下的_coverpage.md文件
        coverpage: true,
        // 只在访问主页时加载封面
        onlyCover: false,
        // 找不到指定页面，指向_404.md
        notFoundPage: true,
        // Disqus评论系统支持
        // disqus: 'shortname',
        //
        alias: {
            './_sidebar.md': '/_sidebar.md'
        },
        subMaxLevel: 2, // 设置生成目录的最大层级
        auto2top: true, // 切换页面后是否自动跳转到页面顶部。
        // 小屏设备下合并导航栏到侧边栏
        mergeNavbar: true,
        // homepage: '_sidebar.md',
        // 搜索配置
        search: {
            maxAge: 86400000,
            paths: 'auto',
            placeholder: '🔍 请输入要搜索的关键字 ',
            noData: '😞 No Results!',
            hideOtherSidebarContent: false,
            depth: 5,
            // 您可以提供一个正则表达式来匹配前缀。在这种情况下，
            // 匹配到的字符串将被用来识别索引
            pathNamespaces: /^(\/(zh-cn|ru-ru))?(\/(v1|v2))?/
        },
        //外链打开方式
        // externalLinkTarget: '_blank',
        copyCode: {
            buttonText : '复制',
            errorText  : '复制失败',
            successText: '已复制'
        },
        pagination: {
            previousText: 'PREVIOUS',
            nextText: 'NEXT',
            crossChapter: true
        },
        count: {
            countable: true,
            fontsize: '0.9em',
            color: 'rgb(90,90,90)',
            language: 'chinese'
        }
    }
</script>
<!-- Docsify v4 -->

<!--<script src="//cdn.jsdelivr.net/npm/docsify@4"></script>-->
<!--&lt;!&ndash; docsify的js依赖 &ndash;&gt;-->
<!--<script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>-->
<!--&lt;!&ndash; 搜索功能支持 &ndash;&gt;-->
<!--&lt;!&ndash;<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>&ndash;&gt;-->
<!--<script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.js"></script>-->
<!--&lt;!&ndash;图片放缩&ndash;&gt;-->
<!--<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>-->
<!-- emoji表情支持 -->
<!--<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js"></script>-->
<!--<script src="//cdn.jsdelivr.net/npm/docsify-copy-code"></script>-->
<!--<script src="//cdn.jsdelivr.net/npm/docsify-copy-code/dist/docsify-copy-code.min.js"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/prismjs@1.22.0/components/prism-java.min.js"></script>-->
<!--以上依赖为官方提供脚本，部分有问题，充满bug（不生效、展示有问题等）-->




<!--采用下方依赖脚本-->
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.js"></script>
<script src="//unpkg.com/docsify-pagination/dist/docsify-pagination.min.js"></script>
<script src="//unpkg.com/docsify/lib/plugins/zoom-image.js"></script>
<script src="//unpkg.com/prismjs/components/prism-bash.js"></script>
<script src="//unpkg.com/prismjs/components/prism-java.min.js"></script>
<!-- emoji表情支持 -->
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-copy-code/dist/docsify-copy-code.min.js"></script>

</body>
</html>
```

- 在`_sidebar.md`编辑侧边栏层级关系，在`_navbar.md`编辑顶部导航栏，在`_coverpage.md`编辑封面内容， 在`README.md`编辑首页内容

- 每次书写`md`文档指定到`./docs`目录下，并在侧边栏文档中写好路径即可实时访问