$(".login-box").hover(function () {
    $(".wave.-one").addClass("w1")
    $(".wave.-two").addClass("w2")
    $(".wave.-three").addClass("w3")
}, function () {
    $(".wave.-one").removeClass("w1")
    $(".wave.-two").removeClass("w2")
    $(".wave.-three").removeClass("w3")
});

$('.login-box').click(function (e) {
    e.preventDefault();
    var container = $('.login-box-container')
    if (!isLogin) {
        if (container.css('display') == 'none'||container.hasClass('fadeOutDown')) {
            $('.login-box').css('z-index', 3);
            $('.mask').show();
            container.attr("class", "animated fadeInUp login-box-container");
            container.show();
        } else{
            $('.login-box').css('z-index', 1);
            container.attr("class", "animated fadeOutDown login-box-container");
            setTimeout(function () {
                container.hide();
            }, 600);
            $('.mask').hide();
        }
    }
});
$('#beerimg').click(function (e) {
    var album_form=$('#album_form')
    e.preventDefault();
    if (isLogin) {
        if (album_form.css('display') === 'none') {
        $('.beer-box').css('z-index', 2);
        $('.mask').show();
        album_form.attr("class","animated fadeInUp");
        album_form.show();
    } else {
        album_form.attr("class","animated fadeOutDown");
        setTimeout(function () {
            album_form.hide();
        }, 600);
        $('.mask').hide();
        $('.beer-box').css('z-index', 1);
    }}
    else notification(false,"请先登录")
});

$("#help-box").hover(function () {
    var inner=$(".inner")
    inner.addClass("animate");
    inner.append("<style>.inner:after{-webkit-animation: particle_ 2s infinite linear;\n" +
        "    animation: particle_ 2s infinite linear;}</style>");
}, function () {
    $(".inner").removeClass("animate");
    $("style").remove();
});
$(".beer-box").hover(function () {
    $("#beerimg").attr('src', "img/beer.svg");
}, function () {
    $("#beerimg").attr('src', "img/beer1.svg");
});

$('.notification--bell').click(function (e) {
    var notification_container = $('.notification-container')
    e.preventDefault();
    if (isLogin) {
        if (notification_container.css('display') === 'none') {
            getNotificationList($('.active a').attr('href').substring(1));
            notification_container.attr("class", " notification-container animated bounceIn");
            notification_container.show();
        } else {
            notification_container.attr("class", "notification-container animated bounceOut");
            setTimeout(function () {
                notification_container.hide();
                $('.notification--num').html('0');
                $('#false').empty()
                $('#true').empty()
            }, 600);

        }
    } else notification(false, "请先登录")
});


$('#help-box').click(function (e) {
    var help_container = $('.help-container')
    e.preventDefault();

    if (help_container.css('display') === 'none') {

        help_container.attr("class", "help-container animated fadeInUp");
        $('#help-box').css('z-index', 2);
        $('.mask').show();
        help_container.show();

    } else {
        help_container.attr("class", "help-container animated fadeOutDown");
        setTimeout(function () {
            help_container.hide();
        }, 600);
        $('.mask').hide();
        $('#help-box').css('z-index', 1);
    }
});