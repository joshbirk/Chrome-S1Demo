function checkForValidUrl(tabId, changeInfo, tab) {
   if (tab != null && tab.url.indexOf( "force.com" ) > 0) {
       chrome.pageAction.show(tabId);
   }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.tabs.onHighlighted.addListener(checkForValidUrl);

var url = '';
var current_tabid = 0;
chrome.pageAction.onClicked.addListener(function() {
   chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
		   function(tabs){
		   		url = tabs[0].url;
		      if(current_tabid != 0) {
              chrome.windows.remove(current_tabid-1, function(window) {});
            }   

          chrome.windows.create({'url': 'demo.html', 'type': 'popup', 'height':750, 'width':360, 'left': 350}, function(window) {
              console.log("NEW WINDOW ID :::>>>>"+window.id);
              current_tabid = window.id+1;
   				   });   
		   });
});

var requestFilter = {
  urls: ["<all_urls>"]
};
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    if( (details.url.indexOf('one.app') > 0 || details.url.indexOf('aura') > 0) &&
         details.tabId == current_tabid
        ) {
        var headers = details.requestHeaders;
        for(var i = 0; i < headers.length; i++) {
          if( headers[i].name == 'User-Agent' ) {
            headers[i].value = 'Mozilla/5.0(iPhone;U;CPUiPhoneOS4_0likeMacOSX;en-us)AppleWebKit/532.9(KHTML,likeGecko)Version/4.0.5Mobile/8A293Safari/6531.22.7';
            console.log('header set');
          }
        }
    }
    return {requestHeaders: headers}; 
}, requestFilter, ['requestHeaders','blocking']);




