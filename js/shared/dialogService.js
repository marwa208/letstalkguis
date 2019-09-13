var dialog = $("#dialog");

/**
 * /**
 * Initialize dialog content.
 * @param {string} htmlContent The dialog content.
 * @param {string} className The class of the dialog.
 * @param {function} closeCallback The close dialog call-back.
 */
var initializeDialog = function (htmlContent, className, closeCallback) {
    dialog.html(htmlContent);

    //dialog box properties
    dialog.dialog({
        autoOpen: false,
        modal: true,
        close: function () {
            closeCallback();
            $("html").unbind("keyup");
        }
    });

    //set the popup background class
    $(".ui-dialog.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable")[0].className = "ui-dialog ui-widget ui-widget-content ui-front ui-draggable ui-resizable " + className;
};

var resetDialog = function () {
    dialog.html("");
    dialog.removeClass();
}

var closeDialog = function () {
    dialog.dialog("close");
}

var isDialogOpen = function () {
    try {
        return dialog.dialog("isOpen")
    } catch (e) {
        return false;
    }
}