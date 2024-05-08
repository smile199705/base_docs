
// 声明一个对象

function Parson (name, age) {
    this.name = name
    this.age = age
}

// 原型对象，共享数据
Parson.prototype.sayHello = function () {
    console.log(this.name, this.age, 'yes')
}

// 实例对象
let p1 = new Parson('zhangsan', 12)
let p2 = new Parson('lisi', 20)
// 实例对象可以共享原型对象上的方法
p1.sayHello()
p2.sayHello()
//zhangsan 12 yes
// lisi 20 yes
