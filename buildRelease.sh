#!/usr/bin/env bash

if [ "$TARGET_OS" == "linux" ]; then
    yarn build && yarn build-electron && yarn run electron-builder -l && rename -f "s/branch/Branch/" ./dist/branch_*.deb
elif [ "$TARGET_OS" == "osx" ]; then
    yarn build && yarn build-electron && yarn run electron-builder -m
elif [ "$TARGET_OS" == "win" ]; then
    yarn build && yarn build-electron && yarn run electron-builder -w
fi