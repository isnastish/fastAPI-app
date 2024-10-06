var x = 12;
var globalVar = "global scope";

function helloWorld() {
    console.log("hello world");
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
