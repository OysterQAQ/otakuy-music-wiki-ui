const tagsModule = ((_config) => {
    const defaultConfig = {
        allowDuplicates: false,
        tagMaxOuterWidth: (16 * 2) + 80 // SCSS: ($gutter-size * 2) + $tag-max-width
    };
    const config = Object.assign({}, defaultConfig, _config);

    const DOM = {
        getNewTagElement: (value) => {
            const newElement = document.createElement('span');

            newElement.classList.add('tag');

            const newElementTextNode = document.createTextNode(value);

            newElement.appendChild(newElementTextNode);

            return newElement;
        },
        container: document.querySelector('.tag-list-container'),
        getTags: () => {
            return document.querySelectorAll('.tag');
        },
        input: document.querySelector('.tag-list-input'),
        getLastTag: () => {
            const tags = DOM.getTags();

            return tags[tags.length - 1];
        },
        showTextTag: document.querySelector('.tag.showtext')
    };
    const dispatch = (() => {
        let events = [];

        return (event) => {
            events.push(event);

            switch (event.action) {
                case 'ADD_TAG':
                    addTag(event.text);

                    break;
                case 'REMOVE_TAG':
                    removeTag(event.tag);

                    break;
                case 'HIGHLIGHT_TAG':
                    highlightTag(event.tag);

                    break;
            }
        };
    })();

    const attachFocusEvent = () => {
        const focusInput = () => {
            DOM.input.focus();
        };

        DOM.container.addEventListener('click', focusInput);
    };

    const attachSelectionEventListener = (tag) => {
        tag.addEventListener('click', (clickEvent) => {
            clickEvent.stopPropagation();
        });
    };

    const attachTagSelectionEvents = () => {
        DOM.getTags().forEach(attachSelectionEventListener);
    };

    const attachHoverEventListener = (tag) => {
        const showFullTextTag = (tagFullText) => {
            DOM.showTextTag.innerText = tagFullText;
            DOM.showTextTag.classList.add('active');
        };


    };

    const attachTagFocusEvents = () => {
        DOM.getTags().forEach(attachHoverEventListener);
    };

    const addTag = (newTagText) => {
        const newTag = DOM.getNewTagElement(newTagText);

        DOM.container.insertBefore(newTag, DOM.input);

        attachSelectionEventListener(newTag);
        attachHoverEventListener(newTag);
        clearInput();

        return newTag;
    };

    const clearInput = () => {
        DOM.input.value = '';
    };

    const removeTag = (tag) => {
        tag.remove();
    };

    const highlightTag = (() => {
        const highlightDurationMs = 500;
        let removeHighlightTimeout;

        return (tag) => {
            if (removeHighlightTimeout) {
                return false;
            }

            tag.classList.add('highlighted');

            removeHighlightTimeout = setTimeout(() => {
                tag.classList.remove('highlighted');
                removeHighlightTimeout = null;
            }, highlightDurationMs);

            return true;
        };
    })();

    const attachInputKeydownEvents = (allowDuplicates) => {
        const isKey = (keydownEvent) => {
            const key = keydownEvent.which || keydownEvent.keyCode || 0;

            return {
                backspace: key === 8,
                enter: key === 13
            };
        };

        const inputIsEmpty = () => !(DOM.input.value.length);

        const getTagDuplicate = () => {
            const newTagText = DOM.input.value;
            let duplicateTag;

            DOM.getTags().forEach((tag) => {
                const isDuplicate = tag.innerText === newTagText;

                if (isDuplicate) {
                    duplicateTag = tag;
                }

                return !isDuplicate;
            });

            return duplicateTag;
        };

        const handleInputKeydown = (keydownEvent) => {
            if (isKey(keydownEvent).backspace && inputIsEmpty()) {
                dispatch({
                    action: 'REMOVE_TAG',
                    tag: DOM.getLastTag()
                });
            } else if (isKey(keydownEvent).enter && !inputIsEmpty()) {
                if (!allowDuplicates) {
                    const duplicateTag = getTagDuplicate();

                    if (duplicateTag) {
                        dispatch({
                            action: 'HIGHLIGHT_TAG',
                            tag: duplicateTag
                        });

                        return false;
                    }
                }

                dispatch({
                    action: 'ADD_TAG',
                    text: DOM.input.value
                });

                return true;
            }
        };

        DOM.input.addEventListener('keydown', handleInputKeydown);
    };

    const attachFocusedEvent = () => {
        DOM.input.addEventListener('focus', (focusEvent) => {
            DOM.container.classList.add('focused');
        });

        DOM.input.addEventListener('blur', (focusEvent) => {
            DOM.container.classList.remove('focused');
        });
    };

    const init = () => {
        attachFocusEvent();
        attachTagSelectionEvents();
        attachTagFocusEvents(config.tagMaxOuterWidth);
        attachInputKeydownEvents(config.allowDuplicates);
        attachFocusedEvent();
    };

    init();

    return {
        addTag: addTag
    };
})();
$('#get-album-suggestion').click(function () {

    if ($('.album-input-title').val() != '') {
        if ($('#suggest-album').css('display') == 'none') {
            $('#suggest-album').css('display', '-webkit-box');
            $.ajax({
                type: "get",
                url: otakuyApi + "/douban?title=" + $('.album-input-title').val(),
                contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
                headers: {
                    Authorization: $.cookie('Authorization')
                },
                success: function (data, textStatus, request) {
                    notification(true, "自动匹配成功")
                    console.log(data)
                    data = data.data;
                    var html = '';
                    $.each(data, function (index, element) {
                        html += '<div class="suggest-item" ><img class="item-cover" id="' + element.douban_id
                            + '" src="https://douban.otakuy.com:23334/get/' + element.cover + '" onclick="getDoubanDetail(this)"/><div  class="item-title">' + element.title + '</div></div>';
                    });
                    $('#suggest-album').html(html)
                },
                error: function () {
                    notification(false, "自动匹配失败")
                }
            });
        } else $('#suggest-album').hide();
    } else {
        notification(false, "标题不能为空")
    }
});

