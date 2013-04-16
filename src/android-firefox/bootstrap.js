const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

function isNativeUI() {
    let appInfo = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
    return (appInfo.ID == "{aa3c5121-dab2-40e2-81ca-7ea25febc110}");
}

var objectActivator = function() {
    return {
	run : function(aEvent) {
	    var doc = aEvent.originalTarget;
	    // get directly accessible object tags
	    var eIDObjs = doc.getElementsByTagName("object");
	    objectActivator.search(eIDObjs, doc);
	    // get object tags inside iframes
	    var iFrames = document.getElementsByTagName("iframe");
	    for(var i = 0; i < iFrames.length; i++) {
		var eIDObjs = iFrames[i].contentWindow.document.getElementsByTagName("object");
		objectActivator.search(eIDObjs, doc);
	    }
	    // get object tags inside normal frames
	    var frames = document.getElementsByTagName("frame");
	    for(let i = 0; i < frames.length; i++) {
		var eIDObjs = frames[i].contentWindow.document.getElementsByTagName("object");
		objectActivator.search(eIDObjs, document);
	    }
	},

	openUriInApp: function openUriInApp(uri) {
	    let urlHandlerSvc = Cc["@mozilla.org/uriloader/external-url-handler-service;1"].getService(Ci.nsIExternalURLHandlerService);
	    if (urlHandlerSvc == null) {
		Cu.reportError("urlHandlerSvc == null\n");
		return;
	    }

	    let found = {};
	    let handlerInfo = urlHandlerSvc.getURLHandlerInfoFromOS(uri, found);
	    if (handlerInfo == null) {
		Cu.reportError("getURLHandlerInfoFromOS returned null\n");
		return;
	    }

	    let urlHandlers = handlerInfo.possibleApplicationHandlers;
	    for (var i = 0; i < urlHandlers.length; i++) {
		let urlApp = urlHandlers.queryElementAt(i, Ci.nsIHandlerApp);
		if(urlApp.name=="Open eCard App") {
		    urlApp.launchWithURI(uri);
		    break;
		}
	    }
	},
	
	search: function(eIDObjs, document) {
	    for (var i = 0; i < eIDObjs.length; i++) {
		var eIDObj = eIDObjs[i];
		if (eIDObj.getAttribute("type") === "application/vnd.ecard-client") {
		    // serialize object
		    serObj = eIDObj.outerHTML;
		    // activate client
		    var localLink = "http://localhost:24727/eID-Client?activationObject=" + encodeURIComponent(serObj);
		    // convert link to uri and open
		    var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
		    objectActivator.openUriInApp(ios.newURI(localLink, null, null));
		    break;
		}
	    }
	}
    };
}();

var menuId;
function loadIntoWindow(window) {
    if (!window)
	return;
    window.addEventListener("DOMContentLoaded",objectActivator.run, false);
}
 
function unloadFromWindow(window) {
    if (!window)
	return;
    window.removeEventListener("DOMContentLoaded",objectActivator.run, false);
}

var windowListener = {
    onOpenWindow: function(aWindow) {
    // Wait for the window to finish loading
    let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
    domWindow.addEventListener("load", function() {
	domWindow.removeEventListener("load", arguments.callee, false);
	loadIntoWindow(domWindow);
    }, false);
    },

    onCloseWindow: function(aWindow) {},
    onWindowTitleChange: function(aWindow, aTitle) {}
};
 
function startup(aData, aReason) {
    let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);

    // Load into any existing windows
    let windows = wm.getEnumerator("navigator:browser");
    while (windows.hasMoreElements()) {
	let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
	loadIntoWindow(domWindow);
    }

    // Load into any new windows
    wm.addListener(windowListener);
}

function shutdown(aData, aReason) {
    // When the application is shutting down we normally don't have to clean
    // up any UI changes made
    if (aReason == APP_SHUTDOWN)
	return;

    let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);

    // Stop listening for new windows
    wm.removeListener(windowListener);

    // Unload from any existing windows
    let windows = wm.getEnumerator("navigator:browser");
    while (windows.hasMoreElements()) {
	let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
	unloadFromWindow(domWindow);
    }
}

function install(aData, aReason) {}
function uninstall(aData, aReason) {}
