// demo

/**
 * Cookie handler -getter
 */
var getAnimationCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

jQuery(document).ready(function () {
    "use strict";
    if (getAnimationCookie('ct_daycare.animations') == 'false') {
        jQuery('body').removeClass('withAnimation');
        jQuery('.switch-animations .onoffswitch input').removeAttr('checked');
    }
})
//end demo

/* ==== DROPDOWN MEGA MENU ==== */

jQuery(function () {
    "use strict";
    window.prettyPrint && prettyPrint()
    jQuery(document).on('hoverState', '.yamm .dropdown-menu', function (e) {
        e.stopPropagation()
    })
})

/* ==== HELPER FUNCTIONS ==== */

function validatedata($attr, $defaultValue) {
    "use strict";
    if ($attr !== undefined) {
        return $attr
    }
    return $defaultValue;
}

function parseBoolean(str, $defaultValue) {
    "use strict";
    if (str == 'true') {
        return true;
    }
    return $defaultValue;
    //return /true/i.test(str);
}

jQuery(window).scroll(function () {
    "use strict";
    function fixNavBar() {
        var $header = jQuery('header.section');
        var $cache = jQuery('.navbar.navbar-default');
        if ($(window).scrollTop() > 360) {
            $header.css({ 'padding-top': '150px' });
            $cache.addClass('navbar-fixed-top');
        }
        else if ($(window).scrollTop() < 200) {
            $cache.removeClass('navbar-fixed-top');
            $header.css({ 'padding-top': '0px' });
        }
    }

    fixNavBar();
});

