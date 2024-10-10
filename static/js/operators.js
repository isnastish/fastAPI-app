var string = "javascript string";
string += "type";

console.log(string + "!");

// math operators
console.log((5 * 4) / 5);
console.log(undefined / 5);

function div(num) {
    if (num != 0) {
        return num / 2;
    }
    console.log("cannot divide by zero");
    return NaN;
}

div(0);
div();

// Equality operator
var x = 4, y = 4;
if (x == y) {
    console.log("x=4 is equal to y=4");
}

x = "4";
if (x === y) {
    console.log("x='4' is equal to y=4");
} else {
    console.log("x='4' is not equal to y=4");
}

if (false || null | undefined || "" || 0 || NaN) {
    console.log("this line will never get executed");
} else {
    console.log("everything is false");
}

if (true && "string" && 1 && -1 && "false") {
    console.log("all true");
}

function helloWorld() {
    var result = Boolean("string");
    console.log(result);
}

function getObject() {
    return {
        firstName: "FirstName", 
        lastName: "LastName",
        birthDate: "BirthDate",
    };
}

// NOTE: Arguments are optional in javascript
const assert = function(condition, message) {
    if (!(condition)) {
        message = message || "message not specified!";
        // Is equivalent to 
        // if (message === undefined) {
        //     message = "default message";
        // }
        throw Error('Assert failed: ' + (message || ''));
    }
}

function loop(num) {
    assert(num >= 0);

    var sum = 0;
    for (var i = 0; i < num; i++) {
        sum += i;
    }
    console.log("sum of all elements: " + sum);
}

var z = 10;
if ((null) || (console.log("Hello")) || z > 15) {
    console.log("Hello");
} 