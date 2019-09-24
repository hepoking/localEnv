$(function () {
    $('#test').click(function () {
        $('form#index').attr('action', 'callBat');
        $('form#index').submit();
    });
    $('#fileRead').click(function () {
        $('form#index').attr('action', 'fileRead');
        $('form#index').submit();
    });
    $('#cmd').click(function () {
        $('form#index').attr('action', 'fileRead');
        $('form#index').submit();
    });
    $('#exec').click(function () {
        $('form#index').attr('action', 'exec');
        $('form#index').submit();
    });
});