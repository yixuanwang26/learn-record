// 对象

interface Person {
    name: string;
    age?: number;
}

function csPerson(person: Person){
    console.log(person.name);
    console.log(person.age);
}

// 方法

interface GetPerson {
  (): Person;
}

var getPerson: GetPerson;
getPerson = function() {
    return { name: 'wang', age: 12 }
}

// 可索引类型

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

