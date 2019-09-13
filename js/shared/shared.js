/**
 * Set the body main content.
 * @param {boolean} isBackEnabled A boolean if it sets to true the back button will show otherwise not.
 * @param {boolean} isAutoEnables A boolean if it sets to true the auto button will show otherwise not.
 * @param {boolean} isMuteEnabled A boolean if it sets to true the mute button will show otherwise not.
 */
var refreshBody = function (isBackEnabled = false, isAutoEnables = false, isMuteEnabled = false) {
    var refreshFooterImages = function () {
        var htmlContent = "";
        htmlContent += '<div class="footer-images">';
        htmlContent += '<div id="rainbow" class="animated" data-fx="bounceInLeft">';
        htmlContent += '<img src="assets/images/rainbow.png" alt="rainbow image">';
        htmlContent += '</div>';
        htmlContent += '<div id="wave3"></div>';
        htmlContent += '<div id="island" class="animated" data-fx="fadeInUp">';
        htmlContent += '<img src="assets/images/island.png" alt="island image">';
        htmlContent += '</div>';
        htmlContent += '<div id="wave2"></div>';
        htmlContent += '<div id="boat" class="animated" data-fx="fadeInUp">';
        htmlContent += '<img src="assets/images/boat.png" alt="boat image">';
        htmlContent += '</div>';
        htmlContent += '<div id="wave1"></div>';
        htmlContent += '</div>';

        $("#footerImages").html(htmlContent);
    };
    var refreshAnimations = function () {
        var refreshClouds = function () {
            // Refresh clouds
            jQuery('#parallax .cloud1')
                .parallax({
                    decay: 0.5,
                    width: 100,
                    height: 100,
                    yorigin: 0.15,
                    xorigin: 0.03,
                    yparallax: '20px',
                    xparallax: '100px'
                });
            jQuery('#parallax .cloud2')
                .parallax({
                    decay: 0.9,
                    width: 200,
                    height: 50,
                    yorigin: 0.08,
                    xorigin: 0.9,
                    yparallax: '50px',
                    xparallax: '50px'
                });
            jQuery('#parallax .cloud3')
                .parallax({
                    decay: 0.97,
                    width: 600,
                    height: 50,
                    yorigin: 0.7,
                    xorigin: 0,
                    yparallax: '50px',
                    xparallax: '200px'
                });
            jQuery('#parallax .cloud4')
                .parallax({
                    decay: 0.97,
                    width: 600,
                    height: 50,
                    yorigin: 0,
                    xorigin: 0.9,
                    yparallax: '50px',
                    xparallax: '200px'
                });
            jQuery('#parallax .cloud5')
                .parallax({
                    decay: 0.70,
                    width: 600,
                    height: 50,
                    yorigin: 0.0,
                    xorigin: 0.26,
                    yparallax: '10px',
                    xparallax: '10px'
                });
            jQuery('#parallax .cloud6')
                .parallax({
                    decay: 0.70,
                    width: 600,
                    height: 50,
                    yorigin: 0.52,
                    xorigin: 0.95,
                    yparallax: '50px',
                    xparallax: '100px'
                });
            // Refresh mouse moving effect
            jQuery("body").mouseenter();
        };
        var refreshWaves = function () {
            if (jQuery().spritely && jQuery('body').hasClass("withAnimation") && !jQuery.browser.msie) {
                jQuery('#wave1').pan({ fps: 60, speed: 0.6, dir: 'left' });
                jQuery('#wave2').pan({ fps: 60, speed: 0.4, dir: 'right' });
                jQuery('#wave3').pan({ fps: 60, speed: 0.3, dir: 'left' });
            }

            if (jQuery.browser.msie) {
                jQuery('#wave2').css("background-position", "25px");
            }
        };

        $.getScript("assets/js/main.js");
        refreshClouds();
        refreshWaves();
    };
    var refreshBackButton = function () {
        if (isBackEnabled === false) {
            $("#btnBack").addClass("hidden");
        }
        else {
            $("#btnBack").removeClass("hidden");
        }
    };
    var refreshAutoButton = function () {
        if (isAutoEnables === false) {
            $("#btnAuto").addClass("hidden");
        }
        else {
            $("#btnAuto").removeClass("hidden");
        }
    };
    var refreshMuteButton = function () {
        if(isMuteEnabled){
            $("#btnMute").removeClass("hidden");
        }
        else {
            $("#btnMute").addClass("hidden");
        }
    };

    refreshFooterImages();
    refreshAnimations();
    refreshBackButton();
    refreshAutoButton();
    refreshMuteButton();
};

/**
 * Set the page title by combining array by ' | '.
 * @param {Array} titleParts The title parts.
 */
var setTitle = function (titleParts) {
    $("#pageTitle").html(titleParts.join(" | "));
};

/**
 * Sets an element based on the accent.
 * @param {string} elementId The element ID.
 * @param {TitleObject} valueObject The title object.
 */
var setElementBasedOnAccent = function (elementId, valueObject) {
    if (window['localStorage']['accent'] === "egypt")
        $("#" + elementId).html(valueObject.egp_title);
    else if (window['localStorage']['accent'] === "gulf")
        $("#" + elementId).html(valueObject.gulf_title);
};

/**
 * Refresh the previous and next behaviour.
 * @param {number} current The current index.
 * @param {number} count The count of elements.
 * @param {function} next The next function callback.
 * @param {function} prev The previous function callback.
 */
var refreshNextPrev = function (current, count, next, prev) {
    if (current === 0) {
        $("#btnPrev").addClass("deactive");
        $("#btnNext").removeClass("deactive");
        $("#btnPrev").unbind("click");
        $("#btnNext").unbind("click");
        $("#btnNext").bind("click", function () {
            next();
        });
        $("html").unbind("keyup");
        $("html").bind("keyup", function (event) {
            if (event.which === 39)
                next();
        });
    }
    else if (current === count - 1) {
        $("#btnNext").addClass("deactive");
        $("#btnPrev").removeClass("deactive");
        $("#btnPrev").unbind("click");
        $("#btnNext").unbind("click");
        $("#btnPrev").bind("click", function () {
            prev();
        });
        $("html").unbind("keyup");
        $("html").bind("keyup", function (event) {
            if (event.which === 37)
                prev();
        });
    }
    else {
        $("#btnPrev").removeClass("deactive");
        $("#btnNext").removeClass("deactive");
        $("#btnPrev").unbind("click");
        $("#btnNext").unbind("click");
        $("#btnPrev").bind("click", function () {
            prev();
        });
        $("#btnNext").bind("click", function () {
            next();
        });
        $("html").unbind("keyup");
        $("html").bind("keyup", function (event) {
            if (event.which === 39)
                next();
            else if (event.which === 37)
                prev();
        });
    }
};

/**
 * Add animation class for a period then removes it when it ends.
 * @param {string} elementId The element ID.
 * @param {string} animationName The class name.
 * @param {function} callback An action to be excuted after the animation end.
 */
var setAnimationThenRemove = function (elementId, animationName, callback = null) {
    $("#" + elementId).removeClass().addClass(animationName).one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
            $(this).removeClass(animationName);
            if (callback)
                callback();
        });
};