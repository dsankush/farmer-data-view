/*! This script in this file is minified but the premium maps include a full file */
function isTouchEnabled() {
    return (("ontouchstart" in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
}
jQuery(function() {
    jQuery("path[id^=tryjs]").each(function(i, e) {
        tryaddEvent(jQuery(e).attr("id"))
    })
});

function tryaddEvent(id, relationId) {
    var _obj = jQuery("#" + id);
    var arr = id.split("");
    var _Textobj = jQuery("#" + id + "," + "#tryjsvn" + arr.slice(5).join(""));
    var isHoverDataFrozen = false; // Tracks if the hover data is frozen

    jQuery("#" + ["visnames"]).attr({
        "fill": tryjsconfig.general.visibleNames
    });

    _obj.attr({
        "fill": tryjsconfig[id].upColor,
        "stroke": tryjsconfig.general.borderColor
    });

    _Textobj.attr({
        "cursor": "default"
    });

    if (tryjsconfig[id].active === !0) {
        _Textobj.attr({
            "cursor": "pointer"
        });

        // Hover behavior
        _Textobj.hover(function () {
            if (!isHoverDataFrozen) {
                jQuery("#tryjstip").show().html(tryjsconfig[id].hover);
                _obj.css({
                    "fill": tryjsconfig[id].overColor
                });
            }
        }, function () {
            if (!isHoverDataFrozen) {
                jQuery("#tryjstip").hide();
                jQuery("#" + id).css({
                    "fill": tryjsconfig[id].upColor
                });
            }
        });

        // Click behavior for freezing/unfreezing hover data
        _Textobj.on("click", function (e) {
            isHoverDataFrozen = !isHoverDataFrozen; // Toggle the freeze state
            if (isHoverDataFrozen) {
                // Show hover data and allow interaction
                jQuery("#tryjstip")
                    .show()
                    .html(tryjsconfig[id].hover)
                    .css({
                        pointerEvents: "auto", // Allow interaction with the tooltip
                        left: e.pageX + 10,
                        top: e.pageY + 15
                    });
                _obj.css({
                    "fill": tryjsconfig[id].downColor // Optional: Highlight the state on click
                });
            } else {
                // Hide hover data
                jQuery("#tryjstip").hide().css({ pointerEvents: "none" });
                jQuery("#" + id).css({
                    "fill": tryjsconfig[id].upColor
                });
            }
        });

        // Mousemove behavior for positioning (only when not frozen)
        _Textobj.mousemove(function (e) {
            if (!isHoverDataFrozen) {
                var x = e.pageX + 10,
                    y = e.pageY + 15;
                var tipw = jQuery("#tryjstip").outerWidth(),
                    tiph = jQuery("#tryjstip").outerHeight(),
                    x = (x + tipw > jQuery(document).scrollLeft() + jQuery(window).width()) ? x - tipw - (20 * 2) : x;
                y = (y + tiph > jQuery(document).scrollTop() + jQuery(window).height()) ? jQuery(document).scrollTop() + jQuery(window).height() - tiph - 10 : y;
                jQuery("#tryjstip").css({
                    left: x,
                    top: y
                });
            }
        });

        // Touch support for mobile devices
        if (isTouchEnabled()) {
            _Textobj.on("touchstart", function (e) {
                var touch = e.originalEvent.touches[0];
                var x = touch.pageX + 10,
                    y = touch.pageY + 15;
                jQuery("#" + id).css({
                    "fill": tryjsconfig[id].downColor
                });
                jQuery("#tryjstip")
                    .show()
                    .html(tryjsconfig[id].hover)
                    .css({
                        left: x,
                        top: y,
                        pointerEvents: "auto"
                    });
            });
            _Textobj.on("touchend", function () {
                jQuery("#" + id).css({
                    "fill": tryjsconfig[id].upColor
                });
            });
        }
    }
}
