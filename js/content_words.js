var content_words = function(index, i) {
    var animations = ["flipOutY animated", "flipInY animated"];
    var set_words_contents = function(subtitleParts, className, words) {
        var currentWordIndex = -1;
        var setHtmlContent = function() {
            var htmlContent = "";
            var setSubtitle = function() {
                var htmlContent = "";
                htmlContent += '<div class="col-md-12">';
                htmlContent += '<h2>' + subtitleParts.join(" - ") + '</h2>';
                htmlContent += '</div>';
                return htmlContent;
            };
            var setMainContent = function() {
                var htmlContent = "";
                htmlContent += '<div class="col-md-12">';
                htmlContent += '<section class="gallery bottom-40">';
                for (var i = 0; i < (words.titles.length < 28 ? words.titles.length : 28); i++) {
                    if (i % 7 === 0)
                        htmlContent += '<div class="row">';
                    htmlContent += '<div class="col-md-2 col-sm-3">';
                    htmlContent += '<div class="image-box">';
                    htmlContent += '<a class="popup" data-type="image" id="word' + i + '">';
                    htmlContent += '<img src="' + words.imgPath + i + '.png" alt="Image" class="fit-image">';
                    htmlContent += '</a>';
                    htmlContent += '</div>';
                    htmlContent += '</div>';
                    if ((i + 1) % 7 === 0)
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
        var next = function() {
            // Disable next if the current word index is the last one
            if (currentWordIndex === words.titles.length - 1)
                return;
            playAudio(transitionAudio, 1, "assets/sounds/transition.mp3");
            setTimeout(function() {
                showDialog(++currentWordIndex, words.titles.length, next, prev);
            }, 500);
        };
        var prev = function() {
            // Disable prev if the current word index is the first one
            if (currentWordIndex === 0)
                return;
            playAudio(transitionAudio, 1, "assets/sounds/transition.mp3");
            setTimeout(function() {
                showDialog(--currentWordIndex, words.titles.length, next, prev);
            }, 500);
        };
        var setDialogContent = function() {
            var htmlContent = '';
            htmlContent += '<img id="dialogImg">';
            htmlContent += '<h3 id="dialogTitle"></h3>';
            htmlContent += '<div id="dialogControls" class="bottom-controls">';
            htmlContent += '<span id="btnNext"><a href="#" title="التالي"><i class="fa fa-chevron-right fa-lg"></i></a></span>';
            htmlContent += '<span><a href="index.html">الرئيسية<i class="fa fa-home fa-lg"></i></a></span>';
            htmlContent += '<span id="btnContentMain"><a href="#">المستويات<i class="fa fa-sitemap fa-lg"></i></a></span>';
            htmlContent += '<span id="btnPlayNameAudio"><a href="#">انطق الاسم<i class="fa fa-bullhorn fa-lg"></i></a></span>';
            htmlContent += '<span id="btnPlaySoundAudio"><a href="#">استماع للصوت<i class="fa fa-volume-up fa-lg"></i></a></span>';
            htmlContent += '<span id="btnPrev"><a href="#" title="السابق"><i class="fa fa-chevron-left fa-lg"></i></a></span>';
            htmlContent += '</div>';

            initializeDialog(htmlContent, className, closeDialogCallback);
            $("#btnPlayNameAudio").on('click', function() {
                playAudio(dialogAudio, 3, `${words.audioPath}${window['localStorage']['accent']}/${currentWordIndex}.mp3`);
            });
            $("#btnPlaySoundAudio").on('click', function() {
                playAudio(dialogAudio, 3, `${words.audioPath}animal/${currentWordIndex}.mp3`);
            });
            $("#btnContentMain").on('click', function() {
                closeDialog();
                resetDialog();
                navigateToCurrentMainPage();
            });
        };
        var closeDialogCallback = function() {
            dialogAudio.pause();
            // if(isBackgroundAudioEnabled)
                playAudio(backgroundAudio, Infinity);
        };
        var showDialog = function(current, count, next, prev) {
            if (isAutoModeEnabled) {
                $("#dialogControls").addClass("hidden");
            } else {
                $("#dialogControls").removeClass("hidden");
                refreshNextPrev(current, count, next, prev);
            }

            backgroundAudio.pause();
            $("#dialog").dialog("open");
            $("#dialogImg").attr("src", words.imgPath + "/large/" + current + ".png");
            setElementBasedOnAccent("dialogTitle", words.titles[current]);

            setAnimationThenRemove("dialogImg", words.animationClass, function() {
                const rand = Math.floor(Math.random() * animations.length);
                var animate = function() {
                    setAnimationThenRemove("dialogImg", animations[rand])
                };
                if (isAutoModeEnabled)
                    playMultipleAudios(dialogAudio, 3,
                        [words.audioPath + window['localStorage']['accent'] + "/" + current + ".mp3", `${words.audioPath}animal/${current}.mp3`], animate, next);
                else
                    playMultipleAudios(dialogAudio, 3,
                        [words.audioPath + window['localStorage']['accent'] + "/" + current + ".mp3", `${words.audioPath}animal/${current}.mp3`], animate);
            });
        };

        setHtmlContent();
        resetDialog();
        setDialogContent();
        $("[id^=word]").click(function(event) {
            dialogAudio = new Audio();
            currentWordIndex = parseInt(event.currentTarget.id.replace("word", ""),10);
            if (isAutoModeEnabled)
                showDialog(currentWordIndex, words.titles.length, next, prev);
            else
                showDialog(currentWordIndex, words.titles.length, next, prev);
        });
    };

    refreshBody(true, true, true);
    setTitle([data.appName, data.indexPage.contents[index].title, data.indexPage.subPages.contents[i].title]);
    set_words_contents([data.indexPage.contents[index].title, data.indexPage.subPages.contents[i].title],
        data.indexPage.subPages.subPages.contents[index].class,
        data.indexPage.subPages.subPages.contents[index].words);
    playAudio(backgroundAudio, Infinity, data.indexPage.subPages.subPages.contents[index].audioPath);
};