function getDoubanDetail(item) {
    $.ajax({
        type: "get",
        url: otakuyApi + "/douban/" + $(item).attr('id'),
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        headers: {
            Authorization: $.cookie('Authorization')
        },
        success: function (data, textStatus, request) {
            notification(true, "自动填充成功")
            $('.tag').remove();
            data = data.data;
            var tracks = '';
            var artist = data.artists.map(function (item) {
                return item.name;
            }).join('/');
            $.each(data.tracks, function (i, element) {
                tracks += ' <div class="line-editable"> <input autocomplete="off" placeholder="音轨' + (i + 1) + '" type="text" class="Field_Input track"  name="pubdate" preview="' + element.preview + '"value="' + element.title + '" /> <label><div>音轨' + (i + 1) + '</div> </label></div>';
            });
            $('#tracks').html(tracks)
            $('.album-input-title').val(data.title);
            $('.album-input-artists').val(artist);
            $('.album-input-intro').val(data.intro);
            $('.album-input-pubdate').val(data.pubdate);
            $('.album-input-publisher').val(data.publisher);
            $('.album-input-genres').val(data.genres);
            $('.album-input-version').val(data.version);
            $.each(data.tags, function (i, element) {
                $('.tag-list-container').prepend('<span class="tag">' + element.name + '</span>')
            });

            console.log(data)

        },
        error: function () {
            notification(false, "自动填充失败")
        }
    });
}

function autofull(data) {
    data = data.data;
    var tracks = '';
    var artist = data.artists.map(function (item) {
        return item.name;
    }).join('/');
    $.each(data.tracks, function (i, element) {
        tracks += ' <div class="line-editable"> <input autocomplete="off" placeholder="音轨' + (i + 1) + '" type="text" class="Field_Input track"  name="pubdate" preview="' + element.preview + '" value="' + element.title + '" /> <label><div>音轨' + (i + 1) + '</div> </label></div>';
    });
    $('#tracks').html(tracks)
    $('.album-input-title').val(data.title);
    $('.album-input-artists').val(artist);
    $('.album-input-intro').val(data.intro);
    $('.album-input-pubdate').val(data.pubdate);
    $('.album-input-publisher').val(data.publisher);
    $('.album-input-genres').val(data.genres);
    $('.album-input-version').val(data.version);
    $.each(data.tags, function (i, element) {
        $('.tag-list-container').prepend('<span class="tag">' + element.name + '</span>')
    });

}

