var backgroundAudio = new Audio();
var animalSoundAudio = new Audio();
var dialogAudio = new Audio();
var resultAudio = new Audio();
var mouseOverAudio = new Audio();
var transitionAudio = new Audio();

/**
 * Defines a function to play audio files for n times.
 * @param {Audio} audio The audio variable.
 * @param {number} times The number of times the sound will be repeated (must not be less or equal zero).
 * @param {string} src The source file directory.
 * @param {function} playCallback An action to be excuted after the play start.
 * @param {function} callback An action to be excuted at after the n times only.
 */
var playAudio = function (audio, times = Infinity, src = undefined, playCallback = undefined, endCallback = undefined) {
    if (src)
        audio.src = src;
    if (times <= 0) {
        return;
    }
    else {
        audio.addEventListener("ended", function () {
            times--;
            if (times >= 1) {
                if (playCallback)
                    playCallback();
                audio.play();
            }
            else if (times === 0 && endCallback) {
                audio = new Audio();
                endCallback();
            }
        });
        audio.play();
        //possible redudndant block.
        if (playCallback)
            playCallback();
    }
};

/**
 * Defines a function to play audio files for n times.
 * @param {Audio} audio The audio variable.
 * @param {number} times The number of times the sound will be repeated (must not be less or equal zero).
 * @param {Array} src The source file directory.
 * @param {function} playCallback An action to be excuted after the play start.
 * @param {function} callback An action to be excuted at after the n times only.
 */
var playMultipleAudios = function (audio, times = Infinity, src = [], playCallback = undefined, endCallback = undefined) {
    times = times*src.length;
    if (times <= 0) {
        return;
    }
    audio.addEventListener("ended", function () {
        times--;
        if (times > 0) {
            playCallback();
            audio.src = src[times%src.length];
            audio.play();
        }
        else if (times===0 && endCallback) {
            audio = new Audio();
            endCallback();
        }
    });
    audio.src = src[times%src.length];
    audio.play();
};


$("#aMute").on('click', function () {
    backgroundAudio.volume = 1-backgroundAudio.volume;
    if($("#imgMute").attr('src')=='assets/images/Sound_off.png')
        $("#imgMute").attr('src','assets/images/Sound_on.png');
    else
        $("#imgMute").attr('src','assets/images/Sound_off.png');
});