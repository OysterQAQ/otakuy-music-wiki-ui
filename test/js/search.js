
$('.search-input').focus(function(){
    $(this).parent().addClass('focus');
    var scan = $("input[type='radio']:checked").val();
    console.log(scan)
}).blur(function(){
    $(this).parent().removeClass('focus');
})

