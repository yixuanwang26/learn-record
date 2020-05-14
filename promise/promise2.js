function Promise2(fn) {
    let value; // 得到的数据
    let reason; // 得到的原因
    let status = 'pending'; // 当前的状态  pending/fulfilled/rejected
    let onFulfilledFuns = [];
    let onRejectedFuns = [];
    let midRes = ''; // 中间返回
    let err = {
        e: null,
        index: -1 // 抛错层
    }


    // 执行对应函数，获取中间参数 or 得到报错 
    function ciBc(f, v, i, type) {

        // res 已有抛错的情况下
        if(type === 'res' && err.e) {
            // 概不执行
            return;
        }

        // res 不为方法时
        if(type === 'res' && typeof f !== 'function') {
            midRes = v;
            return;
        }

        // rej 不为方法时
        if(type === 'rej' && typeof f !== 'function') {
            // 如果有下一个 rej 则顺次执行下一个 rej
            const nextReg = onRejectedFuns[i+1]
            // 如果没有就结束
            if(nextReg) {
                ciBc(onRejectedFuns[i+1], v, i+1, 'rej')
            }
            return;
        }
        
        if(type === 'res') {
            // 不报错的情况下正常执行
            if(midRes) {
                // 有中间值的情况下先使用中间值
                let r = undefined;
                try {
                    r = f(midRes);
                } catch (e) {
                    // 执行期间报错，置 err,让后续的 res 都不执行
                    err = {
                        e,
                        index: i,
                    }
                    let errFunIndex = -1;
                    const nextRej = onRejectedFuns.slice(i).find((f, fi) => {
                       const isFun =  typeof f === 'function';
                       if(isFun && errFunIndex === -1) {
                           errFunIndex = i + fi;
                       }
                       return isFun;
                    });
                    if(typeof nextRej === 'function') {
                        ciBc(nextRej, e, errFunIndex, 'rej');
                    }
                    
                }
                midRes = '';
                if(r) {
                    midRes = r;
                }
            } else {
                let r = undefined;
                try {
                    r = f(v);
                } catch (e) {
                    // 执行期间报错，置 err,让后续的 res 都不执行
                    err = {
                        e,
                        index: i,
                    }
                    let errFunIndex = -1;
                    const nextRej = onRejectedFuns.slice(i).find((f, fi) => {
                       const isFun =  typeof f === 'function';
                       if(isFun && errFunIndex === -1) {
                           errFunIndex = i + fi;
                       }
                       return isFun;
                    });
                    if(typeof nextRej === 'function') {
                        ciBc(nextRej, e, errFunIndex, 'rej');
                    }
                    
                }
                if(r) {
                    midRes = r;
                }
            }
        }else if(type === 'rej') {
          // 报不报错都执行
          try {
              f(v)
          } catch(e) {
              // 执行一个 rej时内部报错，按流程查找下一个
              err = {
                  e,
                  index: i,
              }
              const nextRej = onRejectedFuns[i+1];
              if(nextRej) {
                ciBc(nextRej, e, i+1, 'rej');
              } else {
                  return;
              }
              
          }
        }
        
    }

    // 使用者成功后调用
    function resolve(v) {
      // 置值
      if(status === 'pending') {
        status = 'fulfilled';
        value = v;
        for(let i = 0; i < onFulfilledFuns.length; i++) {
            if(i === 0) {
                ciBc(onFulfilledFuns[i], value, i, 'res');
            } else {
                ciBc(onFulfilledFuns[i], undefined, i, 'res');
            }
        }
      }
      
    }

    // 使用者失败后调用
    function reject(r) {
        if(status === 'pending') {
            status = 'rejected';
            reason = r;
            let isFunIndex = -1;
            const firstRej = onRejectedFuns.find((f, i) => {
                const isFun = typeof f === 'function'
                if(isFun && isFunIndex === -1) {
                    isFunIndex = i;
                }
                return isFun
            });
            if(firstRej) {
                ciBc(firstRej, r, isFunIndex, 'rej');
            }
        }
    }
    

    // 执行 fn
    try {
        fn(resolve, reject);
    } catch(error) {
        reject(error);
    }

    this.then = function(onFulfilled, onRejected) {
        // 
        if(typeof onFulfilled === 'function'){
            onFulfilledFuns.push(onFulfilled);
        }
        
        if(typeof onRejected === 'function') {
            onRejectedFuns.push(onRejected);
        }
        

        return this;
    }
    
    
}

module.exports = Promise2;