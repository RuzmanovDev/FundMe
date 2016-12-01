/*globals*/

$('#send-message').on('click', function (e) {
    var button = $('#send-message');
    var username = button.attr('user-username');
    var id = button.attr('user-id');
    var avatar = button.attr('user-id');

    var body ={
        username,
        id,
        avatar
    };

    requester.postJSON('/messages', body, '')
        .then((response) => {
            window.location = response.redirect;
        }).catch((err) => {
            console.log(err);
        });
});
//user-id =user.id user-avatar=user.avatar user-username=user.username