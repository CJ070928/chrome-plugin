// $('#imgcode').trigger('click');

// var identifyImg=$('#imgcode img')[0];
// console.log($('input[name="code"]')[0]);
// console.log(identifyImg);
// var string = OCRAD($('#imgcode img'));
// alert(string);
// setTimeout(function(){
//   $('input[name="code"]')[0].focus();
//   $('input[name="code"]').val('你好啊')
// },500)

// $.ajax({
//          type: "POST",
//          url: "http://ocr.shouji.sogou.com/v2/ocr/json",
//          data:identifyImg,
//          success: function(res){
//                     console.log(res);
//               },
//          error:function(error){
//               }
//          });
var all=$('.diff_unit tbody');

for (var i = 0; i < all.length; i++) {//tbody循环
    var allTr=$(all[i]).find('tr');
    var allTrlength=$(allTr).length;
    //iframe和背景的id
      var iframeId='YuFrame'+i;
      var iframeBg='YuFrameBg'+i;
  for (var j = 0; j < $(allTr).length; j++) { //tr循环
      var currentTr= $(allTr)[j];
      var firstTdtext=$(currentTr).find('td')[0].innerHTML; //第一个td中的文字
      var secondTdtext=$(currentTr).find('td')[1].innerText;//第二个td中的文字
      var myTop=$(currentTr).offset().top; //当前tr高度
      if (firstTdtext == '网站' || firstTdtext == '官网' || firstTdtext == '官方网站') {
        var splitkey=secondTdtext.split('.');
        var keyLength=splitkey.length-1;
        if (splitkey[keyLength].indexOf('com')>-1) {  //结尾为com的网站
           var comIf=secondTdtext.indexOf("com")+3;
           var mysite=secondTdtext.substring(0,comIf); 
           var recordSite='http://icp.alexa.cn/index.php?q='+mysite;

           hideIframe($(currentTr),recordSite,'800','800',myTop,iframeId,iframeBg);
        }else if(splitkey[keyLength].indexOf('cn')>-1){ //结尾为cn的网站
           var cnIf=secondTdtext.indexOf("cn")+2;
           var mysite=secondTdtext.substring(0,cnIf);
           var recordSite='http://icp.alexa.cn/index.php?q='+mysite;
           hideIframe($(currentTr),recordSite,'800','800',myTop,iframeId,iframeBg);
        }
      }
    }  
  
  // if ($(all[i]).find('tr:last td:first')[0].innerHTML=='网站' && $(all[i]).find('tr:last td:last')[0].innerHTML!='') {  //找到网址的位置
  //     // 
  //     //当前需要查询的网址       
  //     var insideUrl=$(all[i]).find('tr:last td:last')[0].innerText;
  //     //iframe框的位置
  //     var myTop=$(all[i]).find('tr:last td:first').offset().top; 
  //     console.log(myTop);
  //     //iframe框的url
  //     var recordSite='http://icp.alexa.cn/index.php?q='+insideUrl;
  //     //iframe和背景的id
  //     var iframeId='YuFrame'+i;
  //     var iframeBg='YuFrameBg'+i;
  //     hideIframe($(all[i]),recordSite,'800','800',myTop,iframeId,iframeBg);

  //      $(all[i]).click(function(){
  //         $("#YuFrame"+i).show();
  //         $("#YuFrameBg"+i).show();
  //      });
  //      $("#YuFrameBg"+i).click(function() {
  //           $("#YuFrame"+i).hide();
  //           $("#YuFrameBg"+i).hide();
  //       });
  // }
}

// var getRecord=function(){
//   $(document).on('click','.record-search',function(){
//     var insideUrl=$(this).parent()[0].innerText;
//     var recordSite='http://icp.alexa.cn/';
//     // window.open(recordSite);
//     var top=$(this).offset().top; 
//     showIframe(recordSite,800,800,top);

//     setTimeout(function(){
//        var test=$("iframe")[0].contentWindow;console.log(test);
//      },2000);
//    })
// };
// getRecord();

//拉取搜索页面的iframe
function hideIframe(img,url,w,h,t,id1,id2){
    //添加iframe
    var if_w = w; 
    var if_h = h; 
    //allowTransparency='true' 设置背景透明
    $("<iframe security='restricted' sandbox='allow-scripts allow-same-origin allow-popups allow-forms' width='" + if_w + "' height='" + if_h + "' id='"+id1+"' name='YuFrame1' style='display:none;position:absolute;z-index:10;background-color:#fff;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true'></iframe>").prependTo('body');    
    var st=$(document).scrollTop(); //滚动条距顶部的距离
    var sl=document.documentElement.scrollLeft|| document.body.scrollLeft;//滚动条距左边的距离
    var ch=document.documentElement.clientHeight;//屏幕的高度
    var cw=document.documentElement.clientWidth;//屏幕的宽度
    var objH=$("#"+id1).height();//浮动对象的高度
    var objW=$("#"+id2).width();//浮动对象的宽度
    var objT=Number(st)+(Number(ch)-Number(objH))/2;
    var objL=Number(sl)+(Number(cw)-Number(objW))/2;

    $("#"+id1).css('left',objL);
    $("#"+id1).css('top',t);
    
    $("#"+id1).attr("src", url);
 
    //添加背景遮罩
    $("<div id='"+id2+"' style='background-color: Gray;display:none;z-index:3;position:absolute;left:0px;top:0px;filter:Alpha(Opacity=30);/* IE */-moz-opacity:0.4;/* Moz + FF */opacity: 0.4; '/>").prependTo('body'); 
    var bgWidth = Math.max($("body").width(),cw);
    var bgHeight = Math.max($("body").height(),ch);
    $("#"+id2).css({width:bgWidth,height:bgHeight});
 
    //点击背景遮罩移除iframe和背景
    $("#"+id2).click(function() {
        $("#"+id1).hide();
        $("#"+id2).hide();
    });
    $(img).click(function() {
        $("#"+id1).show();
        $("#"+id2).show();
    });
}