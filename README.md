Open eCard oldact Firefox Addon
===============================

This Firefox addon is a temporary solution to address the missing support for the new eID activation as specified in
TR-03112 Part 7. It's solution is to watch the browser content for object tags with type 'application/vnd.ecard-client'
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

The repository comes with a build script, build.sh for *nix or build.bat for windows. On execution it creates a xpi file in the build directory, which can
be installed in Firefox.


License
=======

The source code for this addon is released under the GPLv3.
