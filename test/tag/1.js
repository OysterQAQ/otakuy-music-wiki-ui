$(document).ready(function() {

    // Dropdown
    $(".dropdown").on("click", ".add-tag", function() {

        if ( $(".dropdown").hasClass("open") ) {
            $(".dropdown").removeClass("open");
        } else {
            $(".dropdown").addClass("open");
        }
    });

    // Add Tags
    $(".dropdown").on("click", ".dropdown-menu > li", function() {
        if ( !$(this).hasClass("added") ) {
            $(this).addClass("added");

            $(".tag-area").append('<div class="tag">' + $(this).text() + '<span>×</span></div>');
        }
    });

    // Remove Tags
    $(".wrapper").on("click", ".tag > span", function() {
        $(this).parent().remove();

        var objectText = $(this).parent().text().slice(0,-1);

        $(".dropdown-menu > li:contains('" + objectText + "')").removeClass("added");
    });

});