var content_main = function (index) {
    backgroundAudio.pause();
    var set_main_contents = function (subtitleParts, imgPath, contents) {
        var setHtmlContent = function () {
            var setSubtitle = function () {
                var htmlContent = "";
                htmlContent += '<div class="container">';
                htmlContent += '<div class="row">';
                htmlContent += '<div class="col-md-4 bottom-40">';
                htmlContent += '<h2 class="subTitle">' + subtitleParts.join(" - ") + '</h2>';
                htmlContent += '</div>';
                htmlContent += '</div>';
                htmlContent += '</div>';
                return htmlContent;
            };
            var setMainContents = function () {
                var htmlContent = "";
                htmlContent += '<div class="container effects" id="effects">';
                htmlContent += '<div class="row  bottom-80  text-center" id="contents">';
                htmlContent += '<div class="col-md-2 home-icon"></div>';
                for (var i = 0; i < contents.length; i++) {
                    htmlContent += '<div class="col-md-2 home-icon" id="contentType' + i + '">';
                    htmlContent += '<a href="#" class="hvr-grow-rotate">';
                    htmlContent += '<img src="' + imgPath + contents[i].img + '" class="mainbtn">';
                    htmlContent += '<h3>' + contents[i].title + '</h3>';
                    htmlContent += '</a>';
                    htmlContent += '</div>';
                }
                htmlContent += '</div>';
                htmlContent += '</div>';
                return htmlContent;
            }
            var setSeperator = function () {
                var htmlContent = "";
                htmlContent += '<div class="container">';
                htmlContent += '<div class="row">';
                htmlContent += '<div class="col-md-12">';
                htmlContent += '<div class="clearfix"></div>';
                htmlContent += '</div>';
                htmlContent += '</div>';
                htmlContent += '</div>';
                return htmlContent;
            }

            $("#contents").html(setSubtitle() + setMainContents() + setSeperator());
        };

        setHtmlContent();
        $("[id^=contentType]").click(function (event) {
            var i = parseInt(event.currentTarget.id.replace("contentType", ""));
            switch (i) {
                case 0:
                    content_words(index, i);
                    break;
                case 1:
                    content_phrases(index, i);
                    break;
                case 2:
                    content_practices(index, i);
                    break;
                case 3:
                    content_puzzles(index, i);
                    break;
            }
        });
    };

    setCurrentMainPage(index);
    refreshBody(false, false, true);
    setTitle([data.appName, data.indexPage.contents[index].title]);
    set_main_contents([data.indexPage.contents[index].title], data.indexPage.subPages.imgPath, data.indexPage.subPages.contents);
};