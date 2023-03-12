# <script\>元素



**将Javascript插入HTML的主要方法是使用<script\>元素，<script\>元素有以下8个属性：**

+ async. 立即下载脚本，但是不会组织其他页面动作，如下载资源或等待其他脚本执行。只对外部脚本文件有效。异步脚本一定会在页面的load事件前执行，但可能会在DOMContentLoaded事件发出之前或之后执行，不能保证脚本的执行顺序
+ charset 指定src属性代码字符集，大多数浏览器不在乎它的值
+ crossorigin 配置相关请求的CORS(跨域资源共享)设置。默认不适用。crossorigin="anonymous"配置文件请求不必设置凭证标志。crossorigin="use-credentials"设置凭证标志，意味者出站请求会包含凭证，可以跨域带上cookie。
+ defer 表示脚本立即下载但延迟到文档完全被解析和显示后再执行，在DOMContentLoaded事件之前执行，只对外部脚本生效，使用defer属性的script的标签会顺序执行
+ ~~language~~ 代码块中的脚本语言类型
+ src 要执行代码的外部文件
+ type 代替language，代表代码块中脚本语言的类型（也称为MIME类型）默认值为text/javascript
+ integrity 

```js
/*
* load事件在整个页面和所有的依赖资源如样式图片都已经加载完出发。load事件不会被冒泡捕获，只能挂载在window
* DOMContentLoaded事件在DOM加载完成后就出发，无需等待依赖资源的加载
*/

/*
* 行内脚本：html中script标签中的脚本内容，行内脚本中不能包含字符串'</script>'浏览器会当作结束的script标签，
* 加入转义字符'\'可解决
* 外部脚本:使用script标签src属性引入的脚本
* 如果同时使用src引入外部文件和书写行内脚本，只会下载执行外部脚本
*/
```



## 动态加载脚本

使用DOM API创建script元素并将其添加到DOM中即可，默认情况下使用DOM API创建的script标签是异步加载的相当于添加了async属性



+++



# 文档模式

文档模式分为标准模式和混杂模式，两者的区分是根据文档开头是否有doctype的声明作为判断标准，两者的主要区别主要体现在CSS渲染方面(如图片周围的空白区域)，但对javscript也有一些关联的影响

```HTM
<!DOCTYPE html>
```



# <noscript\> 元素

早期浏览器不支持JavaScript,页面优雅降级的一个方案，现代浏览器已经100%支持JavaScript，但是浏览器可以禁用javascript。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Example HTML Page</title>
    <script defer="defer" src="example1.js"></script>
	<script defer="defer" src="example2.js"></script>
</head>
<body>
    <noscript>
    	<p>当浏览器不支持脚本或脚本支持被关闭就会看到这段内容，否则永远都不会看到</p>
	</noscript>
</body>
</html>
```

