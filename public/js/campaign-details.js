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
});
