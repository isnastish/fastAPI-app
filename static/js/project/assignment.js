function parseHTMLFile() {
    console.log("calling parseHTMLFile()");

    // first way of selecting task-1
    const task1Element = document.getElementById("task-1");
    // change background-color to black
    task1Element.style.backgroundColor = "black";
    task1Element.style.color = "white";

    console.log(task1Element);

    // second way of selecting task-1
    const task1Element2 = document.querySelector("#task-1");
    console.log(task1Element2);

    // third way 
    const task1Element3 = document.querySelector("ol");
    const liElement = task1Element3.querySelector("li");
    console.log(task1Element3);
    console.log(liElement);

    // change the document title to assignment solved
    const titleElement = document.querySelector("title");
    console.log(titleElement);
    titleElement.textContent = "Assignment - Solved!";

    // nested property of a document
    const headElement = document.querySelector("head");  
    const titleSubElement = headElement.querySelector("title");
    titleSubElement.textContent = "Assignment - Solved (2)!";

    // selecting h1 tag
    const h1Tag = document.querySelector("h1");
    console.log(h1Tag);
}

console.log("before calling parseHTMLFile()");
parseHTMLFile();
console.log("after calling parseHTMLFile()");
