function makeMultiplier(multiplier) {
    // var multiplier = 2;
    function b() {
        console.log("multiplier is: " + multiplier);
    }
    
    // print multiplier
    b();

    return (
        function (x) {
            return multiplier * x;
        }
    );
}

var doubleAll = makeMultiplier(2);
console.log(doubleAll(10));