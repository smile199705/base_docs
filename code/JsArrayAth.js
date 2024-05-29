// 1、如何实现一个数组的反转

// 2、排序算法（冒泡排序、快速排序、插入排序）
/*let arr = [2,32,4,8,1,7,9,5,45,22,67,44,98]
// console.log(arr.length, '=======')
console.time(maopao(arr), '=====')
function maopao(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                // 交换顺序
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr
}

console.timeEnd(maopao(arr), '=====')

// 快速排序
console.time(quickSort(arr))
function quickSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    // 声明基准值
    let pivot = arr[0]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        }
        if (arr[i] > pivot) {
            right.push(arr[i])
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)]
}
console.timeEnd(quickSort(arr))
*/


// 插入排序
// function insertionSort(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         let current = arr[i];
//         let j = i - 1;
//         while (j >= 0 && arr[j] > current) {
//             arr[j + 1] = arr[j];
//             j--;
//         }
//         arr[j + 1] = current;
//     }
//     return arr;
// }
const arr = [5, 3, 8, 4, 2, 7, 1];
// const sortedArr = insertionSort(arr);
// console.log(sortedArr); // 输出：[1, 2, 3, 4, 5, 7, 8]

// 插入排序再实践
// function insertSort(array) {
//     for (let i = 1; i < array.length; i++) {
//         // 拿到数组第二个数
//         let current = array[i]
//         let j = i - 1
//         // 从第一个位置开始跟当前位置的开始比较,如果当前值小于前面的数
//         while(j >= 0 && current < array[j]) {
//             array[j + 1] = array[j]
//             j --
//         }
//         array[j + 1] = current
//     }
//     return array
// }
// const sortArr = insertSort(arr)
// console.log(sortArr)



// 正序插入
// function insert1(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         // 取第一个位置的数插入
//         let first = arr[i]
//         let index = i + 1
//         // 后者比前者小
//         while(arr[index] < first){
//             arr[i] = arr[index]
//         }
//
//         if(arr[i+1] >= first) {
//             index++
//             // return arr
//         } else {
//            arr[index]  =
//         }
//     }
// }


// 3、将两个有序表合并成一个有序表(归并排序)

// let a = [1,3,5,7,9];
// let b = [2,4,6,8,10,12,14];
let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];

// 归并分排序:
/**
 * 1、
 * @param array
 * @returns {*}
 */
function mergeSort(array) {
    if (array.length === 1) return array
    let mid = Math.floor(array.length / 2)
    let left = array.slice(0, mid)
    let right = array.slice(mid, array.length)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    // console.log(left, right)
    const result = []
    let il = 0
    let ir = 0
    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++])
        } else {
            result.push(right[ir++])
        }
    }
    return [...result, ...left.slice(il), ...right.slice(ir)]
    // return result.concat(left.slice(il)).concat(right.slice(ir))
}

const mergeSort1 = mergeSort(a);
console.log(mergeSort1);


// 4、数组扁平化（递归， reduce）

//

// var arr = [1, [2, [3, 4]]];

// function flatten(arr) {

// return arr.toString().split(',');
// return arr.toString();

// }

// console.log(flatten(arr)); //  [1, 2, 3, 4]

