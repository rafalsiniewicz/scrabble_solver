#!/bin/bash
echo "rm -rf public;"
rm -rf public;
echo "mkdir public;"
mkdir public;
#cp static/main.js public;
#cp static/style.css public;
#cp templates/index.html public;
echo "find static -type f -exec cp {} public \;"
find static -type f -exec cp {} public \;
echo "cp -r templates/. public;"
cp -r templates/. public;
echo "cd public;"
cd public;
echo "sed -i 's/..\/static\/css\/style.css/style.css/g' index.html;"
sed -i 's/..\/static\/css\/style.css/style.css/g' index.html;
echo "sed -i 's/..\/static\/js\/main.js/main.js/g' index.html;"
sed -i 's/..\/static\/js\/main.js/main.js/g' index.html;