//加载js
var allPic=new Array;
allPic=$('.right_wrap .diff_unit').find('img');
for (var i = 0; i < allPic.length; i++) {
     console.log(allPic[i]);
     var picA=$(allPic[i]).parents('a')[0];
     //阻止img父标签a的点击事件
     $(picA).click(function(e){
        e.preventDefault();
        return false;
     });
     //点击搜索当前图片
      
      var thisSrc=$(allPic[i]).attr('src');
      var myPic='http://image.baidu.com/n/pc_search?queryImageUrl='+thisSrc;
      var imgTop=$(allPic[i]).offset().top; 
      console.log(top);
      var iframeId='YuFrame'+i;
      var iframeBg='YuFrameBg'+i;
      hideIframe(allPic[i],myPic,'800','800',imgTop,iframeId,iframeBg);
   $(allPic[i]).click(function(){
      $("#YuFrame"+i).show();
      $("#YuFrameBg"+i).show();
   });
   $("#YuFrameBg"+i).click(function() {
        $("#YuFrame"+i).hide();
        $("#YuFrameBg"+i).hide();
    });
}
//拉取搜索页面的iframe
function hideIframe(img,url,w,h,t,id1,id2){
    //添加iframe
    var if_w = w; 
    var if_h = h; 
    //allowTransparency='true' 设置背景透明
    $("<iframe width='" + if_w + "' height='" + if_h + "' id='"+id1+"' name='YuFrame1' style='display:none;position:absolute;z-index:10;background-color:#fff;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true'></iframe>").prependTo('body');    
    var st=$(document).scrollTop(); //滚动条距顶部的距离
    var sl=document.documentElement.scrollLeft|| document.body.scrollLeft;//滚动条距左边的距离
    var ch=document.documentElement.clientHeight;//屏幕的高度
    var cw=document.documentElement.clientWidth;//屏幕的宽度
    var objH=$("#YuFrame1").height();//浮动对象的高度
    var objW=$("#YuFrame1").width();//浮动对象的宽度
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

