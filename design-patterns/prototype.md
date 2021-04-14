## 原型模式相关内容 参考《javascript 设计模式》/ 红皮书

- Q:问题
- P:编程练习
- R:阅读

Q: 当 new 一个对象时发生了什么？

1. 新建一个对象
2. 将这个对象的`[[prototype]]`指向 `constructor.prototype`
3. 以这个对象为 this 指向，执行构造函数
4. 判断返回是否为对象，如果是则返回该对象，如果不是则返回创建的对象。

---

P: 模拟一个 new 时的操作

```
function Person(name) {
  this.name = name;
}
Person.prototype.getName=function(){
  console.log('name is ', this.name)
}
function newObject(){
  var obj = new Object();
  var constructorFun = Array.prototype.shift.apply(arguments);
  obj.__proto__ = constructorFun.prototype;
  var res = constructorFun.apply(obj, arguments);
  return typeof res === 'object' ? res : obj;
}

const person = newObject(Person, 'nena')
```

---

Q:构造器模式和原型模式分别是什么？

```
// 构造器模式
function Person(name){
  this.name = name;
  this.getName = function(){
    console.log(this.name);
  }
}

// 原型模式
function Person(name){
  this.name = name;
}
Person.prototype.getName = function() {
  console.log(this.name)
}

```

构造器模式下每次新创建实例，都要创建新的内部方法。

原型模式下每个新的实例可以共享他们的原型方法和原型属性。

---

Q:构造函数和普通函数？

构造函数和普通函数并无差异，任何函数都可以当成构造函数使用，也可以当成普通函数使用。

---

Q:apply 和 call 的常用使用场景？

---

Q:bind 方法的使用

```
function getName() {
  console.log(this.name);
}
const obj = {
  name: 'nena'
}
const bindGetName = getName.bind(obj);
bindGetName(); // nena

// 带参数
function getName(age, phone) {
  console.log(this.name, age, phone);
}
const obj = {
  name: 'nena'
}
const bindGetName = getName.bind(obj, 22);
bindGetName('123123')
```

---

P:bind 方法仿写

```
function bindCopy() {
   const that = Array.prototype.shift.call(arguments);
   const fun = this;
   const bindArguments = Array.prototype.slice.call(arguments);
   return function() {
     const a = Array.prototype.concat.apply(bindArguments, arguments);
     return fun.apply(that, a);
   }
}

Function.prototype.bindCopy = bindCopy;

// test
function getName(age, phone) {
  console.log(this.name, age, phone);
}
const obj = {
  name: 'nena'
}
const bindGetName = getName.bindCopy(obj, 22);
bindGetName('123123')
```

---

Q:严格模式下直接调用方法时，方法内的 this 指向哪里？

```
var name = 'nena';
function getName(){
  'use strict'
  console.log(this.name);
}
```

严格模式下为 undefined

---

Q:所有对象最终的原型是什么？

所有对象的原型最终指向 Object.prototype, Object.prototype 的原型指向 null

---

Q:构造器和实例对象有什么关联？

构造器和实例对象本身没有关联，构造器的原型和实例对象的原型指向同一个对象。

---

Q:构造器和构造器的原型有什么关系？

构造器对象中有个 prototype 属性指向构造器的原型。
构造器的原型对象中有个 constructor 属性指向构造器。

---

Q:查找一个对象的属性或方法时经历了什么？

首先查找对象本身，没有的话查找对象的原型，还是没有的话继续查找对象原型的原型，直到在原型链上找到，如果一直到最后都没有找到，就返回 undefined.

---

衍生问题：

Q:什么是严格模式？

// P:call 方法仿写
// P:apply 方法仿写？
// R:原型模式其他的内容
