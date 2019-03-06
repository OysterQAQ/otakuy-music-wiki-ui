var getAlbumList = function (filter, param, page) {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/albums?filter=" + filter + "&param=" + param + "&page=" + page,
        headers: {
            Authorization: $.cookie('Authorization')
        },
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        success: function (data, textStatus, request) {
            var albums = data.data;
            var html = '';

            $.each(albums, function (i, element) {
                if (i != 0 && i % 4 == 0)
                    row++;
                html += '<div class="waterfall-box"  style="left: ' + (i % 4) * 240 + 'px; top: ' + row * 240 + '' +
                    'px;background-image: url(\'' + element.cover + '\');"><div class="box-header-container"><div class="box-header"><h1 class="box-main-heading" onclick="clickToGetAlbumDetail(this)" album-id="' + element.id + '">'
                    + element.title + '</h1><div class="box-stats"></div></div> </div><div class="box-overlay-header"></div><div class="box-body"><img src="'
                    + 'https://wx3.sinaimg.cn/large/006346uDgy1frhqntbghfj3074074tbk.jpg' + '" class="box-body-image" user-id="' + element.owner + '"/><span class="box-body-stats">' + element.createTime + '</span> </div> </div>'
            });
            $('#waterfall').html(html)
            console.log(albums)
        },
        error: function () {
            //请求出错处理
            notification(false, "获取专辑列表失败");
        }

    });
}
getAlbumList('byTime', '', 0);
var clickToGetAlbumDetail = function (e) {
    getAlbumDetail($(e).attr('album-id'))
}