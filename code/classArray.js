//
//
// let obj = {
//     a: 111,
//     b: 333
// }
//
// let tt = {}
// tt[Symbol.iterator] = {
//     x: 44,
//     g: 66
// }
//
// Array.prototype.push.call(obj, tt)
// console.log(obj)

let arr = [23,43,12,3,65,32]
let max
let min
let arrH = []
while(arr.length > 0){
    max = Math.max.apply(Math, arr)
    arr.pop(max)
    arrH.push(max)
    console.log(arr)
    console.log(arrH)
}

