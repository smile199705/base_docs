

class MyPomises{
    constructor(exector) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onResolvedFns = []
        this.onRejectedFns = []
        exector((value) => this.resolve(value), (reason) => this.reject(reason))
    }

    resolve(value) {
        if(this.status === 'pending') {
            this.status = 'fulfilled'
            this.value = value
            this.onResolvedFns.forEach((value, index, arr) => {
                this.onResolvedFns[index](value)
            })
        }
    }

    reject(reason) {
        if(this.status === 'pending') {
            this.status = 'rejected'
            this.reason = reason
            this.onRejectedFns.forEach((value, index, arr) => {
                this.onRejectedFns[index](value)
            })
        }
    }

    then(onResolved, onRejected) {
        onResolved = typeof onResolved === 'function' ? onResolved : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        let promise1
        if(this.status === 'fulfilled') {
            return promise1 = new MyPomises((resolve,reject) => {
                try {
                    const v = onResolved(this.value)
                    console.log(v, '0-0-0-0-0-0-0-0-')
                    if (v instanceof Promise) {
                        v.then(resolve, reject)
                    }
                    resolve(v)
                } catch (e) {
                    reject(e)
                }
            })
        }
        if(this.status === 'rejected') {
            return promise1 = new MyPomises((resolve,reject) => {
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

    }
}

const dd = new MyPomises((resolve, reject) => {
    resolve('33333')
    reject('777777')
})

dd.then(res => {
    console.log('8888888', res)
}, err => {
    console.log('9999999', err)
}).then(res => {
    console.log('44', res)
}, err => {
    console.log('55', err)
})


