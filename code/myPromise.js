

class MyPromise {
    constructor(exector) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        // 存放成功回调的值
        this.onResolvedFns = []
        //存放失败回调的值
        this.onRejectedFns = []
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
            // this.onResolvedFns.forEach((value, index, array) => {
            //     this.onResolved[index](value)
            // })
        }
    }

    reject(value) {
        if(this.status === 'pending') {
            this.status = 'rejected'
            this.reason = value
            // this.onRejectedFns.forEach((value, index, array) => {
            //     this.onRejectedFns[index](value)
            // })
        }
     }

     then(onResolved, onRejected) {
         onResolved = typeof onResolved === 'function' ? onResolved : value => value
         onRejected = typeof onRejected === 'function' ? onRejected: reason => {
             throw reason
         }
        if (this.status === 'fulfilled') {
            console.log(this.value, '-=-=-=-=-=')
            onResolved(this.value)
        }
        if (this.status === 'rejected') {
            console.log(this.value, '@@@@@@')
            onResolved(this.reason)
        }
        if (this.status === 'pending') {
            onResolved(this.reason)
        }
    }
}

const d = new MyPromise((reslove, reject) => {

})
d.then(res => {
    console.log(res, 'res=====')
}, err => {
    console.log(err, 'err=====')
})

console.log(d)
