// 泛型

// 最基本的一个泛型例子

function getName<T>(name: T): T {
   return name;
}

const myName: string = getName('nena wan');
const yourName: string = getName<string>('lolo');

// 使用泛型变量
// T可以当做类型中的一个变量来使用

function getNameList<T>(names: T[]): T[] {
    return names;
}
// 或
function getNameList2<T>(names: Array<T>): Array<T> {
    return names;
}


// 泛型类型 & 泛型接口
// 和普通的接口及函数声明方式很像

var getAge: <T>(age: T) => T

var getAge2: {<T>(age: T): T}

interface GetAge {
    <T>(age: T): T;
}

// 使用时可指定类型的泛型接口

interface GetAge2<T> {
    (age: T): T
}

var getRealAge: GetAge2<number> = function(age: number) {
    return age;
}

// 泛型类
// 与泛型接口差不多

class GetClass<T> {
    name: T;
    getName(): T {
      return this.name;
    }
}

// 只应用于类中的实例类型的部分，不能用于静态类型？

// class GetClass<T> {
//     static class: T; //静态成员不能引用类类型参数。ts(2302)
//     name: T;
//     getName(): T {
//       return this.name;
//     }
// }



// 泛型约束
// 我感觉使用上和泛型变量差不多

interface HasLength {
    length: number;
}

function setArray<T extends HasLength>(array: T): T {
   return array;
}

// setArray(123);

setArray({ length: 3, name: 'd'});

setArray([1,2,3]);


// 是一个例子，主要可能是教怎么在实例化工厂中使用泛型监测类型
interface C {
    new <T>(): T
}

function createInstance<T>(t: C): T {
   return new t();
}

// 以上的结合

function createInstance2<T>(t: { new <T>(): T }): T {
    return new t();
}

function createInstance3<T>(t: { new (): T }): T {
    return new t();
}
