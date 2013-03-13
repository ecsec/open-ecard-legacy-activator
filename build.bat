' create build directory
mkdir build
' zip files to oldact.zip
CScript zip.vbs %CD%\build\oldact.zip %CD%\src\chrome.manifest %CD%\src\install.rdf %CD%\src\chrome
' rename oldact.zip to oldact.xpi
move %CD%\build\oldact.zip %CD%\build\oldact.xpi