var content_phrases = function (index, i) {
    var animations = ["flipOutY animated", "flipInY animated"];
    var set_phrases_contents = function (subtitleParts, className, phrases) {
        var currentPhraseIndex = -1;
        var setHtmlContent = function () {
            var htmlContent = "";
            var setSubtitle = function () {
                var htmlContent = "";
                htmlContent += '<div class="col-md-12">';
                htmlContent += '<h2>' + subtitleParts.join(" - ") + '</h2>';
                htmlContent += '</div>';
                return htmlContent;
            };
            var setMainContent = function () {
                var htmlContent = "";
                htmlContent += '<div class="col-md-12">';
                htmlContent += '<section class="gallery bottom-40">';
                for (var i = 0; i < phrases.titles.length; i++) {
                    if (i % 5 === 0)
                        htmlContent += '<div class="row">';
                    htmlContent += '<div class="col-md-2 col-sm-3">';
                    htmlContent += '<div class="image-box">';
                    htmlContent += '<a class="popup" data-type="image" id="phrase' + i + '">';
                    htmlContent += '<img src="' + phrases.imgPath + i + '.png" alt="Image" class="fit-image">';
                    htmlContent += '</a>';
                    htmlContent += '</div>';
                    htmlContent += '</div>';
                    if ((i + 1) % 5 === 0)
                        htmlContent += '</div>';
                }
                htmlContent += '</section>';
                htmlContent += '<div class="clearfix"></div>';
                htmlContent += '</div>';
                return htmlContent;
            };

            htmlContent += '<div class="container">';
            htmlContent += '<div class="row">';
            htmlContent += setSubtitle();
            htmlContent += setMainContent();
            htmlContent += '</div>';
            htmlContent += '</div>';
            $("#contents").html(htmlContent);
        };
        var next = function () {

            // Disable next if the current phrase index is the last one
            if (currentPhraseIndex === phrases.titles.length - 1)
                return;
            playAudio(transitionAudio, 1, "assets/sounds/transition2.mp3");
            setTimeout(function () {
                showDialog(++currentPhraseIndex, phrases.titles.length, next, prev);
            }, 500);
        };
        var prev = function () {

            // Disable prev if the current phrase index is the first one
            if (currentPhraseIndex === 0)
                return;
            playAudio(transitionAudio, 1, "assets/sounds/transition2.mp3");
            setTimeout(function () {
                showDialog(--currentPhraseIndex, phrases.titles.length, next, prev);
            }, 500);
        };
        var setDialogContent = function () {
            var htmlContent = '';
            htmlContent += '<img id="dialogImg">';
            htmlContent += '<h3 id="dialogTitle"></h3>';
            htmlContent += '<div id="dialogControls" class="bottom-controls">';
            htmlContent += '<span id="btnNext"><a href="#" title="التالي"><i class="fa fa-chevron-right fa-lg"></i></a></span>';
            htmlContent += '<span><a href="index.html">الرئيسية<i class="fa fa-home fa-lg"></i></a></span>';
            htmlContent += '<span id="btnContentMain"><a href="#">المستويات<i class="fa fa-sitemap fa-lg"></i></a></span>';
            htmlContent += '<span id="btnPlayAudio"><a href="#">استماع<i class="fa fa-bullhorn fa-lg"></i></a></span>';
            htmlContent += '<span id="btnPrev"><a href="#" title="السابق"><i class="fa fa-chevron-left fa-lg"></i></a></span>';
            htmlContent += '</div>';

            initializeDialog(htmlContent, className, closeDialogCallback);
            $("#btnPlayAudio").on('click', function () {
                playAudio(dialogAudio, 3);
            });
            $("#btnContentMain").on('click', function () {
                closeDialog();
                resetDialog();
                navigateToCurrentMainPage();
            });
        };
        var closeDialogCallback = function () {
            dialogAudio.pause();
            // if(isBackgroundAudioEnabled)
                playAudio(backgroundAudio, Infinity);
        };
        var showDialog = function (current, count, next, prev) {
            if (isAutoModeEnabled)
                $("#dialogControls").addClass("hidden");
            else {
                $("#dialogControls").removeClass("hidden");
                refreshNextPrev(current, count, next, prev);
            }

            backgroundAudio.pause();
            $("#dialog").dialog("open");
            $("#dialogImg").attr("src", phrases.imgPath + "/large/" + current + ".png");
            setElementBasedOnAccent("dialogTitle", phrases.titles[current]);

            setAnimationThenRemove("dialogImg", phrases.animationClass, function () {
                const rand = Math.floor(Math.random() * animations.length);
                var animate = function () {
                    setAnimationThenRemove("dialogImg", animations[rand])
                };
                if (isAutoModeEnabled)
                    playAudio(dialogAudio, 3, phrases.audioPath + window['localStorage']['accent'] + "/" + current + ".mp3", animate, next);
                else
                    playAudio(dialogAudio, 3, phrases.audioPath + window['localStorage']['accent'] + "/" + current + ".mp3", animate);
            });
        };

        setHtmlContent();
        resetDialog();
        setDialogContent();
        $("[id^=phrase]").click(function (event) {
            dialogAudio = new Audio();
            currentPhraseIndex = parseInt(event.currentTarget.id.replace("phrase", ""), 10);
            if (isAutoModeEnabled)
                showDialog(currentPhraseIndex, phrases.titles.length, next, prev);
            else
                showDialog(currentPhraseIndex, phrases.titles.length, next, prev);
        });
    };

    refreshBody(true, true, true);
    setTitle([data.appName, data.indexPage.contents[index].title, data.indexPage.subPages.contents[i].title]);
    set_phrases_contents([data.indexPage.contents[index].title, data.indexPage.subPages.contents[i].title],
        data.indexPage.subPages.subPages.contents[index].class,
        data.indexPage.subPages.subPages.contents[index].phrases);
    playAudio(backgroundAudio, Infinity, data.indexPage.subPages.subPages.contents[index].audioPath);
};