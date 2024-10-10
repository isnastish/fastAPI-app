(function (window) {
    var byeSpeaker = {};

    byeSpeaker.speakWord = "Good Bye";
    byeSpeaker.speak = function (speakerName) {
        console.log(byeSpeaker.speakWord + " " + speakerName);
    };

    window.byeSpeaker = byeSpeaker;

})(window);