var modificationPoint = ['title', 'intro', 'artists', 'downloadRes', 'tags', 'tracks', 'genres', 'version', 'pubdate', 'publisher']
window.onload = function () {
    crear_select();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


var li = new Array();

function crear_select() {
    var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
    var select_ = '';
    for (var e = 0; e < div_cont_select.length; e++) {
        div_cont_select[e].setAttribute('data-indx-select', e);
        div_cont_select[e].setAttribute('data-selec-open', 'false');
        var ul_cont = document.querySelectorAll("[data-indx-select='" + e + "'] > .cont_list_select_mate > ul");
        select_ = document.querySelectorAll("[data-indx-select='" + e + "'] >select")[0];
        if (isMobileDevice()) {
            select_.addEventListener('change', function () {
                _select_option(select_.selectedIndex, e);
            });
        }
        var select_optiones = select_.options;
        document.querySelectorAll("[data-indx-select='" + e + "']  > .selecionado_opcion ")[0].setAttribute('data-n-select', e);
        document.querySelectorAll("[data-indx-select='" + e + "']  > .icon_select_mate ")[0].setAttribute('data-n-select', e);
        for (var i = 0; i < select_optiones.length; i++) {
            li[i] = document.createElement('li');
            if (select_optiones[i].selected == true || select_.value == select_optiones[i].innerHTML) {
                li[i].className = 'active';
                document.querySelector("[data-indx-select='" + e + "']  > .selecionado_opcion ").innerHTML = select_optiones[i].innerHTML;

            }
            ;
            li[i].setAttribute('data-index', i);
            li[i].setAttribute('data-selec-index', e);
// funcion click al selecionar
            li[i].addEventListener('click', function () {
                _select_option(this.getAttribute('data-index'), this.getAttribute('data-selec-index'));
            });

            li[i].innerHTML = select_optiones[i].innerHTML;
            ul_cont[0].appendChild(li[i]);

        }
        ; // Fin For select_optiones
    }
    ; // fin for divs_cont_select
} // Fin Function


var cont_slc = 0;

function open_select(idx) {
    var idx1 = idx.getAttribute('data-n-select');
    var ul_cont_li = document.querySelectorAll("[data-indx-select='" + idx1 + "'] .cont_select_int > li");
    var hg = 0;
    var slect_open = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].getAttribute('data-selec-open');
    var slect_element_open = document.querySelectorAll("[data-indx-select='" + idx1 + "'] select")[0];
    if (isMobileDevice()) {
        if (window.document.createEvent) { // All
            var evt = window.document.createEvent("MouseEvents");
            evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            slect_element_open.dispatchEvent(evt);
        } else if (slect_element_open.fireEvent) { // IE
            slect_element_open.fireEvent("onmousedown");
        } else {
            slect_element_open.click();
        }
    } else {


        for (var i = 0; i < ul_cont_li.length; i++) {
            hg += ul_cont_li[i].offsetHeight;
        }
        ;
        if (slect_open == 'false') {
            document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'true');
            document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = hg + "px";
            document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(180deg)';
        } else {
            document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'false');
            document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
            document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
        }
    }

} // fin function open_select

function salir_select(indx) {
    var select_ = document.querySelectorAll("[data-indx-select='" + indx + "'] > select")[0];
    document.querySelectorAll("[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
    document.querySelector("[data-indx-select='" + indx + "'] > .icon_select_mate").style.transform = 'rotate(0deg)';
    document.querySelectorAll("[data-indx-select='" + indx + "']")[0].setAttribute('data-selec-open', 'false');
}


function _select_option(indx, selc) {
    if (isMobileDevice()) {
        selc = selc - 1;
    }
    var select_ = document.querySelectorAll("[data-indx-select='" + selc + "'] > select")[0];

    var li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
    var p_act = document.querySelectorAll("[data-indx-select='" + selc + "'] > .selecionado_opcion")[0].innerHTML = li_s[indx].innerHTML;
    var select_optiones = document.querySelectorAll("[data-indx-select='" + selc + "'] > select > option");
    for (var i = 0; i < li_s.length; i++) {
        if (li_s[i].className == 'active') {
            li_s[i].className = '';
        }
        ;
        li_s[indx].className = 'active';

    }
    ;
    selectModificationPoint(modificationPoint[$(".cont_select_int > .active").attr('data-index')])
    select_optiones[indx].selected = true;
    select_.selectedIndex = indx;
    select_.onchange();
    salir_select(selc);
}

var selectModificationPoint = function (modificationPoint) {
    $('#revision-edit_form').empty()
    var revision_form = $('#revision-edit_form');
    console.log(modificationPoint)
    switch (modificationPoint) {
        case 'tags':
            break;
        case 'tracks':
            break;
        case 'intro':
            break;
        case 'artists':
            break;
        default :
            revision_form.append($('.album-input-' + modificationPoint).parent().clone());
    }
    getRevisionList(modificationPoint)
}

$('#revison-submit').on('click', function () {
    var revision = {};
    revision.album = $('#album_form').attr('album-id');
    var modificationPointElement = modificationPoint[$(".cont_select_int > .active").attr('data-index')];
    revision.modificationPoint = modificationPointElement;
    switch (modificationPointElement) {
        case 'tags':
            break;
        case 'tracks':
            break;
        case 'intro':
            break;
        case 'artists':
            break;
        default :
            revision.content = $('#revision-edit_form .album-input-' + modificationPointElement).val();
    }

    $.ajax({
        type: "POST",
        url: otakuyApi + "/albums/" + $('#album_form').attr('album-id') + "/revisions",
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJpZCI6IjVjN2U1Y2FlZTg2YzJjMzNkMGZjOTljMiIsInN1YiI6ImFhYSIsImlhdCI6MTU1MTc4NTE2NywiZXhwIjoxNTUyNjQ5MTY3fQ.3Lcr271-Ge1Ft2CzdcVLuTmHcyyfNIq7oF-HS4_smXJFnVSg_a6Cu3c9MPgfjTGkEjaUgJeYpk3Wg48T6z-ywA'
        },
        data: JSON.stringify(revision),
        success: function (data, textStatus, request) {
            //  notification(true, "自动匹配成功")

        },
        error: function () {
            //   notification(false, "自动匹配失败")
        }
    });

});

var getRevisionList = function (modificationPoint) {
    $.ajax({
        type: "GET",
        url: otakuyApi + "/albums/" + $('#album_form').attr('album-id') + "/revisions?modificationPoint=" + modificationPoint,
        contentType: 'application/json',//typically 'application/x-www-form-urlencoded', but the service you are calling may expect 'text/json'... chec
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJpZCI6IjVjN2U1Y2FlZTg2YzJjMzNkMGZjOTljMiIsInN1YiI6ImFhYSIsImlhdCI6MTU1MTc4NTE2NywiZXhwIjoxNTUyNjQ5MTY3fQ.3Lcr271-Ge1Ft2CzdcVLuTmHcyyfNIq7oF-HS4_smXJFnVSg_a6Cu3c9MPgfjTGkEjaUgJeYpk3Wg48T6z-ywA'
        },
        success: function (data, textStatus, request) {
            var list = data.data;
            var html = ''
            if (list != null) {
                $.each(list, function (e, t) {
                    html += '<div class="revision">' + t.content + '</div>'
                })

                $('.revision-queue').html(html)
            }

        },
        error: function () {
            //   notification(false, "自动匹配失败")
        }
    });
}
