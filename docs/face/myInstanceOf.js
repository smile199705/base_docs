// 快速

let arr = [1,2,3,4,5,6,7,8,9]
console.log(arr.length)
function quickSort(arr) {
    if(arr.length < 2) { return arr }
    let mid = arr[0]
    let left = []
    let right = []
    for (let i = 1; i < arr.length; i++) {
        if(arr[i] < mid){
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return [...quickSort(left),mid, ...quickSort(right)]
    // return quickSort(left).concat([mid], quickSort(right))
}


function unique(arr) {
    const uniqueArr = []
    for (let i = 0; i < arr.length; i++) {
        let state = true
        for (let j = i+1; j < arr.length - 1 - i; j++) {
            if(arr[i] === arr[j]) {
                state = false
                break
            }
        }
        uniqueArr.push(arr[i])
    }
}






console.log(quickSort(arr))
