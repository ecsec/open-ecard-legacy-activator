Open eCard oldact Browser Addons/Extensions
===========================================

These Browser Addons/Extensions are a temporary solution to address the missing support for the new eID activation as specified in
TR-03112 Part 7. Their solution is to watch the browser content for object tags with type 'application/vnd.ecard-client'
and forwards the object to the Open eCard localhost server.

This mechanism is not specified in TR-03112 and differs to it in the following aspects:

* The localhost link is http://localhost:24727/eID-Client?activationObject= and the object itself is appended in
  URLEncoded form.
* The TCToken is created by the Open eCard App based on the given object instead of being fetched from the TCToken
  provider.

*Note* that a patched version of the Open eCard App is needed in order for this to work. A working version will be made
available shortly.


Installation
============

The repository comes with a build script for each browser and OS, for example build_firefox.sh for Firefox on *nix and build_chrome.bat for Chrome on windows.
On execution it creates the addon/extension file in the build directory, which can be installed in the browser afterwards.


License
=======

The source code for the addons/extensions is released under the GPLv3.
