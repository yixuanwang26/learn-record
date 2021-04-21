function getSingle(fn) {
  var result;
  return function () {
    console.log('wer', result);
    if (result) {
      return result;
    }

    result = fn.apply(this, arguments);
    console.log('a', result);
    return result;
  }
}

function Person() {
  this.name = 'nena';
}

Person.prototype.getName = function () {
  return this.name;
}

function getPerson() {
  return new Person();
}

const getSinglePerson = getSingle(getPerson);
// const person2 = getSingle(getPerson);

const p = getSinglePerson();
const p2 = getSinglePerson();
// console.log(person1 === person2);