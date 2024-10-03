(function($) {
    "use strict";

    var $navbar = $("#navbar"),
        y_pos = $navbar.offset().top,
        height = $navbar.height(),
        isFixed = false;

    // Throttle function to limit scroll event firing rate
    function throttle(func, limit) {
        var lastFunc;
        var lastRan;
        return function() {
            var context = this;
            var args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

    $(document).scroll(throttle(function() {
        var scrollTop = $(this).scrollTop();

        if (scrollTop > y_pos + height && !isFixed) {
            $navbar.addClass("navbar-fixed").css("top", "0");
            isFixed = true;
        } else if (scrollTop <= y_pos && isFixed) {
            $navbar.removeClass("navbar-fixed").css("top", "-48px");
            isFixed = false;
        }
    }, 50)); // Throttle scroll events to run once every 50 milliseconds

})(jQuery);
