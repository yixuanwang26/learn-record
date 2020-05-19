// 类

// 简单的一个类例子

class Person {
    name: string;
    order: number;
    constructor(name: string, order: number) {
      this.name = name;
      this.order = order;
    }
    getName(){
        return this.name;
    }
}

const person = new Person('wang', 23);

// 继承

class Food {
    name: string;
    color: string;
    getColor(): string {
        return this.color;
    }
}

class Apple extends Food {
    setInfo(color: string, name: string){
        this.color = color;
        this.name = name;
    }
}

const apple = new Apple();
apple.setInfo('red', 'apple');
console.log(apple.getColor());

// 父子拥有构造函数时的继承, super 只能调到父类的 public or protected 方法，调不到属性和私有方法；
// 实际上属性直接用 this 即可调用，但也只是 public or protected 类型；

class Student extends Person {
    name: string;
    constructor(name) {
        super(name, 2);
        this.name = `name_${name}`;
    }
    getName() {
        console.log('super', super.getName());
        console.log('this', this.name);
        console.log('order', this.order);
        return this.name;
    }
}

const nena = new Student('nena');
nena.getName();


// 公有，私有与受保护的修饰符

// 公有，默认不加修饰符则都为公有
// 私有，私有属性和方法不能被子类访问，只能在这个类本身使用
// 受保护的属性和方法可以被子类访问，不能被 new 出的实例访问

class Reason {
    protected code: string;
    desc: string;
    private id: number = 123123;
    getCode(): string {
      return this.code + this.id;
    }
}

class LateForDate extends Reason {
    constructor(desc) {
        super();
        this.desc = desc;
        this.code = 'xxxx';
    }
    consoleContent() {
        console.log(this.desc);
        console.log(this.code);
        // console.log(this.id);
    }

}

const reason = new Reason();
// console.log(reason.code);
const lateForData = new LateForDate('睡迟了');
lateForData.consoleContent();


// 私有和受保护的属性会区分两个不同的类

class One {
    private name: string;
    getName() {
        return this.name;
    }
}

class Two {
    private name: string;
    getName() {
        return this.name + '!';
    }
}

class Three extends One {
    age: number;
}

let one = new One();
let three: One = new Three();
let two = new Two();

one = three;
// one = two;

// 受保护的构造函数
// 当一个类的构造函数为 protected 修饰时，不能将其实例化，只能在子类中进行调用
class A {
    n: number;
    protected constructor(n: number) {
       this.n = n;
    }
}

// const a = new A(1);

class B extends A {
    constructor(account: number, type: string) {
        super(account);
    }
}

const b = new B(1, '2');


// readonly 修饰符
// readonly 修饰的属性只能在构造器中或者使用属性参数,或者声明时进行赋值

class C {
    readonly c: string = 'lala';
    readonly d: number;
    constructor(d: number) {
        this.d = d;
    }
    // setD() {
    //     this.d = 2;
    // }
}

// 参数属性,一种在构造器中声明并赋值的简便方法，属性不用单独进行声明；

class D {
    constructor(d: number, private e: string) {
    }
}

// 存取器
// 便于在存取的时候进行一些相关操作，如果没有存只有取方法的话，那么该属性默认为只读属性
// 只能在 ES5及更高的环境中编译
const key = 'secret';
class Card {
     private _fullName: string;
     set fullName(name: string) {
         this._fullName = name;
     }
     get fullName() {
         if(key === 'secret') {
           return this._fullName;
         } else {
             return undefined;
         }
     }
}

const card = new Card();
card.fullName = 'nena wan';
console.log('name', card.fullName);


// 静态属性
// 静态属性就是直接用类拿到的属性，而非实例拿到的属性

// 抽象类及抽象方法
abstract class Pay {
    abstract getWay(): string;
    getSecret(): string {
        return 'xxxxx';
    }
}

class WeChatPay extends Pay {
    getWay() {
        return 'WeChat';
    }
    getDate() {
        return new Date();
    }
}

let weChatPay: WeChatPay; // 允许使用抽象类规范一个变量类型；
weChatPay = new WeChatPay();
// weChatPay = new Pay(); // 不允许用抽象类 new
weChatPay.getDate();

let weChatPay2: Pay;
weChatPay2 = new WeChatPay();
// weChatPay2.getDate(); // 在抽象类中没有这个方法

// 其他

// 类可以当接口一样用