// DOM manipulation
// window has an attribute document in it

console.log(document.getElementById("title"));
console.log(document instanceof Document);

// Nodes are the elements that make up a DOM
// HTML tags are "element nodes" (or just nodes)

function parseHtmlFile() {
    const elem = document.getElementById("name");
    console.log(elem.value);
    console.log(elem);

    var message = "Hello World";
    document.getElementById("content").textContent = message;

    var message = "<h2>Hello World</h2>";
    document.getElementById("content").innerHTML = message;

    var title = document.querySelector("#title"); 
    console.log(title);

    // Select h1 tag
    console.log(document.getElementById("title"));

    // get elements by class name
    console.log(document.getElementsByClassName("list-item"));

    const lisItemElements = document.getElementsByClassName("list-item");
    console.log(lisItemElements.length);
    console.log(lisItemElements.item(0).innerHTML);

    // display item 0
    console.log(lisItemElements.item(0));

    // get heading element
    console.log(document.getElementById("testing"));
    console.log(document.getElementById("element"));

    // more common selector
    // selects all the elements
    const listItemEl = document.querySelector(".list-item");
    console.log(listItemEl);

    // select all elements
    const nodeList = document.querySelectorAll(".list-item");
    for (let i = 0; i < nodeList.length; i++) {
        console.log(nodeList.item(i));
    }
    // select 
    console.log(document.querySelector("ul li:first-of-type"));
    console.log(document.querySelector("ul li:last-of-type"));

    const unorderedList = document.querySelector("ul");
    console.log(unorderedList.querySelector("li"));
}