jQuery(document).ready(function () {
    "use strict";

    if (jQuery().pageScroller) {
        // initiate page scroller plugin
        $('body').pageScroller({
            navigation: '.onepage',
            scrollOffset: -70
        });
    }

    $('.btn-scroll[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash, $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    var isSmallDesktop = false;
    var isPhone = false;
    var isTablet = false;

    function checkDeviceType() {
        isSmallDesktop = ($(window).width() < 992);

        isPhone = device.mobile();
        isTablet = device.tablet();
        // adjusting for smaller screens
        if (isPhone || isTablet || isSmallDesktop) {
            $("body").addClass("isMobile");
        } else {
            $("body").addClass("isDesktop");
        }
    }
    checkDeviceType();

    /* ======================================= */
    /* === CLICKABLE MAIN PARENT ITEM MENU === */
    jQuery(".navbar li.dropdown > .dropdown-toggle").removeAttr("data-toggle data-target");

    /* ======================== */
    /* ==== ANIMATION INIT ==== */

    if (jQuery().appear) {
        if (isPhone || isTablet || isSmallDesktop) {
            // disable animation on mobile
            jQuery("body").removeClass("withAnimation");
        } else {
            jQuery('.withAnimation .animated').appear(function () {
                var $this = jQuery(this);

                $this.each(function () {
                    if ($this.data('time') != undefined) {
                        setTimeout(function () {
                            $this.addClass('activate');
                            $this.addClass($this.data('fx'));
                        }, $this.data('time'));
                    } else {
                        $this.addClass('activate');
                        $this.addClass($this.data('fx'));
                    }
                });
            }, { accX: 50, accY: -150 });
        }
    }

    /* =============================== */
    /* ==== PLACEHOLDERS FALLBACK ==== */

    if ($().placeholder) {
        $("input[placeholder],textarea[placeholder]").placeholder();
    }

    /* ========================================================= */
    /* ==== CLICK EVENTS FOR SMALL DEVICES INSTEAD OF HOVER ==== */

    if (device.mobile() || device.tablet()) {
        jQuery(".person-box .description").click(function () {
            jQuery(this).toggleClass("hover");
            jQuery(this).removeClass("hover");
        })
    }

    /* ========================= */
    /* ==== POSITION IMAGES ==== */

    jQuery(".pageobject").each(function () {
        var $this = jQuery(this);
        $this.css({
            "top": $this.data("top"),
            "bottom": $this.data("bottom"),
            "left": $this.data("left"),
            "right": $this.data("right"),
            "z-index": $this.data("zindex")
        });
    })

    /* ================================================= */
    /* ==== OPEN TAB ON MOUSEOVER CLOSE ON MOUSEOUT ==== */
    /*var $tab_link = jQuery('.sub-menu .nav-tabs > li > a');
    var $tabs = jQuery('.sub-menu .nav-tabs > li');
    var $tab_pane = jQuery('.sub-menu .tab-content .tab-pane');

    if(!device.mobile() && !device.tablet() && !isSmallDesktop){
        jQuery('.sub-menu .nav-tabs > li > a').hover( function(){
            jQuery(this).tab('show');
            $tab_link.not(this).addClass('transparent');
        });

        jQuery('.nav-tabs > li ').hover( function(){
            if(!jQuery(this).find('a').hasClass('transparent'))
                return;
            else{
                $tab_link.removeClass("transparent");
                jQuery(this).find('a').tab('show');
                $tabs.not(this).find('a').addClass('transparent');
            }
        });

        jQuery(".sub-menu").bind('mouseleave', function() {
            $tab_link.removeClass("transparent");
            $tabs.removeClass('active');
            $tab_pane.removeClass('active');
        });
    }*/

    //if(device.mobile() || device.tablet() || isSmallDesktop){
    /* ================================================= */
    /* ==== OPEN TAB ON MOUSEOVER CLOSE ON MOUSEOUT ==== */
    var $tab_link = jQuery('.sub-menu .nav-tabs > li > a');

    jQuery('.sub-menu [data-toggle=tab]').click(function (event) {
        var $parent = jQuery(this).parent();
        if ($parent.hasClass('active')) {
            $tab_link.removeClass("transparent");
            if (!jQuery(jQuery(this).attr("href")).hasClass("active")) {
                $tab_link.not(this).addClass('transparent');
            }
            jQuery(jQuery(this).attr("href")).toggleClass('active');
        } else {
            $tab_link.removeClass("transparent");
            $tab_link.not(this).addClass('transparent');
        }
    })
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.sub-menu').length) {
            $tab_link.removeClass("transparent");
            $tab_link.parent().removeClass('active');
            $('.sub-menu .tab-pane').removeClass('active');
        }
    });
    //}

    /* =============================== */
    /* ==== TOOLTIPS AND POPOVERS ==== */

    jQuery("[data-toggle='tooltip']").tooltip();

    jQuery("[data-toggle='popover']").popover({ trigger: "hover", html: true });

    /* ==================== */
    /* ==== DATEPICKER ==== */

    $('.input-group.date').datepicker({
        language: "en",
        daysOfWeekDisabled: "0,6",
        autoclose: true,
        todayHighlight: true
    });

    /* ==================== */
    /* ==== FIT VIDEOS ==== */

    if (jQuery().fitVids) {
        jQuery('.fit-video').fitVids();
    }

    /* ==================== */
    /* ==== MAGNIFIC POPUP ==== */

    if (jQuery().magnificPopup) {
        jQuery('.gallery').each(function () { // the containers for all your galleries
            jQuery(this).magnificPopup({
                type: 'image',
                delegate: '.popup',
                closeOnContentClick: false,
                fixedContentPos: true,
                mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                image: {
                    verticalFit: true
                },
                zoom: {
                    enabled: true,
                    duration: 300 // don't foget to change the duration also in CSS
                },
                gallery: {
                    enabled: true,
                    navigateByImgClick: false,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                closeBtnInside: true,
                closeMarkup: '<button title="%title%" class="mfp-close" onclick="stopSounds(); bgsndPlay();"> </button>',
                callbacks: {
                    buildControls: function () {
                        // re-appends controls inside the main container
                        this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                    }
                }
            });
        });
    }
});

