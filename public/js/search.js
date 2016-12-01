/*globals window  $*/


$('.search-form').keyup(function (e) {
    if (e.keyCode === 13) {
       window.location = '/campaigns/search?q=' + $('#search-input').val();
    }
});
