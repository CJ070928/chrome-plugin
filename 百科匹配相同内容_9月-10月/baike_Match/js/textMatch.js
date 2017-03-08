
function encode(s){
  return s.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/([\\\.\*\[\]\(\)\$\^])/g,"\\$1");
}
function decode(s){
  return s.replace(/\\([\\\.\*\[\]\(\)\$\^])/g,"$1").replace(/>/g,">").replace(/</g,"<").replace(/&/g,"&");
}
function highlight(s){
  if (s.length==0){
    console.log('搜索关键词未填写！');
    return false;
  }
  s=encode(s);
  var obj=document.getElementsByTagName("body")[0];
  var t=obj.innerHTML.replace(/<span\s+class=.?highlight.?>([^<>]*)<\/span>/gi,"$1");

  obj.innerHTML=t;
  var cnt=loopSearch(s,obj);  
  t=obj.innerHTML
  var r=/{searchHL}(({(?!\/searchHL})|[^{])*){\/searchHL}/g
  t=t.replace(r,"<span class='highlight' style='border-bottom:2px solid red;'>$1</span>");

 
  obj.innerHTML=t;
  console.log("搜索到关键词"+cnt+"处")
}
function loopSearch(s,obj){
  var cnt=0;
  if (obj.nodeType==3){
    cnt=replace(s,obj);
    return cnt;
  }
  for (var i=0,c;c=obj.childNodes[i];i++){
    if (!c.className||c.className!="highlight")
      cnt+=loopSearch(s,c);
  }
  return cnt;
}
function replace(s,dest){
  var r=new RegExp(s,"g");
  var tm=null;
  var t=dest.nodeValue;
  var cnt=0;
  if (tm=t.match(r)){
    cnt=tm.length;3
    t=t.replace(r,"{searchHL}"+decode(s)+"{/searchHL}")
    dest.nodeValue=t;
  }
  return cnt;
}


  
//获取页面修改和新增的部分
  //对词
   // var compareText=$('.para a[target="_blank"]');
   //  for(var i=0,j=compareText.length;i<j;i++)
   //   { 
   //    console.log(j);
   //    console.log(compareText[i].innerHTML);
   //    if (compareText[i].innerHTML.length>5) {
   //      console.log(compareText[i].innerHTML.length);
   //      highlight(compareText[i].innerHTML);
   //     }
   //   } 
  //对句子
  // var paraText=$('.para').text();
  // var result=paraText.split(/[，。  ]/);
  // for(var i=0;i<result.length;i++){
  //       if (result[i].length>5) {  
  //          console.log(result[i]);
  //       }       
  // }

//修改内容
 var modifyText=$('.right_wrap td[bgcolor="#f5d193"]');
if(modifyText!=null) {findText(modifyText);}
 var modify_styleText=$('.modify_style');
if(modify_styleText!=null) {findText(modify_styleText);}
//新增内容
var add_styleText=$('.add_style');
if(add_styleText!=null) {findText(add_styleText);}
var addText=$('.add');
if(addText!=null) {findText(addText);}


//将需要查重的 文字进行查重
function findText(text){
   for(var i=0;i<text.length;i++){   
          if (text[i].innerHTML.length>5) {

            console.log(text[i].innerHTML);
            highlight(text[i].innerHTML);
          }          
    }
}

//将含有重复项的影藏栏 显示
function findOpen(){
   var textWrap=$(".highlight").parents('.unit_wrap');
   console.log(textWrap);
   for (var i = 0; i < textWrap.length; i++) {
      
      var innerText=$(textWrap[i]).children().eq(1)[0];
      console.log(innerText);  
     
      var textA=$(textWrap[i]).find('a')[0];
      

      var textId=$(textA).attr('id');
      console.log(textId);
     
      $('#'+textId).click(function(){
          $(innerText).show();
        })
    
      $('#'+textId).trigger('click');
       
   }
}
findOpen();