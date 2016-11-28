/* globals $ requester window */

$('#register-form').on('submit', function (e) {
    e.preventDefault();

    let username = $('#username').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let confirmedPassword = $('#confirmedPassword').val();
    let body = {
        username,
        email,
        password,
        confirmedPassword
    };

    let $error = $('#error');

    if (password !== confirmedPassword) {
        $error
            .removeClass('hidden')
            .text('Passwords do not match!');
        return;
    }

    requester.postJSON('/auth/register', body, '')
        .then((response) => {
            window.location = response.redirect;
        }).catch((err) => {
            let responseText = JSON.parse(err.responseText);

            $error
                .removeClass('hidden')
                .text(responseText.message);
        });

});