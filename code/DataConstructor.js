
// let a = {
//     name: 'smile97',
//     age: 27
// }
// let b = a
// console.log(a.age) // 27
// b.age = 18
// console.log(b.age) // 18
// console.log(a.age) // 18

// console.log(typeof 1) // number
// console.log(typeof '1') // string
// console.log(typeof true) // boolean
// console.log(typeof null) // object
// console.log(typeof undefined) //undefined
// console.log(typeof Symbol()) // symbol
// console.log(typeof []) // object
// console.log(typeof {}) // object
// console.log(typeof console.log) // function


// const Biz = function () {}
// const biz = new Biz()
// console.log(biz instanceof Biz) // true
// const boot = new String('boot')
// console.log(boot instanceof String) //true
// let serve = 'string ...'
// console.log(serve instanceof String) // false

// instanceof 底层实现
// function myInstanceof(child, parent) {
//     // 排除基本数据类型，如果是直接返回false
//     if (typeof child !== 'object' || typeof child === null) return false
//     // 获取child的原型对象
//     let proto = Object.getPrototypeOf(child)
//     while(true) { // 循环找，直到找到相同的原型对象
//         if (proto === null) return false
//         if (proto === parent.prototype) return true // 找到原型对象，返回true
//         // 原型链查找
//         proto = Object.getPrototypeOf(proto)
//     }
// }
// // 验证一下instanceof
// console.log(myInstanceof(new String('smile97'),  String))  //true
// console.log(myInstanceof(new Number('97'),  Number))  // true
// console.log(myInstanceof(666,  Number))  // false


// console.log(Object.prototype.toString({}));    // "[object Object]"
//
// console.log(Object.prototype.toString.call({}));  // 同上结果，加上call也ok
//
// console.log(Object.prototype.toString.call(1));    // "[object Number]"
//
// console.log(Object.prototype.toString.call('1'));  // "[object String]"
//
// console.log(Object.prototype.toString.call(true));  // "[object Boolean]"
//
// console.log(Object.prototype.toString.call(function () {}));  // "[object Function]"
//
// console.log(Object.prototype.toString.call(null));   //"[object Null]"
//
// console.log(Object.prototype.toString.call(undefined)); //"[object Undefined]"
//
// console.log(Object.prototype.toString.call(/123/g));    //"[object RegExp]"
//
// console.log(Object.prototype.toString.call(new Date())); //"[object Date]"
//
// console.log(Object.prototype.toString.call([]));       //"[object Array]"


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

