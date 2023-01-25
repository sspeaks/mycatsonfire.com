#! /bin/bash
# nix-shell -i bash -p yarn nodejs

yarn install
echo "Yarn install complete..."
# if directory 'dist' doesn't exist, create it.
mkdir -p dist
echo "Creating dist dir..."

if [ -f "./dist/playVideo*.js" ]; then
    rm ./dist/playVideo*.js
fi

# generate sha256 has of playVideo.js
hash=$(sha256sum static/playVideo.js | cut -d ' ' -f 1)
echo "Generated hash $hash for playVideo.js"

outFile="playVideo.bundle.$hash.js"

echo "New javascript file determined to be $outFile"

echo "Beginning browserify..."
# run browserify on static/playVideo.js and output to dist/playVideo.bundle.js
./node_modules/.bin/browserify static/playVideo.js | ./node_modules/.bin/uglifyjs -m -o "./dist/$outFile"
echo "Browserify complete!"

# Replace the playVideo.bundle.hash.js with outFile in index.html
sed -i "s/playVideo.*js/$outFile/" index.html
echo "Replaced old hash with new hash in index.html..."
