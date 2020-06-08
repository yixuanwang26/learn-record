// // 4.1 请编写前述 sum 函数的代码

// function sum(array) {
//    const length = array.length;
//    if(length > 1) {
//      const [ first, ...rest ] = array;
//      return first + sum(rest);
//    } else {
//        return array[0];
//    }
// }

// var arr = [1,2,3,4,5,6,7,8,9];
// sum(arr);

// // 4.2 编写一个递归函数来计算列表包含的元素数
// function getLength(array) {
//     if(array && array[0]) {
//         const [ first, ...rest ] = array;
//         return 1 + getLength(rest);
//     } else {
//         return 0;
//     }
// }

// var arr2 = [1,2,3,4,3,2,3,3];
// getLength(arr2)

// // 4.3 找出列表中最大的数字
// function max(array) {
//     const length = array.length;
//     if(length > 1) {
//         const [ first, ...rest ]= array;
//         const restMax = max(rest);
//         return first > restMax ? first : restMax;
//     } else {
//         return array[0];
//     }
// }

// var arr3 = [23,3,45,2,67,4];
// console.log(max(arr3));

// // 4.4 二分查找也是一种分而治之的算法。找出二分查找发的基线条件和递归条件

// // 基线条件： 可选值就剩一个
// // 递归条件： 每次取目标值可能在的那一半数值作为新的可选值



// // 快速排序实现
// function quickSort(array) {
//     const length = array.length;
//     if(length > 1) {
//       const base = array[0];
//       const smArray = [];
//       const lgArray = [];
//       for(let i = 1; i < length; i++) {
//         if(base > array[i]) {
//             smArray.push(array[i])
//         } else {
//             lgArray.push(array[i])
//         }
//       }
//       let resArray = smArray.length > 0 ? [...quickSort(smArray), base] : [base];
//       if(lgArray.length > 0) {
//         resArray = resArray.concat(quickSort(lgArray))
//       }
//       return resArray;
//     } else {
//         return array;
//     }
// }

// const arr4 = [23,45,1,4,3,67,22];
// console.log(quickSort(arr4));


// 广度优先搜索
 
// 可用于： 1.查找是否可以从 A 到 B  2.从 A 到 B 最少走几步

// 实现思路：1.将图的内容存在散列表中，针对一个节点（入口），可以得到它的所有邻居节点（出口）  2.将第一层节点推入队列，弹出第一个进行循环判断，在队列不为 0 的条件下始终执行循环  3

// 循环中判断当前节点是否为目标节点，如果不是记录已判断过，如果是则结束。

// 广度优先搜索实现


/*

追赶妖怪

Description
一身正气的钟馗四处降妖，一天他发现一只狐妖正在祸害百姓，他连忙追赶上去准备除妖，可是狐妖很聪明，她自知敌不过钟馗，便逃入山林，企图消耗钟馗的体力。钟馗在树林里面可以自由移动，而且他有一个法术：可以从当前坐标(x,y)直接移动到(2x,2y)的位置。钟馗为了不枉送性命，找到人称"人间诸葛亮"的你，希望你能帮他判断他能否在体力未耗尽到达狐妖的藏匿地点（如果到达狐妖藏身之处还剩余0点体力也是可以的）。
注意：钟馗一开始拥有n点体力，每次普通移动或者使用法术移动会消耗1点体力值，当体力消耗完毕(n<=0)便无法再进行移动。
现在给钟馗移动方式一个规定：
a.如果钟馗不使用法术，他可以从(x,y)移动到(x-1,y),(x+1,y),(x,y-1),(x,y+1)中的任意一个位置.
b.如果钟馗使用法术，他可以从当前坐标(x,y)直接移动到(2x,2y)的位置.

Input
输入包含3行。

第一行包含一个数字n，表示钟馗的初始体力值。1<n<=500

第二行两个整数表示钟馗初始坐标。

第三行两个整数表示狐妖藏匿坐标。

注意：狐妖不会移动。树林可以看做一个矩形，四个角的坐标分别为(0,0),(0,500),(500,0),(500,500)。钟馗移动的位置不能超出树林的范围。

Output
输出只有一行。

如果钟馗能够到达狐妖藏匿位置输出"YES",如果钟馗无法到达狐妖藏匿位置输出"NO"

Sample Input
50
4 4
9 9
5
0 0
0 5
1
0 0
1 0
1
0 0
2 2
1
0 0
500 500

Sample Output
YES
YES
YES
NO
NO

*/

function canGetLoc(n, zLoc, hLoc) {
  const [ zX, zY ] = zLoc;  // 钟馗初始坐标
  const [ hX, hY ] = hLoc;  // 狐妖坐标
  let queue = []; // 模拟队列
  const travePath = []; // 已经过的路，标记
  let canCatch = false;
  let step = 1;
  
  // 模拟散列表的一个散列函数
  function getMap(x, y, z) {
    const r = [];
    const newZ = z + 1;
    if(x + 1 <= 500) {
      r.push([x + 1, y, newZ]);
    }
    if(x -1 >= 0) {
      r.push([x - 1, y, newZ]);
    }
    if(y+1 <= 500){
      r.push([x, y+1, newZ])
    }
    if(y-1 >= 0) {
      r.push([x, y-1, newZ]);
    }
    if(2*x <= 500 && 2*y <= 500) {
      r.push([2*x, 2*y, newZ]);
    }
    return r;
  }

  queue = queue.concat(getMap(zX, zY, 0));

  while (queue.length > 0) {
      // 只要不达到目标就一直走
      // 弹出
      const target = queue.shift();
      const [ tX, tY, tZ ] = target;
      const flag = `${tX}_${tY}`;
      if(tZ > n) {
        // 已无法捕获
        break;
      }
      if(travePath.includes(flag)) {
          // 之前已经经过了一次
          continue;
      }

      travePath.push(flag);
      if(hX === tX && hY === tY) {
        // 抓到了
        step = tZ;
        canCatch = true;
        break;
      } else if(tX > 500 || tY > 500 || tX < 0 || tY < 0) {
        // 超出范围了
        continue;
      } else {
          // 没超出范围也没抓到，就把当前节点的邻居再压入队列
          queue = queue.concat(getMap(tX, tY, tZ));
      }
  } 

  console.log('停了', canCatch, n, step);
  return canCatch && step <= n ? 'YES' : 'NO';
}






// 50
// 4 4
// 9 9
// console.log(canGetLoc(50, [4,4], [9,9]));

// 5
// 0 0
// 0 5
// console.log(canGetLoc(5, [0,0], [0,5]));

// 1
// 0 0
// 1 0
// console.log(canGetLoc(1, [0,0], [1,0]));

// // 1
// // 0 0
// // 2 2
// console.log(canGetLoc(1, [0,0], [2,2]));

// // 1
// // 0 0
// // 500 500
// console.log(canGetLoc(5, [0,0], [500,500]));