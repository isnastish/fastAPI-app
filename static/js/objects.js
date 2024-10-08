// An object is a collection of name-value pairs
var person = new Object();

person.firstName = "Jacob";
person.lastName = "Emerson";
person.dateOfBirth = 1999;

person.internal = new Object();
person.internal.secrete_info = "some secret into";

console.log(person);