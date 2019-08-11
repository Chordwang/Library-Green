var Control=true;

chrome.contextMenus.create({
	"id":"contextId",
	"title":"绿化·文库  [F5恢复]",
	"contexts":["page"],
	"documentUrlPatterns":["https://wenku.baidu.com/view/*"]
	});

chrome.contextMenus.onClicked.addListener(genericOnClick);

// chrome.webRequest.onBeforeRequest.addListener(
    // function(details) {
        // return {redirectUrl: chrome.extension.getURL("pkg_wkcommon_lib_exchange.js")};
    // },
    // {urls: ["https://wkstatic.bdimg.com/static/wkcommon/pkg/pkg_wkcommon_lib_*.js"],types: ["script"]},
    // ["blocking"]
// );

function genericOnClick(info, tab) {
	//
	if(true==true)
	{
		//
		//Control=false;
		//
		//chrome.contextMenus.update("contextId", {title:"恢复·文库"});
		//
		chrome.tabs.executeScript(
			null,
			{"file": "jquery-3.4.1.min.js"},
			function() {
				chrome.tabs.sendMessage(tab.id,{"message":"Go"});
			}
		);
	}
	else
	{
		//
		Control==true;
		//
		chrome.contextMenus.update("contextId", {title:"绿化·文库"});
		//
		chrome.tabs.executeScript(
			null,
			{"file": "jquery-3.4.1.min.js"},
			function() {
				chrome.tabs.sendMessage(tab.id,{"message":"Refresh"});
			}
		);
	}
}