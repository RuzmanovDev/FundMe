/* globals $ requester window */

(function ($) {

    $.fn.endlessScroll = function (options) {

        var defaults = {
            bottomPixels: 50,
            fireOnce: true,
            fireDelay: 150,
            loader: "<br />Loading...<br />",
            data: "",
            insertAfter: "div:last",
            resetCounter: function () { return false; },
            callback: function () { return true; },
            ceaseFire: function () { return false; }
        };

        var options = $.extend({}, defaults, options);

        var firing = true;
        var fired = false;
        var fireSequence = 0;

        if (options.ceaseFire.apply(this) === true) {
            firing = false;
        }

        if (firing === true) {
            $(this).scroll(function () {
                if (options.ceaseFire.apply(this) === true) {
                    firing = false;
                    return; // Scroll will still get called, but nothing will happen
                }

                if (this == document || this == window) {
                    var is_scrollable = $(document).height() - $(window).height() <= $(window).scrollTop() + options.bottomPixels;
                } else {
                    // calculates the actual height of the scrolling container
                    var inner_wrap = $(".endless_scroll_inner_wrap", this);
                    if (inner_wrap.length == 0) {
                        inner_wrap = $(this).wrapInner("<div class=\"endless_scroll_inner_wrap\" />").find(".endless_scroll_inner_wrap");
                    }
                    var is_scrollable = inner_wrap.length > 0 &&
                        (inner_wrap.height() - $(this).height() <= $(this).scrollTop() + options.bottomPixels);
                }

                if (is_scrollable && (options.fireOnce == false || (options.fireOnce == true && fired != true))) {
                    if (options.resetCounter.apply(this) === true) fireSequence = 0;

                    fired = true;
                    fireSequence++;

                    $(options.insertAfter).after("<div id=\"endless_scroll_loader\">" + options.loader + "</div>");

                    data = typeof options.data == 'function' ? options.data.apply(this, [fireSequence]) : options.data;

                    if (data !== false) {
                        $(options.insertAfter).after("<div id=\"endless_scroll_data\">" + data + "</div>");
                        $("div#endless_scroll_data").hide().fadeIn();
                        $("div#endless_scroll_data").removeAttr("id");

                        options.callback.apply(this, [fireSequence]);

                        if (options.fireDelay !== false || options.fireDelay !== 0) {
                            $("body").after("<div id=\"endless_scroll_marker\"></div>");
                            // slight delay for preventing event firing twice
                            $("div#endless_scroll_marker").fadeTo(options.fireDelay, 1, function () {
                                $(this).remove();
                                fired = false;
                            });
                        }
                        else {
                            fired = false;
                        }
                    }

                    $("div#endless_scroll_loader").remove();
                }
            });
        }
    };

})(jQuery);

$(window).endlessScroll({
    inflowPixels: 300,
    callback: function () {
        var page = $('.col-sm-12.col-md-10.col-md-offset-1.mb16').length / 5;
        var url = window.location.href;
        var startIndex = 'category/';
        var category = url.substring(url.indexOf(startIndex)+startIndex.length, url.length);
        requester.getJSON('/campaigns/api?pageNumber=' + page+'&category='+category, {})
            .then(campaigns => {
                campaigns.forEach(campaign => {
                    $('.row').append(buildCampaign(campaign));
                });
            });
    }
});

function buildCampaign(campaign) {
    return `<div class="col-sm-12 col-md-10 col-md-offset-1 mb16">
                <div class="horizontal-tile">
                    <div class="tile-left">
                        <a href="/campaigns/campaign/${campaign._id}">
                            <div class="background-image-holder fadeIn" style="background: url('/campaigns/campaign/picture/${campaign.image}');">
                                <img class="background-image" alt="image" src="/campaigns/campaign/picture/${campaign.image}" style="display: none;">
                            </div>
                        </a>
                    </div>
                    <div class="tile-right bg-dark">
                        <div class="description">
                            <h4 class="mb8">${campaign.title}</h4>
                                <p>Short description here?</p>
                                    <div class="progress-bars">
                                        <div class="progress progress-2">
                                            <span>${campaign.funded} / ${campaign.target} $</span>
                                            <div class="bar-holder">
                                                <div class="progress-bar" data-progress="${campaign.percentage}" style="width: 0%;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
}