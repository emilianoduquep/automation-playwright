let day = 'tuesday ';

// get the length
console.log(day.length);

// take a sub string
console.log( day.slice(0,4) );

// get only one postion of the string
console.log(day[3]);

// split an array
let splitDay = day.split('s');
console.log(splitDay[1].trim().length);

// convert strings to integers
let date = '23';
let nextDate = '27';
let diff = parseInt(nextDate) - parseInt(date);
console.log(diff);

console.log(diff.toString() );

// concatenate two strings
let newQuote = day + 'is funday'
console.log(newQuote);

// The second argument in the indexOf() method, is to start from that possition on.
let val0 = newQuote.indexOf('day',6); // this method helps where the character is pressent.
console.log(val0);

// includes() lets us know if the word is inside the string
console.log(newQuote.includes('day'));


// this is to let us know how many times the word 'day' is repeated in the string
let count = 0;
let val = newQuote.indexOf('day');
while(val != -1) {
    count++;
    val = newQuote.indexOf('day',  val + 1);
}
console.log(count);