/**
 * Intializes the accent from local storage if valid otherwise set it to default value.
 */
var initializeAccent = function () {
    if (window['localStorage']['accent'] === "egypt" || window['localStorage']['accent'] === "gulf")
        setAccent(window['localStorage']['accent']);
    else
        setAccent("egypt"); // set default accent as "egypt"
}

/**
 * Sets the accent in local storage and in the web page.
 * @param {string} accent The accent to change to.
 */
var setAccent = function (accent) {
    if (accent === "egypt") {
        $("#accent").attr("src", "assets/images/egypt.png");
        window['localStorage']['accent'] = accent;
    }
    else if (accent === "gulf") {
        $("#accent").attr("src", "assets/images/gulf.png");
        window['localStorage']['accent'] = accent;
    }
};

$("#aEgypt").on('click', function (event) {
    setAccent("egypt");
});
$("#aGulf").on('click', function (event) {
    setAccent("gulf");
});