function notification(status,message){
    var notification = $(".notification");
    var notification_icon = $('.notification-icon ');
    notification.show()
    if(status){
        notification_icon.css('background-color', '#aaefd1');
        notification_icon.css('color', '#aaefd1');
        notification_icon.css('border', '2px solid #aaefd1;');
    }
    else {
        notification_icon.css('background-color', '#ff674b');
        notification_icon.css('color', '#ff674b');
        notification_icon.css('border', '2px solid #ff674b;');
    }
    notification.addClass("animate--drop-in-fade-out");
    $('.notification-body').html(message);
    setTimeout(function(){
        notification.removeClass("animate--drop-in-fade-out");
        notification.hide()
    }, 3500);
};

var getNotificationCount = function () {
    $.ajax({
        type: "GET",
        headers: {
            Authorization: $.cookie('Authorization')
        },
        url: otakuyApi + "/notifications/noRead",
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        success: function (data, textStatus, request) {
            console.log(data)
            $('.notification--num').html(data.data)
            setTimeout(function () {
                notification(true, "共有" + data.data + "条未读消息");
            }, 600);
            //   notification(true, "共有"+data.data.length+"条未读消息");
        },
        error: function (data, textStatus, request) {
            notification(false, "获取消息错误");
        }
    });
}