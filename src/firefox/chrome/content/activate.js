/*****************************************************************************
 * Open eCard old Activation Addon
 * Copyright (C) 2013  ecsec GmbH
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

var objectActivator = function() {
    return {
	init : function() {
	    window.removeEventListener("load", objectActivator.init, false);

	    // get browser frame object and register pageload event
	    var appcontent = document.getElementById("appcontent");
	    if(appcontent){
		appcontent.addEventListener("DOMContentLoaded", objectActivator.run, true);
	    }
	},

	run : function(aEvent) {
	    var doc = aEvent.originalTarget;
	    // get directly accessible object tags
	    var eIDObjs = content.document.getElementsByTagName("object");
	    objectActivator.search(eIDObjs, doc);
	    // get object tags inside iframes
	    var iFrames = content.document.getElementsByTagName("iframe");
	    for(let i = 0; i < iFrames.length; i++) {
		var eIDObjs = iFrames[i].contentWindow.document.getElementsByTagName("object");
		objectActivator.search(eIDObjs, doc);
	    }
	    // get object tags inside normal frames
	    var frames = content.document.getElementsByTagName("frame");
	    for(let i = 0; i < frames.length; i++) {
		var eIDObjs = frames[i].contentWindow.document.getElementsByTagName("object");
		objectActivator.search(eIDObjs, content.document);
	    }
	},

	search : function(eIDObjs, doc) {
	    for (let i = 0; i < eIDObjs.length; i++) {
		var eIDObj = eIDObjs[i];
		if (eIDObj.getAttribute("type") === "application/vnd.ecard-client") {
		    // serialize object
		    serObj = eIDObj.outerHTML;
		    // activate client
		    var localLink = "http://localhost:24727/eID-Client?activationObject=" + encodeURIComponent(serObj);
		    // open locallink
		    console.log("Activating eID Client with URL:\n  " + localLink);
		    doc.location.href = localLink;
		    break;
		}
	    }
	}
    };
}();

window.addEventListener("load", objectActivator.init, false);
