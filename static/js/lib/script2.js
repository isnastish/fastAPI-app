(function (window) {
    var johnGreeter = {};

    johnGreeter.name = "John Doe";
    johnGreeter.sayHi = function () {
        console.log("Hi " + johnGreeter.name);
    }  
    window.johnGreeter = johnGreeter;
})(window);