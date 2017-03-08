chrome.browserAction.onClicked.addListener(function(){
    var url = chrome.extension.getURL("options.html");
    window.open(url, "QQ_QunMember");
});