/* globals $ requester */

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
        $this.text('Dislike');
        $votesContainer.text(+$votesContainer.text() + 1);
    } else {
        $this.text('Like');
        $votesContainer.text(+$votesContainer.text() - 1);
    }

    let campaignId = $('#campaign-id').val();

    let body = {
        campaignId
    };

    requester.postJSON(`/campaigns/campaign/upvote/${campaignId}`, body, '')
        .then(() => console.log("done"));
});