$(function () {
    $('#test').click(function () {
        $('form#index').attr('action', 'callBat');
        $('form#index').submit();
    });
});