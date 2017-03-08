// 与content_script通信
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log("Request comes from content script " + sender.tab.url);
    var word_id=sender.tab.url.split("&sp=")[1].split("l")[1];
    var jsonarray = {};
    var msg={};
    // 双引号转成单引号 词条名 word_name  编辑者名 editor_name 和拒绝理由 history_refuse
     var word_name = request.word_name.replace(/\"/g,"'");
     // console.log(word_name);
     var editor_name = request.editor_name.replace(/\"/g,"'");
     // console.log(editor_name);
     // console.log(editor_name); 
    // console.log(word_id)
    chrome.cookies.get( { 
    url: 'http://qq.com', 
    name: 'o_cookie' }, 
    function( cookie ){ 
          review_id=cookie.value;
          // console.log(review_id)
          if (request.review_flag==0) {
              console.log("没通过"+request.review_flag);
              jsonarray.word_name = word_name; 
              jsonarray.review_id = review_id;
              jsonarray.word_id = word_id;
              jsonarray.review_flag= request.review_flag;
              jsonarray.editor_id = request.editor_id;
              jsonarray.editor_name = editor_name;
              jsonarray.history_refuse = request.history_refuse;
              // console.log(JSON.stringify(jsonarray));
              // 编码
              console.log(jsonarray);
              msg = "encodeString=" + encodeURIComponent(JSON.stringify(jsonarray));
              // console.log(msg);
              // 通过Ajax发送
              sendMessage(msg);
            }else{
              console.log("通过了"+request.review_flag);
              jsonarray.word_name = word_name; 
              jsonarray.review_id = review_id;
              jsonarray.word_id = word_id;
              jsonarray.review_flag= request.review_flag;
              jsonarray.editor_id = request.editor_id;
              jsonarray.editor_name = editor_name;
              console.log(JSON.stringify(jsonarray));
              // 编码
              msg = "encodeString=" + encodeURIComponent(JSON.stringify(jsonarray));
              // console.log(msg);
              // 通过Ajax发送
              sendMessage(msg);
            }
    });    
      console.log(jsonarray)
});

var sendMessage=function(msg){
   $.ajax({
   	  type:"POST",
   	  url:"http://oss.oc.sogou-inc.com/jingyan_audit_test/do_interface_baike_audit.php",
   	  data:msg,
   	  success:function(res){
        console.log(res);
   	  },
   	  error:function(){

   	  }
   })
}
