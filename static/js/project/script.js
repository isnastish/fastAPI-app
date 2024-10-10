// DOM manipulation
// window has an attribute document in it

console.log(document.getElementById("title"));
console.log(document instanceof Document);

function sayHello() {
    const elem = document.getElementById("name");
    console.log(elem.value);
    console.log(elem);

    var message = "Hello World";
    document.getElementById("content").textContent = message;

    var message = "<h2>Hello World</h2>";
    document.getElementById("content").innerHTML = message;

    var title = document.querySelector("#title"); 
    console.log(title);
}
