;(function (defaults, $, window, document, undefined) {

    'use strict';

    $.extend({
        // Function to change the default properties of the plugin
        // Usage:
        // jQuery.tabifySetup({property:'Custom value'});
        tabifySetup: function (options) {

            return $.extend(defaults, options);
        }
    }).fn.extend({
        // Usage:
        // jQuery(selector).tabify({property:'value'});
        tabify: function (options) {

            options = $.extend({}, defaults, options);

            return $(this).each(function () {
                var $element, tabHTML, $tabs, $sections;

                $element = $(this);
                $sections = $element.children();

                // Build tabHTML
                tabHTML = '<ul class="tab-nav">';
                $sections.each(function () {
                    if ($(this).attr("title") && $(this).attr("id")) {
                        tabHTML += '<li><a href="#' + $(this).attr("id") + '">' + $(this).attr("title") + '</a></li>';
                    }
                });
                tabHTML += '</ul>';

                // Prepend navigation
                $element.prepend(tabHTML);

                // Load tabs
                $tabs = $element.find('.tab-nav li');

                // Functions
                var activateTab = function (id) {
                    $tabs.filter('.active').removeClass('active');
                    $sections.filter('.active').removeClass('active');
                    $tabs.has('a[href="' + id + '"]').addClass('active');
                    $sections.filter(id).addClass('active');
                }

                // Setup events
                $tabs.on('click', function (e) {
                    activateTab($(this).find('a').attr('href'));
                    console.log($(this).find('a').attr('href').substring(1));
                    var isRead = $(this).find('a').attr('href').substring(1) === "false" ? false : true;
                    getNotificationList(isRead)
                    $("#" + !isRead).html('');
                    e.preventDefault();
                });

                // Activate first tab
                activateTab($tabs.first().find('a').attr('href'));

            });
        }
    });
})({
    property: "value",
    otherProperty: "value"
}, jQuery, window, document);


// Calling the plugin
$('.tab-group').tabify();

$('.notification-item').on('click', function (e) {
    console.log($(this).html())
    e.preventDefault();
});
var getNotificationList = function (isRead) {
    $.ajax({
        type: "GET",
        headers: {
            Authorization: $.cookie('Authorization')
        },
        url: otakuyApi + "/notifications?isRead=" + isRead,
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        success: function (data, textStatus, request) {
            console.log(data)
            var html = '';
            if (data.data != null) {
                $.each(data.data, function (index, element) {
                    html += '  <div class="notification-item" album-id="' + element.albumId + '"> <h3>' + element.creatTime + '</h3><p>' + element.content + '</p></div>';
                });
                $("#" + isRead).html(html)
            }
            //   notification(true, "共有"+data.data.length+"条未读消息");
        },
        error: function (data, textStatus, request) {
            notification(false, "获取消息错误");
        }
    });
}
