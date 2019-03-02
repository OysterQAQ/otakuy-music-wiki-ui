var isLogin = false;

$(".loginbox").hover(function () {
    $(".wave.-one").addClass("w1")
    $(".wave.-two").addClass("w2")
    $(".wave.-three").addClass("w3")
}, function () {
    $(".wave.-one").removeClass("w1")
    $(".wave.-two").removeClass("w2")
    $(".wave.-three").removeClass("w3")
});

$('.loginbox').click(function (e) {
    e.preventDefault();
    var container =$('.container')
    if (!isLogin) {
        if (container.css('display') == 'none'||container.hasClass('fadeOutDown')) {
            $('.loginbox').css('z-index', 3);
            $('.mask').show();
            container.attr("class","animated fadeInUp container");
            container.show();
        } else{
            $('.loginbox').css('z-index', 1);
            container.attr("class","animated fadeOutDown container");
            $('.mask').hide();
        }
    }
});
$('#beerimg').click(function (e) {
    var album_form=$('#album_form')
    e.preventDefault();
    if (isLogin) {
    if (album_form.css('display') === 'none'||album_form.hasClass('fadeOutDown')) {
        $('.beerbox').css('z-index', 2);
        $('.mask').show();
        album_form.attr("class","animated fadeInUp");
        album_form.show();
    } else {
        album_form.attr("class","animated fadeOutDown");
        $('.mask').hide();
        $('.beerbox').css('z-index', 1);
    }}
    else notification(false,"请先登录")
});

$("#helpbox").hover(function () {
    var inner=$(".inner")
    inner.addClass("animate");
    inner.append("<style>.inner:after{-webkit-animation: particle_ 2s infinite linear;\n" +
        "    animation: particle_ 2s infinite linear;}</style>");
}, function () {
    $(".inner").removeClass("animate");
    $("style").remove();
});
$(".beerbox").hover(function () {
    $("#beerimg").attr('src', "img/beer.svg");
}, function () {
    $("#beerimg").attr('src', "img/beer1.svg");
});