
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
  // var obj=document.getElementsByTagName("body")[0];
  
  var obj1=$('.right_wrap');console.log(obj1[5])
  var item=0;
  for (var i = 0; i < obj1.length; i++) { 
      
      var cnt=loopSearch(s,obj1[i]);
      item+=cnt;
  }
  console.log(item);
  for (var i = 0; i < obj1.length; i++) {
    // var cnt=loopSearch(s,obj1[i]);
    if (item>1) { 
        var t=obj1[i].innerHTML.replace(/<span\s+class=.?highlight.?>([^<>]*)<\/span>/gi,"$1");
        obj1[i].innerHTML=t;
        t=obj1[i].innerHTML
        var r=/{searchHL}(({(?!\/searchHL})|[^{])*){\/searchHL}/g
        t=t.replace(r,"<span class='highlight' style='border-bottom:2px solid red;'>$1</span>");
        obj1[i].innerHTML=t;
        console.log("搜索到关键词"+cnt+"处")
    }else{
        var t=obj1[i].innerHTML.replace(/<span\s+class=.?highlight.?>([^<>]*)<\/span>/gi,"$1");
        obj1[i].innerHTML=t;
        t=obj1[i].innerHTML
        var r=/{searchHL}(({(?!\/searchHL})|[^{])*){\/searchHL}/g
        t=t.replace(r,"<span>$1</span>");
        obj1[i].innerHTML=t;
        console.log("搜索到关键词"+cnt+"处")
    }   
  }
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

  
//修改内容选中的是$('.right_wrap .diff_unit')里面的所有内容
// var modifyText1=$('.right_wrap .diff_unit');
// for (var i = 0; i < modifyText1.length; i++) {
//   try{
//     findText(modifyText1[i]);}
//     catch(err){
//       console.log(err);
//     }
// }
//修改内容
 var modifyText=$('.right_wrap td[bgcolor="#f5d193"]');
if(modifyText!=null) {setTimeout(function(){findText(modifyText);},500)}
 var modify_styleText=$('.modify_style');
if(modify_styleText!=null) {setTimeout(function(){findText(modify_styleText);},500)}
//新增内容
var add_styleText=$('.add_style');
if(add_styleText!=null) {setTimeout(function(){findText(add_styleText);},500)}
var addText=$('.add');
if(addText!=null) {setTimeout(function(){findText(addText);},500)}
var add_text=$('.right_wrap td[bgcolor="#b4e9b1"]');
if(addText!=null) {setTimeout(function(){findText(add_text);},500)}
//选中修改和新增的
//将需要查重的 文字进行查重
// function findText(text){
    
//             var modifyText=text.innerText;
//             var test=modifyText.split(/。|，/);
            
//             for (var i = 0; i < test.length; i++) {
//               if(test[i].length>5){ 
//                     console.log(test[i]);
//                     highlight(test[i]);
//               }
//             }                   
// }

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
      
      var innerText=$(textWrap[i]).children().eq(1)[0];6
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
setTimeout(function(){findOpen();},500)