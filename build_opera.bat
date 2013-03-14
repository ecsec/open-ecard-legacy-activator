' create build directory
mkdir build
' zip files to oldact.zip
CScript zip.vbs %CD%\build\oldact.zip %CD%\src\opera\config.xml %CD%\src\opera\index.html %CD%\src\opera\includes %CD%\src\opera\images
' rename oldact.zip to oldact.oex
move %CD%\build\oldact.zip %CD%\build\oldact.oex
