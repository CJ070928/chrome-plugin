$("#getData").click(function(){
   var data=$("#myData").text();
   var forData=data.split('&');
   var getData=forData[0]+'&'+forData[1]+'&end=2000&'+forData[3]+'&'+forData[4];
   
   $.ajax({
        type: 'post',
        url: 'http://qun.qq.com/cgi-bin/qun_mgr/search_group_members?'+getData,
        dataType: 'json',
        success: function(res) {
          var member_length=res.mems.length;
          var member=res.mems;
          var table = '<table><tr><th>ID</th><th>成员</th><th>群名片</th><th>QQ号</th><th>性别</th><th>Q龄</th><th>入群时间</th><th>等级（积分）</th><th>最后发言时间</th></tr>';
          for (var i = 0; i < member_length; i++) {
          	var id=i+1;
          	var name=member[i].nick;
          	var qunName=member[i].card;
          	var qqNum=member[i].uin;
          	var qage=member[i].qage;
          	var sex=sexJudge(member[i].g);
          	var joinTime=joinQunTime(member[i].join_time);
            var levelAndpoint=member[i].lv.level+'('+member[i].lv.point+')';
            var lastSpeakTime=joinQunTime(member[i].last_speak_time);

            table += '<tr>';
            table += '<td>'+id+'</td>';
            table += '<td>'+name+'</td>';
            table += '<td>'+qunName+'</td>';
            table += '<td>'+qqNum+'</td>';
            table += '<td>'+sex+'</td>';
            table += '<td>'+qage+'</td>';  
            table += '<td>'+joinTime+'</td>'; 
            table += '<td>'+levelAndpoint+'</td>'; 
            table += '<td>'+lastSpeakTime+'</td>'; 
            table += '</tr>';
          } ;
          table += '</table>';
          document.getElementById('member').innerHTML = table;
        },
        error:function(res) {
        }
    });
});

//判断性别
var sexJudge=function(n){
	var sex;
    if(n==0){
      sex='男'
    }else if(n==1){
    	sex='女'
    }else if(n==255){
         sex='未知' 
    }
    return sex;
}
//时间
var joinQunTime=function(time){
	var joinTime;
	if (time==0) {
       joinTime='2012年5月以前';
	}else{
      var newTime=new Date(time*1000);
      var yearTime=newTime.getFullYear();
      var monthTime=newTime.getMonth()+1;
      var dayTime=newTime.getDate();
      joinTime=yearTime+'/'+monthTime+'/'+dayTime;
	}
	return joinTime;
}

//导出table为excel
$('#btn').click(function(){
	$("#member").table2excel({
					
					name: "Excel Document Name",
					filename: "myFileName",
					
				});
})