
// 手动实现instanceof
function myInstanceOf(left, right) {
    // 先判断是不是基本类型，是直接返回false
    if (typeof left !== 'object' || left === null) return false
    let proto = Object.getPrototypeOf(left)
    while(true) {
        if (proto === null) return false
        if(proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}

const dd = myInstanceOf(new Number(123), Number)
const res = myInstanceOf(123, Number)
console.log(res, dd)
