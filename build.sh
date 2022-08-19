#! /usr/bin/env nix-shell
#! nix-shell -i bash -p yarn nodejs

yarn install
mkdir dist
./node_modules/.bin/browserify ./static/playVideo.js > ./dist/playVideo.bundle.js
