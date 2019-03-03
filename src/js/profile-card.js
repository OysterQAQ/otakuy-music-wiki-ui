$('#intro_edit').click(function () {
    $('#intro').removeAttr("readonly");

});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.user-pic').css('background-image', 'url('+e.target.result +')');
            $('.user-pic').hide();
            $('.user-pic').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageUpload").change(function() {
    readURL(this);
});
$('#sign-out').click(function () {
    $('.loginbox').children().show();
    $('#avatar').hide();
    $('#avatar').attr("src", '');
    $.cookie('Authorization', '', { expires: -1 });
    localStorage.clear();
    $('.profile-card').attr('class','profile-card animated fadeOutDown')
    $('.profile-card').hide();
    $('.mask').hide();
    $('.login_info').get(0).innerHTML = "GO";
    $('.input-field.password').val('');

    isLogin=false
    notification(true,"已安全登出")

});