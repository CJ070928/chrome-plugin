//求两个字符串的相似度,返回差别字符数,Levenshtein Distance算法实现

function Levenshtein_Distance(s,t){
// length of s

　var n=s.length;


　var m=t.length;// length of t

　var d=[];// matrix

　var i;// iterates through s

　var j;// iterates through t

　var s_i;// ith character of s

　var t_j;// jth character of t

　var cost;// cost

　// Step 1

　if (n == 0) return m;

　if (m == 0) return n;

　// Step 2

　for (i = 0; i <= n; i++) {

    　　d[i]=[];

　　d[i][0] = i;

　}

　for (j = 0; j <= m; j++) {

    　　d[0][j] = j;

　}

　// Step 3

　for (i = 1; i <= n; i++) {

    　　s_i = s.charAt (i - 1);

　　// Step 4

    　　for (j = 1; j <= m; j++) {

        　　　t_j = t.charAt (j - 1);

　　　// Step 5

        　　　if (s_i == t_j) {

            　　　　cost = 0;

　　　}else{

            　　　　cost = 1;

　　　}

　　　// Step 6


        　　　d[i][j] = Math.min (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);

　　}

　}

　// Step 7

　return d[n][m];

}

//求两个字符串的相似度,返回相似度百分比

function Levenshtein_Distance_Percent(s,t){

　var l=s.length>t.length?s.length:t.length;

　var d=Levenshtein_Distance(s,t);

　return (1-d/l).toFixed(4);

}

str1 = '慕尼黑啤酒节上只能出售慕尼黑本地生产的啤酒，所以啤酒节的主角一直是当地的几家大型的啤酒屋，如宝莱纳，皇家，欧菲和狮王等几家著名的酒屋。其中最富有传奇色彩的啤酒是以啤酒节命名的OKtoberfest啤酒，（音译为：欧菲啤酒）由于该啤酒在每年的三月份酿制，所以在当地又称为Marzen，（德文三月的意思）。经过六个月的低温窖藏，每到九月底的啤酒节上再由慕尼黑的市长亲自敲开第一桶欧菲啤酒，宣布啤酒节开幕。此时酒花四溅，香浓美味，开坛十里香。所以，欧菲啤酒（Oktoberfest）成为慕尼黑啤酒节上最富有代表性，销量最大的啤酒。';
str2 = '慕尼黑十月啤酒节之所以闻名，不仅因为它是全世界最大的民间狂欢节，而且也因为它完整地保留了巴伐利亚的民间风采和习俗。人们用华丽的马车运送啤酒，在巨大的啤酒帐篷开怀畅饮，欣赏巴伐利亚铜管乐队演奏的民歌乐曲和令人陶醉的情歌雅调。人们在啤酒节上品尝美味佳肴的同时，还举行一系列丰富多彩的娱乐活动，如赛马、射击、杂耍、各种游艺活动及戏剧演出、民族音乐会等。人们在为节日增添喜庆欢乐气氛的同时，也充分表现出自己民族的热情、豪放、充满活力的性格。';
console.time('高性能写法，执行时间')
rate = Levenshtein_Distance_Percent(str1, str2);
console.timeEnd('高性能写法，执行时间')
console.log(rate);

