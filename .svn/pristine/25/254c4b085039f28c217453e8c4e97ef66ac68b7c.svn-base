/**
 * Created by scottchen on 2014/5/19.
 */

str1 = '1996年5月，发行国语大碟《浮躁》。王菲彻底抛弃商业考虑，《浮躁》是王菲最圆满的艺术尝试。张亚东监制全辑，专辑以王菲自由自在的状态为主导概念，刻意淡化了歌词的作用，歌曲吟唱则用简单重复的音节强化标题模绘的况味，于是成就了这张完全由“意识”或“潜意识”主导的概念专辑。在这张专辑中，没有一首抒情商业化歌曲，整体氛围统一，但在那个年代，这张作品过于偏离了华语乐坛的传统，导致销量不高。但其开创性在国外却大受褒扬。王菲因此登上了美国《时代》杂志封面。';
str2 = '1996年5月，发行国语大碟《浮躁》。王菲彻底抛弃商业考虑，《浮躁》是王菲最圆满的艺术尝试。张亚东监制全辑，专辑以王菲自由自在的状态为主导概念，刻意淡化了歌词的作用，歌曲吟唱则用简单重复的音节强化标题模绘的况味，于是成就了这张完全由“意识”或“潜意识”主导的概念专辑。《浮躁》创造了华语唱片的艺术巅峰，成为华语歌坛的瑰宝贡后人品鉴！';
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
//模糊匹配算法
function fuzzyMatchRate(str1, str2)
{

    var tokenArray1 = str1;
    var tokenArray2 = str2;
    // var tokenArray1 = strToArray(str1.replace(/[。，、 ]+/g, ''));
    // var tokenArray2 = strToArray(str2.replace(/[。，、 ]+/g, ''));
    //tokenArray1.sort();
    //tokenArray2.sort();
    //console.log('str1 is : '+tokenArray1);
    //console.log('str2 is : '+tokenArray2);

    var m = tokenArray1.length + tokenArray2.length;
    if(m == 0) return 0;

    var z = 0;
    var a = tokenArray1.shift();
    var b = tokenArray2.shift();
    while(a!==undefined && b!==undefined)
    {

        if(a == b)
        {
            z++;
            a = tokenArray1.shift();
            b = tokenArray2.shift();

        }
        else if(a < b)
        {
            a = tokenArray1.shift();
        }
        else if(a> b)
        {
            b = tokenArray2.shift();
        }

    }

    return z/m * 2;
}

//将字符串按照char拆分成数组
function strToArray(str)
{
    var array = [];
    for(var i =0; i<str.length;i++)
    {
        array.push(str[i]);
    }
    return array;
}


function test(str_matrix_BD, str_matrix_SG)
{
    //在每个段落下面，循环遍历每一个句子
    for(var j=0; j<str_matrix_BD.length; j++)
    {
        if(str_matrix_BD[j] == null || str_matrix_BD[j].length == 0) continue;

        //对应百度的每一个句子，循环检查搜狗词条的每一个句子，是否模糊匹配
        var max_rate = 0;
        for(var k=0; k<str_matrix_SG.length; k++)
        {
            //var rate = fuzzyMatch_centence(splited_SG_centences, splited_BD_centences[j]);
            if(str_matrix_SG[k] == null) continue;
            var rate = fuzzyMatchRate(str_matrix_SG[k], str_matrix_BD[j]);
            max_rate = max_rate> rate? max_rate:rate;

        }



        console.log(max_rate);

    }

}
var str_matrix_SG = splitAndSort_text(splite_paras_to_centences(str2));
var str_matrix_BD = splitAndSort_text(splite_paras_to_centences(str1));
test(str_matrix_BD, str_matrix_SG)


