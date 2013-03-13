' these need to be changed to the right locations
set CHROMEPATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
set PRIVKEYPATH=%CD%\src\chrome.pem

' pack the extension
%CHROMEPATH% --pack-extension=%CD%\src\chrome --pack-extension-key=%PRIVKEYPATH%
' create build directory
mkdir build
' move and rename extension
move %CD%\src\chrome.crx %CD%\build\oldact.crx
