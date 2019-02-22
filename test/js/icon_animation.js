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
    if (!isLogin) {
        if ($('.container').css('display')=='none')
            $('.container').show();
        else
        $('.container').hide();
    }
    else console.log('显示个人信息页')
});

$("#helpbox").hover(function () {
    $(".inner").addClass("animate");
    $('.inner').append("<style>.inner:after{-webkit-animation: particle_ 2s infinite linear;\n" +
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