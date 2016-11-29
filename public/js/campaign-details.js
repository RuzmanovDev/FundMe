/* globals $ requester document */

function updateFunds(funds) {
    var $initialVal = $('#funds');
    var updatedVal = +$initialVal.text() + +funds;
    $initialVal.text(updatedVal);
}

$('#donate-btn').on('click', function (ev) {
    ev.preventDefault();

    var donationValue = $('#donation-value').val();
    var campaignId = $('#campaign-id').val();
    var body = {
        campaignId,
        donationValue
    };

    requester.postJSON('/campaigns/donate', body, '')
        .then((res) => {
            updateFunds(donationValue);
        })
        .catch((err) => {
            console.log(err);
        });
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
        .then(() => console.log("done"));
});
