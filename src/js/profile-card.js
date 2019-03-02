$('#intro_edit').click(function () {
    $('#intro').removeAttr("readonly");

});
$(document).keypress(function (e) {
    console.log($("#intro").is(":focus"))
    if (e.which == 13&&$("#intro").is(":focus")) {
          $.ajax({
              type: "put",
              headers: {
                  Authorization: $.cookie('Authorization')
              },
              url: "http://127.0.0.1/users/"+JSON.parse(window.localStorage.user).id+"/intro?intro="+$('#intro').val(),
              contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
              success: function (data, textStatus, request) {
                  window.localStorage.setItem("user",JSON.stringify(data.data))
                  notification(true,"修改简介成功");

              },
              error: function () {
                  notification(false,"修改简介失败");
              }
          });
        console.log("http://127.0.0.1/"+JSON.parse(window.localStorage.user).id+"/intro?intro="+$('#intro').val())
        $('#intro').attr("readonly","");

    }
});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.user-pic').css('background-image', 'url('+e.target.result +')');
            $('.user-pic').hide();
            $('.user-pic').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageUpload").change(function() {
    readURL(this);
});