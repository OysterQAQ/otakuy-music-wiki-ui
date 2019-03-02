function notification(status,message){
    if(status){
        $('.notification-icon ').css('background-color','#66847C');
        $('.notification-icon ').css('color','#66847C');
        $('.notification-icon ').css('border','2px solid #66847C;');
    }
    else {
        $('.notification-icon ').css('background-color','#FF4500');
        $('.notification-icon ').css('color','#FF4500');
        $('.notification-icon ').css('border','2px solid #FF4500;');
    }
    $( ".notification" ).addClass( "animate--drop-in-fade-out" );
    $('.notification-body').html(message);
    setTimeout(function(){
        $( ".notification" ).removeClass( "animate--drop-in-fade-out" );
    }, 3500);
};