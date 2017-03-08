/**
 * @author scottchen
 */
console.log("myscript is running...");

//文档初始化的时候，做一些准备工作
$(document).ready(function(){
    initFloatPanel();//初始化一个悬浮面板，方便显示和隐藏重复内容
    cleanSidebarElements();//清理掉右边栏的元素模块，保持页面干净清爽
    insertUIEffectCode();//插入页面特效，将表格等太长的内容折叠起来，保持页面干净清爽
});


//将百度词条页中无关信息（元素）删除：空格，图册，图片，编辑按钮，脚本，内链；
function cleanBDDocElements() {
    var contents = $('div.para').contents();
    for (var i = 0; i < contents.length; i++) {
        if (contents[i].nodeType == 3) {
            $.trim(contents[i].data);
            //console.log(contents[i].data);
        }
    }
    //删掉图册
    $('div.album-view').remove();
    //删掉图片
    $('div.text_pic').remove();
    //删掉编辑按钮
    $('span.text_edit').remove();
    //删掉脚本
    $('script').remove();
    //删掉内链
    $('sup').remove();
    $('div.para a').contents().unwrap();
}

//精确匹配搜狗和百度的内容，并将匹配成功的内容高亮显示
function exactMatch(joinedText, BD_unmatched_elements) {
    $('div.para').each(function () {

        if (joinedText.indexOf($.trim($(this).text().replace(/\s+/g, ''))) != -1) {
            $(this).wrap('<span></span>');
            $(this).parent().attr('class',effectCode.exact_match.cls);
            $(this).css('background-color', effectCode.exact_match.bk_color);
        }
        else {
            BD_unmatched_elements.push(this);

        }
    })
};





function fuzzyMatch(SG_texts ,BD_unmatched_elements){
   var rest_BD_unmatched_elements = [];
    for(var i=0; i< BD_unmatched_elements.length; i++)
   {
       for(var j = 0; j< SG_texts.length; j++)
       {
           var rate = fuzzyMatchRate(SG_texts[j], $(BD_unmatched_elements[i]).text());
          if(rate>=0.95)
           {
               //高度模糊匹配，标记蓝色
               console.log(rate);
               $(BD_unmatched_elements[i]).wrap('<span></span>');
               $(BD_unmatched_elements[i]).parent().attr('class',effectCode.high_match.cls);
               $(BD_unmatched_elements[i]).css('background-color',effectCode.high_match.bk_color);
           }
           else if(rate>=0.9)
          {
              console.log(rate);
              //中度模糊匹配，标记黄色
              $(BD_unmatched_elements[i]).wrap('<span></span>');
              $(BD_unmatched_elements[i]).parent().attr('class',effectCode.middle_match.cls);
              $(BD_unmatched_elements[i]).css('background-color',effectCode.middle_match.bk_color);
          }
          else if(rate>=0.8)
          {
              //console.log(rate);
              //低度模糊匹配，标记绿色
              $(BD_unmatched_elements[i]).wrap('<span></span>');
              $(BD_unmatched_elements[i]).parent().attr('class',effectCode.low_match.cls);
              $(BD_unmatched_elements[i]).css('background-color',effectCode.low_match.bk_color);
          }
           else
          {
              rest_BD_unmatched_elements.push(BD_unmatched_elements[i]);
          }

       }



   }
}


//主流程，对比词条,输入参数为sogou词条的正文（文本段数组）
function compareDocDuplication(SG_texts)
{
    cleanBDDocElements();
    var joinedText = SG_texts.join();
    var BD_unmatched_elements = [];
    exactMatch(joinedText, BD_unmatched_elements);
    fuzzyMatch(SG_texts, BD_unmatched_elements);


}

//------------------------------------页面特效函数区域-----------------------------------------------//
//删除边栏的无关内容，保证页面清爽
//,
function cleanSidebarElements() {
    $('div.side-box-extend').hide();
    $('div.weiboWrap').hide();
    $('div#authResource').hide();
    $('div#bkDynamic').hide();
    $('div#mabox').hide();
    $('div#bkDynamic').hide();
    $('div')
}

//插入特效：折叠表格特效
function insertUIEffectCode(){
    $('<a class="expander" href="#">更多......</a>').insertBefore('table.module-common-table-0');
    $('table.module-common-table-0').wrap('<div class="content"></div>');
    $('<a class="expander" href="#">更多......</a>').insertBefore('table.module-common-table-1');
    $('table.module-common-table-1').wrap('<div class="content"></div>');
    $('<a class="expander" href="#">更多......</a>').insertBefore('div.module-music');
    $('div.module-music').wrap('<div class="content"></div>');
    $('.expander').simpleexpand();

};



//词条重复性对比的主函数入口
function mainCompareProcess(citiao_name)
{

    toggle_waiting_effect();
    $.post("http://baike.sogou.com/lemma/default/ShowLemmaDefault,$FinalBorder.$NewSearchBar.sf.sd",
        {
            formids:"TextField,Submit,Submit_0",
            submitmode:"submit",
            submitname:"",
            TextField:citiao_name,
            Submit:"进入词条"
        },
        function(data,status){
            //console.log("Data: " + data + "\nStatus: " + status);

            var SG_texts = handleSGDoc(data);//处理原始的搜狗词条文档，返回正文段数组
            compareDocDuplication(SG_texts);//启动对比百度和搜狗词条重复内容的主流程
            toggle_waiting_effect();
            })

}
//处理post后返回的sogou词条页面文档，将正文部分整理为文本段数组，并删除不必要的格式和内容（图片，链接等）
function handleSGDoc(data)
{
    var texts = [];
    $doc = $(data);
    $doc.find('a.ed_inner_link').contents().unwrap();//删掉内链
    $doc.find('span.text_img').remove();//删掉图册图片
    $doc.find('sup').remove();//删掉正文中参考资料的链接标记

    //把所有的二级目录都放入文本数组里面，然后再删除二级目录
    $doc.find('div.rich_text_area b').each(function(){
        texts.push($(this).text());
        $(this).remove();
    })
    //删除正文区域内容中所有为空的node节点
    $doc.find('div.rich_text_area').contents().filter(function(){return $.trim($(this).text()) === '' && $(this).children().length == 0;
    }).remove();
    //筛选出正文区域直接的文本node,并将文本内容合并后加入texts文本数组（注意：这里有一个处理有问题，文本node没有段落
    texts.push($doc.find('div.rich_text_area').contents().filter(function(){return this.nodeType == Node.TEXT_NODE;}).text().replace(/\s+/g, ''));
    //将正文区域中的p tag包裹的段落内容添加到texts文本数组中
    $doc.find('div.section_content>div.rich_text_area>p').each(function(){texts.push($(this).text().replace(/\s+/g, ''))});
    return texts;
}