
var inP = $('.input-field');

inP.on('blur', function () {
    if (!this.value) {
        $(this).parent('.f_row').removeClass('focus');
    } else {
        $(this).parent('.f_row').addClass('focus');
    }
}).on('focus', function () {
    $(this).parent('.f_row').addClass('focus');
    $('.btn').removeClass('active');
    $('.f_row').removeClass('shake');
});


$('.resetTag').click(function (e) {
    e.preventDefault();

    $('.formBox').addClass('level-forget').removeClass('level-reg');
});

$('.back').click(function (e) {
    e.preventDefault();
    $('.formBox').removeClass('level-forget').addClass('level-login');
});


$('.regTag').click(function (e) {
    e.preventDefault();
    $('.formBox').removeClass('level-reg-revers');
    $('.formBox').toggleClass('level-login').toggleClass('level-reg');
    if (!$('.formBox').hasClass('level-reg')) {
        $('.formBox').addClass('level-reg-revers');
    }
});
$('#avatar').on('click', function (e) {
    var profile_card = $('.profile-card-container')
    if (profile_card.css('display') == 'none'||profile_card.hasClass('fadeOutDown')) {
        $.ajax({
            type: "get",
            url: otakuyApi + "/uers/" + JSON.parse(window.localStorage.user).id + "/albums/active?page=0",
            headers: {
                Authorization: $.cookie('Authorization')
            },
            contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
            success: function (data, textStatus, request) {
                albums = data.data;
                if (albums != null) {
                    var html = '';
                    $.each(albums, function (index, element) {
                        var artist = element.artists.map(function (item) {
                            return item.name;
                        }).join(' ');
                        html += ('<div class="albuminfo" album_id="' + element.id) + '"><img class="cover" src="' + element.cover + '"><div class="title">' + element.title + '</div><div class="artist">' + artist + '</div><svg  class="edit_btn" id="' + element.id + '"><use xlink:href="#icon-edit2-copy"></use></svg></div>'

                    });

                    $('#albumlist').html(html);
                    $('#albumcount').html(albums.length);
                } else {
                    $('#albumcount').html(0);
                    $('#albumlist').html('');
                }
                $('#starcount').html(JSON.parse(window.localStorage.user).star);
                $('.user-pic').css("background-image","url("+JSON.parse(window.localStorage.user).avatar+")");

            },
            error: function () {
                notification(false,"获取用户专辑数据失败")
            }
        });
        $('.login-box').css('z-index', 2);
        $('.mask').show();
        profile_card.show();
        profile_card.attr('class', 'profile-card-container animated fadeInUp')

    } else {
        $('.login-box').css('z-index', 1);
        profile_card.attr('class', 'profile-card-container animated fadeOutDown')
        setTimeout(function () {
            $('.profile-card-container').hide();
            $('.mask').hide();
        }, 600);
        // $('.profile-card-container').hide();

    }

});

$('#login_btn').on('click', function (e) {
    e.preventDefault();
    //  if(isLogin=false){}

    console.log($("#login_form").serializeObject());
    $.ajax({
        type: "post",
        url: otakuyApi + "/login",
        processData: false,
        datatype: "application/json",
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        data: JSON.stringify($("#login_form").serializeObject()),
        success: function (data, textStatus, request) {
            $.cookie('Authorization', "Bearer " + request.getResponseHeader('Authorization'), {expires: 20});
            $('.login_info').get(0).innerHTML = "登录成功";
            notification(true,"登录成功");
            var user = data.data
            window.localStorage.setItem("user", JSON.stringify(user))
            console.log();
            isLogin = true;
            $('#avatar').attr("src", user.avatar);
            $('#username').html(user.username);
            $('#intro').val(user.intro);
            $('#starcount').html(user.star);
            $('.login-box').children().hide();
            $('#avatar').show();
            setTimeout(function () {
                $('.login-box-container').hide();
            }, 500);
            $('.mask').hide();
            $('.beer-box').css('z-index', 1);
            getNotificationCount();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //请求出错处理
            inP.parent('.f_row').addClass('shake');
            $('.password').val('');
            $('.login_info').get(0).innerHTML = "登录失败";
            notification(false, XMLHttpRequest.responseJSON.message)
            setTimeout(function () {
                $('.login_info').get(0).innerHTML = "GO";
            }, 700);
        }
    });
});


$('#register_btn').on('click', function (e) {
    e.preventDefault();

    console.log($("#register_form").serializeObject());
    $.ajax({
        type: "post",
        url: otakuyApi + "/register",
        headers: {
            verificationCodeId: $("#verification_code").attr("verification_id"),
            verificationCode: $("#verification_code").val(),
        },
        processData: false,
        datatype: "application/json",
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        data: JSON.stringify($("#register_form").serializeObject()),
        success: function (data, textStatus, request) {
            console.log(data)
            $('#register_btn').html("注册成功");
            notification(true,"注册成功");
            setTimeout(function () {
                $('.formBox').removeClass('level-reg').addClass('level-login');
            }, 700);
        },
        error: function () {
            $('#register_btn').html("注册失败");
            notification(false,"注册失败");
            inP.parent('.f_row').addClass('shake');
            setTimeout(function () {
                $('#register_btn').html("CREATE");
            }, 1000);
        }
    });
});

$('#reset_btn').on('click', function (e) {
    e.preventDefault();

    console.log($("#reset_form").serializeObject());
    $.ajax({
        type: "get",
        url: otakuyApi + "/forgetPassword?email=" + $('#reset_email').val(),
        datatype: "application/json",
        contentType: 'application/json',
        success: function (data, textStatus, request) {
            console.log(data)
            $('#reset_btn').html("发送成功");
            notification(true,"发送成功");
            setTimeout(function () {
                $('.formBox').removeClass('level-forget').addClass('level-login');
            }, 700);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#reset_btn').html("发送失败");
            notification(false, XMLHttpRequest.responseJSON.message)
            inP.parent('.f_row').addClass('shake');
            setTimeout(function () {
                $('#reset_btn').html("RESET");
            }, 1000);
        }
    });
});


$('#verification_img').on('click', function () {
    if (!$('.formBox').hasClass('level-reg')) {
        $.ajax({
            type: "get",
            url: otakuyApi + "/verificationCode",
            datatype: "application/json",
            success: function (data) {
                //   console.log( data.data.id);
                $("#verification_code").attr("verification_id", data.data.id);
                $("#verification_img").attr("src", "data:image/jpeg;base64," + data.data.imageBase64);
            },
            error: function () {
                notification(false,"获取验证码失败");
            }
        });
    }
});
$('#goto_register_form').on('click', function () {
    $.ajax({
        type: "get",
        url: otakuyApi + "/verificationCode",
        datatype: "application/json",
        success: function (data) {
            //   console.log( data.data.id);
            $("#verification_code").attr("verification_id", data.data.id);
            $("#verification_img").attr("src", "data:image/jpeg;base64," + data.data.imageBase64);
        },
        error: function () {
            notification(false,"获取验证码失败");
        }
    });
});

