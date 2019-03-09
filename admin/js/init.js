var otakuyApi = 'https://api.otakuy.com';

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function getAlbumCount(status, callback) {
    var $ = layui.jquery;
    $.ajax({
        type: "GET",
        headers: {
            Authorization: getCookie('Authorization')
        },
        url: otakuyApi + '/admin/albumsCount?status=' + status,
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        datatype: "application/json",
        success: function (data, textStatus, request) {
            callback(data.data);
        },
        error: function (data, textStatus, request) {
        }
    });
}

function getRecommendAlbumCount(callback) {
    var $ = layui.jquery;
    $.ajax({
        type: "GET",
        headers: {
            Authorization: getCookie('Authorization')
        },
        url: otakuyApi + '/admin/recommendAlbumsCount',
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        datatype: "application/json",
        success: function (data, textStatus, request) {
            callback(data.data);
        },
        error: function (data, textStatus, request) {
        }
    });
}

function getAlbumList(status, curr, e, table) {
    var $ = layui.jquery;
    $.ajax({
        type: "GET",
        headers: {
            Authorization: getCookie('Authorization')
        },
        url: otakuyApi + '/admin/albums?status=' + status + '&page=' + curr,
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        success: function (data, textStatus, request) {
            albumList = data.data;
            table.render({
                elem: '#' + e,
                page: false,
                even: true,
                data: data.data,
                limit: 16,
                cols: [[
                    {type: 'checkbox'},
                    {field: 'id', title: 'ID', width: 200, sort: true},
                    {field: 'title', title: '标题', width: 200},
                    {field: 'owner', title: '作者id', width: 200},
                    {field: 'isRecommend', title: '是否推荐', width: 100},
                    {title: '查看', width: 100, templet: '#operationTpl', align: 'center'}
                ]],
                /*  done: function (res, curr, count) {
                      $("#countNum").text(res.length);
                  }*/
            })
        },
        error: function (data, textStatus, request) {
        }
    });
}


function getRecommendAlbumList(e, table) {
    var $ = layui.jquery;
    $.ajax({
        type: "GET",
        headers: {
            Authorization: getCookie('Authorization')
        },
        url: otakuyApi + '/admin/recommendAlbums',
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        success: function (data, textStatus, request) {
            albumList = data.data;
            table.render({
                elem: '#' + e,
                page: false,
                even: true,
                data: data.data,
                cols: [[
                    {type: 'checkbox'},
                    {field: 'id', title: 'ID', width: 200, sort: true},
                    {field: 'title', title: '标题', width: 200},
                    {field: 'owner', title: '作者id', width: 200},
                    {field: 'isRecommend', title: '是否推荐', width: 100},
                    {title: '查看', width: 100, templet: '#operationTpl', align: 'center'}
                ]],
                /*  done: function (res, curr, count) {
                      $("#countNum").text(res.length);
                  }*/
            })
        },
        error: function (data, textStatus, request) {
        }
    });
}

function updataAlbumStatus(status, albums) {
    var $ = layui.jquery;
    $.ajax({
        type: "PUT",
        headers: {
            Authorization: getCookie('Authorization')
        },
        url: otakuyApi + '/admin/albums/' + status,
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        datatype: "application/json",
        data: JSON.stringify(albums),
        success: function (data, textStatus, request) {
            console.log(data)
        },
        error: function (data, textStatus, request) {
        }
    });
}

function getAlbumDetail(album) {
    var $ = layui.jquery;

    if (GetQueryString('status') == 'active') {
        console.log('a')
        $('.recommendAlbum').show();
    }
    if (GetQueryString('status') == 'block') {
        console.log('a')
        $('.submitAlbum').show();
        $('.rejectAlbum').show();
    }
    if (GetQueryString('isRecommend') == 'true') {
        console.log('a')
        $('.noRecommendAlbum').show();

    }

    $.ajax({
        type: "GET",
        headers: {
            Authorization: getCookie('Authorization')
        },
        url: otakuyApi + '/admin/albums/' + album,
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        success: function (data, textStatus, request) {
            console.log(data)
            data = data.data;
            var tracks = '';
            $.each(data.tracks, function (index, element) {
                tracks += (index + 1) + '. ' + element.title + '<br>';
            });
            var tags = '';
            $.each(data.tags, function (index, element) {
                tags += element.name + '&nbsp;&nbsp;';
            });
            var artists = '';
            $.each(data.artists, function (index, element) {
                artists += element.name + '&nbsp;&nbsp;';
            });
            $('#album').attr('album-id', data.id);
            $('#artists').html(artists);
            $('#title').html(data.title);
            $('#intro').html(data.intro);
            $('#downloadRes').html(JSON.stringify(data.downloadRes));
            $('#genres').html(data.genres);
            $('#tracks').html(tracks);
            $('#tags').html(tags);
            $('#version').html(data.version);
            $('#pubdate').html(data.pubdate);
            $('#publisher').html(data.publisher);
            $('#cover').attr('src', data.cover);

        },
        error: function (data, textStatus, request) {
        }
    });
}

function updateAlbumStatusInDetail(status) {
    var $ = layui.jquery;
    var albums = new Array();
    albums[0] = {};
    albums[0].id = $('#album').attr('album-id');
    updataAlbumStatus(status, albums)
    layer.msg("操作成功！", {icon: 1, time: 1000}, function () {
        $(".layui-laypage-btn")[0].click();
    });
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function updataAlbumIsRecommend(IsRecommend, albums) {

    var $ = layui.jquery;
    $.ajax({
        type: "PUT",
        headers: {
            Authorization: getCookie('Authorization')
        },
        url: otakuyApi + '/admin/albums/recommend?isRecommend=' + IsRecommend,
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        datatype: "application/json",
        data: JSON.stringify(albums),
        success: function (data, textStatus, request) {
            console.log(data)
        },
        error: function (data, textStatus, request) {
        }
    });
}

function updateAlbumIsRecommendInDetail(IsRecommend) {
    var $ = layui.jquery;
    var albums = new Array();
    albums[0] = {};
    albums[0].id = $('#album').attr('album-id');
    updataAlbumIsRecommend(IsRecommend, albums)
    layer.msg("操作成功！", {icon: 1, time: 1000}, function () {
        $(".layui-laypage-btn")[0].click();
    });
}


//获取统计数据
function getCount(url, callback) {
    var $ = layui.jquery;
    $.ajax({
        type: "GET",
        headers: {
            Authorization: getCookie('Authorization')
        },
        url: otakuyApi + url,
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        datatype: "application/json",
        success: function (data, textStatus, request) {
            callback(data.data)
        },
        error: function (data, textStatus, request) {
        }
    });
}

function initWelcome() {
    var $ = layui.jquery;
    getCount('/admin/usersCount', function (data) {
        $('#usersCount').html(data)
    })
    getCount('/admin/albumsCount?status=active', function (data) {
        $('#activeAlbumCount').html(data)
    })
    getCount('/admin/albumsCount?status=block', function (data) {
        $('#blockAlbumCount').html(data)
    })
    getCount('/admin/albumsCount?status=reject', function (data) {
        $('#rejectAlbumCount').html(data)
    })
    getCount('/admin/recommendAlbumsCount', function (data) {
        $('#recommendAlbumCount').html(data)
    })
}

