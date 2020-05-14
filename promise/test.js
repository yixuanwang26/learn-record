const Promise2 = require('./promise2')

function getSuccess() {
    return new Promise(function(res, rej){
        console.log('开始执行promise success');
        setTimeout(function(){
            res('start');
        }, 2000)
    })
}

function getFail() {
    return new Promise(function(res, rej){
        console.log('开始执行promise fail');
        setTimeout(function(){
            rej('fail');
        }, 2000)
    })
}

console.log('================== start ====================');

console.log('================== basic ====================');

// onFulfilled 和 onRejected 都是可选参数。

// 如果 onFulfilled 不是函数，其必须被忽略
// 如果 onRejected 不是函数，其必须被忽略

// getSuccess().then(2,3)
// getFail().then(2,3);

// onFulfilled 特性
// 如果 onFulfilled 是函数：

// 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值value
// 在 promise 执行结束前其不可被调用
// 其调用次数不可超过一次

// console.log('================== onFulfilled ====================');
// getSuccess().then(function(v){
//     console.log('d', v);
// })

// onRejected 特性
// 如果 onRejected 是函数：

// 当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的据因reason
// 在 promise 被拒绝执行前其不可被调用
// 其调用次数不可超过一次
// console.log('================== onRejected ====================');

// getFail().then(function(v){
//     console.log('d', v);
// }, function(r) {
//     console.log('er', r);
// })


// 多次调用
// then 方法可以被同一个 promise 调用多次

// 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
// 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调
// console.log('================== more ====================');

// const success = getSuccess();
// success.then(function(v){
//     console.log('one', v);
// }, function(e) {
//     console.log('oneE', e);
// })
// success.then(function(v2){
//     console.log('two', v2);
// }, function(e2){
//     console.log('twoE', e2)
// })

// const fail = getFail();

// fail.then(function(v){
//     console.log('one', v);
// }, function(e) {
//     console.log('oneE', e);
// })
// fail.then(function(v2){
//     console.log('two', v2);
// }, function(e2){
//     console.log('twoE', e2)
// })


// 返回
// then 方法必须返回一个 promise 对象。
// promise2 = promise1.then(onFulfilled, onRejected); 

// 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行 Promise 解决过程：[[Resolve]](promise2, x)

// console.log('================== back ====================');

// getSuccess().then(function(v){
//     return v + '!'
// }).then(function(v2) {
//    console.log('end: ', v2);
// }).then(function(v3) {
//    console.log('sha', v3);
// })

// 没有限制 x 的值是否为 undefined,因此即使仅是函数，没有返回也会继续执行 promise2

// 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e

// getSuccess().then(function(v) {
//     console.log('fail?');
//     throw Error('fail!');
// }).then(function(v2) {
//     console.log('end: ', v2);
// }, function(e) {
//     console.log('onRej', 2)
//     return 'llll';
// }).then(function(v3){
//     console.log('res', v3);
// })

// 综上，除非抛出一个异常，会拒绝下层的 promise, 否则当前层 promise 不管是拒绝还是执行，下一层肯定是执行

// 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值

// getSuccess().then(2).then(function(v) {
//     console.log('?', v);
// })

// 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因

// getFail().then(2, 3).then(2, function(e2) {
//     console.log('?', e2);
//     throw Error('faafds');
// }).then(4, 3).then(5, function(e4) {
//     console.log('do', e4)
// }).then(6, function(e5) {
//     console.log('kk', e5)
// })


// 关于 promiseA+ 规范中『 Promise 解决过程 』的部分参考网友译文
// https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4

