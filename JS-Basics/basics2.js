const flag = true;

if (flag) {
    console.log('Condition Satisfied');
} else {
    console.log(flag);
    console.log('Condition not satisfied');
}


// while: this runs until a condition is fullfilled.
let i = 0;
while (i < 10) {
    i ++;
    console.log('I am inside a loop ' + i);
}

console.log('I am outside the loop');


// do-while: this runs until a condition is fullfilled.
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 10);

console.log('I am out of do-while loop');

// for: this runs a limited number of times.
const array1 = [1,2,3,4,5,6,7,8];
for (let k = 0; k < array1.length; k++) {
    console.log(array1[k]);
}

console.log('*************************');
for (let m = 0; m <= 20; m++){
    if(m %2 == 0 && m % 5 == 0){
        console.log(m)
    }
}
