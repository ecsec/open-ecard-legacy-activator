// == Open eCard Legacy Activator ==
// Scans for eCard object tags and invokes the localhost activation when one is encountered

// ==UserScript==
// @include https://*/*
// ==/UserScript==

window.addEventListener('DOMContentLoaded', activate , false);

function activate() {
    // get directly accessible object tags 
    var eIDObjs = document.getElementsByTagName("object");
    search(eIDObjs, document);
    // get object tags inside iframes
    var iFrames = document.getElementsByTagName("iframe");
    for (var i = 0; i < iFrames.length; i++) {
	var eIDObjs = iFrames[i].contentWindow.document.getElementsByTagName("object");
	search(eIDObjs, document);
    }
    // get object tags inside normal frames
    var frames = document.getElementsByTagName("frame");
    for (var i = 0; i < frames.length; i++) {
	var eIDObjs = frames[i].contentWindow.document.getElementsByTagName("object");
	search(eIDObjs, document);
    }
}

function search(eIDObjs, document) {
    for (var i = 0; i < eIDObjs.length; i++) {
	var eIDObj = eIDObjs[i];
	if (eIDObj.getAttribute("type") === "application/vnd.ecard-client") {
	    // serialize object
	    serObj = eIDObj.outerHTML;
	    // activate client
	    var localLink = "http://localhost:24727/eID-Client?activationObject=" + encodeURIComponent(serObj);
	    // open locallink
	    console.log("Activating eID Client with URL:\n " + localLink);
	    document.location.href = localLink;
	    break;
	}
    }
}
