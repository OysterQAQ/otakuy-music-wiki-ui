$(document).ready(function () {
    if ($.cookie("Authorization") != null) {
        var user = JSON.parse(window.localStorage.user);
        $('#avatar').attr('src', user.avatar + '');
        $('.loginbox').children().hide();
        $('#avatar').show();
        $('#username').html(user.username);
        $('#starcount').html(user.star);
        $('#intro').val(user.intro);
        isLogin = true;
    }

});
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
    if ($('.profile-card').css('display') == 'none') {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1/uers/" + JSON.parse(window.localStorage.user).id + "/albums/active?page=0",
            headers: {
                Authorization: $.cookie('Authorization')
            },
            contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
            success: function (data, textStatus, request) {
                albums = data.data;
                var html = '';
                $.each(albums, function (index, element) {
                    var artist = element.artists.map(function (item) {
                        return item.name;
                    }).join(' ');
                    html += ('<div class="albuminfo" album_id="' + element.id) + '"><img class="cover" src="' + element.cover + '"><div class="title">' + element.title + '</div><div class="artist">' + artist + '</div><svg  class="edit_btn" id="' + element.id + '"><use xlink:href="#icon-edit"></use></svg></div>'

                });

                $('#albumlist').html(html);
                $('#albumcount').html(albums.length);
                $('#starcount').html(JSON.parse(window.localStorage.user).star);
                $('.user-pic').css("background-image","url("+JSON.parse(window.localStorage.user).avatar+")");

            },
            error: function () {
                alert("获取专辑数据失败")
            }
        });
        $('.mask').show();
        $('.profile-card').show();
    } else {

        $('.profile-card').hide();
        $('.mask').hide();
    }

});

$('#login_btn').on('click', function (e) {
    e.preventDefault();
    //  if(isLogin=false){}

    console.log($("#login_form").serializeObject());
    $.ajax({
        type: "post",
        url: "http://127.0.0.1/login",
        processData: false,
        datatype: "application/json",
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        data: JSON.stringify($("#login_form").serializeObject()),
        success: function (data, textStatus, request) {
            $.cookie('Authorization', "Bearer " + request.getResponseHeader('Authorization'), {expires: 20});
            $('.login_info').get(0).innerHTML = "登录成功";
            var user = data.data
            window.localStorage.setItem("user", JSON.stringify(user))
            console.log();
            isLogin = true;
            $('#avatar').attr("src", user.avatar);
            $('#username').html(user.username);
            $('#intro').val(user.intro);
            $('#starcount').html(user.star);
            $('.loginbox').children().hide();
            $('#avatar').show();
            setTimeout(function () {
                $('.container').hide();
            }, 500);


        },
        error: function () {
            //请求出错处理
            inP.parent('.f_row').addClass('shake');
            $('.password').val('');
            $('.login_info').get(0).innerHTML = "登录失败";
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
        url: "http://127.0.0.1/register",
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
            setTimeout(function () {
                $('.formBox').removeClass('level-reg').addClass('level-login');
            }, 700);
        },
        error: function () {
            $('#register_btn').html("注册失败");
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
        url: "http://127.0.0.1/forgetPassword?email=" + $('#reset_email').val(),
        datatype: "application/json",
        contentType: 'application/json',
        success: function (data, textStatus, request) {
            console.log(data)
            $('#reset_btn').html("发送成功");
            setTimeout(function () {
                $('.formBox').removeClass('level-forget').addClass('level-login');
            }, 700);
        },
        error: function () {
            $('#reset_btn').html("发送失败");
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
            url: "http://127.0.0.1/verificationCode",
            datatype: "application/json",
            success: function (data) {
                //   console.log( data.data.id);
                $("#verification_code").attr("verification_id", data.data.id);
                $("#verification_img").attr("src", "data:image/jpeg;base64," + data.data.imageBase64);
            },
            error: function () {
                alert("获取验证码失败")
            }
        });
    }
});
$('#goto_register_form').on('click', function () {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/verificationCode",
        datatype: "application/json",
        success: function (data) {
            //   console.log( data.data.id);
            $("#verification_code").attr("verification_id", data.data.id);
            $("#verification_img").attr("src", "data:image/jpeg;base64," + data.data.imageBase64);
        },
        error: function () {
            alert("获取验证码失败")
        }
    });
});


$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
