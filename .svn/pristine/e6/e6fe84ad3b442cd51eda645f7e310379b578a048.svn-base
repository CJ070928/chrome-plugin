//获取词条名
var word_name;
var editor_name;
var editor_id;
if ($('.contrast_tit')[2]) {
  var word_name_wrap=$('.contrast_tit')[2];
  word_name=$(word_name_wrap)[0].innerText;
}
if ($('.contrast_info .contrast_r a[id=Any_0]')[0]){
  editor_name=$('.contrast_info .contrast_r a[id=Any_0]')[0].innerText;
} 
if($('.contrast_info .contrast_r a[id=Any_0]')[0]){
  editor_id=$('.contrast_info .contrast_r a[id=Any_0]').attr("title").split('：')[1];
}
console.log(word_name+editor_name+editor_id)
// 编辑人员名字和ID

// console.log(editor_name);
// 获取历史被拒绝原因的编辑时间，版本ID和被拒原因
// var reason=$('.contrast_info .contrast_r span');
// 定义拒绝理由数组
// var history_refuse=[];
// for (var i = 1; i < reason.length; i++) {
//         // 获取历史被拒原因里面的文字
//       var mySpan=reason[i].innerText;
//       console.log(mySpan);
//       // 切割为编辑时间 版本Id和被拒原因
//       var splitKey=mySpan.split(';');
//       var getKey=[];
      
//       if (splitKey.length>2) {
//          for (var j = 0; j < splitKey.length; j++) {
//             var pointer=splitKey[j].indexOf(":")+1;
//             getKey[j]=splitKey[j].substring(pointer);
//         }
//         // console.log(getKey);        
//         history_refuse.push({'edit_time':getKey[0],'version_id':getKey[1],'refuse_reason':getKey[2]});
//       }
// }


// $('.main_wrap').append('<input class="test-button" type="button" value="点击"/>');
// $('.main_wrap').on('click','.test-button',function(){
//   // input[type=text]中的值
//   var input=$(".main_wrap  input[type='text']")[0];
//   var inputText=$(input).val();
//   // input[type=checkbox]中的值
//   var checkbox=$(".main_wrap input[type='checkbox']");
//   var all_reason=inputText;
// // 循环遍历checkbox中被选择拒绝的理由
//   for (var i = 0; i < checkbox.length; i++) {
//       var thisCheckbox=$(checkbox[i])[0];
//       // console.log(thisCheckbox);
//       if ($(thisCheckbox).is(':checked')) {
//        console.log($(thisCheckbox));
//        var thisText=$(thisCheckbox).parent()[0].innerText;
//        all_reason+=thisText;
//     }
//   }
//   // console.log(all_reason);

//   // 获取当前时间
//   var date = new Date();
//   this.year = date.getFullYear();
//   this.month = date.getMonth() + 1;
//   this.date = date.getDate();
//   this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//   this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//   this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
//   var currentTime = this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
//   // console.log(currentTime);
//   var history_refuse={'edit_time':currentTime,'refuse_reason':all_reason};
//   console.log(history_refuse);
//   // 向background.js发送消息
//   chrome.extension.sendMessage({review_flag:1,word_name:word_name,editor_name: editor_name,editor_id:editor_id,history_refuse:history_refuse});
// })

var refuse_message=function(flag){
  var review_flag=flag;
  // input[type=text]中的值
  var input=$(".main_wrap  input[type='text']")[0];
  var inputText=$(input).val();
  // input[type=checkbox]中的值
  var checkbox=$(".main_wrap input[type='checkbox']");
  var all_reason=inputText;
// 循环遍历checkbox中被选择拒绝的理由
  for (var i = 0; i < checkbox.length; i++) {
      var thisCheckbox=$(checkbox[i])[0];
      // console.log(thisCheckbox);
      if ($(thisCheckbox).is(':checked')) {
       console.log($(thisCheckbox));
       var thisText=$(thisCheckbox).parent()[0].innerText;
       all_reason+=thisText;
    }
  }
  // console.log(all_reason);

  // 获取当前时间
  var date = new Date();
  this.year = date.getFullYear();
  this.month = date.getMonth() + 1;
  this.date = date.getDate();
  this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  var currentTime = this.year + "-" + this.month + "-" + this.date + " " + this.hour + ":" + this.minute + ":" + this.second;
  // console.log(currentTime);
  var history_refuse={"edit_time":currentTime,"refuse_reason":all_reason};
  console.log(history_refuse);
  // 向background.js发送消息
  chrome.extension.sendMessage({review_flag:review_flag,word_name:word_name,editor_name: editor_name,editor_id:editor_id,history_refuse:history_refuse});
}

var button=$('.bt');
// 点击通过按钮
$(button[0]).click(function(){
   console.log(111);
   refuse_message(1); 
});
// 点击拒绝按钮
$(button[1]).click(function(){
  console.log(000);
  refuse_message(0) ;
})