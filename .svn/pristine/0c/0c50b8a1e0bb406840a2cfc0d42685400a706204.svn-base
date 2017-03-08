//获取bkn
chrome.cookies.get( { 
  url: 'http://qun.qq.com', 
  name: 'skey' }, 
  function( cookie ){ 
    bkn=t(cookie.value);
  });
 function t(e){
    for(var t=5381,n=0,o=e.length;o>n;++n)
    t+=(t<<5)+e.charAt(n).charCodeAt();
    return 2147483647&t;
 }

//获取群号
chrome.windows.getCurrent(function(win)
{
    chrome.tabs.getAllInWindow(win.id, function(tabs)
    {
        // Should output an array of tab objects to your dev console.
                      console.log(tabs);
                      var tabsLength=tabs.length;
                      for (var i=0; i < tabsLength; i++) {
                        if (tabs[i].url !=null) {
                            newUrl=tabs[i];
                        }
                      }
                      var urls=newUrl.url.split('=');
                      urlData=urls[1];
                       console.log(urlData);
    });
});

