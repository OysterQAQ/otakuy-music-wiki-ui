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
});/*
$('.btn').each(function() {
    $(this).on('click', function(e){
        e.preventDefault();

        var finp =  $(this).parent('form').find('input');

        console.log( $("#login_form").serializeObject());

        if (!finp.val() == 0) { //成功
            $(this).addClass('active');
        }

        setTimeout(function () {

            inP.val('');

            $('.f_row').removeClass('shake focus');
            $('.btn').removeClass('active');

        }, 2000);

        if(inP.val() == 0) {//失败
            inP.parent('.f_row').addClass('shake');
        }

        //inP.val('');
        //$('.f_row').removeClass('focus');

    });
});*/
$('#login_btn').on('click', function (e) {
    e.preventDefault();
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
            setTimeout(function () {
                $('.container').hide();
            }, 500);

        },
        error: function () {
            //请求出错处理
            inP.parent('.f_row').addClass('shake');
            inP.val('');
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
        url: otakuyApi + "/forgetPassword?email=" + $('#reset_email').val(),
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
    if (!$('.formBox').hasClass('level-reg')){
    $.ajax({
        type: "get",
        url: otakuyApi + "/verificationCode",
        datatype: "application/json",
        success: function (data) {
         //   console.log( data.data.id);
            $("#verification_code").attr("verification_id",  data.data.id);
            $("#verification_img").attr("src","data:image/jpeg;base64,"+  data.data.imageBase64);
        },
        error: function () {
            alert("获取验证码失败")
        }
    });}
});
$('#goto_register_form').on('click', function () {
    $.ajax({
        type: "get",
        url: otakuyApi + "/verificationCode",
        datatype: "application/json",
        success: function (data) {
            //   console.log( data.data.id);
            $("#verification_code").attr("verification_id",  data.data.id);
            $("#verification_img").attr("src","data:image/jpeg;base64,"+  data.data.imageBase64);
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
