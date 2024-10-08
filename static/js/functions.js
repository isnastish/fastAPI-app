// functions in javascript
// functions ARE objects
function multiply(x, y) {
    return x * y;
}

console.log("result: " + multiply(8, 6));

// Function factory
function makeMultiplier(multiplier) {
    var myFunc = function(x) {
        return multiplier * x;
    };
    return myFunc;
}

var multiplyBy3 = makeMultiplier(3);
// should result in 15
console.log(multiplyBy3(5));

var double = makeMultiplier(2);

console.log(double(4));

// Passing variables by reference or by value
// NOTE: Primitives are passed by value, objects are passed by reference
// everything is actually passed by value
var obj_a = {x: 15};
var obj_b = obj_a; // NOTE: Object b references object a
console.log("before: " + obj_a.x);
obj_b.x = 12;
console.log("after: " + obj_a.x);
