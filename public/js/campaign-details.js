/* globals $ requester document toastr*/
$(function () {
    function updateFunds(funds) {
        var $initialVal = $('#funds');
        var updatedVal = +$initialVal.text() + +funds;
        $initialVal.text(updatedVal);
    }

    $('#donation-form').on('click', '#donation-btn', function (ev) {
        var donationValue = $('#donation').val();
        var creditcard = $('#creditcard').val();
        var campaignId = $('#campaign-id').val();

        console.log('donation value' + donationValue);
        console.log('credi card value' + creditcard);
        var body = {
            campaignId,
            donationValue
        };

        // requester.postJSON('/campaigns/donate', body, '')
        //     .then((res) => {
        //         updateFunds(donationValue);
        //         // toastr.success(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        ev.preventDefault();
        return false;
    });

    $('#upvote-btn').on('click', function (ev) {
        var $this = $(this);

        ev.preventDefault();
        var $votesContainer = $('#votes-count');

        if ($this.text() === 'Like') {
            $votesContainer.text(+$votesContainer.text() + 1);
            $this.text('Dislike');
        } else {
            $votesContainer.text(+$votesContainer.text() - 1);
            $this.text('Like');
        }

        var campaignId = $('#campaign-id').val();

        var body = {
            campaignId
        };

        requester.putJSON(`/campaigns/campaign/vote/${campaignId}`, body, '')
            .then(() => console.log("done"))
            .catch(err => console.log(err));
    });
});
