window.onload = function() {
    url = chrome.extension.getBackgroundPage().url;
    host = url.split('.com/')[0];
    host = host + '.com';
    window.location.href = host + '/one/one.app';
/*
    $.getScript( host + '/jslibrary/0000/sfdc/SfdcCore.js', function() {
        $.getScript( host + '/jslibrary/0000/sfdc/AuraAlohaFrameNavigator.js', function() {

            console.log(sforce.one.navigateToSObject);

        });
    
    });    */
}

