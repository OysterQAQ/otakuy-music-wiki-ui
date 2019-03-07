$('.album-icon.close').click(function () {
    $('.control-center').removeClass('open');
    $('.option-btn').removeClass('open');
    var commentbox = $('#commentbox');
    var revisionbox = $('#revision-container');
    var album = $('#album');
    album.attr('class', 'album-container animated fadeOutDown');

    setTimeout(function () {
        album.hide();
        commentbox.hide();
        revisionbox.hide();
        $('.revision-queue').empty();
        $('.wait-revision-queue').empty();
        $('.revision-edit_form').empty()
        album.attr('class', 'album-container');
        $('.mask').hide();
    }, 400);
});
$(document).on('click', '.option-btn', function () {
    $(this).toggleClass('open');
    $('.control-center').toggleClass('open');
});
$('.starcount').on('click', function () {
    var album = $('#album');
    var star = {};
    star.starTo = album.attr('owner');
    star.num = $(this).html();

    $.ajax({
        type: "POST",
        headers: {
            Authorization: $.cookie('Authorization')
        },
        url: otakuyApi + "/albums/" + album.attr('album-id') + "/star",
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        datatype: "application/json",
        data: JSON.stringify(star),
        success: function (data, textStatus, request) {
            notification(true, "打赏成功");
            var user = JSON.parse(window.localStorage.user);
            user.star -= star.num;
            window.localStorage.setItem("user", JSON.stringify(user))

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

    if (commentbox.css('display') === 'none') {
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

});