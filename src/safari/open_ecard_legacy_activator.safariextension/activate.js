/*****************************************************************************
 * Open eCard Legacy Activation Safari Extension
 * Copyright (C) 2013 ecsec GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ****************************************************************************/

function activate() {
    // do nothing on non https sites
    if (document.location.protocol != 'https:') {
	return;
    }
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

activate();
