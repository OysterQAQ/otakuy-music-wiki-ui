$('.album-icon.close').click(function () {
    $('.control-center').removeClass('open');
    $('.option-btn').removeClass('open');
    var commentbox = $('#commentbox');
    var album = $('#album');
    album.attr('class', 'album animated fadeOutDown');

    setTimeout(function () {
        album.hide();
        commentbox.hide();
        album.attr('class', 'album');
        $('.mask').hide();
    }, 400);


});
$(document).on('click', '.option-btn', function () {
    $(this).toggleClass('open');
    $('.control-center').toggleClass('open');
});
$('.count').on('click', function () {
    var album = $('#album');
    var star = {};
    star.starTo = album.attr('owner');
    star.num = $(this).html();

    $.ajax({
        type: "POST",
        headers: {
            Authorization: $.cookie('Authorization')
        },
        url: "http://127.0.0.1/albums/" + album.attr('album-id') + "/star",
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        datatype: "application/json",
        data: JSON.stringify(star),
        success: function (data, textStatus, request) {
            notification(true, "打赏成功");
        },
        error: function (data, textStatus, request) {
            notification(false, "拥有star数不足or自己给自己打赏是不行的哦");
        }
    });
    $('.control-center').removeClass('open')
    $('.option-btn').removeClass('open')
});
$('#comment-button').on('click', function () {
    getComment($('#album').attr('album-id'))
    var commentbox = $('#commentbox');

    if (commentbox.css('display') === 'none' || commentbox.hasClass('fadeOutDown')) {
        var to_username = $("#to-username");
        to_username.val("@ up ");
        to_username.attr('to_id', $('#album').attr('owner'));
        to_username.attr('to_username', 'up')
        commentbox.attr("class", "animated bounceIn");
        commentbox.show();
    } else {
        commentbox.attr("class", "animated bounceOut");
        setTimeout(function () {
            commentbox.hide();
        }, 600);

    }
    /* $.ajax({
         type: "POST",
         headers: {
             Authorization: $.cookie('Authorization')
         },
         url: "http://127.0.0.1/albums/"+$('#album').attr('album-id')+"/star",
         contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
         datatype: "application/json",
         data: JSON.stringify(star),
         success: function (data, textStatus, request) {
             notification(true,"打赏成功");
         },
         error: function (data, textStatus, request) {
             notification(false,"拥有star数不足or自己给自己打赏是不行的哦");
         }
     });*/

});