var index = function () {
    var set_index_contents = function (subtitleParts, imgPath, contents) {
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
                for (var i = 0; i < contents.length; i++) {
                    htmlContent += '<div class="col-md-2 home-icon" id="contentType' + i + '">';
                    htmlContent += '<a href="#" class="hvr-pulse-grow">';
                    htmlContent += '<img src="' + imgPath + contents[i].img + '" class="mainbtn">';
                    htmlContent += '<h3>' + contents[i].title + '</h3>';
                    htmlContent += '</a>';
                    htmlContent += '</div>';
                }
                htmlContent += '</div>';
                htmlContent += '</div>';
                return htmlContent;
            };
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
            };

            $("#contents").html(setSubtitle() + setMainContents() + setSeperator());
        };

        setHtmlContent();
        $("[id^=contentType]").click(function (event) {
            content_main(parseInt(event.currentTarget.id.replace("contentType", ""),10));
        });
        $("[id^=contentType]").mouseover(function (event) {
            playAudio(mouseOverAudio, 1, "assets/sounds/mouseover.mp3");
        });
    };

    refreshBody(false, false, true);
    setTitle([data.appName, data.indexPage.title]);
    set_index_contents([data.indexPage.subtitle], data.indexPage.imgPath, data.indexPage.contents);
    playAudio(backgroundAudio, Infinity, data.indexPage.audioPath);
};