/* globals $ requester document toastr location*/

$(function () {
    $('#upvote-btn').on('click', function (ev) {

        var $this = $(this);

        var $votesContainer = $('#votes-count');

        if ($this.text() === 'Like') {
            $votesContainer.text(+$votesContainer.text() + 1);
            $this.text('Dislike');
        } else {
            $votesContainer.text(+$votesContainer.text() - 1);
            $this.text('Like');
        }

        // TODO check query params
        var fullUrl = ($(location).attr('href'));
        var url = fullUrl.substring(fullUrl.lastIndexOf('/') + 1);

        $this.attr('disabled', 'disabled');

        requester.putJSON(`/campaigns/campaign/vote/${url}`)
            .then(() => {
                $this.removeAttr('disabled');
            })
            .catch(err => console.log(err));

        ev.preventDefault();
        return false;
    });
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
            var page = $('.comments-list').length / 5 | 0;
            var url = window.location.href;

            var fullUrl = ($(location).attr('href'));
            var id = fullUrl.substring(fullUrl.lastIndexOf('/') + 1);
            var url = `/api/comments/${id}?pageNumber=${page}`;
            console.log(url);
            requester.getJSON(url, {})
                .then(comments => {
                    comments.forEach(comment => {
                        $('ul.comments-list').append(buildComments(comment));
                    });
                });
        }
    });

    function buildComments(comment) {
        return `
        <li class="comments-list">
             <div class="avatar">
                <img alt="Avatar" src="http://mms.businesswire.com/bwapps/mediaserver/ViewMedia?mgid=106864&vid=4&download=1"/>
            </div>
             <div class="comment">
                        <span class="uppercase author"> Posted by: ${comment.commentAuthor} </span>
                            <p> ${comment.commentContent} <p>
             </div>
        </li>
        <hr>`
    }
});

