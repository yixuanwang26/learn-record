class Student { 
    fullName: string;
    constructor(public firstName: string, middleName: string, public lastName: string) {
        this.fullName = firstName + middleName + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

const std = new Student('nena', 'y', 'wan');

console.log(greeter(std));