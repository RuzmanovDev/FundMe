/* globals $ requester window */

$('#login-form').on('submit', function (e) {
    e.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();

    var body = {
        username: username,
        password: password
    };

    requester.postJSON('/auth/login', body, '')
        .then((response) => {
            window.location = response.redirect;
        })
        .catch(() => {
            $('#error')
                .removeClass('hidden')
                .fadeIn(200)
                .fadeOut(200)
                .fadeIn(200)
                .fadeOut(200)
                .fadeIn(200);
        });
});