jQuery(window).load(function () {
    "use strict";

    var isSmallDesktop = ($(window).width() < 992);

    /* ================================ */
    /* ==== DROPDOWN MENU ON HOVER ==== */

    if (device.mobile() || device.tablet() || isSmallDesktop) {
    } else {
        /* yamm menu on hover */
        var $dropdown = $(".navbar .dropdown");

        $dropdown.each(function () {
            var $this = $(this);

            var $dropmenu = $this.find("> .dropdown-menu");
            $this.addClass("drop-collapsed");
        });
    }

    var navTimeout;

    function showMenu() {
        var $this = $(this);

        navTimeout = setTimeout(function () {
            $this.find("> .dropdown-menu").css("display", "block");
            setTimeout(function () {
                $this.removeClass("drop-collapsed");
            }, 10);
        }, 100);
    }

    function hideMenu() {
        clearTimeout(navTimeout);

        $dropdown.each(function () {
            var $this = $(this);
            $this.addClass("drop-collapsed");

            setTimeout(function () {
                $(".drop-collapsed > ul.dropdown-menu").css("display", "none");
            }, 300);
        });
    }
    var hovsettings = {
        timeout: 0,
        interval: 0,
        over: showMenu,
        out: hideMenu
    };

    if (device.mobile() || device.tablet() || isSmallDesktop) {
    } else {
        $dropdown.hoverIntent(hovsettings);
    }

    /* ======================= */
    /* ==== WIDGET SCROLL ==== */

    jQuery(".with-scroll").each(function () {
        var $this = jQuery(this);

        $this.find("ul").css({
            "max-height": $this.data("height")
        });
        $this.find(".tweets_display ul").css({
            "max-height": $this.data("height")
        });

        var step = 100;
        var scrolling = false;

        // Wire up events for the 'scrollUp' link:
        $this.find(".scrollUp").bind("click", function (event) {
            event.preventDefault();
            // Animates the scrollTop property by the specified
            // step.
            $this.find("ul").animate({
                scrollTop: "-=" + step + "px"
            });
        }).bind("mouseover", function (event) {
            scrolling = true;
            scrollContent("up");
        }).bind("mouseout", function (event) {
            scrolling = false;
        });

        $this.find(".scrollDown").bind("click", function (event) {
            event.preventDefault();
            $this.find("ul").animate({
                scrollTop: "+=" + step + "px"
            });
        }).bind("mouseover", function (event) {
            scrolling = true;
            scrollContent("down");
        }).bind("mouseout", function (event) {
            scrolling = false;
        });

        function scrollContent(direction) {
            var amount = (direction === "up" ? "-=3px" : "+=3px");
            $this.find("ul").animate({
                scrollTop: amount
            }, 1, function () {
                if (scrolling) {
                    scrollContent(direction);
                }
            });
        }
    });

    /* =========================================== */
    /* ==== SIDEBAR MASONRY FOR SMALL SCREENS ==== */

    if (jQuery().masonry && (jQuery(window).width() < 992) && (jQuery(window).width() > 767)) {
        jQuery('.sidebar .row').masonry({
            itemSelector: '.col-sm-6.col-md-12',
            layoutMode: 'sloppyMasonry',
            resizable: false, // disable normal resizing
            // set columnWidth to a percentage of container width
            masonry: {}
        });
    }

    /* ============================= */
    /* ==== ANIMATED BACKGROUND ==== */
    if (jQuery('body').hasClass("withAnimation") && !device.mobile() && !device.tablet() && !jQuery('body').hasClass('isMobile')) {
        // if(1){
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

        jQuery("body").mouseenter();
    }

    if ((jQuery().flexslider())) {
        /* ======================= */
        /* ==== NORMAL SLIDER ==== */

        jQuery('.flexslider.normal-slider').each(function () {
            var $this = jQuery(this);

            $this.flexslider({
                smoothHeight: true,
                controlNav: false,
                prevText: "",
                nextText: ""
            })
        });

        /* ============================ */
        /* ==== FLEXSLIDER CONTENT ==== */

        jQuery(".flexslider.std-slider .object").each(function () {
            var $this = jQuery(this);
            if ($this.hasClass("absolute")) {
                $this.css({
                    "top": $this.data("top"),
                    "bottom": $this.data("bottom"),
                    "left": $this.data("left"),
                    "right": $this.data("right")
                });
            } else {
                $this.css({
                    "margin-top": $this.data("top"),
                    "margin-bottom": $this.data("bottom"),
                    "margin-left": $this.data("left"),
                    "margin-right": $this.data("right")
                });
            }
        })

        /* ==================================== */
        /* ==== FLEXSLIDER WITH ANIMATIONS ==== */

        if (jQuery(".flexslider.std-slider").length > 0) {
            $('.flexslider.std-slider').each(function () {
                var $this = jQuery(this);
                $this.find(".slides > li .inner").each(function () {
                    var $container = jQuery(this);
                    $container.css('min-height', $this.attr('data-height') + "px");
                })
                // initialize
                $this.find(".slides > li").each(function () {
                    var $slide_item = $(this);
                    var bg = validatedata($slide_item.data('bg'), false);
                    if (bg) {
                        $slide_item.css('background-image', 'url("' + bg + '")');
                    }
                    $slide_item.css('min-height', $this.attr('data-height') + "px");

                    // hide slider content due to fade animation
                    //$slide_item.find(".inner").hide();
                    /*
                     $slide_item.find(".inner [data-fx]").each(function () {
                     $(this).removeClass("animated");
                     })
                     */
                    $slide_item.find('.inner').fadeOut("slow");
                })

                var direction = validatedata($this.attr('data-direction'), "horizontal");
                var animation = validatedata($this.attr('data-animation'), "fade");
                var loop = validatedata(parseBoolean($this.attr("data-loop")), false);
                var smooth = validatedata(parseBoolean($this.attr("data-smooth")), false);
                var slideshow = validatedata(parseBoolean($this.attr("data-slideshow")), false);
                var speed = validatedata(parseInt($this.attr('data-speed')), 7000);
                var animspeed = validatedata(parseInt($this.attr("data-animspeed")), 600);
                var controls = validatedata(parseBoolean($this.attr('data-controls')), false);
                var dircontrols = validatedata(parseBoolean($this.attr('data-dircontrols')), false);

                $this.flexslider({
                    direction: direction,        //String: Select the sliding direction, "horizontal" or "vertical"
                    animation: animation,              //String: Select your animation type, "fade" or "slide"
                    animationLoop: loop,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                    smoothHeight: smooth,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                    slideshow: slideshow,                //Boolean: Animate slider automatically
                    slideshowSpeed: speed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
                    animationSpeed: animspeed,            //Integer: Set the speed of animations, in milliseconds
                    touch: false,

                    // Primary Controls
                    controlNav: controls,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                    directionNav: dircontrols,             //Boolean: Create navigation for previous/next navigation? (true/false)
                    manualControls: ".flex-control-nav li",

                    pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                    prevText: " ",           //String: Set the text for the "previous" directionNav item
                    nextText: " ",
                    useCSS: false,

                    // Callback API
                    start: function () {
                        $this.removeClass("loading-slider");

                        setTimeout(function () {
                            $this.find(".slides > li.flex-active-slide .inner").fadeIn("slow");
                            $this.find(".slides > li.flex-active-slide .inner [data-fx]").each(function () {
                                var $content = $(this);
                                $content.addClass($content.data('fx')).addClass("activate");
                            })
                        }, 650);
                    },
                    before: function () {
                        $this.find(".slides > li .inner").fadeOut("slow");
                    },           //Callback: function(slider) - Fires asynchronously with each slider animation
                    after: function () {
                        setTimeout(function () {
                            $this.find(".slides > li.flex-active-slide .inner").fadeIn("slow");
                            $this.find(".slides > li.flex-active-slide .inner [data-fx]").each(function () {
                                var $content = $(this);
                                $content.addClass($content.data('fx')).addClass("activate");
                            })
                        }, 150);
                    },            //Callback: function(slider) - Fires after each slider animation completes
                    end: function () {
                    },              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
                    added: function () {
                    },            //{NEW} Callback: function(slider) - Fires after a slide is added
                    removed: function () {
                    }           //{NEW} Callback: function(slider) - Fires after a slide is removed
                });
            });
        }
    }

    /* =================================== */
    /* ==== SPRITELY - ANIMATE FOOTER ==== */

    if (jQuery().spritely && jQuery('body').hasClass("withAnimation") && !jQuery.browser.msie) {
        jQuery('#wave1').pan({ fps: 60, speed: 0.6, dir: 'left' });
        jQuery('#wave2').pan({ fps: 60, speed: 0.4, dir: 'right' });
        jQuery('#wave3').pan({ fps: 60, speed: 0.3, dir: 'left' });
    }

    if (jQuery.browser.msie) {
        jQuery('#wave2').css("background-position", "25px");
    }
});

