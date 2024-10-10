(function (window) {
    var helloSpeaker = {};

    helloSpeaker.speakWord = "Hello";
    helloSpeaker.speak = function (speakName) {
        console.log(helloSpeaker.speakWord + " " + speakName);
    };

    // bind speaker to the global window object
    window.helloSpeaker = helloSpeaker;

})(window);