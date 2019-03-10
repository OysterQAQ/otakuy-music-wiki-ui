var getAlbumList = function (filter, param, currpage) {
    flag = false;
    $.ajax({
        type: "GET",
        url: otakuyApi + "/albums?filter=" + filter + "&param=" + param + "&page=" + currpage,
        headers: {
            Authorization: $.cookie('Authorization')
        },
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        success: function (data, textStatus, request) {
            var albums = data.data;
            var html = '';

            $.each(albums, function (i, element) {
                if (i % 4 == 0) {
                    row++;
                    console.log(row)
                }

                html += '<div class="waterfall-box"  style="left: ' + (i % 4) * 240 + 'px; top: ' + (row - 1) * 240 + '' +
                    'px;background-image: url(\'' + element.cover + '\');"><div class="box-header-container"><div class="box-header"><h1 class="box-main-heading" onclick="clickToGetAlbumDetail(this)" album-id="' + element.id + '">'
                    + element.title + '</h1><div class="box-stats"></div></div> </div><div class="box-overlay-header"></div><div class="box-body"><img src="'
                    + 'https://avatar.otakuy.com/' + element.owner + '.png" class="box-body-image" user-id="' + element.owner + '"/><span class="box-body-stats">' + element.createTime + '</span> </div> </div>'
            });
            $('#waterfall-container').append(html)
            page++;
            $('.footer').css('top', (row - 1) * 240 + 1200 + 'px')
            if (albums.length != 16) {
                over = true;
            }
            flag = true;


        },
        error: function () {
            //请求出错处理
            notification(false, "获取专辑列表失败");
        }

    });
}
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(document).scrollTop() >= $(document).height() - $(window).height() - 100) {
            if (!over && flag)
                choke(getAlbumList(filter, param, page), 300);
        }
    });
});
getAlbumList(filter, '', page);
var clickToGetAlbumDetail = function (e) {
    getAlbumDetail($(e).attr('album-id'))
}
