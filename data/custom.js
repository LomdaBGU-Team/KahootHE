console.log("running custom script from extention")
var styleSearch;
var fullURL = chrome.runtime.getURL("hebrewStyle.css");
var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', fullURL);

chrome.storage.local.get(["KahootHeToggle"], function (result) {
    if (result.KahootHeToggle) {
        for (let i = 0; i < document.styleSheets.length; i++) {
            styleSearch = styleSearch + document.styleSheets[i].href + " ";
            if (i === document.styleSheets.length - 1) {
                if (!styleSearch.includes("hebrewStyle.css")) {
                    console.log("adding hebrew style")

                    document.getElementsByTagName('head')[0].appendChild(link);
                }
            }
        }
    } else {
        removejscssfile('hebrewStyle.css', 'css');
    }
});

// fixed script from stackoverflow (do not read)
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}

