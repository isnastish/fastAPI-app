// An object is a collection of name-value pairs
var person = new Object();

person.firstName = "Jacob";
person.lastName = "Emerson";
person.dateOfBirth = 1999;

person.internal = new Object();
person.internal.secrete_info = "some secret into";

// create "height in cm" property
person["height in cm"] = 180;

console.log(person);

console.log("Person's first name: " + person.firstName);
console.log("Person's last name: " + person.lastName);
console.log("Person's height: " + person["height in cm"]);

// easier way of creating objects
var anotherPerson = {
    firstName: "Alexey", 
    secondName: "Yevtushenko", 
    dateOfBirth: 2000,
};

console.log("This is me: " + anotherPerson);

// this is the object literal notation
var facebook = {
    name: "Facebook",
    ceo: {
        firstName: "Mark",
        lastName: "Zuckerberg",
        favColor: "blue"
    },
    // $stock: 110
    "stock of company": 100
};

console.log(facebook);