/* globals $ requester document */

function updateFunds(funds) {
    let $initialVal = $('#funds');
    let updatedVal = +$initialVal.text() + +funds;
    $initialVal.text(updatedVal);
}

$('#donate-btn').on('click', function (ev) {
    ev.preventDefault();

    let donationValue = $('#donation-value').val();
    let campaignId = $('#campaign-id').val();
    let body = {
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
    let $this = $(this);

    ev.preventDefault();
    let $votesContainer = $('#votes-count');

    if ($this.text() === 'Like') {
        $votesContainer.text(+$votesContainer.text() + 1);
        $this.text('Dislike');
    } else {
        $votesContainer.text(+$votesContainer.text() - 1);
        $this.text('Like');
    }

    let campaignId = $('#campaign-id').val();

    let body = {
        campaignId
    };

    requester.putJSON(`/campaigns/campaign/vote/${campaignId}`, body, '')
        .then(() => console.log("done"));
});
