// Object is a collection of properties

let person = {
    firstName: 'Emiliano',
    lastName: 'Duque',
    age: 50,
    fullName: function() {
        return this.firstName + " " + this.lastName
    }
}


console.log(person.firstName);
console.log(person['lastName']);
person.firstName = 'Tim Dane';
console.log(person.firstName);

// you can also add a property inside the object in case this property does not exist.
person.gender = 'male';
console.log(person);
console.log('gender' in person);

// you can also delete a property from an object
delete person.gender;
console.log(person);

// you as an user also can check if a property exists.
console.log('gender' in person);

// if you want to print all the values in the JS object
for(let key in person){
    console.log(person[key]);
}

console.log('-------------');
console.log(person.fullName());