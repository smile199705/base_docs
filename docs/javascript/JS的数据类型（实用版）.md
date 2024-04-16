
## 前言
本文主要分析JavaScript的基本数据类型，日常遇到的边界数据类型条件问题。通过概念、检测方法、转换方法几个方面分析JavaScript数据类型的知识点。
其中会有手写数据类型判断代码来加深印象和理解。

## 数据类型概念
常见的JavaScript数据类型分为8种：
<img src="docs/image/javascript/JavaScript数据类型.png">

日常工作中我们会使用前7种基本数据类型，最后1种为引用类型。引用类型又分为：Array（数组对象）、RegExp（正则对象）、Date（日期对象）、Math（数学对象）、Function（函数对象）。

它们会因为初始化之后所存放的位置不同，因此将它们分为两类来储存：

- 基本数据类型储存在栈内存，被引用或者被拷贝时，会创建一个完全相等的变量；
- 引用类型储存在堆内存，储存的是地址，多个引用指向同一个地址，因此会涉及`共享`概念。

通过以下例子分析一下引用类型的`共享`概念
```javascript
let a = {
    name: 'smile97',
    age: 27
}
let b = a
console.log(a.age) // 27
b.age = 18
console.log(b.age) // 18
console.log(a.age) // 18
```

这道题比较简单，我们可以看到第一个console打印出来的是27，但是会疑问：问什么改变b对象的内容，a对象的内容也随之改变了。没错这里就体现了`共享`特性，
即这两个值共享一块内存空间，当一个改变的时候，另一个也会改变。

## 数据类型检测
常见的数据类型检测方法有两个：`typeof`和`instanceof`

### 第一种判断方法：typeof
```javascript
console.log(typeof 1) // number
console.log(typeof '1') // string
console.log(typeof true) // boolean
console.log(typeof null) // object
console.log(typeof undefined) //undefined
console.log(typeof Symbol()) // symbol
console.log(typeof []) // object
console.log(typeof {}) // object
console.log(typeof console.log) // function
```
由上可知，你会疑问`typeof null`的输出为啥是`object`。这是一个JavaScript存在的历史级的Bug，不代表null是引用类型，并且null本身也不是对象。
针对这个问题，我们在写代码的时候，判断一个对象时，也要考虑这种情况，`特别是在框架或者组件封装的过程中`。

此外还会发现，应用数据类型Object，用typeof判断的话，除了function之外会判断为正确以外，其余的都是`object`,具体是什么类型无法直接判断出来。

### 第二种判断方法： instanceof
```javascript
const Biz = function () {}
const biz = new Biz()
console.log(biz instanceof Biz) // true
const boot = new String('boot')
console.log(boot instanceof String) //true
let serve = 'string ...'
console.log(serve instanceof String) // false
```

通过以上例子你会发现`instanceof`是判断一个对象是否是它的构造函数生成的对象，即新对象是否为老对象原型链继承的。既然清楚了instanceof方法判断的大致流程，
那么我们可以自己手动来实现一下instanceof的底层实现。
```javascript
// instanceof 底层实现
function myInstanceof(child, parent) {
    // 排除基本数据类型，如果是直接返回false
    if (typeof child !== 'object' || typeof child === null) return false
    // 获取child的原型对象
    let proto = Object.getPrototypeOf(child)
    while(true) { // 循环找，直到找到相同的原型对象
        if (proto === null) return false
        if (proto === parent.prototype) return true // 找到原型对象，返回true
        // 原型链查找
        proto = Object.getPrototypeOf(proto)
    }
}
// 验证一下instanceof
console.log(myInstanceof(new String('smile97'),  String))  //true
console.log(myInstanceof(new Number('97'),  Number))  // true
console.log(myInstanceof(666,  Number))  // false
```

根据以上描述，我们总结如下：
- instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型；
- 而 typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断

总之，不管单独用 typeof 还是 instanceof，都不能满足所有场景的需求，而只能通过二者混写的方式来判断。

### 第三种判断方法：Object.prototype.toString
toString()是Object的原型方法，调用该方法，可以统一返回`[object Xxx]`的字符串，其中Xxx就是对象的类型。对于Object直接调用toString()就能返回`[object Object]`;
对于其他对象，则需要通过`call`来调用，才能返回正确的类型信息。
```javascript
console.log(Object.prototype.toString({}));    // "[object Object]"

console.log(Object.prototype.toString.call({}));  // 同上结果，加上call也ok

console.log(Object.prototype.toString.call(1));    // "[object Number]"

console.log(Object.prototype.toString.call('1'));  // "[object String]"

console.log(Object.prototype.toString.call(true));  // "[object Boolean]"

console.log(Object.prototype.toString.call(function () {}));  // "[object Function]"

console.log(Object.prototype.toString.call(null));   //"[object Null]"

console.log(Object.prototype.toString.call(undefined)); //"[object Undefined]"

console.log(Object.prototype.toString.call(/123/g));    //"[object RegExp]"

console.log(Object.prototype.toString.call(new Date())); //"[object Date]"

console.log(Object.prototype.toString.call([]));       //"[object Array]"
```

从上面这段代码可以看出来，Object.prototype.toString.call()可以很好的判断引用类型。但是在写判断条件时候一定要注意，使用这个方法最后返回统一字符串`[object Xxx]`,
而这里的Xxx首字母必须大写（注意：typeof返回的是小写）。

## 数据类型转换
在日常的业务开发中，经常会遇到 JavaScript 数据类型转换问题，有的时候需要我们主动进行强制转换，而有的时候 JavaScript 会进行隐式转换。
```javascript
console.log('123' == 123);   // true

console.log('' == null);    // false

console.log('' == 0)        // true

console.log([] == 0)      // true

console.log([] == '' )    // true

console.log([] == ![])      // false

console.log(null == undefined) // true

console.log(Number(null))     // 0

console.log(Number(''));      // 0

console.log(parseInt(''));;    // NaN

console.log({}+10)         // [object Object]10

let obj = {
    [Symbol.toPrimitive]() {
        return 200;
    },

    valueOf() {
        return 300;
    },

    toString() {
        return 'Hello';
    }
}

console.log(obj + 200); // 400

```

## 强制数据类型转换
强制数据类型转换的方法有`Number()`、`parseInt()`、`parseFloat()`、`toString()`、`String()`、`Boolean`这几种强制类型转换。

### Number()方法的强制类型转换规则

- 如果是布尔值，true和false会分别转换为1和0
- 如果是数字，返回自身
- 如果是null，返回0
- 如果是undefined，返回NaN
- 如果是字符串，只包含数字的转为数字，如果不是则返回NaN

### Boolean()方法的强制类型转换规则
除了 undefined、 null、 false、 ''、 0（包括 +0，-0）、 NaN 转换出来是 false，其他都是 true。


## 总结
1、数据类型的判断方法：typeof 和 instanceof ，以及 Object.prototype.toString 的判断数据类型、手写instanceof代码片段。

2、数据类型的转换方式：两种数据类型的转换方式，日常代码实现中应该多注意避免产生Bug代码。
