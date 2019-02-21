
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

// Eventos teclado

$('#carousel .slide').click(function() {
    moveToSelected($(this));
    console.log($(this).find('img')[0].src);
    $('#bg').attr('src',$(this).find('img')[0].src);
});


