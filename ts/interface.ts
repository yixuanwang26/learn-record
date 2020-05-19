//  1.属性接口  对传入的对象进行约束

interface Person {
    name: string;
    age?: number;
}

function csPerson(person: Person){
    console.log(person.name);
    console.log(person.age);
}

// 2.函数类型接口  对方法的传参及返回进行约束

interface GetPersonInfo {
  (name: string, age: number): string;
}

var getPersonInfo: GetPersonInfo = function(name: string, age: number) {
  return name + age;
};

getPersonInfo('wang', 12);

// 3.可索引类型   对数组和对象的约束，不常用？

interface NumList {
    [index: number]: string;
}

var list: NumList;
list = ['a', 'b'];

// 可索引类型可以添加不同的类型，但是要注意由于数字索引时会被转为字符串索引，因此数字索引的类型必须是字符串索引的子类型

class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
    [x: number]: Dog;
    [x: string]: Animal;
}

interface objList {
    [index: number]: string;
    [x: string]: number | string;
}


// 类类型接口

interface Obj {
  name: string;
  eat(e: string): string;
}

class Cat implements Obj {
  name: string;
  constructor(name: string) {
      this.name = name;
  }
  eat(ee) {
    return ee + 'lalal';
  }
}


interface ClockConstructor {
    new (hour: number, minute: number);
}

interface ClockCur {
    currentTime: Date;
}

class Clock implements ClockCur {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

var OtherClock: ClockConstructor = Clock;

var clock = new OtherClock(1, 2);

// 对这一点我目前只能理解为 不能实现一个规定了静态部分规范的接口；
// 规范静态部分的接口只能用于检测类型，而不能进行实现；

// 接口可以继承接口

interface one {
    oneName: string;
}

interface two {
    twoName: number;
}

interface three extends one, two {
    threeName: boolean;
}

var t:three = {
    oneName: 'heheh',
    twoName: 12,
    threeName: true,
}

// 混合类型，既可以作为函数，也可作为对象

interface Min {
    (ns: number[]): number;
    all: number[];
    getIndex(): number;
}

var getMin: () => Min = function() {
    var all = [];
    var m;
    function min(ns: number[]): number {
        all = ns;
        m = Math.min(...ns);
        return m;
    }
    min.all = all;
    min.getIndex = function() {
       return all.indexOf(m);
    }
    return min;
}

var mmm = getMin();

console.log(mmm([1,2,3,4,5]));
console.log(mmm.all);
console.log(mmm.getIndex());

// 接口继承类

// 为使实现某个接口的类能拥有特定属性

class Control {
    state: string;
}

interface interfaceControl extends Control {
    select(): void;
}

class Botton extends Control implements interfaceControl {
  select() {}
}

// class Images implements interfaceControl {
//     select() {}
//   }