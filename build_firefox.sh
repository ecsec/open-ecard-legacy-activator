#!/bin/sh

mkdir -p build
cd src/firefox
zip -r ../build/oldact.xpi *
