#!/bin/sh

mkdir -p build
cd src/android-firefox
zip -r ../../build/oldact.xpi *
