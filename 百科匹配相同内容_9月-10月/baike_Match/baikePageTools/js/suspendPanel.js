var xhr = new XMLHttpRequest();
//xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
xhr.open("GET", chrome.extension.getURL("html/airPanel.html"), true);
gif_url = chrome.extension.getURL("img/waiting.gif");

var suspendPanelHtmlCode = '';

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        //console.log(xhr.responseText);
        suspendPanelHtmlCode = $(xhr.responseText).filter('div#fake_div').html();
        //console.log(suspendPanelHtmlCode);
    }
}
xhr.send();

//设定重复内容视觉效果的类定义，集中化管理
var effectCode = {
    exact_match: {cls:"dup_exact_match", bk_color:"#ff0000"},
    high_match: {cls:"dup_high_match", bk_color:"#ffff00"},
    middle_match: {cls:"dup_middle_match", bk_color:"#80ff00"},
    low_match: {cls:"dup_low_match", bk_color:"#0080ff"}
}

//从本地存储中读取用户保存的个性化颜色设定
chrome.storage.local.get('effect_colors', function(result){
  if(result != undefined  && result.effect_colors != undefined)
  {
      effectCode.exact_match.bk_color = result.effect_colors.exact_match.bk_color;
      effectCode.high_match.bk_color = result.effect_colors.high_match.bk_color;
      effectCode.middle_match.bk_color = result.effect_colors.middle_match.bk_color;
      effectCode.low_match.bk_color = result.effect_colors.low_match.bk_color;

  }

});

//初始化一个悬浮式面板
function clean_highlight_code() {
    $('span.dup_exact_match').contents().unwrap();
    $('span.dup_high_match').contents().unwrap();
    $('span.dup_middle_match').contents().unwrap();
    $('span.dup_low_match').contents().unwrap();
}
function initFloatPanel() {

    //$('<div id="sticker"><div><p>和搜狗对比词条内容的重复性</p><p>从页面获取的词条名：<input id="sogou_citiao" type="text" maxlength="50" readonly="readonly" /></p><input type="button" id="citiao_compare" value="对比词条" maxlength="100"/></div><HR style="border:3 double color:#000"><p>隐藏/显示重复内容</p><input type="button" id="hide_unhide" value="hide/show"/></div>').insertBefore('body iframe:first');
    $(suspendPanelHtmlCode).insertBefore('body iframe:first');


    //调整整个正文文本框的边界，整体向右移动，以方便左侧放置悬浮窗口
    $('div#sticker').css('left','0px');
    $('div#sticker').css('width','238px');
    $('div#sticker').css('padding-right','0px');
    $('div#sticker').css('padding-left','0px');
    $('div#content-wrap').css('margin-left','240px');
    $('div.polysemeWrap').css('margin-left','240px');
    $("#sticker").sticky({ topSpacing: 50 });

    $('div#sticker-sticky-wrapper').css('position',"fixed");


    //设定颜色块示例，方便用户区分
    $('input#sp_exact_match_color_show').val(effectCode.exact_match.bk_color);
    $('input#sp_high_match_color_show').val(effectCode.high_match.bk_color);
    $('input#sp_middle_match_color_show').val(effectCode.middle_match.bk_color);
    $('input#sp_low_match_color_show').val(effectCode.low_match.bk_color);

    //载入waiting gif
    $('img#sp_waiting_gif').attr('src',gif_url);



    //取得页面的词条名称
    var citiao_name = $('div.lemmaTitleH1').clone().find('span').remove().end().text();
    
    //将词条名设置到输入框里面，如果当前不是有效的词条页面，则该输入框为空！！！
    $('#sogou_citiao').val(citiao_name);

    $('#citiao_compare').click(function () {
        //先将页面中已经标注重复的特效清理掉
        clean_highlight_code();
        //将客户化的颜色代码设定
        effectCode.exact_match.bk_color = $('input#sp_exact_match_color_show').val();
        effectCode.high_match.bk_color = $('input#sp_high_match_color_show').val();
        effectCode.middle_match.bk_color = $('input#sp_middle_match_color_show').val();
        effectCode.low_match.bk_color = $('input#sp_low_match_color_show').val();

        mainCompareProcess( $('#sogou_citiao').val());//启动词条重复性对比主过程 no.2 main_1.js
    });



    //一旦颜色被用户设定，则将设定后的颜色同步到本地存储中
    $ ('input#sp_exact_match_color_show').change(function(){
        effectCode.exact_match.bk_color = $(this).val();
        chrome.storage.local.set({effect_colors:effectCode})

    })
    $ ('input#sp_high_match_color_show').change(function(){
        effectCode.high_match.bk_color = $(this).val();
        chrome.storage.local.set({effect_colors:effectCode})
    })
    $ ('input#sp_middle_match_color_show').change(function(){
        effectCode.middle_match.bk_color = $(this).val();
        chrome.storage.local.set({effect_colors:effectCode})
    })
    $ ('input#sp_low_match_color_show').change(function(){
        effectCode.low_match.bk_color = $(this).val();
        chrome.storage.local.set({effect_colors:effectCode})
    })


    $('#exact_match_button').click(function () {
        $('.'+effectCode.exact_match.cls).slideToggle();
    });

    $('#high_match_button').click(function () {
        $('.'+effectCode.high_match.cls).slideToggle();
    });

    $('#middle_match_button').click(function () {
        $('.'+effectCode.middle_match.cls).slideToggle();
    });

    $('#low_match_button').click(function () {
        $('.'+effectCode.low_match.cls).slideToggle();
    });


}

function toggle_waiting_effect(){
    $('img#sp_waiting_gif').toggle();
}


