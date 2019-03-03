$(document).keypress(function (e) {
    if (e.which == 13) {
        if ($("#track-sum").is(":focus")) {
            var html = '';
            for (var i = 0; i < $('#track-sum').val(); i++) {
                html += ' <div class="line-editable"> <input autocomplete="off" placeholder="音轨' + (i + 1) + '" type="text" class="Field_Input track"  name="pubdate"  /> <label><div>音轨' + (i + 1) + '</div> </label></div>';
            }
            $('#tracks').html(html)
        }
        if ($("#intro").is(":focus")) {
            $.ajax({
                type: "put",
                headers: {
                    Authorization: $.cookie('Authorization')
                },
                url: "http://127.0.0.1/users/" + JSON.parse(window.localStorage.user).id + "/intro?intro=" + $('#intro').val(),
                contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
                success: function (data, textStatus, request) {
                    window.localStorage.setItem("user", JSON.stringify(data.data))
                    notification(true, "修改简介成功");

                },
                error: function () {
                    notification(false, "修改简介失败");
                }
            });
            console.log("http://127.0.0.1/" + JSON.parse(window.localStorage.user).id + "/intro?intro=" + $('#intro').val())
            $('#intro').attr("readonly", "");

        }
        if ($("#commentfield").is(":focus")) {
            var to_username = $("#to-username");
            var comment={};
            comment.album=$('#album').attr('album-id');
           comment.to_id=to_username.attr('to_id');
           comment.to_username=to_username.attr('to_username');
            comment.content=$('#commentfield').val();
            console.log(comment)
            $.ajax({
                type: "POST",
                headers: {
                    Authorization: $.cookie('Authorization')
                },
                url: "http://127.0.0.1/albums/" + comment.album+ "/comments" ,
                contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
                data: JSON.stringify(comment),
                success: function (data, textStatus, request) {
                    getComment($('#album').attr('album-id'))
                    notification(true, "评论成功");

                },
                error: function () {
                    notification(false, "评论失败");
                }
            });

        }

    }

});
