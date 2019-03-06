$('#intro_edit').click(function () {
    $('#intro').removeAttr("readonly");

});


$("#imageUpload").change(function() {
    readURL(this);
});
$('#sign-out').click(function () {
    $('.login-box').children().show();
    $('#avatar').hide();
    $('#avatar').attr("src", '');
    $.cookie('Authorization', '', { expires: -1 });
    localStorage.clear();
    $('.profile-card-container').attr('class', 'profile-card-container animated fadeOutDown')
    $('.profile-card-container').hide();
    $('.mask').hide();
    $('.login_info').get(0).innerHTML = "GO";
    $('.input-field.password').val('');
    $('#false').empty()
    $('#true').empty()
    isLogin = false;
    notification(true,"已安全登出")

});