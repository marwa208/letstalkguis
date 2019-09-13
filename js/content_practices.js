var content_practices = function (index, i) {
    var set_practices_contents = function (subtitleParts, className, practices) {
        var currentPracticeIndex = -1;
        var isNextPrevClicked = false;
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
                for (var i = 0; i < practices.titles.length; i++) {
                    if (i % 5 === 0)
                        htmlContent += '<div class="row">';
                    htmlContent += '<div class="col-md-2 col-sm-3">';
                    htmlContent += '<div class="image-box">';
                    htmlContent += '<a class="popup" data-type="image" id="practice' + i + '">';
                    htmlContent += '<img src="assets/images/numbers/' + i + '.png" alt="Image" class="fit-image">';
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
            // Disable next if the current practice index is the last one
            if (currentPracticeIndex === practices.titles.length - 1)
                return;
            isNextPrevClicked = true;
            playAudio(transitionAudio, 1, "assets/sounds/transition3.mp3");
            setTimeout(function () {
                showDialog(++currentPracticeIndex, practices.titles.length, next, prev);
            }, 500);
        };
        var prev = function () {
            // Disable prev if the current practice index is the first one
            if (currentPracticeIndex === 0)
                return;
            isNextPrevClicked = true;
            playAudio(transitionAudio, 1, "assets/sounds/transition3.mp3");
            setTimeout(function () {
                showDialog(--currentPracticeIndex, practices.titles.length, next, prev);
            }, 500);
        };
        var setDialogContent = function () {
            var htmlContent = '';
            htmlContent += '<h3>استمع واختر الاجابة الصحيحة</h3>';
            htmlContent += '<div id="choose" class="choose"></div>';
            htmlContent += '<div id="positive" style="top: 315px;"><img src="assets/images/right1.gif"></div>';
            htmlContent += '<div id="negative" style="top: 315px;"><img src="assets/images/wrong1.gif"></div>';
            htmlContent += '<h3 id="dialogTitle"></h3>';
            htmlContent += '<div class="bottom-controls">';
            htmlContent += '<span id="btnNext"><a href="#"  title="التالي"> <i class="fa fa-chevron-right fa-lg"></i></a></span>';
            htmlContent += '<span><a href="index.html">الرئيسية<i class="fa fa-home fa-lg"></i></a></span>';
            htmlContent += '<span id="btnContentMain"><a href="#" >المستويات<i class="fa fa-sitemap fa-lg"></i></a></span>';
            htmlContent += '<span id="btnPlayAudio"><a href="#">استماع<i class="fa fa-bullhorn fa-lg"></i></a></span>';
            htmlContent += '<span id="btnPrev"><a href="#"  title="السابق"> <i class="fa fa-chevron-left fa-lg"></i></a></span>';
            htmlContent += '</div>';

            initializeDialog(htmlContent, className, closeDialogCallback);
            $("#btnPlayAudio").on('click', function () {
                playAudio(dialogAudio, 1);
            });
            $("#btnContentMain").on('click', function () {
                closeDialog();
                resetDialog();
                navigateToCurrentMainPage();
            });
        };
        var closeDialogCallback = function () {
            dialogAudio.pause();
            resultAudio.pause();
            // if(isBackgroundAudioEnabled)
                playAudio(backgroundAudio, Infinity);
        };
        var showDialog = function (current, count, next, prev) {
            var mode = practices.titles[current].mode;
            var indexs = shuffleArray(addFromRange([current], mode - 1, practices.titles.length - 1));
            var initializePractice = function () {
                var htmlContent = "";
                for (var i = 0; i < mode; i++) {
                    htmlContent += '<img id="chooseImg' + indexs[i] + '" src="' + practices.imgPath + indexs[i] + '.png" alt="Image" class="optionImg">';
                }
                $("#choose").html(htmlContent);

                $("[id^=chooseImg]").click(function (event) {
                    isNextPrevClicked = false;
                    dialogAudio.pause();
                    if (parseInt(event.target.id.replace("chooseImg", "")) === current) {
                        // play rightAnswer sound here
                        playAudio(resultAudio, 1, "assets/sounds/right.mp3");
                        $("#positive").css("display", "inline-block");

                        setTimeout(function () {
                            $("#positive").css("display", "none");
                        }, 3000);

                        setTimeout(function () {
                            if (!isNextPrevClicked && isDialogOpen())
                                next();
                        }, 3000);
                    }
                    else {
                        playAudio(resultAudio, 1, "assets/sounds/wrong.mp3");
                        $("#negative").css("display", "inline-block");

                        setTimeout(function () {
                            $("#negative").css("display", "none");
                        }, 2000);
                    }
                });
            }

            $("#positive, #negative").css("display", "none");
            resultAudio.pause();
            backgroundAudio.pause();
            refreshNextPrev(current, count, next, prev);
            $("#dialog").dialog("open");
            initializePractice();
            playAudio(dialogAudio, 1, practices.audioPath + window['localStorage']['accent'] + "/" + current + ".mp3");
            setElementBasedOnAccent("dialogTitle", practices.titles[current]);
        };

        setHtmlContent();
        resetDialog();
        setDialogContent();
        $("[id^=practice]").click(function (event) {
            currentPracticeIndex = parseInt(event.currentTarget.id.replace("practice", ""), 10);
            showDialog(currentPracticeIndex, practices.titles.length, next, prev);
        });
    };

    refreshBody(true, false, true);
    setTitle([data.appName, data.indexPage.contents[index].title, data.indexPage.subPages.contents[i].title]);
    set_practices_contents([data.indexPage.contents[index].title, data.indexPage.subPages.contents[i].title],
        data.indexPage.subPages.subPages.contents[index].class,
        data.indexPage.subPages.subPages.contents[index].practices);
    playAudio(backgroundAudio, Infinity, data.indexPage.subPages.subPages.contents[index].audioPath);
};