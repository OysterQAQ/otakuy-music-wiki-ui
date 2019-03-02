$.ajax({
    type: "get",
    url: "http://127.0.0.1/albums/recommendAlbum",
    contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
    success: function (data, textStatus, request) {
        data = data.data;
        console.log(data[0].cover)
        var select = Math.floor(data.length / 2);
        var html = '';
        for (var i = 0; i <= select - 3; i++)
            html += createHtml(data[i], 'hideLeft');
        html += createHtml(data[select - 2], 'prevLeftSecond');
        html += createHtml(data[select - 1], 'prev');
        html += createHtml(data[select], 'selected');
        html += createHtml(data[select + 1], 'next');
        html += createHtml(data[select + 2], 'nextRightSecond');
        for (var i = select + 3; i < data.length; i++)
            html += createHtml(data[i], 'hideRight');
        html += '    <div class="bg">\n' +
            '        <img id="bg" src="' + data[select].cover + '"/>\n' +
            '    </div>'
        $('#carousel').html(html);

        $('#carousel .slide').click(function () {
            moveToSelected($(this));
            $('#bg').attr('src', $('.selected').find('img')[0].src);
        });

    },
    error: function () {
        //请求出错处理
        inP.parent('.f_row').addClass('shake');
        inP.val('');
        $('.login_info').get(0).innerHTML = "登录失败";
        setTimeout(function () {
            $('.login_info').get(0).innerHTML = "GO";
        }, 700);
    }
});

function createHtml(data, position) {
    var artist = data.artists.map(function (item) {
        return item.name;
    }).join(' ');
    return '<div class=\"slide ' + position + ' media\" id="' + data.id + '">' + '<img class="media__image" src="' + data.cover + '">' + '<div class="media__body"><h1>《'
        + data.title + '》</h1><h1>' + artist + '</h1><p>' + data.intro + '</p> <div class="todetail" onclick="albumclick(this)"> </div></div></div>';
}

function moveToSelected(element) {

    if (element == "next") {
        var selected = $(".selected").next();
    } else if (element == "prev") {
        var selected = $(".selected").prev();
    } else {
        var selected = element;
    }

    var next = $(selected).next().filter(".slide");
    var prev = $(selected).prev().filter(".slide");
    var prevSecond = $(prev).prev().filter(".slide");
    var nextSecond = $(next).next().filter(".slide");

    $(selected).removeClass().addClass("selected slide media");

    $(prev).removeClass().addClass("prev slide media");
    $(next).removeClass().addClass("next slide media");

    $(nextSecond).removeClass().addClass("nextRightSecond slide media");
    $(prevSecond).removeClass().addClass("prevLeftSecond slide media");

    $(nextSecond).nextAll().filter(".slide").removeClass().addClass('hideRight slide media');
    $(prevSecond).prevAll().filter(".slide").removeClass().addClass('hideLeft slide media');
}

/*$('.selected').children('.media__body').mouseover(function(){
    console.log("56")
});*/

// Eventos teclado
function albumclick(e) {
    if ($(e.parentNode.parentNode).hasClass('selected')) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1/albums/" + $('.selected').attr('id'),
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
                var html='';
                $('.album-title').html('《'+data.title+'》');
                $('.album-artist').html(artist);
                $('.album-intro').html(data.intro);
                $.each(data.tracks, function (index, element) {
                    html +=(index+1)+'. '+element.title+'<br>';
                });
                $('.album-tracks').html(html);
                $('.profile-image').css("background-image","url("+data.cover+")");
                var tags='';
                $.each(data.tags, function (index, element) {
                    tags +=' <div class="tag">'+element.name+'</div>';
                });
               $('.album-detail').html('  <p>流派: '+data.genres+'<br>专辑类型: '+data.version+'<br>发行时间: '+data.pubdate+'<br>出版商: '+data.publisher+'</p>'+tags);
                $('.mask').show();
                $('#album').show();

            },
            error: function () {
                //请求出错处理
                notification(false,"请先登录");
            }

        });
    }
}

