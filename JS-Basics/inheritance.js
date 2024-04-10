// inheritance is the main pillar in object oriented programming
// one class can inherit/acquire the propreties, methods of another class
// the class which inherits the properties of other is known as subclass (derived class, child class)
// the class whose properties are inherited is known as superclass.

const Person = require('./class');

class Pet extends Person {
    constructor(firstName, lastName){
        // call parent class constructor
        super(firstName, lastName);
    }

    get location() {
        return 'BlueCross';
    }
}

const pet = new Pet('Sam', 'San');
console.log(pet.fullName());
console.log(pet.location);