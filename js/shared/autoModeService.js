var isAutoModeEnabled = false;

$("#aAuto").on('click', function () {
    if (isAutoModeEnabled)
        $("#aAuto").removeClass("autobtn");
    else
        $("#aAuto").addClass("autobtn");

    isAutoModeEnabled = !isAutoModeEnabled;
});