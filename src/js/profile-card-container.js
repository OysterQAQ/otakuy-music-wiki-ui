$('#intro_edit').click(function () {
    $('#intro').removeAttr("readonly");

});


$("#imageUpload").change(function () {
    readURL(this);
});
$('#sign-out').click(function () {
    $('.login-box').children().show();
    $('#avatar').hide();
    $('#avatar').attr("src", '');
    $.cookie('Authorization', '', {expires: -1});
    localStorage.clear();
    $('.profile-card-container').attr('class', 'profile-card-container animated fadeOutDown')
    $('.profile-card-container').hide();
    $('.notification-container').hide()
    $('.notification--num').html(0)
    $('.mask').hide();
    $('.login_info').get(0).innerHTML = "GO";
    $('.input-field.password').val('');
    $('#false').empty()
    $('#true').empty()
    isLogin = false;
    notification(true, "已安全登出")

});

function edit_album(btn) {
    console.log("aaa")
    var album_form = $('#album_form')
    album_form.attr('album-id', $(btn).attr('id'))
    if (album_form.css('display') === 'none' || album_form.hasClass('fadeOutDown')) {
        console.log("aaa")
        $.ajax({
            type: "GET",
            url: otakuyApi + "/albums/" + $(btn).attr('id'),
            headers: {
                Authorization: $.cookie('Authorization')
            },
            contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
            success: function (data, textStatus, request) {
                autofull(data)

                downloadRes = data.data.downloadRes;
                $('.album-input-res-permission').val(downloadRes.permission);
                $('.album-input-res').val(downloadRes.url);
                $('.album-input-res-password').val(downloadRes.password);
                $('.album-input-res-zip').val(downloadRes.unzipKey);
            },
            error: function () {
                notification(false, "拉取专辑数据失败")
            }
        });
        //    $('.beer-box').css('z-index', 2);
        // $('.mask').show();
        album_form.attr("class", "animated fadeInUp");
        album_form.show();

        /*} else {
            album_form.attr("class", "animated fadeOutDown");
            setTimeout(function () {
                album_form.hide();
            }, 600);
            $('.mask').hide();
            $('.beer-box').css('z-index', 1);*/
    }


}