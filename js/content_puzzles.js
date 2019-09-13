var content_puzzles = function (index, i) {
    var set_puzzles_contents = function (subtitleParts, className, puzzles) {
        var currentPuzzleIndex = -1;
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
                for (var i = 0; i < puzzles.titles.length; i++) {
                    if (i % 5 === 0)
                        htmlContent += '<div class="row">';
                    htmlContent += '<div class="col-md-2 col-sm-3">';
                    htmlContent += '<div class="image-box">';
                    htmlContent += '<a class="popup" data-type="image" id="puzzle' + i + '">';
                    htmlContent += '<img src="' + puzzles.imgPath + i + '.png" alt="Image" class="fit-image">';
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
            // Disable next if the current puzzle index is the last one
            if (currentPuzzleIndex === puzzles.titles.length - 1)
                return;
            playAudio(transitionAudio, 1, "assets/sounds/transition4.mp3");
            isNextPrevClicked = true;
            setTimeout(function () {
                showDialog(++currentPuzzleIndex, puzzles.titles.length, next, prev);
            }, 500);
        };
        var prev = function () {
            // Disable prev if the current puzzle index is the first one
            if (currentPuzzleIndex === 0)
                return;
            playAudio(transitionAudio, 1, "assets/sounds/transition4.mp3");
            isNextPrevClicked = true;
            setTimeout(function () {
                showDialog(--currentPuzzleIndex, puzzles.titles.length, next, prev);
            }, 500);
        };
        var setDialogContent = function () {
            var htmlContent = '';
            htmlContent += '<h3>كوّن الشكل الصحيح</h3>';
            htmlContent += '<div id="divDraggables"></div>';
            htmlContent += '<div class="clearfix"></div>';
            htmlContent += '<div id="positive" style="top:100px"><img src="assets/images/right1.gif"></div>';
            htmlContent += '<div id="negative" style="top:100px"><img src="assets/images/wrong1.gif"></div>';
            htmlContent += '<div class="clearfix"></div>';
            htmlContent += '<div id="divDroppables"></div>';
            htmlContent += '<div class="clearfix"></div>';
            htmlContent += '<div class="bottom-controls">';
            htmlContent += '<span id="btnNext"><a href="#"  title="التالي"> <i class="fa fa-chevron-right fa-lg"></i></a></span>';
            htmlContent += '<span><a href="index.html">الرئيسية<i class="fa fa-home fa-lg"></i></a></span>';
            htmlContent += '<span id="btnContentMain"><a href="#" >المستويات<i class="fa fa-sitemap fa-lg"></i></a></span>';
            htmlContent += '<span id="btnReset"><a href="#" >إعادة<i class="fa fa-undo fa-lg"></i></a></span>';
            htmlContent += '<span id="btnPrev"><a href="#"  title="السابق"> <i class="fa fa-chevron-left fa-lg"></i></a></span>';
            htmlContent += '</div>';

            initializeDialog(htmlContent, className, closeDialogCallback);
            $("#btnReset").click(function () {
                showDialog(currentPuzzleIndex, puzzles.titles.length, next, prev);
            });
            $("#btnContentMain").on('click', function () {
                closeDialog();
                resetDialog();
                navigateToCurrentMainPage();
            });
        };
        var closeDialogCallback = function () {
            resultAudio.pause();
            // if(isBackgroundAudioEnabled)
                playAudio(backgroundAudio, Infinity);
        };
        var showDialog = function (current, count, next, prev) {
            setDialogContent();
            var mode = puzzles.titles[current].mode;
            var answerProgress = mode;
            var indexs = shuffleArray(createSequence(0, mode - 1, 1));
            var evaluateDrop = function (self, event, ui) {
                var checkCorrectAnswer = function (dropIndex, dragIndex) {
                    mode--;
                    if (dragIndex === dropIndex)
                        answerProgress -= 1;
                    if (mode === 0) {
                        isNextPrevClicked = false;
                        if (answerProgress === 0) {
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
                        } else {
                            playAudio(resultAudio, 1, "assets/sounds/wrong.mp3");
                            $("#negative").css("display", "inline-block");

                            setTimeout(function () {
                                $("#negative").css("display", "none");
                            }, 2000);
                            setTimeout(function () {
                                if (!isNextPrevClicked && isDialogOpen())
                                    showDialog(current, puzzles.titles.length, next, prev);
                            }, 3000);
                        }
                    }
                };
                var drop_p = self.offset();
                var drag_p = ui.draggable.offset();
                var left_end = drop_p.left - drag_p.left + 1;
                var top_end = drop_p.top - drag_p.top + 1;

                ui.draggable.animate({
                    top: '+=' + top_end,
                    left: '+=' + left_end
                });
                ui.draggable.draggable('disable', undefined, undefined);
                self.droppable('disable');
                $("#" + ui.draggable.attr('id')).attr("class", "optionImg ui-draggable ui-draggable-handle ui-draggable-disabled");
                checkCorrectAnswer(event.target.id.replace('drop', ''), ui.draggable.attr('id').replace('drag', ''));
            };
            var intializePuzzle = function () {
                var setDragabbles = function () {
                    var htmlContent = "";
                    for (var j = 0; j < mode; j++) {
                        htmlContent += '<img id="drag' + indexs[j] + '" src="' + puzzles.imgPath + "parts/" + current + "_" + indexs[j] + ".png" +
                            '" alt="Image" class="optionImg">';
                    }
                    $("#divDraggables").html(htmlContent);
                    $("#divDraggables").removeClass();
                    $("#divDraggables").addClass("dragdrop draggables" + mode);
                }
                var setDroppables = function () {
                    var htmlContent = "";
                    for (var j = 0; j < mode; j++) {
                        if (j === mode / 2)
                            htmlContent += '<div class="clearfix"></div>';
                        htmlContent += '<div id="drop' + j + '"' + ' class="piece-drop"></div>';
                    }
                    $("#divDroppables").html(htmlContent);
                    $("#divDroppables").removeClass();
                    $("#divDroppables").addClass("droppables" + mode);
                }

                setDragabbles();
                setDroppables();
                // drag and drop
                $("[id^=drag]").filter(".optionImg").draggable(undefined, undefined, undefined);
                $("[id^=drag]").filter(".optionImg").draggable("option", "stack", ".ui-draggable");
                $("[id^=drag]").filter(".optionImg").draggable({
                    revert: "invalid"
                }, undefined, undefined);
                $("[id^=drag]").filter(".optionImg").draggable({
                    snap: "[id^=drop]"
                }, undefined, undefined);
                $("[id^=drop]").droppable({
                    accept: $("[id^=drag]").filter(".optionImg"),
                    drop: function (event, ui) {
                        evaluateDrop($(this), event, ui);
                    }
                }, undefined, undefined);
            };

            $("#positive, #negative").css("display", "none");
            resultAudio.pause();
            backgroundAudio.pause();
            refreshNextPrev(current, count, next, prev);
            $("#dialog").dialog("open");

            // get dialog content and view image then remove it
            $("html").unbind("keyup");
            $("#dialog").html("<div><img src='" + puzzles.imgPath + "/large/" + current + ".png"+"'></div>")
            setTimeout(function () {
                if (isDialogOpen() && current === currentPuzzleIndex) {
                    setDialogContent();
                    refreshNextPrev(current, count, next, prev);
                    intializePuzzle();
                }
            }, 5000)
        };

        setHtmlContent();
        resetDialog();
        setDialogContent();
        $("[id^=puzzle]").click(function (event) {
            currentPuzzleIndex = parseInt(event.currentTarget.id.replace("puzzle", ""), 10);
            showDialog(currentPuzzleIndex, puzzles.titles.length, next, prev);
        });
    };

    refreshBody(true, false, true);
    setTitle([data.appName, data.indexPage.contents[index].title, data.indexPage.subPages.contents[i].title]);
    set_puzzles_contents([data.indexPage.contents[index].title, data.indexPage.subPages.contents[i].title],
        data.indexPage.subPages.subPages.contents[index].class,
        data.indexPage.subPages.subPages.contents[index].puzzles);
    playAudio(backgroundAudio, Infinity, data.indexPage.subPages.subPages.contents[index].audioPath);
};