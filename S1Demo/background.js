function checkForValidUrl(tabId, changeInfo, tab) {
   console.log(tab);
   if (tab != null && tab.url.indexOf( "force.com" ) > 0) {
       chrome.pageAction.show(tabId);
   }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.tabs.onHighlighted.addListener(checkForValidUrl);

var url = '';
chrome.pageAction.onClicked.addListener(function() {
   chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
		   function(tabs){
		   		url = tabs[0].url;
		      	chrome.windows.create({'url': 'demo.html', 'type': 'popup', 'height':750, 'width':360}, function(window) {
   				/*	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    					chrome.tabs.sendMessage(tabs[0].id, {url: url}, function(response) {});  
					}); */
   				});   
		   });
});

