

class MyPromise {
    constructor(exector) {
        this.status = 'pending'
        this.value = undefined
        // this.reason = undefined
        // 存放成功回调的值
        // this.onResolved = []
        // 存放失败回调的值
        // this.onRejected = []
        try {
            exector((value) => {
                this.resolve(value)
            }, (reason) => {
                this.reject(reason)
            })
        } catch (e) {
            this.reject(e)
        }
    }

    resolve(value) {
        if (this.status === 'pending') {
            this.status = 'fulfilled'
            this.value = value
            // this.onResolved.forEach((value, index, array) => {
            //     this.onResolved[index](value)
            // })
        }
    }

     reject(value) {
        if(this.status === 'pending') {
            this.status = 'rejected'
            this.value = value
            // this.onRejected.forEach((value, index, array) => {
            //     this.onRejected[index](value)
            // })
        }
     }

     then(onResolved, onRejected) {
        if (typeof onResolved !== 'function') {
            onResolved = function(value){}
        }
        if (typeof onRejected !== 'function') {
            onResolved = function(err) {}
        }
     }
}

const d = new MyPromise((resolve) => {
    resolve('1')
    // reject(3)
}, reject => {
    // reject(2)
})

console.log(d)
