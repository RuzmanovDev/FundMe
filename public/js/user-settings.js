$(function () {
    // var image = '';

    // $('#avatar').on('change', function () {
    //     console.log(this.files[0]);
    //     if (this.files && this.files[0]) {
    //         var imageReader = new FileReader();
    //         imageReader.onload = function (e) {
    //             image = '' + e.target.result;
    //         }
    //         imageReader.readAsDataURL(this.files[0]);
    //     }

    //     $('#update-info').on('click', function (ev) {
    //         //
    //         var avatar = $('#avatar');
    //         var firstname = $('#firstname').val();
    //         var lastname = $('#lastname').val();
    //         var oldPassword = $('#oldPassword').val();
    //         var newPassword = $('#newPassword').val();
    //         var confirmedNewPassword = $('#confirmedNewPassword').val()

    //         if (confirmedNewPassword !== newPassword) {
    //             $('#wrong-repeated-password')
    //                 .removeClass('hidden')
    //                 .fadeIn(200)
    //                 .fadeOut(200)
    //                 .fadeIn(200)
    //                 .fadeOut(200)
    //                 .fadeIn(200);
    //             return;
    //         }

    //         if (image1 !== '') {
    //             ev.preventDefault();

    //             var url = '/user/settings/update';
    //             var body = {
    //                 firstname,
    //                 lastname,
    //                 oldPassword,
    //                 newPassword,
    //                 confirmedNewPassword,
    //             }

    //             requester.postJSON(url, body)
    //                 .then((response) => {
    //                     window.location = response.redirect;
    //                 })
    //                 .catch(err => {
    //                     $('#wrong-password')
    //                         .removeClass('hidden')
    //                         .fadeIn(200)
    //                         .fadeOut(200)
    //                         .fadeIn(200)
    //                         .fadeOut(200)
    //                         .fadeIn(200)
    //                     console.log(err);
    //                 });

    //             return false;
    //         }
    //     })
    // });
});