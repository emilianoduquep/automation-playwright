// Arrays: array is a collection of elements
let marks1 = Array(6); // this is one way to create an array of 6 elements
let marks2 = new Array(20, 40,35, 12,37);

// the most common way to declare an array is this
let marks3 = [20, 40,35, 12,37];

// to get accesto the elements of the array
console.log( marks3[3] );

// to change a value of an array
console.log( marks3 );
marks3[3] = 14;
console.log( marks3 );

// to count the size of an array use length
console.log(marks3.length);

// to add an element at the end of an array
marks3.push(88);
console.log( marks3 );

// to add an element at the beginning of an array
marks3.unshift(51);
console.log( marks3 );

// to remove an element at the end of an array
marks3.pop();
console.log( marks3 );

// find the index of an element
console.log(marks3.indexOf(37));

// verify if an element is present or included in the array (true or False)
console.log( marks3.includes(35) );

// slice() is good for taking an specific part of the array
console.log(marks3)
console.log(marks3.slice(1,4));
