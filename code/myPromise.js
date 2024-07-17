

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
            this.onResolvedFns.forEach((value, index, array) => {
                this.onResolvedFns[index](value)
            })
        }
    }

    reject(value) {
        if(this.status === 'pending') {
            this.status = 'rejected'
            this.reason = value
            this.onRejectedFns.forEach((value, index, array) => {
                this.onRejectedFns[index](value)
            })
        }
     }

     then(onResolved, onRejected) {
         onResolved = typeof onResolved === 'function' ? onResolved : value => value
         onRejected = typeof onRejected === 'function' ? onRejected: reason => {
             throw reason
         }
         let promise;
         if (this.status === 'fulfilled') {
             return promise = new MyPromise(function (resolve, reject) {
                 try {
                     const v = onResolved(this.value)
                     if (v instanceof Promise) {
                         v.then(resolve, reject)
                     }
                     resolve(v)
                 } catch (e) {
                     reject(e)
                 }
             })
             // console.log(this.value, '-=-=-=-=-=')
             // onResolved(this.value)
         }
         let promise1
        if (this.status === 'rejected') {
            return promise1 = new MyPromise(function (resolve, reject) {
                try {
                    const v = onRejected(this.reason)
                    if (v instanceof Promise) {
                        v.then(resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        }
        if (this.status === 'pending') {
            onResolved(this.reason)
        }
    }
}

const d = new MyPromise((reslove, reject) => {
    reslove('111')
    reject('2222')
})
d.then(res => {
    console.log(res, 'res=====')
}, err => {
    console.log(err, 'err=====')
})

console.log(d)
