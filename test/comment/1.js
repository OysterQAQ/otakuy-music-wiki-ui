$(".comment").click(function(){
    $("#to-username").val("@ "+  $(this).attr("user-username")+" ");
})