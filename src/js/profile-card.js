$('#intro_edit').click(function () {
    $('#intro').removeAttr("readonly");

});


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