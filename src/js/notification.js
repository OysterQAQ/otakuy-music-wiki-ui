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