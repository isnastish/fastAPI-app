(function (window){
    var myGreeter = {};

    myGreeter.name = "Alexey Yevtusneko";
    myGreeter.sayHello = function () {
        console.log("Hello " + myGreeter.name);
    }
    window.myGreeter = myGreeter;
})(window);