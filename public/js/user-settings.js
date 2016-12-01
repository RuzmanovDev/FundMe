$(function () {

    $('#update-info').on('click', function (ev) {
        ev.preventDefault();

        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var oldPassword = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
        var confirmedNewPassword = $('#confirmedNewPassword').val()

        var body = {
            firstname,
            lastname,
            oldPassword,
            newPassword,
            confirmedNewPassword
        }

        if (confirmedNewPassword !== newPassword) {
            $('#wrong-repeated-password')
                .removeClass('hidden')
                .fadeIn(200)
                .fadeOut(200)
                .fadeIn(200)
                .fadeOut(200)
                .fadeIn(200);
            return;
        }

        var url = '/user/settings/update';
        requester.postJSON(url, body)
            .then((response) => {
                window.location = response.redirect;
            })
            .catch(err => {
                $('#wrong-password')
                    .removeClass('hidden')
                    .fadeIn(200)
                    .fadeOut(200)
                    .fadeIn(200)
                    .fadeOut(200)
                    .fadeIn(200)
                console.log(err);
            });

        return false;
    })


});