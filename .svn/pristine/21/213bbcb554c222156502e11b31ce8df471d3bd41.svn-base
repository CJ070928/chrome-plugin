/**
 * @author scottchen
 */
//console.log("myscript is running...");

//文档初始化的时候，做一些准备工作
$(document).ready(function(){
    initFloatPanel();//初始化一个悬浮面板，方便显示和隐藏重复内容 no.1  suspendPanel.js
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
            //判断不为空的内容才加入
            if($(this).text() != null && $.trim($(this).text()!=''))
            {
                BD_unmatched_elements.push(this);
            }


        }
    })
};

//将段落数组或者单个段落切分成句子数组并返回
function splite_paras_to_centences(texts) {
    var splited_SG_centences = [];
    if(texts instanceof Array)//先判断是否是段落数组
    {
        for (var i = 0; i < texts.length; i++) {
            splited_SG_centences = splited_SG_centences.concat(texts[i].match(/[^。，”]+[\。，”]+/g));
        }
    }
    else//直接将字符串段落切分
    {
        splited_SG_centences = texts.match(/[^。，”]+[\。，”]+/g);

    }

    return splited_SG_centences;
}

//将百度的某个段落和搜狗的整个文章按照句子进行模糊匹配，返回rate最高的值

/*
function fuzzyMatch_centence(splited_SG_para, splited_BD_centence) {
  var max_rate = 0;

    for(var i = 0; i< splited_SG_para.length; i++)
  {
      if(splited_SG_para[i] == null) continue;
      var rate = fuzzyMatchRate(splited_SG_para[i], splited_BD_centence);
      max_rate = max_rate> rate? max_rate:rate;

  }
    return max_rate;
}
*/

function fuzzyMatch(SG_texts ,BD_unmatched_elements){
   var rest_BD_unmatched_elements = [];

    var splited_SG_centences = [];

    //将sogou百科的词条内容段落进一步切分成以句子为单位的数组
    splited_SG_centences = splite_paras_to_centences(SG_texts);


    //将每个句子按照字符进行排序（降低内部循环重复排序带来的性能压力）
    var str_matrix_SG = splitAndSort_text(splited_SG_centences);

    //循环遍历百度的每一个段落
    for(var i=0; i< BD_unmatched_elements.length; i++)
   {

       var splited_BD_centences = splite_paras_to_centences( $(BD_unmatched_elements[i]).text());
       if(splited_BD_centences == null) continue;


       var str_matrix_BD = splitAndSort_text(splited_BD_centences);


       //在每个段落下面，循环遍历每一个句子
       for(var j=0; j<str_matrix_BD.length; j++)
       {
           if(str_matrix_BD[j] == null || str_matrix_BD[j].length == 0) continue;

           //对应百度的每一个句子，循环检查搜狗词条的每一个句子，是否模糊匹配
           var max_rate = 0;
           console.log(str_matrix_BD[j]);
           for(var k=0; k<str_matrix_SG.length; k++)
           {
               //var rate = fuzzyMatch_centence(splited_SG_centences, splited_BD_centences[j]);
               if(str_matrix_SG[k] == null) continue;
               var rate = fuzzyMatchRate(str_matrix_SG[k], str_matrix_BD[j]);
               max_rate = max_rate> rate? max_rate:rate;

           }
          // console.log(str_matrix_BD[j]);



          // console.log(max_rate);
           //判断该百度词条的句子是否找到和搜狗词条对应匹配的句子
           if(max_rate>=0.80)
           {
               //高度模糊匹配，标记蓝色

               splited_BD_centences[j] = '<span class="' + effectCode.high_match.cls + '">' + splited_BD_centences[j] + '</span>';
               //$(BD_unmatched_elements[i]).css('background-color',effectCode.high_match.bk_color);
           }
           else if(max_rate>=0.60)
           {
              // console.log(max_rate);
               //中度模糊匹配，标记黄色
               splited_BD_centences[j] = '<span class="' + effectCode.middle_match.cls + '">' + splited_BD_centences[j] + '</span>';
               //$(BD_unmatched_elements[i]).css('background-color',effectCode.middle_match.bk_color);
           }
           else if(max_rate>=0.50)
           {
               //console.log(rate);
               //低度模糊匹配，标记绿色
               splited_BD_centences[j] = '<span class="' + effectCode.low_match.cls + '">' + splited_BD_centences[j] + '</span>';
               //$(BD_unmatched_elements[i]).css('background-color',effectCode.low_match.bk_color);
           }

       }

       $(BD_unmatched_elements[i]).html(splited_BD_centences.join(''));

   }
    $('span.'+effectCode.high_match.cls).css('background-color',effectCode.high_match.bk_color);
    $('span.'+effectCode.middle_match.cls).css('background-color',effectCode.middle_match.bk_color);
    $('span.'+effectCode.low_match.cls).css('background-color',effectCode.low_match.bk_color);
}


//主流程，对比词条,输入参数为sogou词条的正文（文本段数组）
function compareDocDuplication(SG_texts)
{
    cleanBDDocElements();     //将百度词条页中无关信息（元素）删除：空格，图册，图片，编辑按钮，脚本，内链；
    var joinedText = SG_texts.join();
    var BD_unmatched_elements = [];
    exactMatch(joinedText, BD_unmatched_elements);   //精确匹配
    fuzzyMatch(SG_texts, BD_unmatched_elements);     //模糊匹配


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

//
function splitAndSort_text(centences)
{
    var str_matrix = [];
    for(var i=0; i<centences.length; i++)
    {
        if(centences[i] == null ) continue;
        var str_array = strToArray(centences[i].replace(/[。，、 ]+/g, '')).sort();
        if(str_array.length != 0)
        {
            str_matrix.push(str_array);
        }

    }
    return str_matrix;
}