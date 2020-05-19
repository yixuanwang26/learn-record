// 函数

// 完整的函数写法

function parseName(name: string): string {
    return name + 'parse'
}

var parseAge: (age: number) => number = function(age: number): number {
    return age + 2;
}

// 可选和默认参数

function parse (name: string, age?: number) {

}

function parseA (name: string, age=2) {

}

// 剩余参数

function parseB (name: string, ...other: string[]) {

}

// this

// 重载