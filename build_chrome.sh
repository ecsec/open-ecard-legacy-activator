#!/bin/sh

if [ -x $CHROME ] ; then
    CHROME=/usr/bin/chromium
fi
if [ ! $PRIVKEY ] ; then
    echo "USAGE: PRIVKEY=path/to/key.pem $0"
    exit 1
fi

mkdir -p build

# pack the extension
$CHROME --pack-extension=src/chrome --pack-extension-key=$PRIVKEY
# move and rename extension
mv src/chrome.crx build/oldact.crx
