/* globals $ requester window */

$('#username').on('keydown', function () {
    var username = $('#username').val();


});

$('.closebtn').on('click', function () {
    $('.alert').slideUp();
});

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
    var pattern = new RegExp(/^[a-zA-Z0-9._]{3,20}$/, 'g');
    var test = pattern.test(username);

    if (!test) {
        $('.alert').slideDown();
        return;
    }

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