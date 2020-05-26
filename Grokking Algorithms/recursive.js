// 4.1 请编写前述 sum 函数的代码

function sum(array) {
   const length = array.length;
   if(length > 1) {
     const [ first, ...rest ] = array;
     return first + sum(rest);
   } else {
       return array[0];
   }
}

var arr = [1,2,3,4,5,6,7,8,9];
sum(arr);

// 4.2 编写一个递归函数来计算列表包含的元素数
function getLength(array) {
    if(array && array[0]) {
        const [ first, ...rest ] = array;
        return 1 + getLength(rest);
    } else {
        return 0;
    }
}

var arr2 = [1,2,3,4,3,2,3,3];
getLength(arr2)

// 4.3 找出列表中最大的数字
function max(array) {
    const length = array.length;
    if(length > 1) {
        const [ first, ...rest ]= array;
        const restMax = max(rest);
        return first > restMax ? first : restMax;
    } else {
        return array[0];
    }
}

var arr3 = [23,3,45,2,67,4];
console.log(max(arr3));

// 4.4 二分查找也是一种分而治之的算法。找出二分查找发的基线条件和递归条件

// 基线条件： 可选值就剩一个
// 递归条件： 每次取目标值可能在的那一半数值作为新的可选值