$('#submit-button').click(function () {
    /*   console.log( $('#album-input-artists').val().split('/').map(function (num) {
           var artist={};
           artist.name=num;
               return artist;
           }
       ));*/
    var album = getFormDetail();
    console.log(album.id)
    var file = $("#cover-upload").get(0).files[0];

    //var formData = new FormData();
    console.log(file)
    //  if (file != null)
    //  formData.append("file", file);
    var type = '';
    var url = '';

    if (album.id == '') {
        type = "POST"
        url = '/albums'
    } else {
        type = "PUT"
        url = '/albums/' + album.id
    }
    $.ajax({
        type: type,
        url: otakuyApi + url,
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        headers: {
            Authorization: $.cookie('Authorization')
        },
        datatype: "application/json",
        data: JSON.stringify(album),
        success: function (data, textStatus, request) {
            album.id = data.data.id;
            //  console.log(formData.get('file'))
            if (file != null) {
                lrz(file).then(function (rst) {
                    // 处理成功会执行
                    rst.formData.append('fileLen', rst.fileLen);
                    $.ajax({
                        url: otakuyApi + "/albums/" + album.id + "/covers",
                        type: 'PUT',
                        data: rst.formData,
                        processData: false,
                        contentType: false,
                        headers: {
                            Authorization: $.cookie('Authorization')
                        },
                        beforeSend: function () {
                            console.log("正在进行，请稍候");
                        },
                        success: function (data) {
                            notification(true, "专辑发布成功,等待管理员审核")

                        },
                        error: function (data) {
                            notification(false, "封面上传失败")
                            console.log(data);
                        }
                    });
                    console.log(rst);
                }).catch(function (err) {
                    // 处理失败会执行
                }).always(function () {
                    // 不管是成功失败，都会执行
                });

            } else
                notification(true, "专辑发布成功,等待管理员审核")
            $('.beer-box').css('z-index', 1);
            if (type == 'POST')
                $('.mask').hide();
            $('#album_form').attr('album-id', '');
            $('#suggest-album').html('');
            $('#suggest-album').hide();
            $('#album_form').hide();
            $('#album_form input').val('');
            $('.album-input-intro').val('');
            $('.tag').remove()
            $('.track').remove();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            notification(false, XMLHttpRequest.responseJSON.message)
        }
    });


});

function getFormDetail() {
    var album = {};
    album.id = $('#album_form').attr('album-id');
    album.artists = $('.album-input-artists').val().split('/').map(function (num) {
            var artist = {};
            artist.name = num;
            return artist;
        }
    );
    album.tracks = jQuery.makeArray($(".track").map(function (currentValue, index, arr) {
        var track = {};
        track.title = $(index).val();
        track.preview = $(index).attr('preview');
        return track;
    }));
    album.tags = jQuery.makeArray($(".tag").map(function (currentValue, index, arr) {
        var tag = {};
        tag.name = $(index).html();
        return tag;
    }));
    album.title = $('.album-input-title').val();
    album.intro = $('.album-input-intro').val();
    album.pubdate = $('.album-input-pubdate').val();
    album.publisher = $('.album-input-publisher').val();
    album.genres = $('.album-input-genres').val();
    album.version = $('.album-input-version').val();
    album.downloadRes = {};
    album.downloadRes.permission = $('.album-input-res-permission').val();
    album.downloadRes.url = $('.album-input-res').val();
    album.downloadRes.password = $('.album-input-res-password').val();
    album.downloadRes.unzipKey = $('.album-input-res-zip').val();
    if (album.downloadRes.permission == '')
        album.downloadRes.permission = 0;
    return album;
}