/* ================================================== */
/* ==== GALLERY WITH PACKERY AND INFINITE SCROLL ==== */

jQuery(window).load(function () {
    "use strict";

    if (jQuery().packery) {
        $ = jQuery.noConflict();

        var $container = $('#packagery');
        if ($container != null) {
            $container.find('.hidden').removeClass('packeryItem');
            // initialize

            $container.packery({
                transitionDuration: "0.7s",
                itemSelector: '.packeryItem'
            });

            var $pckry = $container.data('packery');

            $container.imagesLoaded().progress(function (instance, image) {
                if (!image.isLoaded) {
                    return;
                }

                var p = $(image.img).closest('.hidden');
                p.addClass('packeryItem').removeClass('hidden');

                $pckry.appended(p);
            }).always(function (instance) {
                $('#packagery').infinitescroll({
                    loading: {
                        finished: undefined,
                        //img: "data:image/gif;base64,R0lGODlhHgAeAJEDAP///5mZmU1NTQAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNTZiNzRiZC1lOTVmLTIyNDUtYmNhMS00Y2M2YjdlOTNlZmYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkE1QTAxRUJGNDhBMTFFMkFGNTNBNDUzMDREQkY3QjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkE1QTAxRUFGNDhBMTFFMkFGNTNBNDUzMDREQkY3QjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgwYzk2NDRjLWJhYTktNGQ0Yy1hYTc2LTk3NjY0MGI5ZjUwYyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpkNTZiNzRiZC1lOTVmLTIyNDUtYmNhMS00Y2M2YjdlOTNlZmYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFCgADACwAAAAAHgAeAAACa4Rvo8LNOpxDCMpmr6AnXy9xyaKBk2hi5CUC6bOGaOy82xyVtAr1/g8MCofEojGATCKNuYtSydQInsmohro0SrEBqxPrlXDDjrFWx0yr1+yg1GZ772BNqQQ+t+Prdp6c3yewF3iXF4f2J1UAACH5BAUKAAMALAAAAAATABMAAAIzjG+jwM2I1HAOHkmbTSuDHWAeKGZkZ24lJbXuC8fy7Ar2bdM4ru/57PvJgoKez7hD8mYFACH5BAUKAAMALAAAAAAeAAgAAAIrlG+jwc06gJwSIegcpNQenD0KN3nJEgYbCZgCGK6kC2cyR6PxyOZDquKRCgAh+QQFCgADACwLAAAAEwATAAACM5Rvo8HNiNRwDh5Jm00rhy1gHihmZGduJSW17gvH8ky7wI3fdJ7vvD77AWVCgO935CVzBQAh+QQFCgADACwWAAAACAAeAAACHZSPqcvtPaKctMqAs968+w9+1kgC5omm6sq2blsAACH5BAUKAAMALAsACwATABMAAAI3nI8jy5vf2kuRTVTdNVlsnn1K+HXiiaYTwLbsEcRy7LrwLNftjQf6a+jRfjzcD1CcHZM5YlBYAAAh+QQFCgADACwAABYAHgAIAAACK4Rvo8HNOoScEiHoHKTUHpw9Cjd5yRIGGymYABiupAtnMkej8cjmQ6rikQoAIfkEBQoAAwAsAAALABMAEwAAAjeEb6PLg9jiO7HNVNcFWd+ubKDzjeaJpkrAtuwixHLsuvAs1+2NC/qr6NF+PNwvUJwdkzliUFgAADs=",
                        finishedMsg: "<div class='gallerymessage'>No more images</div>",
                        msg: null,
                        msgText: "<div class='gallerymessage'>Loading</div>",
                        selector: null,
                        speed: 'fast',
                        start: undefined
                    },
                    navSelector: ".wp-pagenavi",
                    nextSelector: ".nextpostslink",
                    itemSelector: ".packeryItem",
                    extraScrollPx: 0,
                    prefill: true
                }, function (arrayOfNewElems) {
                    var $pckry = $container.data('packery');
                    $(arrayOfNewElems).removeClass('hidden');
                    $pckry.appended(arrayOfNewElems);
                });
            });
        }
    }
});

