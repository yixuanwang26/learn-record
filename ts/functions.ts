// // 函数

// // 完整的函数写法

// function parseName(name: string): string {
//     return name + 'parse'
// }

// var parseAge: (age: number) => number = function(age: number): number {
//     return age + 2;
// }

// // 可选和默认参数

// function parse (name: string, age?: number) {

// }

// function parseA (name: string, age=2) {

// }

// // 剩余参数

// function parseB (name: string, ...other: string[]) {

// }

// this

// 正常的 this 调用，在--noImplicitThis设置下会报 this.suits[pickedSuit]里的this的类型为any
// let deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function() {
//         // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
//         return () => {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);

//             return {suit: this.suits[pickedSuit], card: pickedCard % 13};
//         }
//     }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// 解决办法： 可以给 this 对应的类型，如果正好知道在调用时它指向哪里的话

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker: () => any;
}

const deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

// this参数在回调函数中
// 传入的参数为函数时，对它的调用并不确定，因此其中的 this 应当是 undefined,所以在声明此类函数时，应当对 this 的类型做出定义，以防传参时发生错误情况

interface Element {
    addClickListener: (onclick: (this: void, e: Event) => void) => void;
}

// class Handler {
//     info: string;
//     onClickBad(this: Handler, e: Event) {
//         // oops, used this here. using this callback would crash at runtime
//         this.info = e.message;
//     }
// }
// let h = new Handler();
// uiElement.addClickListener(h.onClickBad); // error!

// // 修改为以下的，但是这样就不能调 info 了，如果想调 info 就用箭头函数
// class Handler {
//     info: string;
//     onClickBad(this: void, e: Event) {
//         // oops, used this here. using this callback would crash at runtime
//         this.info = e.message;
//     }
// }
// let h = new Handler();
// uiElement.addClickListener(h.onClickBad); // error!

// class Handler {
//     info: string;
//     onClickBad = (e: Event) => {
//         this.info = e.message;
//     }
// }

// 重载

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// let pickedCard3 = pickCard('123');