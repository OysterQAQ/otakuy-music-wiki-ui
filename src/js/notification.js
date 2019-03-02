function notification(status,message){
    if(status){
        $('.notification-icon ').css('background-color','#aaefd1');
        $('.notification-icon ').css('color','#aaefd1');
        $('.notification-icon ').css('border','2px solid #aaefd1;');
    }
    else {
        $('.notification-icon ').css('background-color','#ff674b');
        $('.notification-icon ').css('color','#ff674b');
        $('.notification-icon ').css('border','2px solid #ff674b;');
    }
    $( ".notification" ).addClass( "animate--drop-in-fade-out" );
    $('.notification-body').html(message);
    setTimeout(function(){
        $( ".notification" ).removeClass( "animate--drop-in-fade-out" );
    }, 3500);
};