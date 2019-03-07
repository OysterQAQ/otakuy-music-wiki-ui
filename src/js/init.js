var page = 0,
    row = 0,
    flag = false,
    filter = '',
    param = '',
    isLogin = false,
    otakuyApi = 'http://api.otakuy.com';
$(document).ready(function () {
    if ($.cookie("Authorization") != null) {
        var user = JSON.parse(window.localStorage.user);
        $('#avatar').attr('src', user.avatar + '');
        $('.login-box').children().hide();
        $('#avatar').show();
        $('#username').html(user.username);
        $('#starcount').html(user.star);
        $('#intro').val(user.intro);
        isLogin = true;
        notification(true, "自动登录成功")
        getNotificationCount();
    }

});
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.user-pic').css('background-image', 'url(' + e.target.result + ')');
            $('.user-pic').hide();
            $('.user-pic').fadeIn(650);

        }
        var formData = new FormData();
        formData.append("file", input.files[0]);
        $.ajax({
            type: "POST",
            url: otakuyApi + "/users/" + JSON.parse(window.localStorage.user).id + "/avatars",
            headers: {
                Authorization: $.cookie('Authorization')
            },
            processData: false, // 使数据不做处理
            contentType: false, // 不要设置Content-Type请求头
            dataType: 'json',
            data: formData,
            success: function () {
                notification(true, '上传头像成功')
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                notification(false, XMLHttpRequest.responseJSON.message)

            }
        });
        reader.readAsDataURL(input.files[0]);
        console.log(input.files[0].size)
    }
}

function uploadAvater() {

}

function getAlbumDetail(albumId) {
    $.ajax({
        type: "get",
        url: otakuyApi + "/albums/" + albumId,
        headers: {
            Authorization: $.cookie('Authorization')
        },
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        success: function (data, textStatus, request) {

            data = data.data;
            var artist = data.artists.map(function (item) {
                return item.name;
            }).join(' ');
            console.log(data)
            var html = '';
            $('.album-title').html('《' + data.title + '》');
            $('.album-artist').html(artist);
            $('.album-intro').html(data.intro);
            $.each(data.tracks, function (index, element) {
                html += (index + 1) + '. ' + element.title + '<br>';
            });
            $('.album-tracks').html(html);
            $('.profile-image').css("background-image", "url(" + data.cover + ")");
            var tags = '';
            $.each(data.tags, function (index, element) {
                tags += ' <div class="tag">' + element.name + '</div>';
            });
            $('.album-detail').html('  <p>流派: ' + data.genres + '<br>专辑类型: ' + data.version + '<br>发行时间: ' + data.pubdate + '<br>出版商: ' + data.publisher + '</p>' + tags);

            $('.album-res').html('下载链接: <a href="' + data.downloadRes.url + '" target="view_window">' + data.downloadRes.url + '</a><br/>链接密码: ' + data.downloadRes.password + '<br/>解压密码: ' + data.downloadRes.unzipKey)
            $('.mask').show();
            $('#album').attr('album-id', data.id)
            $('#album').attr('owner', data.owner)
            $('#album').show();

        },
        error: function () {
            //请求出错处理
            notification(false, "请先登录");
        }

    });
}