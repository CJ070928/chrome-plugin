//模糊匹配核心算法，通过向量算法，计算两个字符串的相似度，rate为[0,1]之间的数值，越大相似度越高，1表示完全相同，注意，需要利用分词函数cut_words();


 function fuzzyMatchRate(texta, textb)
 {
 var words_map ={}
 ignore_list = ['的','了','和','呢','啊','哦','恩','嗯','吧',' '];
 var strsA = cut_words(texta);
 var strsB = cut_words(textb);
 for(var i =0; i< strsA.length; i++)
 {
 var word = strsA[i];
 if(ignore_list.indexOf(word)!=-1)
 {
 if(words_map[word] == undefined)
 {
 words_map[word] = [1,0];
 }
 else
 {
 words_map[word][0] +=1;
 }
 }

 };

 for(var i =0; i< strsB.length; i++)
 {
 var word = strsB[i];
 if(ignore_list.indexOf(word)!=-1)
 {
 if(words_map[word] == undefined)
 {
 words_map[word] = [0,1];
 }
 else
 {
 words_map[word][1] +=1;
 }
 }

 }

 var sum = 0
 var sum_str1 = 0
 var sum_str2 = 0
 for (word in words_map)
 {

 sum += words_map[word][0] * words_map[word][1];
 sum_str1 += words_map[word][0] * words_map[word][0];
 sum_str2 += words_map[word][1] * words_map[word][1];

 }

 var rate = sum/(Math.sqrt(sum_str1*sum_str2));

 return rate;

 }

console.time("start");







