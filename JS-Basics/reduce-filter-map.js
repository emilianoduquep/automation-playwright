// reduce()
const marks1 = [5, 10, 25, 32, 41]
const total = marks1.reduce((accumulator, totalSum) => accumulator + totalSum,0);
console.log(marks1);
console.log(total);

// in this example we want to print only the even numbers
const scores = [12, 13, 14, 16];
let newScores = [];
for(let i = 0; i < scores.length; i++){
    if(scores[i] % 2 == 0) {
        newScores.push(scores[i]);
    }
}
console.log(newScores);

// filter() will do the same as above.
const evenScores = scores.filter(score => score % 2 == 0);
console.log(evenScores);

// map() 
const multiplayBy3 = scores.map(score => score * 3);
console.log(scores);
console.log(multiplayBy3);

let fruits = ['Banana', 'mango', 'pomegranate', 'apple'];

console.log(fruits);
console.log(fruits.sort());

const numbersUnsorted = [45,12,78,32,47];
console.log(numbersUnsorted.sort());