' create build directory
mkdir build
' zip files to oldact.zip
CScript zip.vbs %CD%\build\oldact.zip %CD%\src\firefox\chrome.manifest %CD%\src\firefox\install.rdf %CD%\src\firefox\chrome
' rename oldact.zip to oldact.xpi
move %CD%\build\oldact.zip %CD%\build\oldact.xpi
