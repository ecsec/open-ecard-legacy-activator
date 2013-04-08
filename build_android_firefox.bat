' create build directory
mkdir build
' zip files to oldact.zip
CScript zip.vbs %CD%\build\oldact.zip %CD%\src\android-firefox\chrome %CD%\src\android-firefox\install.rdf %CD%\src\android-firefox\bootstrap.js %CD%\src\android-firefox\chrome.manifest
' rename oldact.zip to oldact.xpi
move %CD%\build\oldact.zip %CD%\build\oldact.xpi