/* ============================================= */
/* ==== GOOGLE MAP - Asynchronous Loading  ==== */

function initmap() {
    "use strict";
    jQuery('.googleMap').each(function () {
        var atcenter = "";
        var $this = jQuery(this);
        var location = $this.data("location");

        var offset = -30;

        if (validatedata($this.data("offset"))) {
            offset = $this.data("offset");
        }

        if (validatedata(location)) {
            $this.gmap3({
                marker: {
                    //latLng: [40.616439, -74.035540],
                    address: location,
                    callback: function (marker) {
                        atcenter = marker.getPosition();
                    }
                },
                map: {
                    options: {
                        //maxZoom:11,
                        zoom: 12,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                        scrollwheel: false,
                        disableDoubleClickZoom: false,
                        draggable: false,
                        //disableDefaultUI: true,
                        mapTypeControlOptions: {
                            //mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
                            //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                            //position: google.maps.ControlPosition.RIGHT_CENTER
                            mapTypeIds: []
                        }
                    },
                    events: {
                        idle: function () {
                            if (!$this.data('idle')) {
                                $this.gmap3('get').panBy(0, offset);
                                $this.data('idle', true);
                            }
                        }
                    }
                }
                //},"autofit"
            });

            // center on resize
            google.maps.event.addDomListener(window, "resize", function () {
                //var userLocation = new google.maps.LatLng(53.8018,-1.553);
                setTimeout(function () {
                    $this.gmap3('get').setCenter(atcenter);
                    $this.gmap3('get').panBy(0, offset);
                }, 400);
            });

            // set height
            $this.css("min-height", $this.data("height") + "px");
        }
    })
}

function loadScript() {
    "use strict";
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initmap';
    document.body.appendChild(script);
}

if ($(".googleMap").length > 0) {
    window.onload = loadScript;
}