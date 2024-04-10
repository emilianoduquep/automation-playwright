module.exports = class Person {
    age = 25
    get location() {
        return 'canada';
    }

    // constructor is a method wich executes by default when you create object of the class
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    fullName(){
        console.log(this.firstName + this.lastName);
    }
}

// let person = new Person('Emiliano', 'Duque');
// let person1 = new Person('Diana', 'Murillo');
// console.log(person.age);
// console.log(person.location);
// console.log(person.firstName);
// console.log(person.fullName());
// console.log(person1.fullName());