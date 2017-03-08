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
var addText=$('.right_wrap td[bgcolor="#b4e9b1"]');
if(addText!=null) {findText(addText);}
//进入对比函数
function findText(text){
   for(var i=0;i<text.length;i++){   
          if (text[i].innerHTML.length>5) {
            console.log(text[i].innerHTML);
            var obj1=$('.right_wrap');
            matchText(obj1,text[i].innerText);	        
          }          
    }
}
//全文对比
function matchText(data,matchOne){
   for (var i = 0; i < data.length; i++) {
   	    // console.log(data[i]);
   	    var content=data[i].innerHTML;
	    var content=search_do(data[i].innerHTML,matchOne);
	    data[i].innerHTML=content;	    
   }
}

//比对算法
function search_do(content,keyWord){
        var keyWordArr = keyWord.replace(/[\s]+/g,' ').split(' ');
        var re;
        
        	 for(var n = 0; n < keyWordArr.length; n ++) {
	        //re = new RegExp(">[\s\S]*?"+keyWordArr[n]+"[\s\S]*?<\S","gmi");
	        re = new RegExp(""+keyWordArr[n]+"","gmi");
	        content = content.replace(re,'<span style="border-bottom:2px solid red;">'+keyWordArr[n]+'</span>');
        }
    
        return content;
    }