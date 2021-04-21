## 单例模式相关内容 参考《javascript 设计模式》/ 红皮书

### 通用惰性单例

将单例判断及创建 和 具体的单例对象内部实现区分开来

```
function getSingle(fn){
  var result;
  return function(){
     return result || (result = fn.apply(this, arguments));
  }
}

function Person(){
  this.name = 'nena';
}

Person.prototype.getName = function() {
  return this.name;
}

function getPerson() {
  return new Person();
}

const getSinglePerson = getSingle(getPerson);

const p = getSinglePerson();
const p2 = getSinglePerson();
```

## 比较相似的一个包 `memoize-one`, 可以根据传入的参数，缓存结果，进行输出

```
import memoize from "memoize-one";

const add = (a,b) => a+b;

const memoizeAdd = memoize(add);

memoizeAdd(1,3) => 4
memoizeAdd(1,3) => 4 // 未计算
memoizeAdd(2,3) => 5 // 计算了
memoizeAdd(2,3) => 5 // 未计算
memoizeAdd(1,3) => 4 // 计算了
```

```
import memoize from "memoize-one";
import isDeepEqual from 'lodash.isequal';

const copy = x => x;

const memoizeCopy = memoize(copy, isDeepEqual);

const user1 = memoizeCopy({ user: 'nena' });
const user2 = memoizeCopy({ user: 'nena' });
console.log(user1 === user2) // true
```

memoize 具体实现

function defaultEqualFn() {
// 一个默认的 equal 更新
}

```
function memoize(fn, equalFn = defaultEqualFn){
  var preThis;
  var preArgs;
  var preRes;
  var first = true;
  return function(...args){
    if(!first && preThis === this && equalFn(preArgs, args)) {
      return preRes;
    }
    preRes = fn.apply(this, args);
    preThis = this;
    preArgs = args;
    first = false;
  }
}

memoize()
```
