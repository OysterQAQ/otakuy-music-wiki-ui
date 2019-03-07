var reply=function (comment) {
    var to_username = $("#to-username");
    to_username.val("@ " + $(comment).attr("user-username") + " ");
    to_username.attr('to_id', $(comment).attr("user-id"));
    to_username.attr('to_username', $(comment).attr("user-username"))
};
var getComment = function (album) {
    $.ajax({
        url: otakuyApi + "/albums/" + album + "/comments?page=0",
        type: 'GET',
        contentType: false,
        headers: {
            Authorization: $.cookie('Authorization')
        },
        success: function (data) {
            var html = '';
            data=data.data;
            $.each(data, function (index, element) {
                html += ('<div class="comment" onclick="reply(this)" user-id="' + element.from_id) + '" user-username="' + element.from_username + '"><div class="avatar"><img src="https://avatar.otakuy.com/' + element.from_id + '.png"/></div><div class="userinfo" ><strong>' + element.from_username + '</strong></div><div class="content">@ <a href="#">' + element.to_username + '</a> ' + element.content + '</div><div class="createTime">' + element.createTime + '</div></div>'
            });
            $('#commentlist').html(html);


        },
        error: function (data) {
            notification(false, "获取评论列表失败")
            console.log(data);
        }
    });
}
