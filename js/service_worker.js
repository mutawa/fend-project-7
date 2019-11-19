// make sure service worker is supported by the browser

if('serviceWorker' in navigator) {
    window.addEventListener("load", ()=>{
        navigator.serviceWorker.register("../sw.js")
        .then(reg => {
            console.log("sw registered");
        })
        .catch(err => {
            console.log("sw error:", err);
        });
    });
} 