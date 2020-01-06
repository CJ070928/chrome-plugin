
window.onload = function() {
    const $ = id => document.getElementById(id)
    const wrapperDom = $("wrapper")
    const loadingDom = $("he")
    setTimeout( function() {
        let iframe = document.createElement("iframe")
        iframe.src = "https://unbug.github.io/codelf/"
        iframe.width = "100%"
        iframe.height = "100%"
        iframe.style.border = "none"
        wrapperDom.appendChild(iframe)
        iframe.onload = function(){
            loadingDom.style.display = "none"
        }  
    }, 0)
}