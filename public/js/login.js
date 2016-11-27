/* globals $ requester window */

$('#login-form').on('submit', function (e) {
    e.preventDefault();

    let username = $('#username').val();
    let password = $('#password').val();

    let body = {
        username: username,
        password: password
    };

    requester.postJSON('/auth/login', body, '')
        .then((res) => {
            window.location = res.redirect;
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