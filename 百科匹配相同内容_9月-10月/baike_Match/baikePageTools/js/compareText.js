/**
 * Created by scottchen on 2014/5/1.
 */
//模糊匹配算法
function fuzzyMatchRate(str1, str2)
{

    var tokenArray1 = str1.slice(0);
    var tokenArray2 = str2.slice(0);
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
