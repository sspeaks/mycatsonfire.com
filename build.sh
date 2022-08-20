#! /usr/bin/env nix-shell
#! nix-shell -i bash -p yarn nodejs

yarn install
# if directory 'dist' doesn't exist, create it.
mkdir -p dist

rm ./dist/playVideo*.js

# generate sha256 has of playVideo.js
hash=$(sha256sum static/playVideo.js | cut -d ' ' -f 1)

outFile="playVideo.bundle.$hash.js"

# run browserify on static/playVideo.js and output to dist/playVideo.bundle.js
./node_modules/.bin/browserify static/playVideo.js | ./node_modules/.bin/uglifyjs -m --mangle-props -o "./dist/$outFile"

# Replace the playVideo.bundle.hash.js with outFile in index.html
sed -i "s/playVideo.*js/$outFile/" index.html
