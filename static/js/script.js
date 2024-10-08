var x = 12;
var globalVar = "global scope";
var newObject = {
    first: "First",
    second: "Second",
};

var undef;

if (undef == undefined) {
    console.log("variable is undefined");
}

function helloWorld() {
    console.log("hello world");
}

function someFunc() {
    console.log("contents of some func");
}

/**
 * Compare two variables, x and y, return the result of comparison. 
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function compare(x, y) {
    if (x > y) {
        return 1;
    } else if (x < y) {
        return -1;
    }
    return 0;
}

function printGlobalVar() {
    var globalVar = "redefined global variable";
    console.log("global variable = " + globalVar);

    function nestedPrint() {
        console.log("global variable = " + globalVar);
    }
    nestedPrint();
}

/**
 * Compute factorial of a number. 
 * @param {*} number 
 * @returns 
 */
function factorial(number) {
    if (number == 0 || number == 1) {
        return 1;
    }
    return number * factorial(number - 1);
}

function foo() {
    console.log("hello foo");
}

// number type is 64-bit double
// string
// symbol (supported by ES6)