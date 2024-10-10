// functions in javascript
// functions ARE objects
function multiply(x, y) {
    return x * y;
}

console.log("result: " + multiply(8, 6));

// Function factory
function makeMultiplier(multiplier) {
    var myFunc = function (x) {
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
var obj_a = { x: 15 };
var obj_b = obj_a; // NOTE: Object b references object a
console.log("before: " + obj_a.x);
obj_b.x = 12;
console.log("after: " + obj_a.x);

if (obj_a === obj_b) {
    console.log("Objects are the same!");
}

// passing primitives to the function by value
function changePrimitive(primValue) {
    console.log("in changePrimitive...");
    console.log("before:");
    console.log(primValue);

    // TODO: Figure out how to generate random values
    primValue = 7;

    console.log("after:");
    console.log(primValue);
}

var primValue = -1235;
changePrimitive(primValue);
console.log("after calling changePrimitive: " + primValue);

// TODO: Do the same but with objects
var dog = {
    breed: "Shepard",
    name: "Rocky",
    age: 7.8
};

function modifyObject(dogObj) {
    console.log("in modifyObject...");
    console.log("before");
    console.log(dogObj);

    dogObj.age = 14;
    dogObj.name = "Luna";

    console.log("after");
    console.log(dogObj);
}

modifyObject(dog);
console.log("after calling modifyObject");
console.log(dog); // the object has been modified

// javascript array
var array = ["hello", "world", "second", "third", "fourth"];
console.log(array);

for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
}

var newArray = array.sort((a, b) => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }

    return 0;
});

console.log(newArray);

var intArray = [1, -234, 78, 200, -234, 88899, 0, -2344444];
console.log("before sorting array: " + intArray);

var sortedIntArray = intArray.sort((a, b) => {
    if (a > b) {
        console.log("%d > %d", a, b);
        return 1;
    } else if (a < b) {
        console.log("%d < %d", a, b);
        return -1;
    }
    return 0;
});

console.log(sortedIntArray);

function test() {
    console.log("hello from js");
}

// new execution context is created here
test();

// function ctor
function Circle(radius) {
    this.radius = radius;
}

Circle.prototype.getArea =
    function () {
        console.log("getArea() invoked");
        return Math.PI * Math.pow(this.radius, 2);
    };

Circle.prototype.getCircumference =
    function () {
        console.log("getCircumference() invoked");
        return 2 * Math.PI * this.radius;
    }

// new keyword is extremely important, 
// otherwise it would be a regular function call 
// we always have to make function ctor names capitalized
var myCircle = new Circle(10);
console.log("my circle: " + myCircle);
console.log("circle area: " + myCircle.getArea());
console.log("circle circumference: " + myCircle.getCircumference());

var anotherCircle = new Circle(20);
console.log("another circle: " + anotherCircle.getArea());

function Rectangle(sideA, sideB) {
    console.log("printing this object of a rectangle");
    console.log(this);
    this.sideA = sideA;
    this.sideB = sideB;
}

Rectangle.prototype.getArea =
    function () {
        console.log("Rectangle.getArea() is invoked");
        return this.sideA * this.sideB;
    }

Rectangle.prototype.peremeter =
    function () {
        console.log("Rectangle.peremeter() is invoked");
        return (2 * this.sideA) + (2 * this.sideB);
    }

// TODO: Implement prototype functions
var newRectangle = new Rectangle(14, 5);
console.log("area: " + newRectangle.getArea() + " units squared");
console.log("peremeter: " + newRectangle.peremeter() + " units squared");

// Object literals and "this"
var literalCircle = {
    radius: 10,

    getArea: function () {
        console.log(this);
        return Math.PI * Math.pow(this.radius, 2);
    },

    increaseRadius: function (newRadius) {
        console.log("increaseRadius() was invoked");
        this.radius += newRadius;
    }
};

console.log(literalCircle.getArea());
literalCircle.increaseRadius(4);
console.log("new area: " + literalCircle.getArea());

// Javascript arrays
var array = new Array();
array[0] = "Alexey"; 
array[1] = 2;
array[2] = function (name) {
    console.log("hello " + name);
};

// object
array[3] = {course: "HTML, CSS, JS"};

console.log(array);
console.log(array[2]("Alexey"));

// Special for loop used to traverse properties of an object
var myObject = {
    requestPath: "http://localhost:8080/root?query=12&query2=11",
    method: "GET",
    timestamp: 1234
};

for (var prop in myObject) {
    console.log(prop + ": " + myObject[prop]);
}

// NOTE: Arrays are just objects in javascript
for (var n in array) {
    console.log(prop + ": " + array[n]);
}