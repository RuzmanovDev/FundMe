/* globals $ requester window */

$('#register-form').on('submit', function (e) {
    e.preventDefault();

    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirmedPassword = $('#confirmedPassword').val();
    var body = {
        username,
        email,
        password,
        confirmedPassword
    };

    var $error = $('#error');

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
            var responseText = JSON.parse(err.responseText);

            $error
                .removeClass('hidden')
                .text(responseText.message);
        });

});