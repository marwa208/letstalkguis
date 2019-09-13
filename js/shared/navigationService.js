var currentMainPage;

/**
 * Sets the current main page index.
 * @param {number} index The index of main page.
 */
var setCurrentMainPage = function (index) {
    currentMainPage = index;
};

/**
 * Navigates to the current main page based on the stored index.
 */
var navigateToCurrentMainPage = function () {
    content_main(currentMainPage);
};

$("#aBack").on('click', function (event) {
    navigateToCurrentMainPage();
});