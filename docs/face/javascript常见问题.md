**1、javascript的数据类型有哪些？**

基本类型包含以下八种类型：
- Number
- String
- Boolean
- Null
- undefined
- Symbol
- BigInt
- Object
  - Array
  - Math
  - Data
  - Function
  - RegExp

分为基本类型和引用类型：

基本类型存在栈中，引用类型存在堆中

**2、判断基本数据类型和引用数据类型**
 - typeof： 判断基本数据类型，返回字符串。但是对于null，返回object(这是js的历史bug)
 - instanceof： 可以判断对象类型，但是不能判断基本数据类型
 - Object.prototype.toString： 使用该方法判断，返回字符串，但是不能判断null和undefined，返回格式统一为"[object XXX]",对于Object对象直接使用`toString()`, 则需要通过`call`来调用

**3、如何实现一个instanceof**

```js
/**
 * 手动实现instanceof
 * @param leftVaule 实例化对象
 * @param rightVaule 原对象
 */
function myInstanceOf(leftVaule, rightVaule) {
    if(typeof leftVaule !== 'object' || typeof leftVaule === null) return false
    let proto = Object.getPrototypeOf(leftVaule)
    while(true){
        if(proto === null) return false
        if(proto === rightVaule.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }

}

console.log(myInstanceOf(new Number(123), Number)) // true
console.log(myInstanceOf(123, Number)) // true
```


